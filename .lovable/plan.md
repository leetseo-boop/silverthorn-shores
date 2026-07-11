## Problem

The map on `/directions` and `/contact` still shows "This content is blocked." The Google Maps **Embed API** requires the API key to have the *Maps Embed API* enabled, but the Lovable-managed browser key is only authorized for the **Maps JavaScript API** and **Places API (New)** (per the connector knowledge). So `maps/embed/v1/place?key=...` gets rejected — no iframe fallback will fix this.

## Fix

Stop using the Embed API iframe. Render a real interactive map with the **Maps JavaScript API**, which the browser key *is* authorized for.

### Steps

1. Create `src/components/ResortMap.tsx`:
   - Loads the Maps JS script once (async, with `callback=initMap`, `channel=<tracking id>`, using `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY`).
   - Renders a `<div>` container, instantiates `new google.maps.Map` centered on the resort's coordinates (approx `40.7466, -122.3260` — Silverthorn Rd, Lakehead), zoom ~13.
   - Adds a `google.maps.Marker` with the resort title.
   - No `mapId` (per knowledge), no `AdvancedMarkerElement`.
   - Handles script-already-loaded case (only inject once across the app).
   - Fallback UI: if the key is missing or the script fails, show a styled card with "Open in Google Maps" button linking to the existing `MAPS_DEEP_LINK`.

2. Swap the iframe in `src/components/DirectionsPage.tsx` for `<ResortMap />` inside the same rounded/bordered container (keep the aspect ratio classes).

3. Swap the iframe in `src/routes/contact.tsx` the same way.

4. Verify with Playwright after publish: load `/directions`, screenshot, confirm the map tiles render and the marker is visible with no "content is blocked" message.

### Notes

- No key/permission changes needed — Maps JS is already authorized.
- No layout changes; container styles stay identical so nothing else on the page shifts.
