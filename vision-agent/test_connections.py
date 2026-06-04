"""
Quick connectivity test for ElevenLabs TTS and OpenRouter LLM.
Run from the vision-agent/ directory:

    .venv/Scripts/python.exe test_connections.py
"""

import asyncio
import os
from pathlib import Path

from dotenv import load_dotenv

load_dotenv(Path(__file__).parent.parent / ".env", override=False)


# ── ElevenLabs TTS ────────────────────────────────────────────────────────────

async def test_elevenlabs_tts():
    print("\n── ElevenLabs TTS ──────────────────────────────")
    api_key = os.environ.get("ELEVENLABS_API_KEY", "")
    if not api_key:
        print("❌  ELEVENLABS_API_KEY not set")
        return

    try:
        from elevenlabs import AsyncElevenLabs

        client = AsyncElevenLabs(api_key=api_key)
        # Stream a short phrase; collect the first chunk to confirm it works
        gen = client.text_to_speech.stream(
            text="Hello, I am your AI teacher.",
            voice_id="VR6AewLTigWG4xSOukaG",  # Rachel
            model_id="eleven_multilingual_v2",
        )
        first_chunk = None
        async for chunk in gen:
            if chunk:
                first_chunk = chunk
                break

        if first_chunk:
            print(f"✅  TTS OK — received {len(first_chunk)} bytes of audio")
        else:
            print("⚠️  TTS responded but returned empty audio")
    except Exception as e:
        print(f"❌  TTS failed: {e}")


# ── ElevenLabs STT (API key validity) ────────────────────────────────────────

async def test_elevenlabs_stt():
    print("\n── ElevenLabs key check ────────────────────────")
    api_key = os.environ.get("ELEVENLABS_API_KEY", "")
    if not api_key:
        print("❌  ELEVENLABS_API_KEY not set")
        return

    try:
        from elevenlabs import AsyncElevenLabs

        client = AsyncElevenLabs(api_key=api_key)
        # Fetch user subscription — lightweight call that validates the key
        user = await client.user.get()
        print(f"✅  Key OK — subscription: {user.subscription.tier}")
    except Exception as e:
        print(f"❌  Key check failed: {e}")


# ── OpenRouter LLM ────────────────────────────────────────────────────────────

async def test_openrouter_llm():
    print("\n── OpenRouter LLM ──────────────────────────────")
    api_key = os.environ.get("OPENROUTER_API_KEY", "")
    if not api_key:
        print("❌  OPENROUTER_API_KEY not set")
        return

    models_to_try = [
        "anthropic/claude-3.5-sonnet:beta",
        "anthropic/claude-3.5-sonnet",
        "anthropic/claude-3-haiku",
        "openai/gpt-4o-mini",
    ]

    try:
        from openai import AsyncOpenAI

        client = AsyncOpenAI(
            api_key=api_key,
            base_url="https://openrouter.ai/api/v1",
        )

        for model in models_to_try:
            try:
                resp = await client.chat.completions.create(
                    model=model,
                    messages=[{"role": "user", "content": "Say 'ok' in one word."}],
                    max_tokens=5,
                )
                reply = resp.choices[0].message.content
                print(f"✅  {model} → {reply!r}")
                break  # stop at first working model
            except Exception as e:
                print(f"❌  {model} → {e}")
    except ImportError:
        print("❌  openai package not installed")


# ── Main ──────────────────────────────────────────────────────────────────────

async def main():
    print("Testing API connections…")
    await test_elevenlabs_stt()
    await test_elevenlabs_tts()
    await test_openrouter_llm()
    print("\nDone.")


if __name__ == "__main__":
    asyncio.run(main())
