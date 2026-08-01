## Goal

Give Thorn a Boatie-class brain and control room: full Silverthorn knowledge, nightly self-learning at 00:00 PST, a staff-facing admin dashboard, and a two-strike abuse system that ends in an IP ban.

## What exists today

- Thorn chat runs in `src/routes/api/chat.ts` (streaming, two static prompts) with facts in `src/lib/thorn-knowledge.ts` (~115 lines).
- `/admin` already has Supabase auth + `admin_users` + `is_admin()` and a booking-click dashboard — the new Thorn panels extend it.
- Boatie (Shasta Shores Reimagined) has: a knowledge search layer (`_search.ts`, `_pages.ts`, `_knowledge.json`, `_usda_shasta_trinity.ts`, `_fleet.ts`, `_guest_documents.ts`, `_silverthorn_documents.ts`, `_trip_prep.ts`, `_local_guide.ts`, `_page_faqs.ts`), a conservative EN/ES profanity detector with IP hashing, a staff roster + staff-session memory, learned-facts curation with an `approved` gate, and a weekly knowledge refresh job. All of it is portable.

---

## 1. Knowledge — Thorn learns the whole site

Port Boatie's retrieval layer into this project as plain TS modules under `src/lib/thorn/knowledge/`:

- **Site pages**: every Silverthorn route (houseboats + each boat, cabins, small boats + each boat, moorage, pro-shop, guest-info, pet policy, planning, Shasta Lake, exploring, compare/queens, FAQ, directions, contact, employment, legal pages) as title + URL + searchable text.
- **Prices**: houseboat and small-boat rates with decimals, pulled from `src/data/houseboats.ts` and `src/data/silverthorn-boats.ts` so they can never drift from the site.
- **Guest documents**: the PDFs on `/guest-info` summarized into fact blocks (contracts, check-in, cleaning list).
- **Shasta Lake + USDA Forest Service**: Boatie's scraped Shasta-Trinity / lake-conditions knowledge, copied over verbatim.
- **FAQs**: every on-page FAQ across the site.

A keyword-scored `searchKnowledge()` (Boatie's approach) picks the top passages per question and injects them into the prompt, so Thorn answers from real page content and always links the right page.

## 2. Nightly self-learning (00:00 PST)

New tables:

- `thorn_conversations` / `thorn_messages` — every chat turn, session id, hashed IP, tokens, latency.
- `thorn_learned_facts` — `topic, question, answer, source, hits, approved, created_at`.
- `thorn_knowledge_cache` — refreshed page snapshots with `fetched_at`.

New endpoint `src/routes/api/public/hooks/thorn-nightly.ts` (shared-secret protected, same pattern as `refresh-reviews`), scheduled with `pg_cron` at `0 8 * * *` UTC = 00:00 PST:

1. Re-fetch and snapshot every public site page into `thorn_knowledge_cache`.
2. Cluster the day's unanswered / low-confidence questions, draft candidate facts with the AI gateway, and insert them into `thorn_learned_facts` as **unapproved**.
3. Only `approved = true` facts ever enter the live prompt — you approve them in the dashboard. This is exactly Boatie's safety gate and prevents Thorn from teaching itself something wrong.

## 3. Staff greetings

`thorn_staff_roster` table (`staff_name, display_name, greeting, tone_notes, is_active`) seeded with Boatie's current staff entries (Mike, Paula, etc. — editable later in the dashboard). When someone identifies by name, Thorn opens with their personal greeting and remembers it for the session via `thorn_staff_sessions`.

## 4. Abuse: warn → scare → ban

In the chat route, before any model call:

- **Offense 1** — profanity detected (Boatie's EN/ES detector, whitelist included): Thorn switches to a new **upset** mood image and gives one clear warning that continuing means losing access.
- **Offense 2** — the chat panel renders a fake terminal overlay ("tracing connection… resolving IP 76.14.x.x… logging incident…"), then the IP hash is written to `thorn_banned_ips`.
- **Banned** — the chat API returns 403 for that IP hash, and a lightweight middleware in `src/server.ts` blocks banned IPs from the site with a plain "access revoked" page.

Only a salted SHA-256 hash plus a masked preview (`76.14.23.x`) is stored — never the raw IP. Bans are reversible from the dashboard.

## 5. Thorn admin dashboard

Extend `/admin` with tabs (auth already handled by `is_admin()`):

- **Overview** — chats today / 7d / 30d, top questions, hand-off rate, average reply time.
- **Conversations** — searchable transcript viewer.
- **Knowledge** — approve / edit / reject nightly learned facts; see when each page snapshot was last refreshed; trigger a refresh manually.
- **Abuse** — offense log, currently banned IPs, one-click unban.
- **Staff** — edit roster names, greetings, and tone.
- **Cost** — token usage and estimated AI spend per day.

## Technical notes

- Everything server-side stays in TanStack `createServerFn` / server routes — no new edge functions. Boatie's Deno code gets adapted, not copied as-is.
- New tables get RLS: admin-only read via `is_admin()`, writes by the service role only; plus the required `GRANT`s.
- One new secret for the nightly hook (`THORN_CRON_SECRET`).
- New `upset` mood asset generated in the existing Thorn cartoon style and wired into `src/lib/thorn-moods.ts`.

## Out of scope

- No changes to public page design or copy.
- No changes to booking, reviews, or existing analytics.
