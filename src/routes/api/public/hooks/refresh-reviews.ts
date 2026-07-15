import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/hooks/refresh-reviews")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Simple bearer-key check: pg_cron sends the Supabase publishable key in `apikey`.
        const provided = request.headers.get("apikey") ?? request.headers.get("x-api-key");
        const expected = process.env.SUPABASE_PUBLISHABLE_KEY;
        if (!provided || !expected || provided !== expected) {
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
          const message = err instanceof Error ? err.message : String(err);
          console.error("[refresh-reviews] failed:", message);
          return new Response(JSON.stringify({ ok: false, error: message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }
      },
      // Allow manual GET (with apikey) for browser-based debugging.
      GET: async ({ request }) => {
        const provided = request.headers.get("apikey") ?? new URL(request.url).searchParams.get("apikey");
        const expected = process.env.SUPABASE_PUBLISHABLE_KEY;
        if (!provided || !expected || provided !== expected) {
          return new Response("Unauthorized", { status: 401 });
        }
        const { refreshGoogleReviews } = await import("@/lib/googleReviews.server");
        const payload = await refreshGoogleReviews();
        return new Response(JSON.stringify({ ok: true, count: payload.reviews.length }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
