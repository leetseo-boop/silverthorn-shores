## Show full decimal prices on Small Boats pages

The prices in the badges are being rounded to whole dollars via `.toFixed(0)`. The image shows they should display with cents (e.g. `$548.63/day`, `$1243.55/day`).

### Changes

1. **`src/routes/small-boats.tsx`** (line 247) — fleet card badge:
   - `From $${b.price.toFixed(0)}/day` → `$${b.price.toFixed(2)}/day`

2. **`src/components/SilverthornBoatDetail.tsx`** (line 241) — "Related boats" cards on each individual boat page:
   - `From $${r.dailyPrice.toFixed(0)}/day` → `$${r.dailyPrice.toFixed(2)}/day`

All other price displays already use `.toFixed(2)` (hero, pricing table, JSON-LD) and stay unchanged.