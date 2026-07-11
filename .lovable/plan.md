## Summer Fun Sale — 20% OFF Queen I & Queen II

### 1. Shared promo config
Create `src/lib/promo.ts` with a single source of truth:
- `PROMO = { code: "BREAK20", discount: "20% OFF", startsOn: "2026-07-12", endsOn: "2026-08-25", dateLabel: "July 12 – August 25, 2026", eligibleSlugs: ["queen-i", "queen-ii"], fineprint: "New reservations only." }`
- Helper `isPromoBoat(slug)`.

All new UI reads from this file so the code and dates never drift.

### 2. Shared promo components
Create `src/components/promo/` with three small, reusable pieces:

- **`PromoBadge.tsx`** — pill "20% OFF" placed as an absolute top-right badge over a card image. Sunset gradient (amber → orange → rose), soft glow, `aria-label="20 percent off summer promotion"`. Skips render if `!isPromoBoat(slug)`.
- **`PromoCardFrame.tsx`** — wraps an existing card; adds an animated conic-gradient border glow (slow rotation via CSS keyframes, `@media (prefers-reduced-motion: reduce)` disables the animation), gentle hover lift on desktop, active-state ring on touch. Renders children unchanged so we don't rewrite card markup.
- **`SummerPromoBanner.tsx`** — the hero-adjacent banner. Full-width section, animated yellow→orange→sunset gradient background (CSS `background-size: 200% 200%` + slow keyframe pan, reduced-motion falls back to static gradient). Decorative SVG sun, waves, and a houseboat silhouette (inline SVG, no new assets, no layout shift). Content:
  - Eyebrow chip "Limited Time"
  - H2 "SUMMER FUN SALE" with a subtle text-shimmer (opacity/brightness pulse, not blinking — WCAG-safe)
  - Body: "Book your houseboat vacation between July 12 and August 25, 2026 and receive 20% OFF."
  - Promo code shown in a copy-friendly monospace chip: `BREAK20`
  - Eligible boats line: "Selected Houseboats: Queen I & Queen II"
  - Fine print
  - Primary CTA "Book Now" → `https://rentals.silverthornresort.com/category/13` (existing houseboat category), `data-cta="home-summer-promo"`
  - Secondary link "View Eligible Boats" → `/houseboats`

Uses semantic tokens from `styles.css`; adds only 2 keyframes (`gradient-pan`, `shimmer`) scoped inside the component's styles or `@utility` in `styles.css`.

### 3. Homepage integration (`src/components/SilverthornHomePage.tsx`)
- Import `SummerPromoBanner` and render it directly below the hero section, above the existing content.
- In `FleetCard` (line ~490), wrap the card body of Queen I & Queen II in `PromoCardFrame` and drop a `PromoBadge` in the image top-right. Other boats render unchanged.
- Verify mobile spacing: cards already stack; badge uses `top-3 right-3` so it clears the corner radius and doesn't overlap price/rating.

### 4. Fleet page (`src/components/HouseboatsFleetPage.tsx`)
- Same treatment on the fleet card grid: `PromoCardFrame` + `PromoBadge` for Queen I & Queen II only, driven by `isPromoBoat(boat.slug)`.

### 5. Individual boat pages (Queen I & Queen II)
- Add a `HouseboatPromoSection` block (new component in `src/components/promo/`) inside `HouseboatDetail.tsx`, rendered conditionally with `isPromoBoat(boat.slug)`, positioned just below the hero/gallery and above the specs section.
- Reuses the sunset gradient + summer SVGs from the banner but in a boat-page-scale layout: headline "20% OFF This Summer", date line, `BREAK20` chip, fine print, and a "Book Now" button whose href matches that boat's existing "Check Availability" URL (read from the boat data — no hardcoded URLs).
- Because `HouseboatDetail` is shared by all four boats, the gate is `isPromoBoat(boat.slug)`; Queen and Senator render nothing extra.

### 6. Accessibility, performance, quality bar
- All animations honor `prefers-reduced-motion`.
- Text contrast on the sunset background verified against WCAG AA (dark text on the lightest gradient stop, or a translucent white content card layered on the gradient).
- Inline SVG decorations only — no new image downloads, no CLS.
- No changes to routes, data, pricing, links, or SEO.
- No new deps.

### Technical notes
- Files created: `src/lib/promo.ts`, `src/components/promo/PromoBadge.tsx`, `src/components/promo/PromoCardFrame.tsx`, `src/components/promo/SummerPromoBanner.tsx`, `src/components/promo/HouseboatPromoSection.tsx`.
- Files edited: `src/components/SilverthornHomePage.tsx`, `src/components/HouseboatsFleetPage.tsx`, `src/components/HouseboatDetail.tsx`, and (if needed for shared keyframes) `src/styles.css`.
- No touches to Queen, Senator, cabins, small boats, or any policy/content pages.
- Build check after wiring, plus a quick preview screenshot of home + `/houseboats` + `/houseboats/queen-i` to verify badge placement and mobile layout.
