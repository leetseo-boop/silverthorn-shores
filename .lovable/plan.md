# End of Summer Sale — 20% Off (Code LABOR26)

Site-wide promo across houseboats, small boats (except jet skis) and cabins, live until **Sept 30, 2026, 11:59 PM Pacific**, after which every piece of it disappears automatically.

## What visitors will see

**Home page**
- A vivid gradient strip at the very top of the hero: "End of Summer Sale — 20% off select houseboats & small boats · Code LABOR26".
- The uploaded banner image placed directly below the hero, full width, correctly framed on mobile and desktop, linking to the houseboats fleet page.
- 20% OFF badges on the houseboat cards, with the old price struck through and the new discounted price beside it.

**Houseboats fleet page + each houseboat page**
- 20% OFF badge and slashed/discounted pricing on all four boats (Queen, Queen I, Queen II, Senator).
- A promo banner block on each individual houseboat page with the discount, code LABOR26, "extended through September 30" and "new reservations only".

**Small boats page + each small boat page**
- Promo banner on the main small boats page.
- Badge and slashed daily/weekly pricing on every boat card except the SeaDoo jet skis.
- Promo banner on each individual boat page, excluded on jet skis and toys.

**Cabins page**
- Promo banner with the 20% off, code and dates. No per-unit price changes (cabin rates are booked off-site).

Deposits, taxes and fees stay at full value; only the rental rate shows the discounted figure. Fine print notes 20% applies to the rental rate on new reservations only.

## SEO

- Titles/descriptions updated on home, houseboats, small boats and cabins to lead with "End of Summer Sale — 20% Off Shasta Lake Houseboats, Small Boats & Cabins | Silverthorn Resort" style phrasing, focused on Silverthorn-branded and Shasta-Lake-cabin/small-boat terms rather than generic houseboat terms (less overlap with houseboats.com).
- Schema: add `Offer` / `priceSpecification` with the discounted price and `validThrough` 2026-09-30 to the existing Product JSON-LD on houseboat and small boat pages; no new pages, no new routes.
- All promo metadata reverts to the current copy automatically when the promo expires.

## Thorn

Thorn gets a promo knowledge entry: what's discounted, what's excluded (jet skis, toys), code LABOR26, new reservations only, end date, and which pages to link. It expires with the promo so Thorn never quotes a dead sale.

## Technical notes

- New `src/lib/promo.ts`: single source of truth — active window (`2026-10-01T06:59:59Z` cutoff), discount rate, code, excluded categories, and helpers `isPromoActive()`, `discounted(price)`.
- New `src/components/promo/PromoBanner.tsx` (page banner), `PromoBadge.tsx`, and `PromoPrice.tsx` (struck original + discounted value), all rendering `null` when the promo is inactive.
- Banner image uploaded via the assets CDN and imported as a pointer JSON.
- Edits: `SilverthornHomePage.tsx`, `HouseboatsFleetPage.tsx`, `HouseboatDetail.tsx`, `SilverthornBoatDetail.tsx`, `routes/small-boats.tsx`, `routes/cabins.tsx`, the four houseboat routes and `small-boats_.$slug.tsx` (head/schema), plus a promo entry in Thorn's knowledge base.
- Expiry is evaluated per render/request, so no manual cleanup is needed on Oct 1.
