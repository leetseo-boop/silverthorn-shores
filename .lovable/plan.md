# Fix the broken map embed

## Problem
The map iframe on `/directions` (and `/contact`) uses the legacy unauthenticated URL:

```
https://www.google.com/maps?q=...&output=embed
```

Google now rejects this and renders: **"The Google Maps Embed API must be used in an iframe."** — so the map area shows a blank/error frame.

## Fix
Switch both iframes to the official **Google Maps Embed API v1**, which is authorized on the Lovable-managed Google Maps browser key already available in this project as `VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY`.

New embed URL shape:

```
https://www.google.com/maps/embed/v1/place
  ?key={VITE_LOVABLE_CONNECTOR_GOOGLE_MAPS_BROWSER_KEY}
  &q=Silverthorn+Resort,16250+Silverthorn+Road,Redding,CA+96003
```

## Files to edit
1. `src/components/DirectionsPage.tsx` — replace `MAP_EMBED` constant with the Embed API v1 URL built from the env var.
2. `src/routes/contact.tsx` — same fix on its iframe `src`.

## Notes
- The browser key is referrer-restricted to `*.lovable.app` and `silverthornresort.com`, so it works on both preview and production.
- No new deps, no connector wiring changes — the key env var is already present.
- "Open in Google Maps" / "Get Directions" buttons stay unchanged (they use the public deep link).
