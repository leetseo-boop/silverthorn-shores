## Port the Silverthorn houseboat page format

Bring the 4 Silverthorn boat detail pages (Queen, Queen I, Queen II, Senator) up to the same rich format as Shasta Shores Reimagined (project `d7132c39`), styled with Silverthorn's brand (orange `#E8640A`, navy `#1B2B3A`, Playfair Display / DM Sans). One reusable template, four routes, one data file.

### What each page will include

Same sections/tabs as the source `HouseboatDetail`:

1. **Sticky breadcrumb** — Home › Houseboats › Silverthorn Resort › Boat
2. **Hero gallery** — large 21:9 image with prev/next arrows, counter, thumbnail strip, click-to-zoom lightbox
3. **Quick-facts bar** (sticky) — name, ★ rating + reviews, sleeps / beds / baths / length, "Starting From $X", orange **Check Availability** → `rentals.silverthornresort.com/details/{ID}`
4. **Tabs** with icons:
   - **Overview** — description, "Best For" chips, highlights checklist
   - **Layout** — Main Deck / Upper Deck / Sleeping Areas cards
   - **Amenities** — grouped by category (Entertainment, Kitchen, Outdoor, etc.) with checkmarks
   - **Pricing** — full 3 / 4 / 7-night × Low / May–Sept / High season table, holiday rates in accent color, "High Season: Jun 11 – Aug 19, 2026" + holiday date ranges (Memorial Day, July 4th, Labor Day), "No Hidden Fees" note
   - **Photo Gallery** — full grid, opens lightbox
   - **3D Tour** — embedded Matterport iframe (Queen `NdhjemnUaRq`, Queen I `iYTL6hXbLZo`, Queen II + Senator: only if IDs exist in source) + navigation tips
   - **FAQ** — accordion
   - **Video** (Queen only) — YouTube embed `KJX3k1gqesw`
5. **Sticky right-rail booking card** — price + big orange "Check Availability" button + 800-332-3044 phone link
6. **CTA banner** + **Explore the Fleet** row linking to the other 3 boats
7. **Site Nav + Footer** from `SilverthornHomePage.tsx`

All "Book / Check Availability" links use `rentals.silverthornresort.com/details/{18|19|20|21}` (IDs preserved from source data: Queen 18, Queen I 19; will pull Queen II & Senator IDs from source data file during build).

### SEO (10/10)

Per-route in `head()`:
- Route-specific `<title>`, `<meta description>`, `og:title/description/type=product/url/image`, `twitter:*`, canonical (leaf only)
- JSON-LD via `scripts`:
  - `Product` with `AggregateOffer` (lowPrice = 3-night low, highPrice = 7-night holiday) + `AggregateRating`
  - `BreadcrumbList`
  - `ImageGallery` with every gallery image as `ImageObject`
  - `3DModel` when `matterportId` present
  - `VideoObject` for Queen
  - `FAQPage` from the boat's FAQs
- `og:image` = each boat's hero image (absolute URL)
- Semantic H1 per page, alt text on every image, lazy-loading on gallery/thumbnails, `fetchPriority="high"` on hero

### Technical plan

**New files**
- `src/data/houseboats.ts` — port the 4 Silverthorn boat objects from source (`queen`, `queen-i`, `queen-ii`, `senator`): tagline, description, sleeps/beds/baths/length, rating/reviews, badge, bestFor, highlights, layout {main/upper/sleeping}, amenities {category: items[]}, gallery + galleryAltTexts, heroImages + heroAltTexts, extendedPricing {threeNight/fourNight/sevenNight × low/maySept/maySeptHoliday/high/holiday}, faqs, matterportId, youtubeVideoId, bookingUrl. Images referenced by `/images/...` paths (copied to `public/images/`).
- `src/components/HouseboatDetail.tsx` — shared template component built on TanStack patterns (no react-router-dom, no Helmet). Uses shadcn `Tabs`, `Accordion`, `Tooltip` (already in project). Receives a `boat` prop. Internal `Lightbox` for the gallery.

**Route files** (each ~30 lines: `head()` with full SEO + JSON-LD, then `<HouseboatDetail boat={queen} />`)
- `src/routes/houseboats.queen.tsx` — replace existing
- `src/routes/houseboats.queen-i.tsx` — replace existing
- `src/routes/houseboats.queen-ii.tsx` — new
- `src/routes/houseboats.senator.tsx` — new

**Image assets** — copy from Shasta Shores `src/assets/` to this project's `public/images/` (~25–40 images per boat × 4). Existing `queen-*`, `queen-i-*` files in `public/images/` will be kept where filenames match the new template; otherwise replaced with the canonical set from source.

**Color/style mapping** — source uses tokens (`bg-primary`, `text-accent`, `bg-sunset-gold`, `text-lake-blue-light`). Template will use inline Silverthorn brand colors (orange `#E8640A` for primary/CTAs/active states; navy `#1B2B3A` for headings/dark sections; muted gray for secondary text) so the design lands on Silverthorn brand regardless of `styles.css` tokens. Fonts via inline `style={{ fontFamily }}` (Playfair Display headings / DM Sans body), matching the current Queen page.

**Skipped**
- `useJsonLd` hook + `Helmet` (replaced by TanStack `head()`/`scripts`)
- react-router-dom (replaced by TanStack `Link`)
- The shared `Navigation`/`Footer` from source (reuse this project's `Nav`/`Footer`)

### Risks / call-outs

- Source `youtubeVideoId` is only set for Queen (`KJX3k1gqesw`). Queen II / Senator may not have video — Video tab will be hidden when absent.
- Matterport IDs for Queen II and Senator: I'll pull whatever is in source `houseboats.ts`; if absent, the 3D Tour tab is hidden for that boat (and `3DModel` schema omitted).
- This is a heavy port (~1500 lines of data + ~100–150 images to copy). I'll do it in one pass after approval.
