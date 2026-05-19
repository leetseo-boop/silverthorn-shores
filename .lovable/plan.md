## Home page tweaks: Fleet section

Edit `src/components/SilverthornHomePage.tsx` only (`FleetSection` + `FleetCard`).

### 1. Enlarge the 4 houseboat cards
- Change houseboat image height from `h-40` → `h-56` (taller hero per card).
- Bump card title from `text-lg` → `text-xl`, tagline `text-xs` → `text-sm`.
- Increase grid gap `gap-4` → `gap-6`.

### 2. Shrink the Cabins + Small Boats images
- Replace `aspect-[4/3]` with `aspect-[16/9]` (shorter visual block).
- Constrain the whole Cabins/Small-Boats row to `max-w-4xl mx-auto` so it reads as a secondary row beneath the now-larger houseboat grid.

### 3. Add an inviting SEO bridge between houseboats and cabins/small-boats
Insert a short centered block between the two grids (after line 541, before line 543):

```
Beyond the Houseboats — Stay Longer, Play More
Settle into a pine-shaded lakeside cabin or grab a ski, fishing, or patio boat for the day. 
Mix and match your Shasta Lake adventure — on the water by day, by the fire at night.
```

- Eyebrow: "Complete your Shasta Lake stay" (orange, same style as "Our fleet").
- H3 with Playfair Display, ~`text-2xl`.
- Supporting line in muted body color.
- Spacing: `mt-16 mb-8`.

### Out of scope
No changes to data, routing, other sections, or styles outside `FleetSection`/`FleetCard`.
