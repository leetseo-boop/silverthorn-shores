## Goal
Verify the Bluehost → silverthornresort.com 301 redirects work correctly, and confirm the live sitemap returns HTTP 200 with valid XML.

## Checks

### 1. Sitemap health
- `curl -I https://www.silverthornresort.com/sitemap.xml` → expect `200 OK`, `content-type: application/xml`.
- `curl -I https://silverthornresort.com/sitemap.xml` → same.
- `curl -s https://www.silverthornresort.com/sitemap.xml | head -40` → confirm valid `<urlset>` XML with expected `<loc>` entries.
- Open in a real browser (Playwright) and screenshot to confirm it renders as XML, not a 404 or HTML shell.

### 2. Redirect spot-checks (old Bluehost paths → new site)
For each of the following, run `curl -sI -o /dev/null -w "%{http_code} -> %{redirect_url}\n" <old-url>` and confirm it returns `301` pointing at the matching `https://silverthornresort.com/...` path:

- `https://www.silverthornresort.com/index.html` → `/`
- `https://www.silverthornresort.com/home` → `/`
- `https://www.silverthornresort.com/houseboats/queen-i` → `/houseboats/queen-i`
- `https://www.silverthornresort.com/houseboats/policy` → `/houseboats/policy`
- `https://www.silverthornresort.com/cabins` → `/cabins`
- `https://www.silverthornresort.com/small-boats/jet-ski` → `/small-boats/jet-ski`
- `https://www.silverthornresort.com/small-boats/some-unknown-boat` → catch-all to `/small-boats/some-unknown-boat`
- `https://www.silverthornresort.com/history` → `/about/history`
- `https://www.silverthornresort.com/contact` → `/contact`
- `https://www.silverthornresort.com/faq` → `/faq`
- `https://www.silverthornresort.com/some-random-legacy-page` → final catch-all → `/`

### 3. Follow-through
After the raw curl checks, follow one or two redirects end-to-end (`curl -sIL`) to confirm the final destination returns `200` on Lovable and not a redirect loop.

### 4. Report
Summarize:
- Sitemap: status code, content-type, entry count, any missing routes.
- Redirects: table of old URL → status → new URL → final status, flagging anything that isn't a clean `301` to the expected target.
- Any URLs that resolve to the wrong page, hit a redirect loop, or 404.

## Non-goals
- No code, redirect, or sitemap changes in this pass — verification only. If something fails, I'll report it and propose fixes in a follow-up plan.
