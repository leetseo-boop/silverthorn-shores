## New page: About Shasta Lake

Create a modern, mobile-first informational page at `/about/shasta-lake` mirroring the design language of the existing History page (Playfair Display headlines, #FBF8F3 background, #1B2B3A text, #E8640A accent, #0D2030 dark bands).

### Files

1. **Copy uploaded images** to `src/assets/shasta-lake/`:
   - `89817158-…jfif` → `shasta-dam-mount-shasta-hero.webp` (HERO — dam + Mt. Shasta)
   - `shasta_lake2025full_lake.webp` → `shasta-lake-aerial-pit-river-arm.webp`
   - `673944465_…jpg` → `shasta-lake-fishing-boat-shoreline.webp`
   - `0422f317-…jpg` → `shasta-lake-houseboat-dog.webp`
   - `0d1f9c5c-…jfif` → `silverthorn-houseboat-jumping-shasta-lake.webp`
   - `valentines2026-2.png` → `couple-sundeck-houseboat-shasta-lake.webp`
   - `silverthorn-resort-marina-shasta-lake-2026.webp` → same name

2. **Create `src/components/ShastaLakePage.tsx`** with sections:
   - **Hero**: full-bleed dam image, "About Shasta Lake" title, intro tagline. Responsive heights `h-[44vh] sm:h-[52vh] md:h-[62vh]`.
   - **Intro prose**: 2-column on md+, single col on mobile, with sticky aerial image.
   - **Facts grid**: dark band with all 8 Shasta Lake / Dam stats in a 2-col mobile → 4-col desktop `<dl>`.
   - **Activities** section: hiking, biking, swimming, fishing, etc. as styled list/cards.
   - **Fish species**: compact pill list of all species mentioned.
   - **Audience callouts**: family / bachelor-bachelorette / friends weekend — 3 cards.
   - **Gallery**: uniform `aspect-square` cards (matches History page treatment), 1 / 2 / 3 col responsive, lazy-loaded, captioned.
   - **CTA band**: dark, links to `/houseboats` and `/cabins`.
   - All headings use `text-3xl sm:text-4xl md:text-5xl` scaling.

3. **Create `src/routes/about.shasta-lake.tsx`** route with full SEO `head()`:
   - title: `About Shasta Lake — 30,000 Acres of Northern California's Best Water`
   - description ~155 chars covering size, depth, activities, Silverthorn location
   - canonical, og:title/description/image/url/type=article, twitter:* tags
   - preload hero image with `fetchPriority="high"`
   - JSON-LD: `TouristAttraction` (Shasta Lake with geo, size, description) **and** `BreadcrumbList`
   - Uses `HistoryPage` route as the template for structure.

4. **Nav link**: add "Shasta Lake" entry to the About menu wherever `/about/history` lives in the header (verify in `__root.tsx` or shared header component during implementation).

### SEO / a11y / mobile checklist
- Single `<h1>`, descriptive `<h2>`s, semantic `<section>`, `<dl>`, `<figure>`/`<figcaption>`.
- Every image has descriptive alt + width/height + `loading="lazy"` (hero `eager` + preload).
- Tap targets ≥44px, body text `text-base md:text-lg` for readability.
- No new dependencies; reuses Tailwind + inline styles already used by HistoryPage.

### Out of scope
- No copy edits to existing pages, no nav restructure beyond adding one link.
