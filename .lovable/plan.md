## Add "Lake Cabins" link to the related-pages strip on the Cabin Rental Policy page

Currently the "Plan the rest of your trip" section on `/cabins/policy` only links to Houseboats, Small Boats, and Pro Shop — but not back to the main Lake Cabins page itself. Since this is the cabin policy, the most relevant page to surface is `/cabins`.

### Change

In `src/routes/cabins.policy.tsx` (lines 617–640), update the related-pages grid:

- Switch grid from `md:grid-cols-3` to `md:grid-cols-2 lg:grid-cols-4`
- Prepend a new card as the first entry:
  - **Lake Cabins** → `/cabins`, icon `Home` (already used elsewhere in the file)
  - Description: "See all 8 lakeside cabins, photos, amenities, and the resort map."
- Keep the existing three cards (Houseboats, Small Boats, Pro Shop) as-is

Breadcrumb (`Home › Cabins › Rental Policy` at line 530–532) and the in-text deposit-row link to `/cabins` already work — no changes needed there.

### Files

- **Edit**: `src/routes/cabins.policy.tsx` (related-pages grid only)