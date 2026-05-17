## Image updates to home page (`src/components/SilverthornHomePage.tsx`)

### 1. Copy uploaded images into project
- `user-uploads://silverthornresort-shastalake2026-optimized.webp` → `src/assets/home-hero-marina.webp`
- `user-uploads://LakeCabinSilverthornResort-ShastaLake-optimized.webp` → `src/assets/home-cabin.webp`
- `user-uploads://Axis-Small-Boat-optimized.webp` → `src/assets/home-small-boats.webp`

Import each as an ES6 module at the top of `SilverthornHomePage.tsx`.

### 2. Hero section (`Hero`, lines ~352–432)
Replace placeholder `/images/hero-shasta-lake.jpg` with the imported `home-hero-marina.webp`. Keep current dark overlay/opacity so the headline stays legible; bump opacity slightly (e.g. `opacity-60`) since the new photo is bright.

### 3. Houseboat fleet cards (`FleetCard`, lines ~435–502)
Add an `image` field to each entry in the `FLEET` array using the first hero image already defined in `src/data/houseboats.ts`:
- queen → `/images/queen-houseboat-exterior-lifestyle-anchored-silverthorn-resort.jpg`
- queen-i → `/images/queen-i-houseboat-shasta-lake-01.jpg`
- queen-ii → `/images/queen-ii-houseboat-silverthorn-resort-shasta-lake-exterior.jpg`
- senator → `/images/senator-houseboat-exterior-running-shasta-lake.jpg`

Replace the emoji/colored placeholder `<div>` with an `<img>` filling the card thumbnail (`h-40 object-cover`), keeping the badge chip overlay.

### 4. Lake Cabins card (lines ~537–567)
Replace the 🏡 placeholder block with the imported `home-cabin.webp` (`h-32 object-cover`), keep the "Cabins" badge overlay.

### 5. Small Boat Rentals card (lines ~569–599)
Replace the ⛵ placeholder block with the imported `home-small-boats.webp` (`h-32 object-cover`), keep the "Day Boats" badge overlay.

### Notes
- Pure presentation change — no logic, routes, or data files modified beyond adding `image` keys in the FLEET array.
- Each `<img>` gets a descriptive `alt` for SEO.
- No new dependencies.