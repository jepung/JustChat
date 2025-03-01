
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { StreamChat } from "npm:stream-chat";


Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Only POST requests allowed" }), { status: 405 });
  }

  const body = await req.json();
  const { userId } = body;

  if (!userId) {
    return new Response(JSON.stringify({ error: "userId is required" }), { status: 400 });
  }

  const apiKey = Deno.env.get("STREAM_API_KEY")!;
  const apiSecret = Deno.env.get("STREAM_CHAT_SECRET")!;

  if (!apiKey || !apiSecret) {
    return new Response(JSON.stringify({ error: "Missing Stream credentials", apiKey, apiSecret }), { status: 500 });
  }

  const serverClient = StreamChat.getInstance(apiKey, apiSecret);
  const token = serverClient.createToken(userId);

  return new Response(JSON.stringify({ token }), { status: 200, headers: { "Content-Type": "application/json" } });
});