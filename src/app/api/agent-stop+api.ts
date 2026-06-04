interface StopAgentBody {
  callId: string;
  sessionId: string;
}

export async function POST(request: Request) {
  const agentServerUrl =
    process.env.AGENT_SERVER_URL ?? "http://localhost:8000";

  let body: StopAgentBody;
  try {
    body = (await request.json()) as StopAgentBody;
  } catch {
    return Response.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { callId, sessionId } = body;
  if (!callId || !sessionId) {
    return Response.json(
      { error: "callId and sessionId are required" },
      { status: 400 }
    );
  }

  try {
    const url = `${agentServerUrl}/calls/${encodeURIComponent(callId)}/sessions/${encodeURIComponent(sessionId)}`;
    const agentRes = await fetch(url, { method: "DELETE" });

    // 404 means the session already ended naturally — that's fine
    if (!agentRes.ok && agentRes.status !== 404) {
      const text = await agentRes.text();
      console.error("Vision agent stop error:", text);
      return Response.json(
        { error: `Agent server responded with ${agentRes.status}` },
        { status: 502 }
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("agent-stop failed:", err);
    return Response.json({ error: "Failed to stop agent" }, { status: 500 });
  }
}
