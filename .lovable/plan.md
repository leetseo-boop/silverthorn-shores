## SEO meta — homepage & fleet pages

Each of these routes already has a `head()` block, but the titles, descriptions, and OG/canonical wiring are inconsistent. This plan tightens them into a coherent, keyword-targeted set and fills the gaps.

### Scope (4 routes)

1. `src/routes/index.tsx` — Homepage
2. `src/routes/houseboats.index.tsx` — Houseboats fleet
3. `src/routes/cabins.tsx` — Cabins
4. `src/routes/small-boats.tsx` — Small boats / day rentals

Out of scope: individual boat detail pages, about/history, contact, FAQ. Those already have their own metadata or aren't fleet pages.

### Per-page changes

**Homepage (`/`)**
- Title: `Silverthorn Resort — Shasta Lake Houseboat Rentals, Cabins & Boat Marina`
- Description (~155 chars): `Family-run Shasta Lake resort on the Pit River Arm. Premium houseboat rentals, lakeside cabins, jet skis, wakeboard & patio boats. Booking 2026 now.`
- Add: `og:title`, `og:description`, `og:type=website`, `og:url`, `og:image` (hero marina, absolute), `twitter:card`, `twitter:image`, canonical `/`.

**Houseboats (`/houseboats`)**
- Tighten title to ~60 chars: `Shasta Lake Houseboat Rentals | Silverthorn Resort Fleet`
- Description: `Rent the Queen, Queen I, Queen II or Senator houseboat on Shasta Lake. Hot tubs, waterslides, sleeps up to 20. Pit River Arm marina — book 2026.`
- Keep existing JSON-LD (ItemList, Breadcrumb, FAQ).

**Cabins (`/cabins`)**
- Title: `Shasta Lake Cabin Rentals | Silverthorn Resort Lakeside Cabins`
- Description: `8 lakeside cabins on Shasta Lake sleeping 4–8. Full kitchens, BBQs, DirecTV, one boat slip per cabin. Bring your own boat or rent at the marina.`
- Add `og:image` (use an existing cabin hero) + `twitter:image`.

**Small Boats (`/small-boats`)**
- Title: `Shasta Lake Boat Rentals | Pontoons, Jet Skis & Wakeboard Boats`
- Description: `Daily rentals on Shasta Lake — pontoons, jet skis, wakeboard & deck boats, fishing boats, kayaks & SUPs from $78/day at Silverthorn Resort marina.`
- Already has full OG/Twitter/canonical/JSON-LD — keep as-is.

### Cross-cutting

- Use absolute URLs for `og:url`, `og:image`, and canonical (`https://silver-shasta-dreams.lovable.app`) per the head-meta knowledge file. Relative URLs in og:image are rejected by some crawlers.
- Keep titles ≤ 60 chars and descriptions ≤ 160 chars where possible.
- Single source of truth per route — no new shared SEO helper, just inline in each route's `head()`.

### Out of scope

- No component/UI changes.
- No new images generated.
- No changes to JSON-LD beyond what's noted.
- Root route metadata stays as it is (no canonical at root — leaf-only, per project convention).