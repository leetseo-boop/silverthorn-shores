## Changes

### 1. Replace the resort map image
- Copy the newly uploaded `user-uploads://official_silverthorn_cartoon_map_shasta_lake-2.png` over `src/assets/silverthorn-resort-map.png` (same import path → no code change needed in `cabins.tsx`).
- Optimize with ImageMagick to ~250 KB at 1920px wide, keeping PNG (map has flat colors + text).

### 2. Better-balanced cabin cards
The current cards drift out of alignment because description length, beds/highlights line count, and presence of badges/price block vary per cabin. Fix by enforcing consistent vertical rhythm so every card has the same image frame, the same content height, and a footer pinned to the bottom.

Edits in `src/routes/cabins.tsx` `CabinCard`:
- **Image frame**: switch from `aspect-[4/3]` to `aspect-[3/2]` for a wider, more lodging-brochure feel, and add `object-center` so cropping is consistent.
- **Content column**: add `min-h-0` and use `flex-1` more strictly so the description area absorbs slack. Clamp the description to 3 lines with `line-clamp-3` so taller copy (Cabin 8) doesn't push the price/CTA down relative to shorter cards (Cabin 5).
- **Beds + highlights list**: give it a fixed `min-h` so 1-line vs 2-line wraps don't shift the price block.
- **Price block**: always rendered with a fixed height; for the unavailable C6 card, render a muted placeholder strip instead of nothing, so the CTA aligns with neighbors.
- **CTA footer**: wrap in `mt-auto` (already partially there) and standardize border-top spacing so all "Book Cabin #N" buttons sit on the same baseline across a row.
- **Grid gap**: bump from `gap-6` to `gap-6 lg:gap-8` and add `items-stretch` so the cards fill their row evenly.

No data, routing, SEO, or booking-link behavior changes.

## Files touched
- `src/assets/silverthorn-resort-map.png` (replaced)
- `src/routes/cabins.tsx` (CabinCard + cards grid container only)
