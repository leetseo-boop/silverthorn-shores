# Add Two New Images to Centurion T-5 Gallery

## Goal
Upload the two supplied Centurion T-5 photos to the Lovable Assets CDN and append them to the Centurion T-5 gallery in `src/data/silverthorn-boats.ts` with descriptive SEO alt text.

## Current state
- The Centurion T-5 `gallery` array in `src/data/silverthorn-boats.ts` currently contains 3 images (indices 0–2) after the recent cleanup.
- The two uploaded screenshots show the same Centurion T-5 wakeboard boat on Shasta Lake:
  1. Rear-quarter view with wake and forested shoreline.
  2. Wide aerial/distance view showing the boat at speed on open water.

## What to change
1. Upload both uploaded images via `lovable-assets create` from `/mnt/user-uploads/` to CDN, writing `.asset.json` pointers under `src/assets/centurion-t5-gallery/`.
2. In `src/data/silverthorn-boats.ts`, append two new gallery entries to the Centurion T-5 `gallery` array using the CDN URLs and SEO-friendly alt text such as:
   - "Centurion T-5 wakeboard boat cruising on Shasta Lake with forested mountain shoreline at Silverthorn Resort"
   - "Centurion T-5 wakeboard boat speeding across open water on Shasta Lake viewed from above at Silverthorn Resort"
3. Run typecheck/build and verify `/small-boats/centurion-t5` renders the expanded gallery.

## Files affected
- `src/data/silverthorn-boats.ts`
- New asset pointer files under `src/assets/centurion-t5-gallery/`
