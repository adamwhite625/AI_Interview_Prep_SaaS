import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const session = await auth();
  const token = await session.getToken();

  if (!token) {
    return new Response("Unauthorized", { status: 401 });
  }

  const body = await req.text();

  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const res = await fetch(`${API_URL}/api/interview`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      Accept: "text/event-stream",
    },
    body,
  });

  // 🔴 If backend failed, forward error clearly
  if (!res.ok || !res.body) {
    const errorText = await res.text();
    return new Response(errorText || "Upstream error", {
      status: res.status,
    });
  }

  // ✅ Pipe SSE stream directly
  const reader = res.body.getReader();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          controller.enqueue(value);
        }
      } catch (err) {
        controller.error(err);
      } finally {
        controller.close();
        reader.releaseLock();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
