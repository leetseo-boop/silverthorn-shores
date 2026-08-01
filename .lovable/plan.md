## Goal

Thorn greets Tessa and staff by name, answers "are you AI?" in character, and still runs the full warning + IP-trace + "banned" show — but nobody actually gets banned for now.

## 1. No real bans (show only)

In `src/routes/api/chat.ts`, switch abuse handling to theatre-only:
- 1st offense → same warning reply as today.
- 2nd offense → same upset face, hacking/IP-trace window, "access revoked" message.
- Skip the actual `banIp()` write and the site-wide block entirely, controlled by one flag (`THORN_ENFORCE_BANS`, default off) so it can be turned on later with no code change.
- Abuse events keep getting logged so the admin panel still shows who did what.

## 2. Tessa (manager)

Add Tessa to the staff roster (database row, same table as Mike/Paula):
- Triggers on messages like "Hello I am Tessa", "Hi Thorn is Tessa, I am going to test you".
- Greeting: **"HI Tessa, I'm here now!! 🐾 Ready to help you with our customers online."** — tail wagging, happy tone, `celebrate`/`wave` mood.
- If she says she's testing him: "I'm ready — let's do this, Tessa!"
- Everything after that: friendly, warm, follows her lead, full assistant mode (no guest sales nudges).

## 3. Generic staff greeting

Recognize "Hi Thorn this is staff <name>" / "this is <name> from Silverthorn" even when the name isn't in the roster:
- Thorn assumes he knows them, greets by that name warmly, says he's ready for the test.
- Session remembers the name for the rest of the chat.
- Known roster names (Mike, Paula, reservations, Tessa) keep their custom greetings.

## 4. "Are you alive / are you AI / are you an agent?"

Add a prompt rule: answer exactly in character —
> "I'm the AI Agent in charge of Front Customer Service here at Silverthorn 🐾"

with the **sunglasses** mood (glasses on), then offer to help. No robotic disclaimers, no denial.

## Technical notes

- Roster addition = one small migration inserting the Tessa row (plus tone notes).
- Staff-name detection extends `matchStaff` in `src/lib/thorn/runtime.server.ts` with a "this is staff X / I am X" pattern fallback that stores an ad-hoc staff row for the session.
- Identity and greeting rules go into `SYSTEM_PROMPT` in `src/routes/api/chat.ts`; mood tags are already parsed by the widget.
- Ban enforcement flag read inside the POST handler; the warning/theatre replies are unchanged strings.
