The Queen 3D tour is blocked because `my.matterport.com/show/?m=<id>` refuses to embed / navigate for this space. The working public URL you shared uses the `discover.matterport.com/space/<id>` format.

### Change
In `src/components/HouseboatDetail.tsx` (3D Tour tab, ~lines 364 and 371), swap both the "Open Fullscreen" link `href` and the `<iframe>` `src` from:

`https://my.matterport.com/show/?m=${boat.matterportId}`

to:

`https://discover.matterport.com/space/${boat.matterportId}`

This applies to every houseboat with a `matterportId` (Queen, Queen I, Queen II, Senator), all of which use the same Matterport space format.

### Verification
- Load `/houseboats/queen` → 3D Tour tab → confirm iframe renders and "Open Fullscreen" opens the space.
- Spot-check `/houseboats/queen-i` and `/houseboats/queen-ii` still load their tours.