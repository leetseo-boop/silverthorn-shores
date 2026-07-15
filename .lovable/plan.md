## Plan

1. **Remove embedded map iframes completely**
   - Stop using the OpenStreetMap embedded iframe on `/directions` and `/contact` so there is no broken map box or blocked embed risk.

2. **Replace it with a fast, branded static location panel**
   - Build a clean resort map-style card using the site colors, address, location pin, lake/resort labels, and a clear “Open in Google Maps” / “Get Directions” button.
   - This will load instantly, work on mobile, and avoid third-party embed failures.

3. **Keep Google Maps as the action, not the embed**
   - Buttons will open the live Google Maps destination in a new tab/app.
   - Both `/directions` and `/contact` will continue to send visitors to the correct Google Maps listing.

4. **Preserve SEO/accessibility**
   - Keep map-related alt/ARIA wording for screen readers.
   - Keep the existing local business/directions schema and page metadata unchanged unless a small wording adjustment is needed.

5. **Verify both pages**
   - Check `/directions` and `/contact` after the change to make sure the broken embed is gone, layout is clean on mobile/desktop, and links still open Google Maps.