## Plan

1. **Fix the embedded 3D tour URL**
   - Update the houseboat 3D tour iframe to use Matterport’s embeddable viewer URL instead of the public `discover.matterport.com/space/...` page, which is what is showing the blocked-content message.
   - Keep the fullscreen/open button pointing to the public Matterport page so visitors can still open the tour in a new tab.

2. **Apply it to all houseboat tours**
   - Because all 3D tours share the same `HouseboatDetail` component and `matterportId` data, one component fix will cover Queen, Queen I, Queen II, and the other houseboat tour automatically.

3. **Verify visually**
   - Check at least one houseboat page’s 3D Tour tab after the change to confirm the embedded tour loads instead of the blocked message.