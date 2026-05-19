## Update cabin booking links

Change the "Check availability" / "View all availability" top-level booking URL on `/cabins` from `https://rentals.silverthornresort.com/category/9` to `https://rentals.silverthornresort.com/category/15`.

### File
- `src/routes/cabins.tsx` — update the `BOOKING_ALL` constant (line 29) only.

### Out of scope
Per-cabin `details/<id>` links remain unchanged (they point at specific units, not the category).