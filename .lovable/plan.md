## 1. Fleet knowledge Thorn should state

Add a small "fleet guidance" knowledge entry (new entries in `src/lib/thorn/kb-site.ts`, high search weight so it is retrieved on "best boat", "cheapest", "hot tub", "recommend"):

- **Queen is the flagship / best houseboat of the fleet** — most luxurious, hot tub + waterslide on the third deck, penthouse suite. Recommend it first when a guest asks "which is your best boat".
- **Senator has NO hot tub.** It is the **best-priced houseboat** in the fleet and still a great Shasta Lake boat — sleeps 16, waterslide, captain's fly bridge, full kitchen, swamp cooler. Recommend it for budget-minded groups.

Also add a one-line rule to the chat system prompt in `src/routes/api/chat.ts` so Thorn never claims a hot tub on the Senator.

## 2. Daily weather + lake level

The houseboats.com weather page renders its live numbers in the browser, so scraping it returns an empty block. To get the same data reliably, the nightly job will pull from the public sources that page is built on:

- **Weather** (Shasta Lake, 96003): Open-Meteo — today's high/low, conditions, and a short 3-day outlook. No API key.
- **Lake level**: CDEC station SHA — current elevation (ft), storage, and feet below the crest / full pool. No API key.

Pieces to build:

1. **Table `thorn_daily_conditions`** (one row per day: date, weather JSON, lake level JSON, fetched_at). Public read via anon SELECT so it can also be shown on-site later; writes only by the job.
2. **Hook `src/routes/api/public/hooks/thorn-conditions.ts`** — fetches both sources, writes the row. Protected with the existing `REVIEWS_REFRESH_SECRET` bearer, same as `thorn-learn`.
3. **pg_cron job at 00:00 PST** (08:00 UTC standard / 07:00 UTC during DST — scheduled at 08:00 UTC to match the existing jobs' convention) calling that hook.
4. **Chat wiring** — `src/routes/api/chat.ts` loads today's row (cached in memory per request cycle) and injects a compact "TODAY AT SHASTA LAKE" block into the system prompt: date, high/low, conditions, 3-day outlook, lake elevation and feet from full. Thorn cites the weather page as the source. If the row is missing or stale, that block is omitted and Thorn falls back to seasonal averages rather than guessing.

### Technical notes
- Job runs on the server only; both APIs are keyless HTTP GETs, so no new secrets.
- Data is read in the chat handler from the cached table, not fetched live per message, so chat latency is unchanged.
