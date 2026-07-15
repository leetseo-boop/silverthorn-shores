
## Live Google Reviews Carousel

Pull Silverthorn's Google reviews via the Google Maps Platform (Places API) connector, filter to 4★+, cache hourly, and display in a rotating carousel on the homepage.

### What I need from you (only 2 things)

1. **Click "Connect" when I trigger the Google Maps Platform connector** — Lovable handles the API key for you; no Google Cloud console setup needed on your end.
2. **Your Google Place ID for Silverthorn Resort** — I'll look it up from "Silverthorn Resort, Lakehead, CA" and confirm before saving, but if you already have it handy, paste it. (Looks like `ChIJ...`)

That's it. No OAuth, no billing setup on your side, no Business Profile API approval.

### What I'll build

1. **Connect Google Maps Platform** via `standard_connectors--connect` (gateway-managed key).
2. **Server function** `getGoogleReviews` (`createServerFn`) that:
   - Calls Places API `place/details` for your Place ID, `fields=reviews,rating,user_ratings_total`.
   - Filters `rating >= 4`.
   - Returns author name, photo, rating, relative time, text, profile URL.
3. **Cache table** `google_reviews_cache` (Lovable Cloud) so we don't hit Places API on every page load — one row keyed by place_id, updated hourly.
4. **Scheduled refresh** via pg_cron hitting `/api/public/hooks/refresh-reviews` every hour. Any new 4★+ review appears automatically on next refresh.
5. **Carousel UI** on the homepage (`SilverthornHomePage.tsx`) replacing/augmenting the current static Guest Reviews block:
   - Auto-rotating (pause on hover), swipeable on mobile, 1 card mobile / 2-3 desktop.
   - Star row, quote, author + photo, "Read on Google" link.
   - Aggregate rating badge (e.g. "4.8 ★ · 240 Google reviews") + "See all reviews" link to your Google listing.
6. **JSON-LD `AggregateRating`** for SEO — richer Google snippets.
7. **Fallback**: if the API errors or returns nothing, show the current static reviews so the section never breaks.

### Notes on limits (be upfront)

- Google Places API returns **up to 5 reviews per request** — this is Google's cap, not ours. That's exactly what you asked for ("last 4 or 5"), so it's a perfect fit.
- "Live" = refreshed every hour. Real-time (sub-minute) isn't possible with Places API and would burn API quota.
- Cost: Places Details calls run ~$17 per 1000 requests; hourly refresh = ~720/month = negligible (Google gives $200/mo credit).

### Technical files (for the record)

- `src/lib/googleReviews.functions.ts` — server fn to fetch/cache
- `src/routes/api/public/hooks/refresh-reviews.ts` — cron endpoint
- `src/components/GoogleReviewsCarousel.tsx` — UI
- Migration: `google_reviews_cache` table + pg_cron job
- Edit: `SilverthornHomePage.tsx` (swap in carousel), homepage `head()` (add AggregateRating JSON-LD)

Reply "go" and I'll switch to build mode, kick off the connector prompt, and ask you for the Place ID.
