## Add prev/next arrows to the Google Reviews carousel

Update `src/components/GoogleReviewsCarousel.tsx`:

1. Add `prev()` / `next()` handlers that shift `index` with wrap-around.
2. Render circular arrow buttons (◀ ▶) using the site's palette (`#E8640A` bg, white icon, subtle shadow, hover darken).
3. **Mobile**: overlay arrows on the left/right edges of the single review card, vertically centered, sized ~40px, with proper `aria-label` ("Previous review" / "Next review"). Keep the dot indicators below.
4. **Desktop**: place arrows flanking the 3-card grid (absolute-positioned outside the grid at left/right, vertically centered), ~44px. Keep the dot indicators below.
5. Arrow clicks also reset the auto-rotate pause briefly (via existing `paused` ref pattern — pause on hover already covers desktop; arrows themselves don't need extra logic beyond advancing index).
6. Keep everything keyboard-accessible (native `<button>`, focus ring via existing styles).

No changes to data fetching, JSON-LD, or any other file.

### Note on the "JSON-LD schema markup" line
Your message includes a line about JSON-LD for the reviews carousel, but the follow-up ("ADD ARROWS...") is the actual request. I'll only add arrows. If you also want me to emit `AggregateRating` + `Review` JSON-LD on the homepage, say the word and I'll do it as a separate step.