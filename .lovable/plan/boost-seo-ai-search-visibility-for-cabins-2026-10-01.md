# Boost SEO & AI-search visibility for /cabins

Goal: make the cabins page rank better in Google and get picked up by AI assistants (ChatGPT, Perplexity, Google AI Overviews) for searches like "Shasta Lake cabin rentals", "cabins on Shasta Lake with boat slip", "Silverthorn cabins".

## What changes

### 1. Stronger structured data (schema) — biggest ranking lever
- Fix all schema URLs to absolute (`https://silverthornresort.com/cabins` instead of `/cabins`) so Google attributes them correctly.
- Complete the `LodgingBusiness` schema: full street address (16250 Silverthorn Road, Redding, CA 96003), geo coordinates, check-in/check-out times, `aggregateRating` (4.0 from Google reviews), phone, same-as links to the resort's social profiles.
- Add an `ItemList` of all 8 cabins, each as a `LodgingReservation`-style `Offer` with name, sleeps, bed configuration, weekly and 3-night prices, and its booking URL — this lets Google show per-cabin prices and availability in results.
- Keep the existing FAQPage, BreadcrumbList, and Fall Sale schemas; wire the Fall Sale `Offer` onto each cabin offer while the promo runs.

### 2. On-page keyword & content tuning
- Retune the base (non-promo) title/description around higher-volume phrases: "Shasta Lake Cabin Rentals — Lakeside Cabins with Boat Slips | Silverthorn Resort".
- Expand the intro and each cabin description with natural keyword coverage (lakeside, Pit River Arm, boat slip included, pet-friendly dogs allowed, ADA accessible cabin) without stuffing.
- Add a short "Why stay in a Silverthorn cabin" section answering common AI-search questions in plain sentences (distance from Redding, what's included, who each cabin fits) — the question-answer format is what AI overviews quote.
- Add internal links from the cabins page to /pet-policy, /small-boats, /shasta-lake, and /cabins/policy with descriptive anchor text.

### 3. AI-search (AEO) extras
- Add a cabins entry to `public/llms.txt` summarizing cabin count, sleeps range, prices, amenities, and booking URL so LLM crawlers get clean facts.
- Ensure the FAQ section covers the exact questions people ask AI ("How much are cabins at Shasta Lake?", "Do Shasta Lake cabins include a boat slip?", "Are dogs allowed?").

### 4. Verification
- Typecheck + build must pass.
- Verify rendered head tags and JSON-LD on the preview with a browser check.

## Technical details
- All edits in `src/routes/cabins.tsx` (schema, copy, links) and `public/llms.txt`.
- Promo behavior stays centralized in `src/lib/promo.ts` — no changes there.
- No new pages, no visual redesign; content and metadata only.
- Changes reach the live site on the next publish.
