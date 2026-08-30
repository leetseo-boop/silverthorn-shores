# Refresh Google Reviews: 5-star only, last 3 months

## What changes

The homepage reviews carousel currently shows 5-star Google reviews published within the last 5 months. It will be narrowed to the last 3 months, and the cached review data will be re-synced from the Silverthorn Resort Google business listing so the newest reviews appear right away.

## Steps

1. In the reviews server module, change the age window from 5 months to 3 months (`MAX_AGE_MS`). The 5-star-only filter and newest-first sorting stay as-is.
2. Trigger a live sync of the review cache from Google so the carousel picks up the latest reviews immediately (via the existing secured refresh endpoint).
3. Verify the carousel on the homepage: only 5-star reviews, none older than 3 months, newest first.

## Notes

- If no 5-star review from the past 3 months exists at sync time, the carousel falls back to the built-in placeholder testimonials rather than showing an empty section. Say the word if you'd prefer an empty/hidden section instead.
- The aggregate rating badge (4.0) and total review count behavior are unchanged.

## Technical detail

- `src/lib/googleReviews.server.ts`: `MAX_AGE_MS` → `3 * 30 * 24 * 60 * 60 * 1000`. Filter applies both to cached rows and freshly fetched Google payloads, so the API route `/api/public/google-reviews` and the carousel both respect it.
