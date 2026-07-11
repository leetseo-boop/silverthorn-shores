## Goal
Create a dedicated side-by-side comparison page for **Queen I** and **Queen II**, and route the homepage summer promo banner to it (only the homepage banner — Fleet and detail-page promos keep their current booking links).

## New route
- `src/routes/compare.queens.tsx` → URL `/compare/queens`
  - Full SEO `head()`: title, description, og:*, twitter, canonical, and a `Product`-list + `BreadcrumbList` JSON-LD.
  - Reads both boats via `getHouseboatBySlug("queen-i" | "queen-ii")` — no data duplication.

## New component
- `src/components/QueenComparePage.tsx` with these sections:
  1. **Hero** — page title "Queen I vs Queen II — Which Shasta Lake Houseboat Is Right for You?", short intro, two hero thumbnails side-by-side, each with its own **Book Now** button pointing at that boat's `bookingUrl` (Queen I → `/details/…`, Queen II → `/details/…`). Buttons repeat in a sticky footer bar on mobile.
  2. **At-a-glance spec table** — responsive 3-column grid (Feature | Queen I | Queen II) that collapses to a stacked card layout on mobile. Rows: Sleeps, Staterooms, Bathrooms, Beds, Length, Rating, Best for.
  3. **Features & amenities** — icon-led rows (Hot tub, Waterslide, Fireplace, BBQs, Wet bar, Penthouse suite, Kitchen, etc.) with ✓ / — marks per boat, sourced from each boat's `amenities` / `highlights` / `layout`.
  4. **Pricing** — Tabs (shadcn `Tabs`) with **Low season**, **High season**, **Holiday**. Inside each tab, a compact table showing 3-night / 4-night / 7-night rates for both boats using `extendedPricing`. Small helper note "May–Sept mid-season rates available — see boat page."
  5. **Which should you pick?** — two short recommendation cards ("Choose Queen I if…", "Choose Queen II if…") using site tokens.
  6. **Final CTA** — two large **Book Queen I** / **Book Queen II** buttons plus a secondary "See full details" link to each boat page.
- Uses only semantic tokens (`bg-background`, `text-foreground`, `bg-primary`, `bg-card`, `border-border`, `text-muted-foreground`) — no hard-coded colors, matching the rest of the site.
- Lucide icons (Users, BedDouble, Bath, Ruler, Flame, Waves, UtensilsCrossed, Wine, Star, Check, Minus).
- Fully responsive: table becomes stacked cards below `md`; sticky mobile "Book" bar with two buttons.

## Homepage banner wiring
- `src/components/promo/SummerPromoBanner.tsx`: change `BOOK_URL` from the current category link to `/compare/queens` and render via TanStack `<Link to="/compare/queens">` (internal nav, no `target="_blank"`).
- Leaves `HouseboatPromoSection`, Fleet page badges, and detail-page promos untouched — they keep booking straight into rentals.silverthornresort.com as today.

## Files touched
- **Add** `src/routes/compare.queens.tsx`
- **Add** `src/components/QueenComparePage.tsx`
- **Edit** `src/components/promo/SummerPromoBanner.tsx` (swap link target + use `Link`)

No data model, DB, or business-logic changes.
