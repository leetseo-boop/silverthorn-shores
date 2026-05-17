## Goal
Shrink the policy hero image, make sure it preloads correctly, and verify the hero scales well on mobile, tablet, and desktop.

## Findings
- `src/assets/rental-policy-hero.jpg` is actually a **PNG** (1264×848, **1.65 MB**) saved with a `.jpg` extension. That's the main weight problem and also breaks browser/CDN content negotiation.
- The route already declares `<link rel="preload" as="image" href={heroImg} fetchpriority="high">` in `head().links` plus `loading="eager"` and `fetchPriority="high"` on the `<img>`. The preload mechanism is correct — only the asset needs to get lighter.
- Hero `<img>` already has explicit `width={1536} height={1024}` to prevent CLS.

## Plan

1. **Re-encode the hero as a real optimized JPEG**
   - Use ImageMagick to convert the existing file in place to true JPEG at 1600px wide, quality 82, progressive, stripped metadata, 4:2:0 chroma.
   - Target: under ~250 KB while keeping crisp detail at desktop sizes.
   - Keep the filename `src/assets/rental-policy-hero.jpg` so no import changes are needed.

2. **Confirm preload + decoding hints are optimal**
   - Keep existing `rel="preload" as="image" fetchpriority="high"` in `head().links`.
   - Add `decoding="async"` to the `<img>` (eager + async decode is the recommended combo for LCP images).
   - Leave `loading="eager"` and `fetchPriority="high"` on the `<img>` as-is.

3. **Responsive QA on /houseboats/policy**
   - Navigate the in-app browser to the page at three viewports:
     - Mobile: 390×844
     - Tablet: 820×1180
     - Desktop: 1440×900
   - Screenshot the hero in each, verify framing, text legibility against the gradient overlay, and that the image fully covers without distortion.
   - If the overlay is too weak/strong on any size, adjust the gradient stops only (no layout changes).

## Out of scope
- No layout, copy, or section changes.
- No new dependencies (skipping `vite-imagetools` — single hero doesn't justify the plugin; in-place re-encode is enough).
- No changes to other pages.
