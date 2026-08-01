import { createFileRoute } from "@tanstack/react-router";
import { fetchLakeLevel, fetchWeather, pstDay } from "@/lib/thorn/conditions.server";
import { getAdmin } from "@/lib/thorn/runtime.server";

/**
 * Nightly conditions refresh (00:00 PST via pg_cron).
 * Stores today's Shasta Lake forecast and reservoir level so Thorn can answer
 * "what's the weather today" without a live call per chat message.
 */
export const Route = createFileRoute("/api/public/hooks/thorn-conditions")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env["REVIEWS_REFRESH_SECRET"];
        const token = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
        if (!secret || token !== secret) {
          return new Response("Unauthorized", { status: 401 });
        }

        const [weather, lake] = await Promise.all([
          fetchWeather().catch((e) => {
            console.error("[thorn-conditions] weather failed", e.message);
            return {};
          }),
          fetchLakeLevel().catch((e) => {
            console.error("[thorn-conditions] lake level failed", e.message);
            return { debug: e.message };
          }),
        ]);

        const admin = await getAdmin();
        const { error } = await admin.from("thorn_daily_conditions").upsert(
          { day: pstDay(), weather, lake, fetched_at: new Date().toISOString() },
          { onConflict: "day" },
        );

        if (error) {
          console.error("[thorn-conditions] write failed", error.message);
          return new Response(JSON.stringify({ ok: false, error: error.message }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
        }

        return new Response(JSON.stringify({ ok: true, day: pstDay(), weather, lake }), {
          headers: { "Content-Type": "application/json" },
        });
      },
    },
  },
});
