## Goal
Polish the Thorn chat widget on mobile (iPhone/small screens) only:
1. Make the chat panel feel smaller / better scaled on phones.
2. Show the “Chat with Thorn 🐾” label next to the launcher avatar on mobile.

## Current state
From `src/components/ThornChat.tsx`:
- Launcher bubble: `<span className="hidden ... sm:inline-block">Chat with Thorn 🐾</span>` — hidden on mobile.
- Chat panel: `fixed right-2 left-2 ... h-[min(78dvh,620px)] ... sm:left-auto sm:right-5 sm:w-[390px]` — full-width minus small margins on mobile.

## Plan

### 1. Scale the panel down on mobile
Update the panel wrapper so mobile gets a tighter footprint while desktop keeps the existing `390px` width:
- Change mobile horizontal margins from `right-2 left-2` to `right-3 left-3` (or similar) so the panel floats inside the screen.
- Slightly reduce mobile max-height, e.g. `h-[min(72dvh,560px)]` vs. the current `h-[min(78dvh,620px)]`.
- Keep desktop rules untouched: `sm:left-auto sm:right-5 sm:w-[390px]`.

### 2. Add the chat bubble on mobile
- Remove `hidden sm:inline-block` from the launcher label.
- Make the label always render, but style it mobile-first:
  - Smaller text/padding on mobile (`text-[11px]` / `px-2.5 py-1`).
  - Position it so it sits next to the avatar without overflowing the viewport (the launcher is `right-3`, so the pill extends leftward).
  - Keep the existing larger pill on `sm:` screens.
- Ensure the launcher container still fits within ~320 px width (avatar + pill + safe-area margins).

### 3. Verify mobile framing
- Capture mobile screenshots at 375px and 320px viewports.
- Confirm no horizontal overflow, the bubble is readable, and the panel height leaves room for the on-screen keyboard.

## Files to edit
- `src/components/ThornChat.tsx` — launcher bubble visibility and panel mobile sizing.

## Out of scope
- No changes to Thorn logic, moods, admin, or desktop layout beyond the launcher/panel polish.
