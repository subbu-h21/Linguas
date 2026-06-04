import { StreamClient } from "@stream-io/node-sdk";

const AI_TEACHER_USER_ID = "ai-teacher";
const CALL_TYPE = "audio_room";

interface StartAgentBody {
  callId: string;
  lessonId?: string;
  lessonTitle?: string;
  languageId?: string;
  goals?: string[];
  vocab?: string[];
  phrases?: string[];
  aiTeacherPrompt?: {
    systemPrompt: string;
    lessonTopic: string;
    targetVocab: string[];
  };
}

export async function POST(request: Request) {
  const apiKey = process.env.STREAM_API_KEY;
  const apiSecret = process.env.STREAM_API_SECRET;
  const agentServerUrl =
    process.env.AGENT_SERVER_URL ?? "http://localhost:8000";

  if (!apiKey || !apiSecret) {
    return Response.json({ error: "Stream not configured" }, { status: 500 });
  }

  let body: StartAgentBody;
  try {
    body = (await request.json()) as StartAgentBody;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const {
    callId,
    lessonId,
    lessonTitle,
    languageId,
    goals,
    vocab,
    phrases,
    aiTeacherPrompt,
  } = body;

  if (!callId) {
    return Response.json({ error: "callId is required" }, { status: 400 });
  }

  try {
    const serverClient = new StreamClient(apiKey, apiSecret);

    // Ensure the AI teacher user exists with admin system role
    await serverClient.upsertUsers([
      { id: AI_TEACHER_USER_ID, name: "AI Teacher", role: "admin" },
    ]);

    // Pack all lesson context into the call's custom data.
    // The Python agent reads this on join to build a lesson-aware prompt.
    const call = serverClient.video.call(CALL_TYPE, callId);
    await call.getOrCreate({
      data: {
        created_by_id: AI_TEACHER_USER_ID,
        custom: {
          lessonId: lessonId ?? "",
          lessonTitle: lessonTitle ?? "",
          languageId: languageId ?? "",
          goals: JSON.stringify(goals ?? []),
          vocab: JSON.stringify(vocab ?? []),
          phrases: JSON.stringify(phrases ?? []),
          aiTeacherPrompt: aiTeacherPrompt
            ? JSON.stringify(aiTeacherPrompt)
            : "",
        },
      },
    });

    // Give ai-teacher admin call-member role so it can publish audio in audio_room
    await call.updateCallMembers({
      update_members: [{ user_id: AI_TEACHER_USER_ID, role: "admin" }],
    });

    // Transition the call from backstage → live so all members can publish audio
    await call.goLive();

    // Ask the Vision Agent HTTP server to spawn an agent into this call
    const agentRes = await fetch(
      `${agentServerUrl}/calls/${encodeURIComponent(callId)}/sessions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ call_type: CALL_TYPE }),
      }
    );

    if (!agentRes.ok) {
      const text = await agentRes.text();
      console.error("Vision agent server error:", text);
      return Response.json(
        { error: `Agent server responded with ${agentRes.status}` },
        { status: 502 }
      );
    }

    const agentData = (await agentRes.json()) as { session_id: string };
    return Response.json({ sessionId: agentData.session_id });
  } catch (err) {
    console.error("agent-start failed:", err);
    return Response.json({ error: "Failed to start agent" }, { status: 500 });
  }
}
