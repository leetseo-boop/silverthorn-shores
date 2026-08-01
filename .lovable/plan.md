## Thorn chat: accessibility, a Policies & Booking mode, and live moods

Three upgrades to the Thorn assistant, all inside the chat widget and its server route.

### 1. Accessibility and readable contrast

`src/components/ThornChat.tsx`

- **Keyboard flow**: focus moves into the panel when it opens and returns to the launcher when it closes; Escape closes from anywhere inside (currently only from the panel wrapper); Tab is trapped inside the open panel so focus can't wander behind it into the page.
- **Focus states**: visible `focus-visible` ring on the launcher, close/reset buttons, quick-ask chips, send button and textarea, using the site's primary token so it reads on both the dark header and light body.
- **Screen readers**: the transcript becomes an `aria-live="polite"` log so new replies are announced; each message gets a "Thorn said" / "You said" label; the loading line and error box are announced; the launcher's dog image is marked decorative since the button already has a label.
- **Contrast + targets**: the footer disclaimer and "Resort dog & guest helper" subline move off low-opacity text onto proper tokens; all icon buttons get a 44×44 minimum tap target on touch screens; panel height switches to `dvh` units so mobile browser chrome can't clip the composer.
- Verify with a keyboard-only pass and screenshots at phone, tablet and desktop widths.

### 2. "Policies & Booking" quick mode with citations

New file `src/lib/thorn-knowledge.ts` — a single source of policy facts pulled from what's already on the policy pages (deposit tiers, the cancellation windows, check-in 3–6 PM / check-out 9–10 AM, age 21+ and license, pets, fuel, parking), each entry carrying the page anchor it came from, e.g. `/houseboats/policy#cancellation`, `/cabins/policy#cancellation`, `/guest-info`.

- A **Policies & Booking** toggle in the chat header. When on, the request tells the server to use a stricter policy persona: answer only from the stored policy facts, never improvise a number, and end each answer with the pages it drew from.
- `src/routes/api/chat.ts` gains that second prompt mode and injects the policy facts block. The model returns sources as a compact trailing tag; the widget parses it and renders **citation chips** ("Houseboat policy — Cancellation") that link straight to the section anchor.
- When policy mode is off, Thorn behaves exactly as today.
- Quick-ask chips in policy mode change to: Cancellation, Deposits, Check-in / check-out, Pets, Age requirement.

### 3. Automatic mood switching

`src/lib/thorn-moods.ts` and the widget

- Moods already switch from the model's tag; this makes them react during the conversation too: **thinking** the moment a question is sent, a **topic mood** as the answer streams in (houseboat, fishing, lifevest for rules/safety, sunglasses for summer/the sale, celebrate for booking talk), and **resting** after the panel sits idle.
- Adds **directions/travel** detection (directions, drive, map, address, how far, GPS, I-5, Redding) mapped to a travel-appropriate mood, plus greeting/goodbye → wave.
- Avatar swaps cross-fade instead of hard-cutting, and respect `prefers-reduced-motion`.
- Mood images keep their descriptive alt text so the change is conveyed to screen readers as well.

### Technical notes

- Policy facts live in one typed module so the chat and the policy pages can't drift; the module is imported by the server route only (no extra client weight).
- Citation parsing reuses the existing trailing-tag approach already used for `[mood:...]`, so streaming never flashes raw tags on screen.
- No database, no new dependencies; the existing Lovable AI gateway route handles both prompt modes.

### Verification

- Keyboard-only run: open, tab through every control, send a message, close with Escape, confirm focus returns to the launcher.
- Ask a cancellation question in policy mode and confirm the answer matches the policy page and the citation chip links to the right anchor.
- Confirm moods change across a directions question, a fishing question and a booking question.
