## Goal

Thorn should feel like a capable assistant that answers everything he can, instead of a widget that constantly points people to the phone.

## 1. Remove the footer line

In `src/components/ThornChat.tsx`, delete the composer footer paragraph "Thorn is an AI helper — for availability call 800-332-3044" and tighten the surrounding spacing so the input sits cleanly at the bottom on mobile and desktop.

## 2. Retune the general prompt (`src/routes/api/chat.ts`)

Current rules force a phone nudge into most answers. Change them to:

- Answer the guest's question fully and directly from the resort knowledge first. Never end an answer with a phone number by reflex.
- Only surface the reservations line (800-332-3044 / reserve1@houseboats.com) when one of these is true:
  - the guest asks to speak to a person or a real human,
  - the guest wants live availability, a custom quote, or to change/cancel an existing booking,
  - the answer genuinely isn't in Thorn's knowledge.
- For booking intent, prefer linking the on-site booking pages over the phone number.
- Keep "never invent prices, dates, or availability" — but instead of deflecting to the phone, point to the specific rate/boat page that holds the real numbers.

## 3. Retune the Policies & Booking prompt

Same principle in strict mode: answer from the policy facts and cite the source pages. Only mention the phone number when the detail truly isn't in the facts, or when the guest asks for a human.

## 4. Verify

Run a few live prompts against `/api/chat` (a rate question, a policy question, a "can I talk to someone" question) and confirm the phone number appears only in the human-handoff case, then screenshot the widget to confirm the footer is gone and layout is correct on mobile.

## Technical notes

Only `src/components/ThornChat.tsx` (footer removal) and `src/routes/api/chat.ts` (`SYSTEM_PROMPT` and `POLICY_PROMPT` wording) change. No schema, routing, or knowledge-base changes.
