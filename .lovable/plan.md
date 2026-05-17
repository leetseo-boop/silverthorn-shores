## Goal
Create a new modern, SEO-optimized **Cabins** page at `/cabins` for Silverthorn Resort on Shasta Lake — no hero image, map up top, 8 cabin cards (Cabin #6 marked unavailable), and a content-rich body that targets "Shasta Lake cabins", "Silverthorn cabins", "lake cabins", and family/bring-your-own-boat lodging keywords.

## Route
- New file: `src/routes/cabins.tsx` → URL `/cabins`
- Add a "Cabins" link to the main nav (wherever houseboats/small-boats currently live).
- Full `head()` block: title, meta description, og:title/description/url/type=website, canonical, JSON-LD `LodgingBusiness` + `BreadcrumbList` + `FAQPage` (3–4 Qs about pets, slips, min stays, BYOB).

## Page structure (no hero image)

1. **Page header** (compact, no image)
   - H1: "Shasta Lake Cabins at Silverthorn Resort"
   - Sub: short intro line + 2 CTAs ("Check Availability" → category/9, "Call 800-332-3044").

2. **Resort map section** (instead of hero)
   - Use the uploaded `official_silverthorn_cartoon_map_shasta_lake.png` (copy to `src/assets/silverthorn-resort-map.png`).
   - Display full-width, rounded, with a caption "Silverthorn Resort area map — cabin locations C1–C8".
   - Below the map, a compact **legend strip** with 7 chips (C1, C2, C3, C4, C5, C7, C8) — each chip is a button that scrolls to the matching cabin card. C6 chip is shown but disabled / muted ("Unavailable").
   - (We are not pixel-pinning markers onto the image — chips below are the locator; the map already has C1–C8 labels printed on it.)

3. **About our Cabins** (intro copy block, mirrors source)
   - Pulled from silverthornresort.com/cabins copy: 8 cabins, studios that sleep 4 up to 2-bed sleeping 8, accessible unit available, full kitchens, patios, gas BBQs, short stroll to marina, 1 boat slip per cabin included.
   - Mention high season (June 11 – Aug 19 2026, 7-night min), off-season 3-night min, rates include all booking fees + 10% occupancy tax.

4. **Cabin cards grid** (7 active + 1 unavailable, responsive grid: 1 col mobile / 2 tablet / 3 desktop)
   - One card per cabin with anchor IDs `#cabin-1` … `#cabin-8`.
   - Each card: photo, "Cabin #N — <type>" title, sleeps badge, beds layout, amenities line, starting weekly + 3-night rates, "Book Now" button (`target="_blank"` + `rel="noopener noreferrer"`).
   - Card data (from source page):
     - **C1** Studio · sleeps 4 · double bed + sofa sleeper, full kitchen, BBQ · $1,514.84/wk · $649.22 (3 nt) · https://rentals.silverthornresort.com/details/30
     - **C2** 2-Bedroom · sleeps 6 · 2 doubles + futon · $2,316.34/wk · $992.72 · https://rentals.silverthornresort.com/details/31
     - **C3** Accessible Studio · sleeps 5 · full bed + bunk · $1,514.84/wk · $649.22 · https://rentals.silverthornresort.com/details/32
     - **C4** 1-Bedroom · sleeps 4 · $1,755.29/wk · $752.27 · https://rentals.silverthornresort.com/details/33
     - **C5** Studio · sleeps 4 · $1,514.84/wk · $649.22 · https://rentals.silverthornresort.com/details/34
     - **C6** Studio · sleeps 4 · **Not available** — card rendered grayscale with "Currently unavailable" badge, no link.
     - **C7** 1-Bedroom (2nd deck, Trinity Forest + Shasta Lake views) · sleeps 4 · $1,835.44/wk · $786.62 · https://rentals.silverthornresort.com/details/36
     - **C8** Family Cabin, 2-bed (queen, full, 2 futons, wood stove, Jacuzzi, 2nd-story deck) · sleeps 8 · $2,316.34/wk · $992.72 · https://rentals.silverthornresort.com/details/37
   - Bottom of grid: "View all cabin availability" → https://rentals.silverthornresort.com/category/9 (new tab).

5. **SEO content sections** (rich text, internal links, designed not dumped)
   - **Why stay in a Shasta Lake cabin** — proximity to marina, full kitchens, BBQs, family-friendly.
   - **Bring your own boat** — one slip included per cabin, courtesy dock, boat ramp on site, fuel + pro shop on the main dock; additional slips on request. Internal links to /houseboats, /small-boats, /pro-shop, /directions.
   - **Family reunions & groups** — combining cabins, group rates, BBQ areas, grassy tree trail.
   - **What's nearby** — Trinity Forest, Shasta Lake fishing, swimming, waterskiing, wakeboarding.
   - **Cabin amenities at a glance** — icon grid (full kitchen, full bath, DirectTV, BBQ, deck, linens, slip included).
   - **Booking & stay policies** (short summary linking to `/houseboats/policy`): high season 7-night min, off-season 3-night min, total price disclosure, 10% occupancy tax included.
   - **FAQ** (also emitted as FAQPage JSON-LD): pets? boat slip included? min stay? accessibility? check-in time?

6. **Final CTA band** — "Plan your Shasta Lake getaway" + phone + Book Now button.

## Build order (asks for one photo per turn)
I will implement the route shell, the map section, the intro copy, the SEO sections, the FAQ, and the JSON-LD in the first build pass with **placeholder image slots** for the 7 active cabin cards. Then I will ask you for the main photo for **one cabin at a time**, in this order, and wire each into its card before moving to the next:

1. Cabin 1 main pic
2. Cabin 2 main pic
3. Cabin 3 main pic
4. Cabin 4 main pic
5. Cabin 5 main pic
6. Cabin 7 main pic
7. Cabin 8 main pic

(Cabin 6 stays as a stylized "Unavailable" card — no photo needed.)

Each upload will be copied to `src/assets/cabin-<n>.jpg`, optimized to ~250 KB JPEG at 1600px wide (same ImageMagick pipeline used for the policy hero), and imported as an ES module into the card.

## Technical notes
- Tailwind + existing design tokens (`navy`, `lake`, `sand`, orange `primary`). No new color literals.
- `<Link>` from `@tanstack/react-router` for internal nav; plain `<a target="_blank" rel="noopener noreferrer">` for rentals.silverthornresort.com.
- Map image: `<img loading="lazy" decoding="async" width/height>` to keep CLS at 0.
- Accessibility: each cabin card is a section with `aria-labelledby`, the C6 unavailable card has `aria-disabled="true"`.
- Add the route to nav and to the routeTree (auto-generated by the TanStack plugin once `src/routes/cabins.tsx` exists).

## Out of scope
- No new backend, no booking system in-app (all booking goes to rentals.silverthornresort.com).
- No edits to existing houseboat pages beyond adding a "Cabins" nav link.
