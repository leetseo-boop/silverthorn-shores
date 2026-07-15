import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/api/public/google-reviews")({
  server: {
    handlers: {
      GET: async () => {
        const { getGoogleReviewsPayload } = await import("@/lib/googleReviews.server");
        const payload = await getGoogleReviewsPayload();
        return new Response(JSON.stringify(payload), {
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "public, max-age=300, s-maxage=1800",
          },
        });
      },
    },
  },
});