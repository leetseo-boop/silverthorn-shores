## Goal
Make `/compare/queens` feel like an inviting summer sale page — playful sun/wave/swim icons, warm sunset accents, and clear "20% OFF" badges on the two boat cards — without breaking the existing information density or mobile layout.

## Changes (all in `src/components/QueenComparePage.tsx`, plus a couple of small helpers)

### 1. Hero — sunny backdrop + floating icons
- Swap the plain `bg-gradient-to-b from-muted/40` for a soft sunset wash (peach → sky → background) using the promo palette already used in `SummerPromoBanner` (#FFC24B → #FF8A1F → #E23E57 at low opacity).
- Add a decorative layer of floating summer icons (sun, palm, waves, swim ring, popsicle, sunglasses) absolutely positioned around the hero. Use existing lucide icons (`Sun`, `Palmtree`, `Waves`, `IceCreamCone`, `Sailboat`, `LifeBuoy`) with `aria-hidden`, low opacity, and gentle `animate-[float_*]` motion reused from `styles.css`.
- Hide decorative icons on `< sm` (matching the pattern we already use in `SummerPromoBanner` after the mobile audit) so copy stays clean on phones.
- Upgrade the small promo chip into a bolder sunset-gradient pill ("☀ Summer Fun Sale · 20% OFF · Code BREAK20").

### 2. Boat cards — corner 20% OFF badge + warm frame
- Reuse `PromoBadge` (already renders a sunset "20% OFF" badge in the top-right corner) on each of the two hero boat cards — both `queen-i` and `queen-ii` are already in `PROMO.eligibleSlugs`, so it just works.
- Wrap each card in `PromoCardFrame` so it picks up the existing glowing sunset border (rotation is already disabled per earlier request).
- Add a tiny second corner accent in the top-left: a small rotated "☀ Save 20%" ribbon-style tag using inline sunset gradient, purely decorative (`aria-hidden`).
- Keep image, copy, and buttons untouched so the card still reads clearly.

### 3. Section accents
- "At a glance" and "Features & amenities" headings get a small `Sun` icon in primary/orange next to the title for continuity.
- "Seasonal pricing" tab list gets a subtle sunset underline on the active tab (via a small className tweak — no shadcn variant changes).
- "Which one is right for you?" cards get a light peach top border strip and a corner `Sparkles` or `PartyPopper` icon to feel celebratory.

### 4. Final CTA block
- Change the plain card background to the same soft sunset wash used in the hero.
- Add a compact "20% OFF with code BREAK20" pill above the heading.
- Add a couple of floating sun/wave icons behind the buttons (desktop only).

### 5. Sticky mobile book bar
- Prefix each button label with a small ☀ and add a subtle sunset gradient behind the "Book Queen I" solid button so the promo feel carries to mobile without hurting tap targets.

## Non-goals
- No changes to pricing data, specs, or copy meaning.
- No changes to routing, SEO metadata, or JSON-LD.
- No new dependencies; reuse `PromoBadge`, `PromoCardFrame`, `PROMO`, existing keyframes in `styles.css`, and lucide icons already available.

## Verification
- Playwright screenshots at 375, 768, 1280 to confirm: badges visible in card corners, no overlap with image/text, no horizontal scroll, contrast still good on the sunset hero, and the pricing tabs still render cleanly.
