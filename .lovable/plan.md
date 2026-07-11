## Goal
Re-enable search engine crawling and indexing now that silverthornresort.com resolves to Lovable.

## Changes

### 1. `public/robots.txt` — allow crawling
Replace the current `Disallow: /` block with:
```
User-agent: *
Allow: /

Sitemap: https://silverthornresort.com/sitemap.xml
```

### 2. `src/routes/__root.tsx` — remove sitewide noindex
Remove these two meta entries from the root `head()`:
- `{ name: "robots", content: "noindex, nofollow, noarchive, nosnippet, noimageindex" }`
- `{ name: "googlebot", content: "noindex, nofollow" }`

Leave everything else in `__root.tsx` untouched.

### 3. Restore sitemap
Create `src/routes/sitemap[.]xml.ts` as a TanStack server route that emits a valid `sitemap.xml` for every public page, with `BASE_URL = "https://silverthornresort.com"`. Entries:
- `/` (priority 1.0, weekly)
- `/houseboats`, `/houseboats/queen-i`, `/houseboats/queen-ii`, `/houseboats/queen`, `/houseboats/senator`, `/houseboats/policy`
- `/cabins`, `/cabins/policy`
- `/small-boats` (+ one entry per boat slug from `src/data/silverthorn-boats.ts`)
- `/compare/queens`
- `/shasta-lake`, `/exploring-shasta-lake`, `/planning`
- `/about/history`, `/contact`, `/directions`
- `/faq`, `/guest-info`, `/pro-shop`, `/employment`

Omit `/admin`, `/not-found`, and any policy-only utility routes the user shouldn't share.

### 4. Switch canonicals + og:url to silverthornresort.com
Every route file that currently uses `https://silver-shasta-dreams.lovable.app` in `canonical` / `og:url` / `og:image` / JSON-LD gets swapped to `https://silverthornresort.com`. Affected files (all under `src/routes/` plus any hard-coded strings inside `src/components/*Page.tsx`):
- `index.tsx`, `cabins.tsx`, `cabins_.policy.tsx`, `houseboats.*.tsx`, `small-boats.tsx`, `small-boats_.$slug.tsx`, `compare.queens.tsx`, `shasta-lake.tsx`, `exploring-shasta-lake.tsx`, `planning.tsx`, `about.history.tsx`, `contact.tsx`, `directions.tsx`, `faq.tsx`, `guest-info.tsx`, `pro-shop.tsx`, `employment.tsx`
- Any JSON-LD `url`/`image` fields in the page components

I'll grep for `silver-shasta-dreams.lovable.app` and replace every occurrence with `silverthornresort.com` (keeping the rest of the URL path intact).

## Non-goals
- No design, copy, or layout changes.
- No changes to the promo, nav, or booking flows.
- No changes to Supabase / admin routes.

## Verification
- Grep confirms zero remaining `silver-shasta-dreams.lovable.app` references outside auto-generated files.
- `curl https://silverthornresort.com/robots.txt` shows `Allow: /` after publish.
- `curl https://silverthornresort.com/sitemap.xml` returns valid XML with all routes.
- View-source on `/` shows no `noindex` meta.
- After publish, tell you to submit the sitemap in Google Search Console and request indexing.
