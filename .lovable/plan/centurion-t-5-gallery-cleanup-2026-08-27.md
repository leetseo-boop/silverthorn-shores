# Centurion T-5 Gallery Cleanup

## Goal
Remove the requested images from the Centurion T-5 small-boat detail-page gallery so only the kept photos remain in the grid.

## Current state
- The Centurion T-5 gallery lives in `src/data/silverthorn-boats.ts` as a flat `gallery` array of 8 images.
- `src/components/SilverthornBoatDetail.tsx` renders that array in a responsive grid (`grid-cols-2 md:grid-cols-3 lg:grid-cols-4`).
- At the user's current desktop viewport (4-column grid) the rows are:
  - Row 1: images 1–4 (array indices 0–3)
  - Row 2: images 5–8 (array indices 4–7)

## What to change
1. In `src/data/silverthorn-boats.ts`, edit the Centurion T-5 `gallery` array to remove:
   - Last 2 images of row 1: indices 2 and 3
   - First 3 images of row 2: indices 4, 5, and 6
   - Kept images: indices 0, 1, and 7.
2. Verify the page still builds and the gallery renders correctly.

## Files affected
- `src/data/silverthorn-boats.ts`
