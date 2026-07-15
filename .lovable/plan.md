## Plan

1. **Fix the shared map component used by both pages**
   - Update `ResortMap` so `/directions` and `/contact` both render the same working map.
   - Remove the broken gray Google map state and make failures automatically show a working fallback instead.

2. **Use the custom Google Maps connection correctly**
   - Confirm the browser key environment variable expected by the component matches what the connector provides.
   - Keep the Google Maps button as a backup path to open the resort directly in Google Maps.

3. **Improve reliability on custom domain and preview**
   - Add better load/error handling so if Google blocks or fails, visitors still see a usable map instead of the broken icon.
   - Keep the design responsive for desktop and mobile.

4. **Verify both pages**
   - Test `/directions` and `/contact` after the change.
   - Confirm there is no blank/broken map, no horizontal scroll, and the “Open in Google Maps” button still works.