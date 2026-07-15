export const SILVERTHORN_PLACE_ID = "ChIJk20Lw4qG0lQR2YhZYOKwFKE";

export type GoogleReview = {
  author: string;
  authorUrl: string | null;
  authorPhoto: string | null;
  rating: number;
  relativeTime: string;
  text: string;
  publishTime: string;
  googleMapsUri: string | null;
};

export type ReviewsPayload = {
  reviews: GoogleReview[];
  rating: number | null;
  totalReviews: number | null;
  placeId: string;
};