Edit the rental policy hero image to swap two embedded scenes while keeping the rest of the composition (desk, printer, coffee, paper, oar, plant, mug) identical.

## Steps
1. Copy the two uploaded images into the project so they're addressable by path:
   - `user-uploads://672615599_1403441485161098_483838650387925477_n.jpg` → `src/assets/_tmp-hero-laptop.jpg` (lake + pontoon boat)
   - `user-uploads://queengroup-proshop-2.jfif` → `src/assets/_tmp-hero-wall.jpg` (group floating on the lake)
2. Call `imagegen--edit_image` with all three images as inputs:
   - existing `src/assets/rental-policy-hero.jpg`
   - the two temp images
   - prompt: replace the content shown on the laptop screen with the lake/pontoon photo, replace the framed photo on the wall (currently a houseboat image) with the group-floating photo, keep everything else (desk, printer, coffee mug, paper, oar, plant, lighting, framing, shadows) exactly the same.
   - target: overwrite `src/assets/rental-policy-hero.jpg`
   - aspect ratio `3:2` (matches current 1536×1024)
3. Delete the two temp asset files (`src/assets/_tmp-hero-laptop.jpg`, `src/assets/_tmp-hero-wall.jpg`).

No code changes — the route already imports `rental-policy-hero.jpg`.