## History page

Create a new `/history` route with the supplied copy, a featured hero image (the modern Shasta Dam aerial shot), and a 6-image historical gallery built from the other uploads. Optimize images and ship full SEO (per-page head, JSON-LD, OG/Twitter, canonical, sitemap entry, nav links).

### Assets
Copy uploads to `src/assets/history/` with descriptive, SEO-friendly filenames:
- `user-uploads://250.webp` → `shasta-dam-aerial-lake-shasta.webp` (hero — modern dam + lake)
- `user-uploads://775607c9d23d671.webp` → `silverthorn-ferry-pit-river-1853.webp` (historic ferry)
- `user-uploads://250-1.webp` → `shasta-dam-construction-tower.webp`
- `user-uploads://250-5.webp` → `shasta-dam-construction-spillway.webp`
- `user-uploads://250-7.webp` → `shasta-dam-construction-color.webp`
- `user-uploads://250-1_1.webp` → `silverthorn-ruins-shasta-lake-shoreline.webp`
- `user-uploads://250-8.webp` → `shasta-lake-satellite-shoreline.webp`
- The 2 `.avif` uploads → inspect and either drop into gallery or skip if redundant.

All images get descriptive `alt` text, `loading="lazy"` except hero (`fetchpriority="high"`, `loading="eager"`), explicit `width`/`height` to prevent CLS.

### Page: `src/routes/history.tsx`
- TanStack `createFileRoute("/history")` with full `head()`:
  - `title`: "Our History — Silverthorn Resort on Shasta Lake Since 1853"
  - `description` (~155 chars): story of George Silverthorn's 1853 Pit River ferry, the building of Shasta Dam, and today's resort.
  - `og:title`, `og:description`, `og:type: article`, `og:url`, `og:image` (hero, absolute URL `https://silver-shasta-dreams.lovable.app/...`), `twitter:card: summary_large_image`, `twitter:image`.
  - `<link rel="canonical" href="https://silver-shasta-dreams.lovable.app/history">`.
  - JSON-LD scripts: `Article` (headline, image, datePublished, publisher Silverthorn Resort) + `BreadcrumbList` (Home → History).
- Render via new component `src/components/HistoryPage.tsx`.

### Component: `src/components/HistoryPage.tsx`
- Reuse site palette/typography (Playfair headline, DM Sans body, existing CTA/wave styles from `SilverthornHomePage`).
- Structure:
  1. **Hero**: full-width section with the dam aerial as a sized image (not background) — `max-h-[60vh]`, `object-cover`, eyebrow "Since 1853", H1 "Our History", short tagline.
  2. **Story**: two-column on desktop / single on mobile. Left = first 3 paragraphs of supplied copy wrapped in `<article>` with proper `<p>` tags and a pull-quote. Right = sticky historic ferry image with caption "George Silverthorn's ferry on the Pit River, c. 1853".
  3. **Stats strip**: 375 mi shoreline · 400 ft avg depth · 40,000 acres · 1M+ annual visitors (semantic `<dl>`).
  4. **Remaining copy**: last 3 paragraphs in a centered prose block.
  5. **Gallery**: "Shasta Lake Through Time" — responsive masonry/grid (2 cols mobile, 3 cols desktop) of the 6 historical images, each with caption + date. Click opens lightbox (use existing shadcn `Dialog`).
  6. **CTA band**: "Be part of the next chapter" → links to `/houseboats` and `/cabins`, matching home CTA style.

### Nav + sitemap + routing
- Add "History" link to `Nav` in `src/components/SilverthornHomePage.tsx` (insert between existing items where it fits — likely after About/Houseboats).
- Add `/history` entry to sitemap if `src/routes/sitemap[.]xml.ts` exists; otherwise skip sitemap (not creating one in this task).
- Add internal links: from home page footer/about section, link to `/history`.

### SEO checklist (10/10)
- Single `<h1>`, semantic `<h2>` per section.
- Image `alt` text describes content + era.
- `width`/`height` on every `<img>` (no CLS).
- `loading="lazy"` + `decoding="async"` on gallery images; hero preloaded via `head().links`.
- Canonical + OG + Twitter + JSON-LD (Article + BreadcrumbList).
- Internal links to `/`, `/houseboats`, `/cabins`.
- Descriptive URL `/history`, no query params.
- Copy preserves keywords: "Shasta Lake", "Shasta Dam", "Silverthorn Resort", "houseboat", "Pit River", "1853".

### Out of scope
- No changes to other pages beyond adding the History nav link and one internal link.
- No new dependencies.
- No backend/auth work.
