## Plan

Make two small edits to the Google Reviews carousel on the homepage:

1. **Display rating as 4** — change the aggregate rating header in `src/components/GoogleReviewsCarousel.tsx` so it always shows `4.0` instead of the live Google rating, while keeping the live 4★+ review cards.
2. **Remove the Google reviews link** — delete the "Read all reviews on Google →" anchor and the unused `GOOGLE_PLACE_URL` constant.

No other homepage or review behavior changes.