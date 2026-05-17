## 1. Redesign the Cabins + Small Boats cards

Current cards squeeze each photo into a fixed 128 px-tall strip, so guests barely see the cabin or the boat. Replace with a bolder, image-first layout.

**File:** `src/components/SilverthornHomePage.tsx` (lines ~530–599)

New design — "image-led showcase cards":

- 2-up grid on desktop (1-up on mobile), `gap-6`.
- Each card uses an `aspect-[4/3]` image area (was `h-32` ≈ 1.5× taller, full bleed, `object-cover`, `object-center`).
- Image sits inside a `rounded-2xl` card with a soft inner shadow ring; on hover the image scales `1.04` over 500 ms (no card translate).
- Category chip ("Cabins" / "Day Boats") floats top-left over the image with a translucent dark backdrop (`bg-black/55 backdrop-blur`).
- A gradient scrim (`from-black/70 via-black/20 to-transparent`) covers the bottom third of the image and holds the title + one-liner in white, so the photo is the frame — not a separate text block stacked below.
- Below the image: a slim white footer band with the two CTAs (primary orange "View Cabins" / "Rent a Boat" + secondary "Learn more →") so the action area stays scannable without stealing space from the photo.
- Keep existing copy, links, BOOKING_URL, and the orange/blue tokens already in use. No new colors.
- Both `<img>` get `loading="lazy"`, `decoding="async"`, explicit `width`/`height` to prevent CLS.

## 2. Optimize home page load speed

Biggest wins, in order of impact:

**a) Shrink the fleet card photos (largest payload by far).**
Currently the homepage loads 4 full-resolution JPGs from `/public/images/`:
- queen-i-…-01.jpg — **2.7 MB**
- senator-…-running-shasta-lake.jpg — **2.2 MB**
- queen-…-exterior-lifestyle…jpg — **824 KB**
- queen-ii-…-exterior.jpg — **506 KB**

These render at ~600 px wide on desktop and ~400 px on mobile. Generate resized `.webp` variants (max 1200 px wide, quality 80) into `src/assets/` and import them, replacing the `/images/...` strings in the `FLEET` array. Expected drop: ~6 MB → ~400 KB total for the fleet row.

Use `sharp` via a one-off `code--exec` script (no new runtime deps): read each source, resize, write to `src/assets/fleet-<id>.webp`.

**b) Mark the LCP image as high-priority and preload it.**
The hero marina image (`home-hero-marina.webp`, 510 KB) is the LCP. On its `<img>` add `fetchpriority="high"` and `loading="eager"` (already in markup? — verify). Then in `src/routes/index.tsx`'s `head()` add `links: [{ rel: "preload", as: "image", href: heroMarina, fetchpriority: "high" }]`.

**c) Lazy-load everything below the fold.**
Audit the 7 other `<img>` tags in `SilverthornHomePage.tsx` (lines 170, 356, 441, 537, 571, 643, 780). Each must have `loading="lazy"` and `decoding="async"`. Add `width`/`height` attributes to all `<img>` to reserve space and eliminate layout shift.

**d) Slim the existing home WebPs.**
Re-encode `home-hero-marina.webp` (510 KB), `home-cabin.webp` (379 KB), `home-small-boats.webp` (226 KB) to max 1600 / 900 / 900 px wide at quality 78. Target: <180 KB each.

**e) Remove unused state.**
`useRef` is imported on line 11 but only `useState` is used by the nav dropdown. Drop the unused import (micro, but free).

### Out of scope

- No layout changes anywhere else on the homepage.
- No new images, no copy changes, no nav/footer edits.
- No build-tool changes (vite-imagetools, etc.) — single-shot sharp script only.
- No interior pages (`/cabins`, `/small-boats`) touched.

### Technical notes

- Sharp script writes to `src/assets/`, then we update imports in `SilverthornHomePage.tsx` only. Original files in `public/images/` stay (other pages still use them at full size).
- After replacing card markup, verify viewport at 1067 px (current preview) — the 2-up grid should look balanced; mobile <640 px stacks 1-up.
- Verify with `browser--performance_profile` after the change: target LCP < 2.5 s and total page weight < 1.5 MB on the homepage.
