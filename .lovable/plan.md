## Changes to /about/history

**1. New hero image**
- Copy `user-uploads://svrmarina.jfif` → `src/assets/history/silverthorn-marina-shasta-lake-hero.jpg`
- Swap `HistoryPage.tsx` hero `<img>` from `shasta-dam-aerial-lake-shasta.webp` to the new marina image
- Update alt text to describe the Silverthorn Resort Marina Market with houseboats and ski boats on Shasta Lake
- Update `about.history.tsx` `og:image`, `twitter:image`, JSON-LD `image`, and the `<link rel="preload">` to point at the new hero
- Keep the old dam aerial available — move it into the gallery (replacing one of the construction shots) so the photo isn't lost

**2. Gallery caption fix**
- In `HistoryPage.tsx` gallery array, change the ruins entry:
  - caption: `"Original Silverthorn foundations, exposed at low water"` → `"Shasta Dam foundation, exposed at low water"`
  - alt: update to "Exposed concrete foundation near Shasta Dam along the Shasta Lake shoreline at low water"

**3. Queen + cabins links**
- Already present in the "Becoming a premier Shasta Lake resort" section (`/houseboats/queen` and `/cabins`). No change needed — will verify they render as orange underlined links.

**Out of scope:** no copy rewrites, no layout changes, no SEO restructuring.
