## Thorn — Silverthorn's AI guest assistant

A cartoon version of Thorn (the resort dog) as a floating AI chat assistant on every page, in the same illustrated mascot style as Squatch, with mood art that changes with the conversation.

### 1. Thorn character art (9 moods)

Generate a consistent cartoon Thorn from the uploaded photo — fluffy white American Eskimo / Spitz, cream-tipped ears, black nose, friendly open-mouth smile — rendered as a clean, warm, hand-illustrated 3D-ish mascot on transparent background, matching the Squatch style and the resort's sunset/orange palette.

Core set:
- `wave` — greeting, paw up (default idle)
- `helping` — round glasses on, attentive (used while answering)
- `thinking` — head tilt, paw to chin (while the AI is generating)
- `resting` — curled up napping (idle after inactivity)
- `celebrate` — happy jump, confetti (booking / good news)

Lake set:
- `houseboat` — standing on a houseboat deck
- `lifevest` — wearing an orange life vest
- `fishing` — holding a fishing pole
- `sunglasses` — sunglasses at the marina dock

Stored as CDN asset pointers in `src/assets/thorn/`, plus `src/lib/thorn-moods.ts` exporting the mood map, a keyword→mood detector, and a `[mood:xxx]` tag parser (same pattern as the Squatch project).

### 2. Chat widget

New `src/components/ThornChat.tsx`, mounted once in `src/routes/__root.tsx`:
- Floating Thorn avatar bottom-right with a "Chat with Thorn 🐾" pill; tap to open a panel
- Header shows current-mood Thorn, name, "Online" dot
- Streaming replies, markdown rendering, typing/thinking state (Thorn switches to `thinking`)
- Conversation kept in this browser only (single conversation, `localStorage`) — no accounts, no database
- Quick-start chips: "Houseboat rates", "Cabins", "Pet policy", "Directions", "Summer sale"
- Mobile-safe sizing, respects the existing safe-area/footer layout, and does not collide with the cookie banner
- Site color tokens (orange/secondary), never hardcoded colors

### 3. AI backend

New streaming route `src/routes/api/chat.ts` using Lovable AI + the AI SDK, key stays server-side.

Thorn's system prompt gets a resort knowledge brief compiled from what's already in the codebase: houseboat fleet (Queen I/II, Senator), cabins, small boats and decimal pricing, moorage slips, policies (age 21+, pets, deposits), marina store hours, directions, Shasta Lake info, employment, and the 20% BREAK20 summer sale.

Behavior rules:
- Friendly, short, dog-personality-lite (never gimmicky), first person as Thorn
- Nudges to book or call **800-332-3044** at natural moments, linking `/compare/queens`, `/houseboats`, `/cabins`, `/small-boats`, `/contact`
- Never invents rates or availability — defers to the phone/booking link when unsure
- Ends each reply with a hidden `[mood:xxx]` tag that drives the avatar art
- Rate-limit and error states surfaced in the panel, not silent failures

### 4. Polish

- `alt` text on every Thorn image, `aria-label`s on the launcher and panel, keyboard-closable
- Small "Meet Thorn" mention isn't added anywhere else unless you want it later
- Verify with a browser pass on mobile + desktop: no layout shift, no horizontal scroll, launcher not covering the footer CTAs

### Notes
- Image generation is the bulk of the cost here (9 illustrations); if any mood comes back off-model I'll re-roll just that one.
- Chat history stays in the visitor's browser, so no new database tables and nothing to moderate server-side.
