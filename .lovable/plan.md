## Fix Pro Shop page duplicates + booking links

**File**: `src/routes/pro-shop.tsx`

1. **Remove double nav/footer** — root layout (`src/routes/__root.tsx`) already renders `<Nav />` and `<Footer />` for every route. Delete the local `<Nav />` (line 107) and `<Footer />` (line 330) from `pro-shop.tsx`, and drop the unused `Nav, Footer` import.

2. **Update booking URL** — change the `BOOKING_URL` constant from `https://rentals.silverthornresort.com` to `https://rentals.silverthornresort.com/category/14`. All "Reserve Gear", "Reserve now", "Book Now", and JSON-LD offer URLs already reference this constant, so updating it once fixes every CTA on the page.

No other files change.