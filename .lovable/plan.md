## Goal
Give `/pet-policy` a real photo hero and a cute pet gallery using the 7 uploaded dog photos, all optimized to WebP.

## Images
- **Hero:** the two dogs in stars-and-stripes life vests on the paddleboard with Shasta Lake and the marina behind them — widest, most scenic, most on-brand.
- **Gallery (6):** white fluffy dog by the campfire/houseboat, goldendoodle in sunglasses at sunset, sheltie-mix on the pontoon by Shasta Dam bridge, dalmatian on the dock ramp, French bulldog resting in the sun, tan Frenchie posing on the lake overlook.

## Optimization
- Convert each photo to WebP (quality ~78, hero capped at ~1920px wide, gallery at ~1000px) with `cwebp`/`sharp` in the sandbox.
- Upload via `lovable-assets` and reference the `.asset.json` pointers — no binaries added to the repo.
- Hero image gets `fetchpriority="high"` + `loading="eager"`; gallery images `loading="lazy"` with fixed aspect ratios to avoid layout shift.

## Page changes (`src/routes/pet-policy.tsx`)
1. Replace the flat gradient hero with the hero photo behind a navy gradient overlay (keeps current heading, badge, and Call/Email buttons legible; same layout on mobile).
2. Add a "Pets of Silverthorn" gallery section (2-col mobile / 3-col desktop, rounded cards, subtle hover zoom) placed after the tips/houseboating section, before the final CTA.
3. Descriptive SEO alt text on every image (breed + activity + Shasta Lake / Silverthorn context).
4. Add `og:image` / `twitter:image` with the hero's absolute CDN URL and switch `twitter:card` to `summary_large_image`.

## Verify
Typecheck the route and screenshot the page at mobile and desktop widths to confirm no overflow or layout shift.
