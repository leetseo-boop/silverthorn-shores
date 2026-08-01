import { createFileRoute } from "@tanstack/react-router";

function isAuthorized(request: Request): boolean {
  const expected = process.env.REVIEWS_REFRESH_SECRET;
  if (!expected) return false;

  const auth = request.headers.get("authorization");
  const bearer = auth?.toLowerCase().startsWith("bearer ") ? auth.slice(7) : null;
  const provided = bearer ?? request.headers.get("x-refresh-secret");
  if (!provided || provided.length !== expected.length) return false;

  // constant-ish time compare
  let diff = 0;
  for (let i = 0; i < expected.length; i++) diff |= provided.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

export const Route = createFileRoute("/api/public/hooks/refresh-reviews")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        if (!isAuthorized(request)) {
          return new Response(JSON.stringify({ error: "Unauthorized" }), {
            status: 401,
            headers: { "Content-Type": "application/json" },
          });
        }

        try {
          const { refreshGoogleReviews } = await import("@/lib/googleReviews.server");
          const payload = await refreshGoogleReviews();
          return new Response(
            JSON.stringify({
              ok: true,
              count: payload.reviews.length,
              rating: payload.rating,
              totalReviews: payload.totalReviews,
            }),
            { headers: { "Content-Type": "application/json" } },
          );
        } catch (err) {
          console.error("[refresh-reviews] failed:", err instanceof Error ? err.message : String(err));
          return new Response(JSON.stringify({ ok: false, error: "Refresh failed" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
    },
  },
});
