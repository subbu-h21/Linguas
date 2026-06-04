import json
from pathlib import Path

from dotenv import load_dotenv

from vision_agents.core import Agent, AgentLauncher, Runner, User
from vision_agents.core.instructions import Instructions
from vision_agents.plugins import elevenlabs, getstream, openrouter

# Load repo-root .env so this service shares all credentials with the Expo app.
# override=False means OS-level env vars (e.g. Docker secrets) take precedence.
load_dotenv(Path(__file__).parent.parent / ".env", override=False)

_BASE_PROMPT = """\
You are a friendly AI language teacher. You always speak in English and explain \
everything through English, no matter which language the student is learning.

When a student joins:
1. Greet them warmly and introduce yourself as their AI language teacher.
2. Teach vocabulary, common phrases, and basic grammar through natural conversation.
3. Correct mistakes gently and offer the right form immediately after.
4. Keep responses short and conversational — this is a voice lesson, not a lecture.\
"""


def _build_lesson_prompt(custom: dict) -> str:
    """Build a lesson-aware system prompt from Stream call custom data.

    The Expo API route packs lessonTitle, languageId, goals, vocab, phrases,
    and aiTeacherPrompt into the call's custom fields before spawning the agent.
    """
    language_id: str = custom.get("languageId", "")
    lesson_title: str = custom.get("lessonTitle", "")

    def _parse_list(key: str) -> list:
        raw = custom.get(key, "[]") or "[]"
        try:
            return json.loads(raw)
        except json.JSONDecodeError:
            return []

    goals = _parse_list("goals")
    vocab = _parse_list("vocab")
    phrases = _parse_list("phrases")

    ai_prompt: dict = {}
    raw_prompt = custom.get("aiTeacherPrompt", "") or ""
    if raw_prompt:
        try:
            ai_prompt = json.loads(raw_prompt)
        except json.JSONDecodeError:
            pass

    parts = [_BASE_PROMPT]

    if ai_prompt.get("systemPrompt"):
        parts.append(f"\n\nLesson instructions:\n{ai_prompt['systemPrompt']}")

    if lesson_title:
        parts.append(f"\n\nLesson topic: {lesson_title}")

    if language_id:
        parts.append(f"Target language: {language_id.upper()}")

    if goals:
        parts.append("Lesson goals:\n" + "\n".join(f"- {g}" for g in goals))

    if vocab:
        parts.append("Vocabulary to teach:\n" + "\n".join(f"- {v}" for v in vocab))

    if phrases:
        parts.append("Phrases to practice:\n" + "\n".join(f"- {p}" for p in phrases))

    if ai_prompt.get("targetVocab"):
        parts.append("Target vocab: " + ", ".join(ai_prompt["targetVocab"]))

    return "\n".join(parts)


async def create_agent(**kwargs) -> Agent:
    """Factory called once per session by the Runner."""
    return Agent(
        edge=getstream.Edge(),
        agent_user=User(name="AI Teacher", id="ai-teacher"),
        instructions=_BASE_PROMPT,
        llm=openrouter.LLM(model="anthropic/claude-3-haiku"),
        stt=elevenlabs.STT(
            model_id="scribe_v2_realtime",
            language_code="en",
        ),
        tts=elevenlabs.TTS(
            voice_id="VR6AewLTigWG4xSOukaG",        # Rachel — clear, warm
            model_id="eleven_multilingual_v2",
        ),
    )


async def join_call(
    agent: Agent, call_type: str, call_id: str, **kwargs
) -> None:
    """Entry point called by the framework after create_agent() succeeds."""
    call = await agent.create_call(call_type, call_id)

    # Read lesson context that the Expo API route packed into call custom data.
    # Builds a lesson-specific prompt so the agent knows exactly what to teach.
    try:
        call_response = await call.get()
        custom: dict = getattr(call_response.data.call, "custom", None) or {}
        if custom:
            agent.instructions = Instructions(input_text=_build_lesson_prompt(custom))
    except Exception as exc:
        print(f"[agent] Warning: could not read call custom data: {exc}")

    async with agent.join(call):
        # Open with a greeting; the agent speaks first.
        await agent.simple_response(
            "Greet the student warmly and begin the lesson based on your instructions. "
            "Introduce today's topic and ask the student if they are ready."
        )
        # Block until the call ends or idle/duration timeout fires.
        await agent.finish()


if __name__ == "__main__":
    Runner(
        AgentLauncher(
            create_agent=create_agent,
            join_call=join_call,
            max_sessions_per_call=1,       # one teacher per call
            agent_idle_timeout=120.0,      # leave after 2 min of silence
            max_session_duration_seconds=3600,  # hard cap at 1 hour
        )
    ).cli()
