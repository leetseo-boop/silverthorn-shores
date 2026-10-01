# Submit sitemap to the non-www Search Console property

## What
Submit `https://www.silverthornresort.com/sitemap.xml` to the verified `https://silverthornresort.com/` (non-www) property using the Silverthorn Search Console connection (std_01kx815fnzfkm98fzy69w7eg4y).

## Steps
1. `GET /webmasters/v3/sites` and confirm `https://silverthornresort.com/` is still verified/owned.
2. `PUT /webmasters/v3/sites/https%3A%2F%2Fsilverthornresort.com%2F/sitemaps/https%3A%2F%2Fwww.silverthornresort.com%2Fsitemap.xml`.
3. Report result (pages, errors, warnings).

## Notes
- No source changes, no publish, no DNS/email impact. Google will still index one canonical version; this just makes Search Console track both properties.
