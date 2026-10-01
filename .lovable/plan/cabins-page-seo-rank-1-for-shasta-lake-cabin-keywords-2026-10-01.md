# Cabins Page SEO — Rank #1 for Shasta Lake Cabin Keywords

## What the data shows
- "shasta lake cabin rentals": 140/mo, difficulty 11/100 — silverthornresort.com/cabins already ranks #2; houseboats.com is not in the top 10.
- "shasta lake cabins": 110/mo, difficulty 15/100 — winnable.
- Goal: push the cabins page to #1 on both terms and strengthen Silverthorn Resort brand keywords.

## Changes (all in `src/routes/cabins.tsx`, no new pages)

### 1. Title and meta description (non-promo defaults)
- Title: "Shasta Lake Cabins & Cabin Rentals — Lakeside Lodging | Silverthorn Resort" (~70 chars, leads with both exact keywords, ends with brand).
- Description (~155 chars): "Book Shasta Lake cabin rentals at Silverthorn Resort. 8 lakeside cabins with full kitchens, BBQs, DirecTV and a boat slip per cabin. Pet-friendly. Reserve online or call 800-332-3044."
- Promo-season title/description stay as-is (they already lead with "20% Off Shasta Lake Cabins").
- Expand the keywords meta to include exact-match phrases: "shasta lake cabins", "shasta lake cabin rentals", "cabins on shasta lake", "silverthorn resort cabins", "pet friendly cabins shasta lake", "shasta lake lodging".

### 2. On-page copy keyword coverage
- H1 already says "Shasta Lake Cabin Rentals" — keep.
- Intro paragraph: naturally work in "cabins on Shasta Lake", "Silverthorn Resort", "lakeside cabin rentals in Northern California" without stuffing.
- Add one short sentence naming nearby search context (Redding, CA / Shasta-Trinity National Forest) for local relevance.

### 3. AEO / AI-search additions
- Add 2 question-style FAQs using real question variations: "Are there cabins on Shasta Lake?" and "Are Shasta Lake cabins pet friendly?" with concise direct answers (feeds featured snippets and AI answers).
- LodgingBusiness schema: add `slogan` and ensure `name` reads "Silverthorn Resort — Shasta Lake Cabins" for entity matching.
- Update `public/llms.txt` cabins entry wording to match the new title phrasing.

### 4. Keep intact
- Existing schema (LodgingBusiness, ItemList, BreadcrumbList, FAQ), promo logic, prices, layout — untouched.

## Verification
- Typecheck + build.
- Render the page and confirm title/description/keywords and new FAQs appear in HTML.
- Reminder: changes reach the live URL on the next publish; rankings move over days–weeks, not instantly.
