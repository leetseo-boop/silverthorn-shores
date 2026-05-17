## Changes

### 1. Wire the uploaded photo into Cabin #6
- Copy `user-uploads://fd0ff456-6479-41ba-846d-d03acfa4f076.jfif` to `src/assets/_tmp-cabin-6.jfif`.
- Optimize via ImageMagick to `src/assets/cabin-6.jpg` (1600px wide, ~100–150 KB JPEG, stripped metadata).
- In `src/routes/cabins.tsx`:
  - Add `import cabin6Img from "@/assets/cabin-6.jpg"`.
  - On the C6 entry in `CABINS`, set `image: cabin6Img` and a descriptive `imageAlt` (dusk view of Shasta Lake from the cabins with pines and the marina/houseboats below).
  - Keep `unavailable: true` so the card stays in the unavailable visual state.

### 2. Bigger "Currently unavailable" overlay across the image
Currently it's a small pill in the top-right corner of the image slot. Replace it with a large diagonal banner across the whole image so it's unmistakable.

In `CabinCard` (the `unavailable` branch of the image overlay):
- Remove the small top-right "Currently unavailable" pill.
- Add a full-image overlay layer: a semi-transparent dark wash (`bg-black/45`) covering the image, plus a rotated banner (`-rotate-12`) stretched edge-to-edge with bold uppercase text "CURRENTLY UNAVAILABLE" in white on a `bg-destructive/90` strip, large (`text-xl sm:text-2xl`), letter-spaced, with ring/shadow for legibility.
- Keep the existing `grayscale` class on the image container so the photo reads as inactive.
- The C6 pin badge (top-left) stays.

No changes to other cards, data, routing, or SEO.

## Files touched
- `src/assets/cabin-6.jpg` (new)
- `src/routes/cabins.tsx` (import + C6 entry + CabinCard unavailable overlay)
