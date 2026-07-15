import { createServerFn } from "@tanstack/react-start";
import type { ReviewsPayload } from "./googleReviews.types";

// Public read: server function that returns cached reviews (fast, always safe for SSR).
export const getGoogleReviews = createServerFn({ method: "GET" }).handler(async (): Promise<ReviewsPayload> => {
  const { getGoogleReviewsPayload } = await import("./googleReviews.server");
  return getGoogleReviewsPayload();
});
