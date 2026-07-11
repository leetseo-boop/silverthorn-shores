## Problem

The Lovable-managed Google Maps key is referrer-restricted to `*.lovable.app` / `*.lovableproject.com`. On the live custom domain `silverthornresort.com`, both the Embed API and Maps JavaScript API get rejected, leaving the map blank.

## Fix (Option A — zero setup)

Replace the Google Maps embed with an OpenStreetMap iframe. No API key, no referrer restrictions, works instantly on any domain.

### Steps

1. Rewrite `src/components/ResortMap.tsx`:
   - Remove all Google Maps JS loading logic.
   - Render an `<iframe>` pointing to `https://www.openstreetmap.org/export/embed.html` centered on the resort coords (`40.8419, -122.2489`) with a marker.
   - Keep the same `className` prop so the container styling on `/directions` and `/contact` stays identical (no layout shift).
   - Keep the "Open in Google Maps" fallback button below/over the map linking to the existing `MAPS_DEEP_LINK` so users can still get turn-by-turn directions in their preferred app.
   - Add `title`, `loading="lazy"`, and proper `aria-label` for a11y/SEO.

2. No changes to `DirectionsPage.tsx` or `contact.tsx` — they already consume `<ResortMap />`.

3. Verify with Playwright on the live domain after publish: load `/directions` and `/contact`, screenshot, confirm the OSM tiles render with the marker visible.

### Notes

- OSM embed has no usage limits or billing concerns.
- Look/feel is clean and neutral; fits the resort's minimal aesthetic.
- If later you want branded Google Maps back, we can do Option B (custom GCP key with `silverthornresort.com` in the referrer allowlist).
