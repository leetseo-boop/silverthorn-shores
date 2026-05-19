## Mobile polish pass — entire site + history gallery

### Method
Switch preview to mobile (375px) and screenshot every public route. For each, fix the framing issues I find — won't change layout philosophy, only tighten what breaks on small screens.

### Routes to audit & fix
`/`, `/about/history`, `/houseboats`, `/houseboats/queen`, `/houseboats/queen-i`, `/houseboats/queen-ii`, `/houseboats/senator`, `/cabins`, `/small-boats`, `/small-boats/<slug>` (1 sample), `/directions`, `/contact`, `/faq`, `/pro-shop`, plus policy pages.

### Standard fixes I will apply where needed
- **Hero heights**: cap mobile hero at ~`60vh` max so the headline + CTA fit above the fold without scrolling endlessly.
- **Headline scaling**: ensure `text-4xl`/`text-5xl` headlines step down to `text-2xl`/`text-3xl` on mobile; reduce letter-spacing where it overflows.
- **Container padding**: standardize horizontal padding to `px-5` on mobile (currently mixed `px-6`/`px-4`).
- **Image framing**: enforce consistent aspect ratios (`aspect-[4/3]` or `aspect-square`) with `object-cover` so cards line up; no orphan portrait/landscape mixing in the same grid.
- **Buttons**: full-width on mobile where they're side-by-side now and wrapping awkwardly; min height 44px for tap targets.
- **Stat blocks / dl grids**: 2-column on mobile (not 4) where the current layout squeezes numbers.
- **Stacked cards**: ensure `gap-4` minimum between cards; no horizontal overflow.
- **Sticky elements**: verify `md:sticky` isn't accidentally active on mobile and pushing layout.
- **Footer / nav**: confirm mobile menu, no overflowing links, logo not clipped.

### /about/history gallery — specific change
- Switch each gallery card from `aspect-[4/3]` to **`aspect-square` (1:1)** with `object-cover`.
- Mobile: keep single column (already), tighten gap to `gap-4`.
- Tablet `sm:`: 2 columns. Desktop `lg:`: 3 columns. Same uniform squares across breakpoints.
- Caption block padding reduced on mobile (`p-3` instead of `p-4`).

### Out of scope
- No copy changes, no new routes, no new images, no design-system token changes, no desktop layout rework.

### Deliverable
A single batch of edits across the components/routes above with mobile screenshots verifying each page before/after.
