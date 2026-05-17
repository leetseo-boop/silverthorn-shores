## Pro Shop Rentals Page

Create a new route `/pro-shop` matching the visual language of the existing Silverthorn pages (Playfair Display headings, navy `#1B2B3A` + orange `#E8640A` + sand `#F4EFE6` palette, shared `Nav` and `Footer`).

### Files

- **New**: `src/routes/pro-shop.tsx` — TanStack route with full SEO `head()` (title, description, og tags, canonical, JSON-LD Store + ItemList + BreadcrumbList) and the page component.
- **New assets** (copy uploads → `src/assets/`, optimize to ≤1600px webp):
  - `proshop-hero.webp` ← `IMG_3332.jpg` (wakeboarder at sunset → hero)
  - `proshop-tubing.webp` ← `valentines2026-4.png` (couple tubing → "Tubes & Towables" card)
  - `proshop-group.webp` ← `queengroup-proshop.jfif` (group floats/SUPs → "Floats & SUPs" card / lifestyle band)
- **Edit**: `src/components/SilverthornHomePage.tsx` — add "Pro Shop" link to the `Nav` items.

### Page sections

1. **Hero** — full-width wakeboarder sunset image, dark scrim, headline "Pro Shop & Rentals", subhead about apparel + brand-name wakeboards/skis, CTAs "Reserve Gear" (booking URL) and "Call 1-800-332-3044".
2. **Intro** — short paragraph from source: apparel & pro shop summary (swim suits, cover-ups, shorts, tees, shoes, accessories; wakeboards/skis for purchase or rent).
3. **Rental Price Table** — modern card-style table replacing the screenshot. Columns: Equipment / Daily / Weekly. Rows: Large Tube $80/$480, Wakeboard $100/$600, Water Ski $50/$300, Kayak $75/$450, Paddleboard $75/$450, Wake Surf $80/$480. Each row with a Lucide icon, hover lift, alternating sand background. Mobile: stacked cards.
4. **Gear categories grid** (3 visual cards using uploaded photos) — Wakeboards & Skis, Tubes & Towables (tubing image), Floats, SUPs & Kayaks (group image). Each links to booking.
5. **Apparel callout** — small band: "Swim suits · Cover-ups · Shorts · Tees · Shoes · Accessories" with shop-now CTA.
6. **CTA band** — orange band: "Rent your gear, hit the lake" with Book / Call buttons (matches small-boats page pattern).

### Technical details

- Reuse `Nav`/`Footer` from `SilverthornHomePage` (already exported).
- All images: explicit `width`/`height`, `loading="lazy"` except hero (`fetchPriority="high"`, `loading="eager"`), `decoding="async"`. Preload hero in route `head().links`.
- JSON-LD `@graph`: `Store` (Silverthorn Pro Shop with address/phone/geo), `ItemList` of 6 rental products with Offer price/USD, `BreadcrumbList` Home → Pro Shop.
- Canonical only on this leaf route; relative path `/pro-shop`.
- Booking links → `https://rentals.silverthornresort.com` (existing `BOOKING_URL` constant pattern).

### Out of scope

- No backend changes, no new shared components, no edits beyond adding the nav link.
