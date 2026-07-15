# Add Summer Promo to Homepage Hero + SEO

Give the "Summer Fun Sale — 20% OFF Queen I & Queen II" a visible spot inside the hero (above the H1), routed to the internal comparison page, and thread the promo into the homepage's SEO metadata.

## 1. Hero promo ribbon (`src/components/SilverthornHomePage.tsx`)

Inside `Hero()`, just above the "Shasta Lake · Redding, California" eyebrow (line ~428), insert a compact animated pill:

- `<Link to="/compare/queens" data-cta="hero-summer-promo">` wrapping the pill so it's a native TanStack link (preloads on intent) — not the external booking URL.
- Visual: reuse the existing `promo-sunset-bg` + `promo-badge-glow` classes from `src/styles.css` so it matches the site's promo language. Rounded-full, small padding, white text with a solid drop shadow for legibility against the hero photo.
- Content, left → right:
  - a small sun/sparkle emoji (`☀️`) with `promo-float`
  - bold "20% OFF" chip
  - text: "Summer Fun Sale — Queen I & Queen II · Code BREAK20"
  - trailing `→` arrow that nudges on hover
- Pulls copy from `PROMO` in `src/lib/promo.ts` (already the single source of truth — no hardcoding).
- Mobile: shortens to "20% OFF Queens · BREAK20 →" via responsive `hidden sm:inline` spans so it fits one line on phones without wrapping the hero.
- Respects `prefers-reduced-motion` (the promo animation classes already do).

No other hero elements move; the H1, subhead, and existing two CTAs stay exactly as they are.

## 2. Homepage SEO (`src/routes/index.tsx`)

Weave the promo into the discoverable metadata without breaking existing lengths:

- `DESCRIPTION` → append a promo clause, kept under 160 chars, e.g.:
  "Family-run Shasta Lake resort. Houseboats, cabins & boat rentals. Summer 2026: 20% off Queen I & Queen II — code BREAK20 (Jul 12–Aug 25)."
- Mirror the new description into `og:description` and `twitter:description` (already derived from `DESCRIPTION`, so this is one edit).
- Add a second JSON-LD `<script type="application/ld+json">` alongside the existing FAQPage: a `schema.org/Offer` with:
  - `name`: "Summer Fun Sale — 20% Off Queen I & Queen II Houseboats"
  - `priceSpecification` discount 20%
  - `validFrom` / `validThrough` from `PROMO.startsOn` / `PROMO.endsOn`
  - `url`: `https://silverthornresort.com/compare/queens`
  - `eligibleCustomerType`: new reservations
  - `couponCode`: `BREAK20`
- Keep the existing FAQ schema untouched.

Title stays as-is (already at the length limit); the promo lives in description + structured data where it helps search snippets without title-length warnings.

## 3. Out of scope

- No changes to `SummerPromoBanner` (the big banner image below the hero) — it stays.
- No changes to `/compare/queens` (destination already exists and is optimized).
- No new routes, no changes to promo dates/codes/eligibility.

## Technical notes

- `Link` import already present in the file (used elsewhere in nav).
- All promo styling classes exist in `src/styles.css` — no new CSS.
- No new dependencies, no schema/DB changes.
