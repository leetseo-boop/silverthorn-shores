## Plan: Moorage updates

### Changes

1. **Update Moorage email address**
   - File: `src/routes/moorage.tsx`
   - Change `EMAIL` constant from `silverthornmoorage@houseboats.com` to `reservations1@silverthornresort.com`.
   - This automatically updates the hero "Email Marina" CTA, the contact CTA at the bottom, all `mailto:` links, and the JSON-LD schema email field.

2. **Move Moorage from top-level nav to About submenu**
   - File: `src/components/SilverthornHomePage.tsx`
   - Remove the standalone `Moorage` object from `NAV_LINKS`.
   - Add `{ label: "Boat Slips", href: "/moorage" }` to the `About` submenu children array.
   - Both desktop dropdown and mobile accordion will reflect the new location.

3. **Add Moorage to footer Stay column**
   - File: `src/components/SilverthornHomePage.tsx`
   - In the Footer component, add `{ label: "Moorage", href: "/moorage" }` inside the `Stay` column links, positioned immediately after `Cabin Policy`.

### Notes
- No new routes or pages are created.
- The `/moorage` route itself remains unchanged except for the email constant.
- Keep existing styling, icons, and booking/CTA tracking attributes intact.