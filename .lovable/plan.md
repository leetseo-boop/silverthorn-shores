## Goal

Make every page — home, houseboat fleet, individual houseboats (Queen, Queen I, Queen II, Senator), cabins, small boats + each boat detail, Shasta Lake pages, planning, pro-shop, policies, guest info, employment, contact, directions, history, FAQ — load noticeably faster on mobile and desktop, without changing any content or design.

## What the audit found

Bundle side is healthy (main chunk 756 KB, route chunks 5–31 KB). The real weight is images:

- `dist/client/images/silverthorn/` (small-boat galleries) = **16 MB**
- `dist/client/images/small-boats/` = 2.1 MB
- Houseboat detail galleries: many photos **200–500 KB each** (Queen I, Queen II, Senator galleries alone have dozens of >200 KB files, several 400–515 KB)
- Total shipped images ~30 MB

Secondary issues:
- No `width`/`height` on gallery `<img>` tags → layout shift + late decode
- Hero images preload correctly on most routes, but not all `<img>` heroes set `fetchpriority="high"`, `loading="eager"`, and `decoding="async"` consistently
- No responsive `srcset` anywhere — mobile devices download desktop-sized files
- Two lightbox `<img>` in `HouseboatDetail` / `SilverthornBoatDetail` never set `decoding` — minor, but included in the sweep

## Plan

### 1. Re-encode oversized WebPs (biggest win)

Batch-recompress every image over 150 KB in `public/images/**` in place with `cwebp -q 78 -m 6 -resize 1600 0` (cap long edge at 1600 px, keep aspect ratio, quality 78 — visually identical, ~40–60% smaller). Skip anything already under 150 KB and skip floor-plan diagrams (small already). Expected result: total image payload drops from ~30 MB to ~10–12 MB, individual gallery photos land in the 60–150 KB range.

### 2. Hero LCP polish (every route)

For each route's above-the-fold hero `<img>`:
- add `fetchpriority="high"`, `loading="eager"`, `decoding="async"`
- add explicit `width` and `height` (prevents CLS)
- keep the existing `head().links` preload entry

Routes touched: `index`, `houseboats.index`, `houseboats.queen`, `houseboats.queen-i`, `houseboats.queen-ii`, `houseboats.senator`, `cabins`, `small-boats`, `small-boats_.$slug`, `shasta-lake`, `exploring-shasta-lake`, `planning`, `pro-shop`, `houseboats.policy`, `cabins_.policy`, `about.history`, `directions`, `contact`, `faq`, `guest-info`, `employment`.

### 3. Below-the-fold images

Verify every `<img>` outside the first viewport has `loading="lazy"` and `decoding="async"`. Add the two missing ones in `HouseboatDetail.tsx` (line 32) and `SilverthornBoatDetail.tsx` (line 290) lightbox images (`decoding="async"` — lightbox images shouldn't block anything).

### 4. Nav link preloading

TanStack `<Link>` already preloads on intent by default in this project. Confirm `defaultPreload: "intent"` is set in `src/router.tsx`; if not, enable it so hovering a nav item warms the next route's chunk.

### 5. Verify

Run `bun run build` after changes and compare:
- `du -sh dist/client/images` before vs after
- `du -k dist/client/assets/*.js` (should be unchanged)

Report the before/after image totals to you.

## What I will NOT do

- No design changes, no content rewrites, no route restructures
- No new dependencies (`sharp`, `vite-imagetools`, image CDN) — the in-place `cwebp` pass is enough and reversible
- No responsive `srcset` rollout in this pass — it would touch every `<img>` and risk visual regressions; if the mobile numbers still aren't good after step 1, we can do a targeted second pass on the hero images only
- No changes to `.asset.json` CDN files (already optimized on the CDN side)
