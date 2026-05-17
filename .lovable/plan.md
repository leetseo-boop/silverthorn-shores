## Goal
Replace the image shown on the laptop screen in `src/assets/rental-policy-hero.jpg` with the newly uploaded Silverthorn houseboat photo (`user-uploads://silvernow.JPG`). Everything else in the hero (desk, coffee mug, printer, framed wall photo, rental policy paper, notebook, oar, plant, lighting, shadows) stays identical.

## Steps

1. Copy the uploaded image to a temp working path:
   - `user-uploads://silvernow.JPG` → `src/assets/_tmp-hero-laptop.jpg`

2. Call `imagegen--edit_image` with both images as input:
   - Inputs: current hero (`src/assets/rental-policy-hero.jpg`) + temp laptop photo
   - Prompt: replace ONLY the content displayed on the laptop screen with the houseboat-on-Shasta-Lake photo, fitted naturally to the screen with realistic perspective, screen glare, and reflections. Keep every other pixel (desk, coffee mug labeled "Shasta", printer, framed wall art, rental policy paper, notebook, oar, plant, gradient lighting, depth of field) unchanged.
   - Output: overwrite `src/assets/rental-policy-hero.jpg`
   - Aspect ratio: `3:2` (matches current hero)

3. After re-encoding, optimize the result back to ≤ ~250 KB JPEG at 1600px wide using ImageMagick (same settings as the previous optimization pass: q82, progressive, 4:2:0, stripped metadata) so we don't regress the LCP work just shipped.

4. Delete the temp file `src/assets/_tmp-hero-laptop.jpg`.

## Out of scope
- No code or layout changes — the route already imports `rental-policy-hero.jpg`.
- The framed wall photo stays as-is (only the laptop screen changes).
