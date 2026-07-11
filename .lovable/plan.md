## Problem

`rentals.silverthornresort.com` still links to the old WordPress-style URLs on `silverthornresort.com` (e.g. `/our-history/`, `/queen-i-the-ultimate/`, `/houseboat-rental-policy/`). None of those paths exist on the new Lovable site, so every click 404s.

Bluehost `.htaccess` no longer runs — DNS points to Lovable. The redirects have to live in the edge worker (`src/server.ts`), same place we already handle `/index.html`, `/home`, etc.

## Fix

Extend `LEGACY_REDIRECTS` in `src/server.ts` with the full old-slug → new-route map, and normalize trailing slashes before lookup so both `/our-history` and `/our-history/` match.

### Mapping (old WordPress slug → new route)

```text
/                              → /                       (already home)
/cabins/                       → /cabins
/cabin-reservations/           → /cabins
/cabin-rental-policy/          → /cabins/policy
/our-houseboats/               → /houseboats
/houseboat-reservations/       → /houseboats
/houseboat-rental-policy/      → /houseboats/policy
/queen-elite-of-the-fleet/     → /houseboats/queen
/queen-i-the-ultimate/         → /houseboats/queen-i
/queen-ii-luxury-on-the-lake/  → /houseboats/queen-ii
/senator-destination-vacation/ → /houseboats/senator
/small-boats/                  → /small-boats
/small-boat-rentals/           → /small-boats
/small-boat-reservations/      → /small-boats
/shasta-lake/                  → /shasta-lake
/exploring-shasta-lake/        → /exploring-shasta-lake
/planning-your-vacation/       → /planning
/silverthorn-marina/           → /planning
/silverthorn-moorage/          → /planning
/our-history/                  → /about/history
/contact/                      → /contact
/faq/                          → /faq
/guest-information/            → /guest-info
/employment/                   → /employment
/pro-shop/                     → /pro-shop
```

### Implementation notes

- Add entries to `LEGACY_REDIRECTS` in `src/server.ts` using the no-trailing-slash form.
- Adjust `resolveLegacyRedirect` so it strips a trailing slash **before** the map lookup (currently trailing-slash strip happens last and returns the stripped path unchanged — for these WordPress slugs we want to map to a different destination, not just drop the slash).
- Existing `/index.html`, `/home`, `.html` handling and the final "unknown legacy path → /" fallback stay intact.
- Nothing else changes: no route files, no sitemap, no SEO metadata.

## Verification (after publish)

`curl -sI` a handful of the old URLs and confirm each returns `301` to the mapped target, including at least: `/our-history/`, `/queen-i-the-ultimate/`, `/houseboat-rental-policy/`, `/guest-information/`, `/silverthorn-marina/`, and an unknown slug like `/something-random/` (should still fall through to `/`).
