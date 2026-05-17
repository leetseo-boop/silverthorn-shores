## Silverthorn Small Boats Rental page

**Route:** `src/routes/small-boats.tsx` → `/small-boats` (matches existing nav submenu).

**Content (ported from source project):**
- Hero with title "Silverthorn Resort Boat Rentals — Pontoons, Jet Skis, Wakeboard Boats & More" + Pit River Arm location chip + Book Now CTA → `https://rentals.silverthornresort.com`
- 10-boat fleet grid (image + name + capacity + use case + daily price from $78):
  Jet Ski (SeaDoo), Axis T220-R Wakeboard, Centurion T-5 Wakeboard, Tahoe Deck Boat, Patio Boat, Sun Tracker Pontoon, Party Cruiser I, Fishing Boat, Kayak, SUP
- Benefits row (Direct Lake Access, Parking, Fuel Dock, Marina Store, Pro Staff, Prime Location)
- "Who it's for" section (Families, Couples, Anglers, Weekenders, Houseboat Guests)
- FAQ accordion (6 Qs)
- CTA band

**Assets:** copy 10 boat photos + hero from source project to `public/images/small-boats/`.

**Design:** reuse current site format — white nav/footer (shared `<Nav/>` + `<Footer/>`), navy `#1B2B3A` headings, orange `#E8640A` CTAs, Playfair Display headings + DM Sans body, `#F4EFE6` section bands. Card grid responsive 1/2/3 cols.

**SEO 10/10:**
- `head()` with title, description, og:title/description/type=website/url, og:image (hero), twitter:card=summary_large_image + image, canonical `/small-boats`.
- JSON-LD `scripts`: `LocalBusiness` (Silverthorn Marina, address/geo/phone/hours/priceRange), `Service` (Boat Rental), `ItemList` of 10 `Product` nodes (name, image, AggregateOffer USD price, brand Silverthorn Resort), `FAQPage`, `BreadcrumbList`.
- Semantic `<h1>` + section `<h2>`s, alt text on every image, `loading="eager" fetchPriority="high"` on hero only, lazy on rest.

**Nav link:** add `/small-boats` as the first child under the "Small Boats" submenu in `SilverthornHomePage.tsx`.

**Out of scope:** individual per-boat detail pages (Kayak, SUP, Jet Ski, etc.) — fleet cards link to the booking URL with the boat name as a query, not to internal sub-routes.