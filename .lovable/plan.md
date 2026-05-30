# Add Store Photo to Apparel & Accessories Section

## What

On `/pro-shop`, add the uploaded Silverthorn store interior photo to the **Apparel & Accessories in-store** callout section. Keep everything else on the page unchanged.

## Steps

1. Copy `user-uploads://silverthorn_store.jpg` → `src/assets/proshop-apparel-store-interior.jpg`.
2. In `src/routes/pro-shop.tsx`:
   - Import the new image.
   - Restructure the Apparel & Accessories section into a two-column layout (image left, existing text + CTA right) on `md+`, stacked on mobile.
   - Image uses descriptive SEO alt text: `"Inside the Silverthorn Resort apparel and pro shop with snacks, sunglasses, hats, swimwear and souvenirs on Shasta Lake"`.
   - Lazy-loaded, rounded corners, subtle shadow, `aspect-[4/3]` object-cover.
3. Keep the orange Shirt icon, heading, paragraph, and "Call the Shop" button intact.

## Out of scope

- No changes to other sections, rates, hero, or JSON-LD.
- No new routes, no copy changes elsewhere.
