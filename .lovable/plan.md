## Problem

`.promo-sunset-bg` is referenced in `SummerPromoBanner` and `HouseboatPromoSection` but never defined in `src/styles.css`. Result: the animated sunset background never paints, leaving white shimmer text on a white page.

## Fix

### 1. Define the missing sunset background (`src/styles.css`)
Add a real `.promo-sunset-bg` class with an animated multi-stop gradient using summer colors and honoring `prefers-reduced-motion`:
- Gradient: `#FFD166 → #FFB347 → #FF8A1F → #E23E57 → #7B2CBF` (sun → sunset → dusk)
- 200% background-size + `promo-gradient-pan` animation (already defined) at ~18s
- Add subtle radial highlight overlay for depth

### 2. Guarantee readable text
- Add a semi-transparent dark scrim layer inside the section so white headings stay legible even on the yellow parts of the gradient
- Bump text shadow strength on the shimmer heading

### 3. Add more summer iconography (inline SVGs, no new assets)
Add decorative SVGs inside both `SummerPromoBanner.tsx` and `HouseboatPromoSection.tsx`:
- Sun with rays (top-left, already partly there — enlarge + add rays)
- Small houseboat silhouette floating on the wave
- Palm frond / swim ring / sunglasses / flip-flop emoji chips scattered as floating badges
- Animated bobbing motion (`@keyframes promo-bob`) on the boat and ring, respecting reduced-motion
- Multi-layer wave at the bottom (two paths, different opacity) for a livelier ocean

### 4. Interactive touches
- Hover: sun scales up slightly, boat tilts, ring spins slowly
- Focus-visible states on the Book Now button already exist — keep
- Ensure all decorative SVGs use `aria-hidden` and `pointer-events-none`

### 5. Scope
- Only edits: `src/styles.css`, `src/components/promo/SummerPromoBanner.tsx`, `src/components/promo/HouseboatPromoSection.tsx`
- No changes to promo logic, eligibility, dates, or code (`BREAK20`)
- Mobile: verify banner height stays compact (previous request), text wraps cleanly, no horizontal overflow

## Verification
- Build passes
- Playwright screenshot of homepage hero+banner and Queen II detail page confirms colorful background, legible text, visible summer icons on both desktop (1280) and mobile (390) viewports
