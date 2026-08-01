## Problem

The homepage hero uses a YouTube iframe as a background video. On mobile (especially iOS Safari and Android Chrome with data-saver / low-power mode), the embed loads and shows its first frame but never starts playing. Two things in the current setup make that likely:

- The iframe is inside a `pointer-events-none` wrapper, so the browser can never register a user gesture on the player — and mobile browsers frequently require one before starting playback, even when muted.
- The embed is mounted only after `window load` with plain URL params and no player API, so there's no way to detect "not playing" and retry.

## Fix

1. Load the YouTube IFrame Player API and create the hero player through it (instead of a bare `<iframe src>`), keeping the same video, mute, loop, and `playsinline` behavior.
2. After the player reports ready, explicitly call `mute()` + `playVideo()`. Re-check state shortly after; if it is still not playing, retry once.
3. Add a one-time gesture fallback: listen for the first `touchstart` / `pointerdown` / `scroll` on the page and call `playVideo()` again, then remove the listeners. This satisfies the mobile gesture requirement without any visible UI change.
4. Keep the existing static hero image as the background behind the player, so the hero always looks correct whether or not video plays (no layout shift, no LCP regression).
5. Leave the overlay gradient, promo pill, and all hero content untouched; the player stays non-interactive and `aria-hidden`.

## Verification

Load the homepage in a mobile-sized Chromium session, wait past load, and confirm the player reports a playing state and the frame advances; also confirm desktop still autoplays and no console errors or horizontal scroll appear.

## Technical notes

Changes are confined to the `Hero` component in `src/components/SilverthornHomePage.tsx` (plus a small API-loader helper). No backend, routing, or SEO changes.
