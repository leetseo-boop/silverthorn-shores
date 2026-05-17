## 10 individual Silverthorn boat-rental pages

Port each boat page from the source project (`d7132c39-fd4e-4c6e-aac1-267f15319b28`, `src/pages/silverthorn/*`) into the current site as dedicated TanStack Start routes under `/small-boats/<slug>`. Existing fleet cards on `/small-boats` get rewired to link to these new internal pages, and each card still surfaces the external booking URL.

### Routes (TanStack flat dot convention)

| Slug | File | Booking ID (rentals.silverthornresort.com/details/…) | Price/day |
|---|---|---|---|
| `jet-ski` | `src/routes/small-boats.jet-ski.tsx` | **56** | $548.63 |
| `axis-t220r` | `src/routes/small-boats.axis-t220r.tsx` | **44** | $1,243.55 |
| `centurion-t5` | `src/routes/small-boats.centurion-t5.tsx` | **26** | $637.45 |
| `tahoe-deck` | `src/routes/small-boats.tahoe-deck.tsx` | **25** | $543.40 |
| `patio-boat` | `src/routes/small-boats.patio-boat.tsx` | **23** | $323.95 |
| `sun-tracker` | `src/routes/small-boats.sun-tracker.tsx` | **24** | $438.90 |
| `party-cruiser-i` | `src/routes/small-boats.party-cruiser-i.tsx` | **22** | $830.78 |
| `fishing-boat` | `src/routes/small-boats.fishing-boat.tsx` | **27** | $78.38 |
| `kayak` | `src/routes/small-boats.kayak.tsx` | **29** | $78.38 |
| `sup` | `src/routes/small-boats.sup.tsx` | **28** | $78.38 |

Slugs match the existing fleet `id`s on `/small-boats` so card links stay 1:1.

### Per-page content (ported faithfully)

Each page carries: hero (boat-specific image + name + price chip + "Reserve at rentals.silverthornresort.com/details/<id>" CTA + "Call 1-800-332-3044" + back-link to `/small-boats`), pricing table (daily + weekly rate + deposit), "Why rent this boat" prose, feature card grid (4 mini-stats specific to the boat), "What to expect" two-column (hours/policies + safety), **photo gallery** with lightbox (4–9 images per boat depending on what source has), FAQ accordion (6–8 boat-specific Qs), related boats strip (3 sibling fleet cards), CTA band.

Weekly rates and deposit amounts are copied as-is from the source so they match the booking system.

### Assets

Copy from source project to this project under matching `public/images/silverthorn/...` paths, preserving filenames so URLs in the structured data stay valid:

- `public/images/silverthorn/jetski-hero-silverthorn.png` + `jetski-gallery/` (8 photos)
- `public/images/silverthorn/axis-t220r-hero-silverthorn-riders.png` + `axis-t220r-gallery/` (7)
- `public/images/silverthorn/centurion-t5-wakeboard-silverthorn-hero.png` + `centurion-t5-gallery/` (8)
- `public/images/silverthorn/tahoe-deck-boat-silverthorn-hero.png` + `tahoe-deck-boat-gallery/` (8)
- `public/images/silverthorn/patio-boat-silverthorn-hero.webp` + `patio-boat-gallery/` (3)
- `public/images/silverthorn/sun-tracker-pontoon-silverthorn-hero.jpg` + `sun-tracker-gallery/` (6)
- `public/images/silverthorn/party-cruiser-i-silverthorn-hero.webp` + `party-cruiser-i-gallery/` (4)
- `public/images/silverthorn/fishing-boat-silverthorn-hero.webp` + 2 gallery photos
- `public/images/silverthorn/kayak/*` (9 kayak `.jfif` photos relocated from source `src/assets/`)
- `public/images/silverthorn/sup/*` (2 SUP photos)

Total ~60 new image files.

### Design (matches current site)

Reuse the existing `<Nav/>` and `<Footer/>` from `SilverthornHomePage.tsx` (white nav/footer, navy text). Color tokens: navy `#1B2B3A`, orange `#E8640A`, sand `#F4EFE6`. Typography: Playfair Display headings + DM Sans body. Components reused from `src/components/ui/*` (Button, Accordion, Card). The lightbox gallery is a small inline component (no new dependency): grid → click opens fixed-position overlay with prev/next/close + keyboard nav. No shadcn `Table` use needed — pricing rendered as a styled `<dl>` to keep markup lean.

### SEO 10/10 (per route)

In each route's `head()`:
- Boat-specific `<title>`, `<meta description>`, `og:title/description/url/type=product`, `og:image` (boat hero), `twitter:card=summary_large_image` + image
- `<link rel="canonical" href="/small-boats/<slug>">` (leaf only — root has none)
- JSON-LD `@graph` ported from source, with URLs rewritten to relative paths: `Product` with `AggregateOffer` (daily + weekly), `ImageGallery` listing every photo with alt text, `FAQPage`, `BreadcrumbList` (Home › Small Boats › <Boat>), `LocalBusiness` Silverthorn Marina, `Place`
- Semantic `<h1>` per page + `<h2>` per section, alt text on every image, `loading="eager" fetchPriority="high"` on hero only

### Fleet card wiring on `/small-boats`

In `src/routes/small-boats.tsx`, change each fleet card so:
- The image + title link to the internal route `/small-boats/<id>` (TanStack `<Link>`)
- The "Book Now" button still opens `https://rentals.silverthornresort.com/details/<id>` in a new tab

Also add an `ItemList` JSON-LD update on `/small-boats` so each item's `url` is the internal page URL while the offer's `url` remains the booking deep link.

### Out of scope

- No changes to `Nav` submenu structure (Small Boats submenu remains a single `/small-boats` link; deep links to individual boats are reachable via the fleet grid).
- No new shadcn components installed.
- No edits to `SilverthornHomePage.tsx` beyond what's already imported.
