## Fix the map on `/directions` and `/contact`

Both pages render the same `ResortMap` component, which currently embeds an OpenStreetMap iframe (a stopgap from when the managed Google key was blocked on `silverthornresort.com`). Now that the **SILVERTHORN custom Google Maps connection** is linked and the referrer allowlist covers `silverthornresort.com`, switch back to Google Maps for a real, branded map.

### Change
Rewrite `src/components/ResortMap.tsx` to:

1. Load the Google Maps JS API async via the browser key `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY`, using `loading=async` + `callback=initMap` + `channel=<tracking id>` per the connector rules.
2. Render an interactive `google.maps.Map` centered on the resort (`40.8419, -122.2489`), zoom ~13, with a `google.maps.Marker` at the resort location and an InfoWindow ("Silverthorn Resort — 16250 Silverthorn Rd, Lakehead, CA").
3. No `mapId`, no AdvancedMarkerElement (per connector rules).
4. Keep the existing "Open in Google Maps" pill button overlaid bottom-right, pointing at the current deep link.
5. Graceful fallback: if the browser key env var is missing at runtime, keep the current OSM iframe as a fallback so the page never renders blank.
6. Cleanup: only inject the `<script>` once per page load (guard by checking `window.google?.maps` and an existing script tag), and clean up the global `initMap` callback on unmount.

No changes to `DirectionsPage.tsx` or `routes/contact.tsx` — they already consume `<ResortMap />` and will pick up the fix automatically.

### Verification
- `bun run build` passes.
- Manually confirm on published site that the map tiles render on both `/directions` and `/contact` with a marker on the resort, and the "Open in Google Maps" button still works.

### Note
Since crawlers already cached the old preview, no metadata changes are needed — this is a purely runtime fix.