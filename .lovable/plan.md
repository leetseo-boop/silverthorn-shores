## Goal

Make `/houseboats/policy` and `/cabins/policy` feel modern and effortless to navigate, scan, and read on a phone — without changing the desktop / tablet / TV experience. Same content, same routes, same SEO — only mobile-side layout, density, and interaction improvements.

## Mobile pain points today

- Hero has heavy vertical padding (`py-20`), title sits low, CTA buttons wrap awkwardly.
- "On this page" table of contents collapses into a thin horizontal scroller — easy to miss and hard to use one-handed.
- Deposit / Permits tables use 3-column grids on phones; rental name + values are cramped and the link text wraps.
- Section cards use 24 px padding on phones, eating valuable width.
- No quick way to jump back to the top from a long scroll.
- Call / Email CTAs only live at the very top and bottom of a long page.

## What changes (mobile only, ≥ `md:` preserved)

### Both pages

1. **Hero** — tighten mobile spacing
   - `py-20 md:py-32` → `py-12 sm:py-16 md:py-32`.
   - CTA row: `flex-col w-full` on phones, `sm:flex-row sm:w-auto` from sm up. Buttons get `w-full sm:w-auto`, larger 48 px touch target.
   - Eyebrow chip and `<p>` get tighter mobile margin.

2. **Sticky mobile TOC (new)** — replace the horizontal scroller with a collapsible accordion bar shown only `lg:hidden`
   - Sticky just under the global nav (`sticky top-16 z-30`), sand background with subtle border.
   - Closed state shows "On this page" + chevron; tapping reveals the section list as full-width tap targets that smooth-scroll to anchors and auto-collapse.
   - Desktop sidebar TOC stays exactly as-is (`hidden lg:block`).

3. **Section cards** — reduce mobile chrome
   - Padding `p-6 md:p-8` → `p-5 sm:p-6 md:p-8`.
   - Section heading: icon tile shrinks to 36 px on mobile; title size unchanged from `md:` up.
   - Card stack gap `space-y-5` stays.

4. **Tables → mobile stack** (Deposits, Permits, cabins Deposits)
   - Wrap table in `hidden sm:block`.
   - Add `sm:hidden` stacked card list with the same data: each row becomes a small white card with the rental name on top (link, lake color) and the amount(s) on the right in orange. Holiday / standard get distinct labels.
   - No data changes, no link changes.

5. **Quick reference cards** — already `sm:grid-cols-3`; on phones reduce padding `p-5 → p-4` and align icon left of label for a tighter horizontal card.

6. **Floating "Back to top" button** — `fixed bottom-4 right-4 lg:hidden`, appears after 600 px scroll, 44 px circle, navy background, orange icon, smooth scroll. Lightweight inline component (no new deps).

7. **Final CTA section** — on mobile stack heading + buttons full-width; buttons become 48 px tall with `w-full`.

### Houseboats policy specific

- Cancellation tier list: gap from `gap-4` → `gap-3` on mobile so the colored dot sits closer to text; no visual change ≥ sm.

### Cabins policy specific

- Same set of changes, applied to its hero, sections, deposit table, related-links grid, and CTA.

## What does NOT change

- Routes, file paths, route metadata, JSON-LD, SEO copy.
- Desktop / tablet layouts at `md:` and `lg:` breakpoints (sidebar TOC, 3-up related grid, full table layout, hero scale).
- Brand tokens (`NAVY`, `ORANGE`, `SAND`, Playfair / DM Sans), copy, links, deposit amounts.
- Any business logic.

## Technical notes

- All work is in `src/routes/houseboats.policy.tsx` and `src/routes/cabins_.policy.tsx`.
- Mobile TOC + Back-to-top are small local components inside each route file (no new files, no new deps), using `useState` + `useEffect` with a scroll listener (cleanup on unmount).
- Tailwind `sm` = 640 px and `lg` = 1024 px; the current viewport (390 px) gets the new mobile layout, ≥ sm keeps current behavior, ≥ lg keeps the sidebar TOC.
- No changes to `src/routeTree.gen.ts` or any shared component.
