## Goal
Replace the animated `SummerPromoBanner` on the homepage with the uploaded static promo image `silverthorn_promo_summer_2026.webp`. Homepage only — Queen I / Queen II detail sections stay unchanged.

## Steps

1. **Register the upload as a Lovable Asset** (no binary in repo):
   ```
   lovable-assets create --file /mnt/user-uploads/silverthorn_promo_summer_2026.webp \
     --filename silverthorn-promo-summer-2026.webp \
     > src/assets/silverthorn-promo-summer-2026.webp.asset.json
   ```

2. **Rewrite `src/components/promo/SummerPromoBanner.tsx`** to render the image as a full-width clickable banner linking to `https://rentals.silverthornresort.com/category/13` (existing `BOOK_URL`):
   - `<a>` wrapping `<img>` with `src` from the asset JSON.
   - `alt="Summer Fun Sale — 20% off Queen I & Queen II, book July 12–August 25, 2026 with promo code BREAK20"`.
   - `loading="eager"`, `fetchpriority="high"`, explicit `width`/`height` to prevent CLS.
   - `className="block w-full h-auto"`, wrapper `<section class="mx-auto max-w-6xl px-4 py-6">` to match page rhythm.
   - Keep `data-cta="home-summer-promo"` for tracking parity.
   - Drop all SVG decorations, floating emojis, scrim, and shimmer markup.

3. **Leave untouched**: `HouseboatPromoSection.tsx` (Queen I/II detail pages), `PromoBadge`, `PromoCardFrame`, `src/lib/promo.ts`, `src/styles.css` promo keyframes (still used by detail sections).

## Verification
- Load `/` and confirm the new static banner replaces the animated one, is crisp, and the Book Now CTA link opens the category 13 rentals page in a new tab.
- Confirm no horizontal scroll at 375/768/1280 and no CLS (image has intrinsic dimensions).
- Confirm `/houseboats/queen-i` and `/houseboats/queen-ii` still show the existing animated promo section unchanged.
