# Fall Festive Cabins Page — 20% Off Badges + Autumn Theming

## Goal
Make `/cabins` fully match the Fall Sale: a visible "20% off" badge on every bookable cabin's image card, plus fall leaves and festive autumn styling across the whole page. All of it renders only while `isPromoActive()` is true, so it disappears automatically after Oct 31 — nothing lingers.

## Current state (verified)
- `src/routes/cabins.tsx` already renders `PromoBanner` and struck-through `PromoPrice` on the cards (previous fix), but card images have **no** promo badge — the small-boats page does (`PromoBadge` at top-right of the image).
- Fall theme tokens (`fall-rust`, `fall-gold`, `fall-forest`, `fall-cream`) already exist in the theme and are used by `src/components/promo/PromoBits.tsx`.
- Per `src/lib/promo.ts`, **all 7 bookable cabins** are promo-eligible; Cabin #6 is unavailable (no badge there).

## Changes — `src/routes/cabins.tsx` only

### 1. "20% off" badge on active cabin image cards
- Import `PromoBadge` from `@/components/promo/PromoBits`.
- In `CabinCard`, when the promo is active and the cabin is not unavailable, show `PromoBadge` at the image's top-right.
- Where a cabin already has a corner badge ("Family Favorite", "Best View", "Largest · Sleeps 8"), stack them: the promo badge sits top-right and the existing badge shifts just below it, so neither is covered.

### 2. Fall festive theming, the entire page (promo-gated, balanced)
- **Header (hero):** under the H1, a fall-styled ribbon line — 🍂 "Shasta Lake Fall Sale · 20% off every cabin with code FALL26 · ends Oct 31" in fall-rust/gold tones, linking to the booking link. Add a couple of subtle decorative leaf accents (aria-hidden) around the heading area.
- **Section headings:** small 🍁/🍂 accents on "Choose your cabin", "Cabin amenities at a glance", "Why stay in a Silverthorn cabin?", and the FAQs heading.
- **Cards section:** sub-line under "Choose your cabin" becomes "Fall Sale: 20% off every cabin with code FALL26 · new reservations only" (promo-gated; keeps the fees/taxes note otherwise). Card price panel gets a warm fall tint while the sale runs.
- **Promo banner section:** add decorative fall leaves around the existing `PromoBanner` (page-local, no change to the shared component).
- **Final CTA:** swap copy to a fall line while active — "Fall on Shasta Lake is calling — cozy cabins, quiet water, 20% off" — reverting automatically after the sale.
- No colors hardcoded: use the existing `fall-*` theme tokens only.

## Verification
- Build passes; check `/tmp/observability/build-errors.log`.
- Playwright at `/cabins` (desktop + one mobile viewport): every bookable card shows the 20% badge, ribbon/leaves visible, unavailable Cabin #6 has no badge.
- Confirm nothing renders when the promo is inactive (spot-check by simulating an expired date in a quick check of the component logic).

## Out of scope
- No price, copy-FAQ, or schema changes (schema already advertises discounted prices).
- No changes to shared promo components, other pages, or `src/lib/promo.ts`.
