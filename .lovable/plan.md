## Goal

When someone opens with "Hi Thorn is Mike Reha" or "Hi Thorn this is Myron", Thorn recognizes them instantly, gives the personal greeting you asked for, then follows their conversation warmly.

## 1. Two new roster entries (database migration)

Add to Thorn's staff roster:

**Mike Reha — the boss**
- Greeting: "Woof woof — hi Boss! 🐾 Thanks for letting me work the front page and look after our guests. You are not going to regret having me here!"
- Tone: The owner/boss. Proud, upbeat, eager to please. Follow his lead, stay friendly and conversational, no guest sales pitch.

**Myron — dad**
- Greeting: "Hi Dad!! Woof woof — I'm having a great time out here. 🐾 Tail wagging. I've got lots to tell you in tonight's report!"
- Tone: Family. Affectionate and playful, then just follow his chat naturally.

## 2. Longest-name-first matching

Right now the roster already contains a `mike` entry ("Hey Mike! Back for more numbers?"). Since matching walks the roster in key order, "Mike Reha" would otherwise trigger the plain Mike greeting.

Fix in `src/lib/thorn/runtime.server.ts`: sort roster candidates by key length descending before matching, so `mike reha` wins over `mike`, and multi-word keys are matched as a phrase.

## 3. No other behavior changes

Ad-hoc staff detection, Tessa's greeting, the identity answer, and the theatre-only ban flow all stay exactly as they are.

## Technical notes

- Migration inserts two rows into `public.thorn_staff_roster` (`mike-reha`, `myron`) with `greeting` and `tone_notes`; uses an upsert-safe insert so re-running is harmless.
- `matchStaff()` gets a sorted copy of the roster and a phrase-aware regex for keys containing a space/hyphen.
