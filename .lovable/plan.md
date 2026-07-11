## Plan

### 1. Write & publish "Shasta Lake vs Lake Powell" comparison guide

**New files:**
- `src/components/ShastaVsPowellPage.tsx` — full comparison page component
- `src/routes/shasta-vs-lake-powell.tsx` — route with SEO head(), canonical, OG tags, JSON-LD (Article + FAQPage + BreadcrumbList)

**Page content structure:**
- Hero: "Shasta Lake vs Lake Powell — Which Houseboat Trip Is Right for You?" with reused Shasta hero image
- Quick-verdict callout (drive time, cost, crowds, scenery at a glance)
- Side-by-side comparison table: location & drive time (from CA cities), lake size, water level reliability, scenery, water temp, season length, houseboat fleet, marina services, cost range, crowd level, permits/fees
- "Why choose Shasta" section — proximity to Bay Area/Sacramento, lower cost, family-run marina, 40 years, Pit River Arm privacy, links to Queen I / Queen II / Senator + BREAK20 promo
- "When Lake Powell makes sense" — honest section (red rock scenery, longer trips) to build trust with AI/search
- Cost breakdown cards (fuel, travel, rental)
- FAQ section (8–10 Q&As): drive time from SF/LA/Sacramento, is Shasta cheaper, water levels, best time to go, boat differences, pets, first-timers, etc.
- CTA block: Book Houseboat / Compare Queens / Contact

**Internal linking:** to `/houseboats`, `/compare/queens`, `/shasta-lake`, `/exploring-shasta-lake`, `/planning`, `/contact`

**Sitemap:** add `/shasta-vs-lake-powell` to `src/routes/sitemap[.]xml.ts`

**Nav:** not adding to top nav (keeps existing structure clean); relies on internal links + sitemap for discovery

### 2. Google Search Console authorization

- Use the `google_search_console` connector via `standard_connectors--connect` to authorize the account
- After connect, verify `silverthornresort.com` as a property (META token flow if not already verified, then `PUT /sites/{siteUrl}`)
- Submit sitemap: `https://silverthornresort.com/sitemap.xml`
- Mark the GSC SEO finding fixed

### 3. Publish & rescan

- Publish the site with `preview_ui--publish` (after security scan check)
- Trigger a fresh SEO scan with `seo_chat--trigger_scan`
- Report remaining findings

### Order of execution
1. Build the Shasta vs Powell page + route + sitemap entry
2. Connect Google Search Console + verify property + submit sitemap
3. Publish
4. Trigger SEO rescan, report results

### Confirm before I start
- OK to skip adding "Shasta vs Lake Powell" to the top nav (SEO-focused landing page, linked from body content only)?
- OK to reuse existing Shasta hero imagery rather than generating new comparison graphics (saves credits, faster)?
