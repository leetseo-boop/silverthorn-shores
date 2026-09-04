# Sale schema on houseboat & cabin pages + exact promo dates for Thorn

## Current state (verified)

- `src/lib/promo.ts` defines only an end cutoff (`endsAt` = 2026-10-01T06:59:59Z, i.e. Sept 30 11:59 PM Pacific). There is no start date in the config.
- Only the home route (`src/routes/index.tsx`) carries `SaleEvent` schema, with a hardcoded `startDate: "2026-09-01"`.
- The four houseboat detail routes (queen, queen-i, queen-ii, senator) emit `Product` + `AggregateOffer` at full price — no discount, no `validThrough`.
- `/houseboats` (fleet) emits `ItemList` with no offers at all.
- `/cabins` emits `LodgingBusiness` + FAQ + Breadcrumb — no offer or sale markup, even though the page shows the promo banner.
- Thorn's promo entry (`src/lib/thorn/kb-site.ts`) states "through September 30, 2026" but has no start date and no explicit "sale has ended" behavior beyond the entry disappearing.

## What changes

**Promo config**
- Add `startsAt` / `startDate` ("2026-09-01") to `PROMO` so start and end live in one place; home schema reads it instead of the hardcoded string.

**Houseboat pages (4 detail routes + fleet page)**
- While the promo is active, the Product offer becomes an `AggregateOffer` with the 20%-discounted low/high prices, plus `priceValidUntil` and `validThrough` = 2026-09-30, and an `Offer`-level `description` naming code LABOR26 and "new reservations only".
- Add a page-scoped `SaleEvent` (same shape as home: name, startDate, endDate, location = Silverthorn Resort, organizer, offers) so the 20% offer is attached to the specific boat page, not just the home page.
- Fleet page: each `ListItem` product gets the discounted `offers` block; add one `SaleEvent` for the fleet.
- When the window closes, everything reverts to today's full-price schema automatically.

**Cabins page**
- Add a `SaleEvent` node and an `Offer` (`priceCurrency` USD, `validThrough` 2026-09-30, description with code LABOR26) attached to the existing `LodgingBusiness` via `makesOffer`, active only during the window. No cabin per-night price is asserted, since cabin rates are booked off-site.

**Local listings note**
- Every promo schema node reuses the resort's real `PostalAddress`, `telephone` and `geo`-consistent name so Google can associate the offer with the Silverthorn Resort local entity. This improves eligibility; Google decides whether to surface it.

**Thorn**
- The promo knowledge entry gains the exact dates ("started September 1, 2026", "ends September 30, 2026 at 11:59 PM Pacific") and an FAQ answering when the sale started.
- The whole entry is already gated on `isPromoActive()`, so it drops out the moment the window closes; the plan keeps that gate and additionally adds a short post-sale entry so Thorn says "the End of Summer Sale ended September 30, 2026" instead of going silent if someone asks about LABOR26 in October.

## Technical notes

Files touched: `src/lib/promo.ts`, `src/routes/index.tsx`, `src/routes/houseboats.queen.tsx`, `houseboats.queen-i.tsx`, `houseboats.queen-ii.tsx`, `houseboats.senator.tsx`, `src/routes/houseboats.index.tsx`, `src/routes/cabins.tsx`, `src/lib/thorn/kb-site.ts`. No new routes, no new components, no data-model changes. Schema is evaluated per request, so expiry needs no manual cleanup.
