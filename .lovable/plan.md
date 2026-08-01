## Goal
Make Thorn look correctly framed and readable on phones without changing desktop.

## What I found on a 360×740 phone viewport
- The header status line ("Looking that up") **wraps to two lines**, which grows the header and crowds the three icon buttons next to the avatar.
- Answer links render as **raw paths** (`/houseboats/policy#cancellation`) — long, unbroken strings that can push the bubble wide; no word-breaking safety net.
- No horizontal scrolling and the panel is correctly inset (8px each side, sits above the safe area) — that part is already fine.

## Changes (all in `src/components/ThornChat.tsx`, plus a small tweak in `ThornTrace.tsx`)
1. **Header**
   - Single-line status with `truncate`, avatar `shrink-0`, buttons `shrink-0`.
   - Slightly smaller avatar and icon buttons under `sm:` so avatar + 3 buttons always fit at 320px.
2. **Message bubbles**
   - Add `break-words` / `overflow-wrap:anywhere` to user and assistant text so long URLs, codes and emails never overflow.
   - Render inline links with a friendly label instead of the bare path, and wrap long ones.
3. **Panel sizing**
   - Use `h-[min(85dvh,640px)]` style clamping so the transcript area keeps a stable height and the composer never gets pushed off when the mobile keyboard opens.
   - Keep bottom safe-area inset; ensure `max-h` accounts for the mobile URL bar via `dvh`.
4. **Composer**
   - Ensure 16px font size on the textarea at mobile widths so iOS doesn't zoom in on focus; keep 44px tap target on send.
5. **Launcher**
   - Keep it clear of the cookie banner and any sticky footer CTA on small screens; verify the 64px avatar doesn't overlap page content.
6. **Trace terminal** (`ThornTrace.tsx`)
   - Add `overflow-x-auto` + smaller mono text on mobile so the fake IP-trace lines don't stretch the panel.

## Verification
Re-run the phone-viewport screenshots (360px and 320px) for: launcher, empty state, long policy answer, trace sequence — checking no wrap-breaks, no horizontal scroll, composer visible.
