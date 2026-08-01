## Goal

The floating Thorn launcher in the corner currently always shows the static "wave" pose. Make it show his live mood, the same one the chat header shows.

## Changes — `src/components/ThornChat.tsx`

1. **Launcher uses live mood**: swap the hardcoded `MOOD_IMAGES.wave` on the launcher button for `MOOD_IMAGES[mood]`, so whatever pose Thorn is in (thinking, helping, lifevest, houseboat, fishing, sunglasses, celebrate, resting) shows in the corner too.
2. **Smooth swap**: key the image by mood and add the same short fade-in used in the header so the pose changes gently instead of popping. Respect `prefers-reduced-motion`.
3. **Accessible label**: keep the button's `aria-label` stable ("Chat with Thorn…") so screen-reader users don't get a changing target, but let the mood come through in the button title/tooltip.
4. **Mood persists after closing**: right now closing and reopening leaves the mood wherever it was, which is what we want — but the launcher currently resets to `wave` only when reopened. Keep the last mood on the corner badge after the panel closes, and let the idle timer drift Thorn to `resting` after a minute of no activity even while closed, so an untouched page shows a napping Thorn rather than a frozen pose.
5. **Fresh visits**: with no conversation yet, the corner starts on `wave` exactly as today.

## Verify

Screenshot the corner launcher on desktop and mobile in three states — fresh page (wave), mid-answer (thinking), and after a policy answer (lifevest) — to confirm the pose changes, the size and drop shadow stay identical, and nothing shifts layout.
