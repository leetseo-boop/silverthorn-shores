Tighten the Summer Fun Sale promo banner and dial back the houseboat card motion while keeping the glow.

1. Compact the homepage `SummerPromoBanner` in `src/components/promo/SummerPromoBanner.tsx`.
   - Reduce vertical padding by roughly 30–40%.
   - Scale down the headline, subheadline, and promo-code text by one typographic step.
   - Shrink the decorative inline SVG summer graphics so they accent rather than dominate.
   - Keep the sunset gradient background, shimmer, and Book Now CTA.
   - Ensure it still reads well on mobile without overflow.

2. Stop the rotating border on eligible houseboat cards in `src/components/promo/PromoCardFrame.tsx`.
   - Remove the `promo-frame-rotate` animation/keyframe usage on the card border.
   - Preserve the conic-gradient glowing border, hover lift, and active/touch feedback.
   - Keep `prefers-reduced-motion` support intact.

3. Verify visually across desktop, tablet, and mobile viewports that the banner is proportional and the Queen I / Queen II cards glow without rotating.