## Goal
On the Houseboat Rental Policy page (`/houseboats/policy`), make the boat-category and shop references clickable so users can jump to:
- patio boats / wakeboard boats → `/small-boats`
- luxury houseboats → `/houseboats`
- Silverthorn Pro Shop → `/pro-shop`

## Changes — `src/routes/houseboats.policy.tsx`

### 1. Turn the Deposits table boat labels into links
Extend the `DEPOSITS` row shape with an optional `to: string` and render `d.boat` as a `<Link to={d.to}>` (lake-blue, underline-on-hover) when present:
- "Queen, Queen I, Queen II" → `/houseboats`
- "Presidential, Senator, Executive" → `/houseboats`
- "Wakeboard Boats" → `/small-boats`
- "Patio Boats & Fishing Boats" → `/small-boats`
- "Cabins" → `/cabins`

Same for the Parking Permits (`PERMITS`) table boat column: link rows that reference houseboats to `/houseboats`.

### 2. Add a "Plan the rest of your trip" related-pages strip
Just above the final CTA section at the bottom of the policy page, render a 3-card row of internal links so the user can pivot from policy → product pages:
- Luxury houseboats → `/houseboats` (Ship icon)
- Patio & wakeboard boats → `/small-boats` (Anchor icon)
- Silverthorn Pro Shop → `/pro-shop` (Store icon)

Each card: title, one-line description, hover lift. Uses `<Link>` from `@tanstack/react-router`, existing design tokens (`--navy`, `--lake`, `--sand`), no new colors.

No data, SEO, or other section changes.

## Files touched
- `src/routes/houseboats.policy.tsx` (DEPOSITS shape + table cell, related-pages strip)
