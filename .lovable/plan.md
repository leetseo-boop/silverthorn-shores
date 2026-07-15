## Footer social media icons

Add real, brand-colored social media icons to the site footer and remove the placeholder buttons.

### What I'll build
1. **New `src/components/SocialLinks.tsx` component**
   - Inline SVG icons for the 5 provided networks so we keep their original colors and avoid extra dependencies.
   - Facebook `#1877F2`, Instagram gradient, TikTok black, YouTube `#FF0000`, Pinterest `#BD081C`.
   - Each icon is a link with `target="_blank" rel="noopener noreferrer"` and an `aria-label` (e.g., "Silverthorn Resort on Facebook").
   - Icons sit in 42–44 px circular touch targets with a subtle hover lift/scale.

2. **Update `src/components/SilverthornHomePage.tsx` `Footer`**
   - Place the new `<SocialLinks />` under the phone/email block in the left brand/contact column, with a small "Follow us" label.
   - This puts the icons on the left on desktop and at the top of the footer on mobile, where they are easy to find.
   - Remove the existing placeholder `f / 📷 / 𝕏 / ▶` buttons from the bottom bar.
   - Keep the legal links and copyright row clean and unchanged.

3. **Responsive framing**
   - Desktop: icons align left under the address/phone/email, balanced against the link columns on the right.
   - Mobile: footer stacks vertically; icons appear right below the logo/contact info, centered, with comfortable spacing.
   - No hardcoded colors outside the brand SVG fills; surrounding styling uses existing Tailwind tokens and the site's navy/orange palette.

### Out of scope
- No new icon library dependency.
- No changes to navigation, hero, or other pages.

### Verification
- Run TypeScript/build check.
- Spot-check the footer on desktop and mobile in the preview.