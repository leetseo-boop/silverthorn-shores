## Block all crawlers, bots, and AI until migration

The site currently invites indexing (robots.txt allows all, sitemap.xml is live, llms.txt advertises pages). Lock it down everywhere until you're ready post-migration.

### Changes

1. **`public/robots.txt`** — replace with a full block:
   ```
   User-agent: *
   Disallow: /
   ```
   Remove the `Sitemap:` line.

2. **`public/llms.txt`** — replace contents with a single line telling AI crawlers the site is not ready:
   ```
   # Site under construction — not available for indexing or training yet.
   User-agent: *
   Disallow: /
   ```

3. **`public/sitemap.xml`** — delete (so search engines have nothing to discover).

4. **`src/routes/sitemap[.]xml.ts`** — delete the server route too (currently serves a live sitemap from `/sitemap.xml`).

5. **`src/routes/__root.tsx`** — add a sitewide noindex meta tag so every page tells crawlers and AI bots to skip:
   ```tsx
   { name: "robots", content: "noindex, nofollow, noarchive, nosnippet, noimageindex" }
   { name: "googlebot", content: "noindex, nofollow" }
   ```

### After migration

When you're ready to go live for SEO, ask me to "re-enable crawling" — I'll restore robots.txt, sitemap, llms.txt, and remove the noindex tags in one pass.

### Note

Already-indexed pages (if any) won't disappear from Google instantly — noindex + Disallow tells Google to drop them on the next crawl, which can take days to weeks.
