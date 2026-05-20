## Plan: GA4 + Admin Booking-Click Dashboard

### Goal
Track every outbound "Book Now" click with UTM params, send to both GA4 and Lovable Cloud, expose a private admin dashboard at `/admin` (login: leetseo@gmail.com / password) with per-boat, per-page, per-source stats.

### 1. GA4 integration
- Add Google Analytics 4 (`G-QT7MJVJMQM`) via gtag snippet injected in `src/routes/__root.tsx` `<head>`.
- Fire a `book_now_click` event on every booking link with params: `boat_id`, `source_page`, `cta_location`.

### 2. UTM helper + shared `BookNowLink` component
- New `src/lib/booking-link.ts`:
  - `appendUTM(url, { source_page, cta_location, boat_id })` → adds `utm_source=website`, `utm_medium=book_now`, `utm_campaign=<source_page>`, `utm_content=<cta_location>`, `utm_term=<boat_id>`.
- New `src/components/BookNowLink.tsx`:
  - Wraps `<a target="_blank" rel="noopener">`.
  - On click: (a) fires GA4 event, (b) inserts a row into Lovable Cloud `booking_clicks` table via the public anon client, (c) navigates.
- Replace every existing outbound `rentals.silverthornresort.com` `<a>` in:
  - `SilverthornHomePage.tsx` (3 CTAs)
  - `HouseboatsFleetPage.tsx` (3 CTAs incl. per-boat)
  - `SilverthornBoatDetail.tsx` (2 CTAs)
  - `pro-shop.tsx` (3 CTAs)
  - `cabins.tsx` (per-cabin + 2 footer CTAs)
  - `data/houseboats.ts` + `data/silverthorn-boats.ts` URLs stay raw; UTM applied at render via `BookNowLink`.

### 3. Lovable Cloud — backend
**Tables (migration):**
- `booking_clicks` — `id`, `boat_id` (nullable text), `source_page` (text), `cta_location` (text), `destination_url` (text), `referrer` (text nullable), `user_agent` (text nullable), `created_at` (timestamptz default now()).
  - RLS: anyone (anon) can `INSERT`. Only admins can `SELECT`.
- `admin_users` — `user_id` (uuid PK → auth.users), `created_at`. RLS: only the row owner can read their own row.
- `has_admin_role(uid)` SECURITY DEFINER function used in `booking_clicks` SELECT policy.
- Seed: insert `leetseo@gmail.com` user id into `admin_users` after signup (instruction shown to user post-build).

**Auth:** enable email+password, disable auto-confirm OFF per user request? Will set `auto_confirm_email: true` so the single admin email signs in immediately without inbox setup. Confirm OK.

### 4. Admin dashboard (private)
- `/admin/login` route — email+password form using `supabase.auth.signInWithPassword`.
- `_authenticated` layout gate already exists pattern; create `_authenticated.admin.tsx` checking `has_admin_role`.
- `/admin` page shows:
  - Totals (today / 7d / 30d / all-time).
  - **Clicks by boat** (bar chart + table).
  - **Clicks by source page** (table).
  - **Clicks by CTA location** (table).
  - Raw recent clicks table (last 100, with destination URL).
- Data fetched via `createServerFn` with `requireSupabaseAuth`, calling `supabase.from('booking_clicks')` (RLS limits to admin).
- `<meta name="robots" content="noindex">` on `/admin*`.

### 5. Files to add / modify
**New:**
- `src/lib/booking-link.ts`
- `src/components/BookNowLink.tsx`
- `src/lib/admin.functions.ts` (stats server fns)
- `src/routes/admin.login.tsx`
- `src/routes/_authenticated.tsx` (if not present)
- `src/routes/_authenticated.admin.tsx` (layout + role gate)
- `src/routes/_authenticated.admin.index.tsx` (dashboard)

**Modify:** `__root.tsx` (GA4 snippet + noindex on /admin), all booking-CTA files listed above.

### 6. Out of scope (per user)
- Sitemap / crawl tasks (#2) — deferred until after migration.

### Confirmation needed before I implement
1. Auto-confirm the admin email so you can log in without email verification? (Recommended yes since it's just you.)
2. Password — you'll set it on the signup form once `/admin/login` is built; OK?
