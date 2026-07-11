## Goal
Audit the Summer Fun Sale banner (homepage) and the Queen I / Queen II promo sections for: layout shift, overlapping decorations, horizontal scroll, and text contrast on mobile / tablet / desktop. Fix anything the audit surfaces.

## Audit (Playwright, headless)

Run one script that visits `/`, `/houseboats/queen-i`, `/houseboats/queen-ii` at three widths: **375** (mobile), **768** (tablet), **1280** (desktop). At each stop:

1. Screenshot the promo section only (element screenshot).
2. Report `document.documentElement.scrollWidth` vs `window.innerWidth` — flag any horizontal overflow.
3. Measure the promo card's bounding box vs each floating emoji / SVG bounding box — flag any decoration whose center sits inside the inner card rect (overlap on the copy).
4. Sample computed background color at 4 points behind the white heading and compute contrast ratio against `#ffffff` — flag < 4.5:1.
5. Track heading `y` position across a 300 ms window during the shimmer/gradient animation — flag any change (layout shift).

Save screenshots to `/tmp/browser/promo-audit/` and view them to confirm the visual state matches metrics.

## Known / likely fixes (apply after audit confirms)

- **Contrast**: raise the inner card scrim from `bg-black/20` → `bg-black/35` on both banner and Queen section so white text stays legible over the yellow half of the animated gradient. Bump `drop-shadow` on `<h2>` slightly.
- **Emoji crowding on mobile**: the center-top emojis (`left-[42%]`, `right-[38%]`) overlap the "Limited Time" chip below ~420 px. Hide those two on `< sm` (`hidden sm:inline`). Move remaining chips slightly outward and reduce their size on mobile (`text-lg sm:text-2xl`).
- **Horizontal safety**: keep decorations inside the section by clamping the sun SVG offsets on mobile (`-top-8 -right-8 h-32 w-32 sm:-top-12 sm:-right-12 sm:h-48 sm:w-48`) so they never sit near the viewport edge on small screens; parent already has `overflow-hidden` so this is a belt-and-suspenders fix.
- **Queen section grid**: add `min-w-0` to the text column of the `md:grid-cols-[1fr_auto]` grid so a long `{boatName}` heading can't push the CTA off-canvas.
- **Layout shift**: `promo-shimmer` currently animates `filter` + `text-shadow` only (no geometry) — confirm no shift; if the audit flags any, drop the shimmer's `filter: brightness` step which some browsers reflow.
- **Reduced motion**: verify existing `@media (prefers-reduced-motion: reduce)` block still disables `promo-gradient-pan`, `promo-bob`, `promo-float`, `promo-shimmer`, `promo-spin-slow` — no code change expected.

## Files touched (only if audit requires)

- `src/components/promo/SummerPromoBanner.tsx` — scrim opacity, mobile emoji visibility/size, sun SVG size clamps.
- `src/components/promo/HouseboatPromoSection.tsx` — same scrim + emoji + sun fixes, `min-w-0` on grid text column.
- `src/styles.css` — only if shimmer needs adjustment; otherwise untouched.

No changes to `src/lib/promo.ts`, booking URLs, or business copy.

## Verification

Re-run the same Playwright pass after fixes. Success = no horizontal overflow at any of the three widths, no decoration overlapping the inner card copy region, heading contrast ≥ 4.5:1 across the animation cycle, heading `y` unchanged during a 300 ms window.
