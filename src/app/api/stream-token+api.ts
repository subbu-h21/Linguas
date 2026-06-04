import { StreamClient } from "@stream-io/node-sdk";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const userId = url.searchParams.get("userId");
  const userName = url.searchParams.get("userName") ?? userId ?? "user";
  const userImage = url.searchParams.get("userImage");

  if (!userId) {
    return Response.json({ error: "userId is required" }, { status: 400 });
  }

  const apiKey = process.env.STREAM_API_KEY;
  const apiSecret = process.env.STREAM_API_SECRET;

  if (!apiKey || !apiSecret) {
    return Response.json({ error: "Stream not configured" }, { status: 500 });
  }

  try {
    const serverClient = new StreamClient(apiKey, apiSecret);

    // Upsert the user so their display name and avatar are up to date on Stream
    await serverClient.upsertUsers([
      {
        id: userId,
        name: userName,
        ...(userImage ? { image: userImage } : {}),
      },
    ]);

    // Generate a 4-hour token; the SDK refreshes automatically via tokenProvider
    const token = serverClient.generateUserToken({
      user_id: userId,
      validity_in_seconds: 60 * 60 * 4,
    });

    return Response.json({ token, apiKey });
  } catch (err) {
    console.error("Stream token generation failed:", err);
    return Response.json({ error: "Failed to generate token" }, { status: 500 });
  }
}
