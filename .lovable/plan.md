## Set uploaded Silverthorn logo as favicon

The uploaded logo is wide (roughly 3:1) — a favicon needs to be square and read well at 16–32px. The wide wordmark won't be legible; the circular houseboat medallion on the right is the recognizable brand mark and will crop perfectly into a square icon.

### Steps

1. **Extract & optimize the medallion** into a square favicon:
   - Crop the circular houseboat/mountain/sunset medallion from `user-uploads://silverthorn-no_pub-tribe.png`.
   - Resize to 512×512, transparent background outside the circle.
   - Save to `public/favicon.png` (PNG, optimized).

2. **Wire it into the site head**:
   - In `src/routes/__root.tsx`, replace the current `{ rel: "icon", href: "/favicon.ico" }` entry with `{ rel: "icon", type: "image/png", href: "/favicon.png" }`.
   - Delete the default `public/favicon.ico` so stale requests don't serve the old Lovable icon.

3. **Verify** with a build.

### Notes

- Using the full wide logo would render as an unreadable smear at 16px — the medallion is the right choice.
- If you prefer the full wordmark (letterboxed inside a square with padding), say the word and I'll swap the approach.
