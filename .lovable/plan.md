## Update hero image: swap laptop screen to actual Queen photo

Use `imagegen--edit_image` to merge two existing images:
- `src/assets/couple-planning-shasta.webp` (the current hero scene)
- `src/assets/fleet-queen.webp` (the real Queen houseboat hero photo used on `/houseboats/queen`)

**Prompt direction**: Replace the photo currently shown on the laptop screen with the supplied Queen houseboat image, fitted naturally to the laptop display with correct screen perspective/glare. Keep the "silverthornresort.com" URL text below the photo. Keep everything else identical — same couple, same expressions, same framed family lake photo on the wall, same Shasta Lake map, paddle, rope, sun hat, lighting, depth of field, and composition.

**Output**: overwrite `src/assets/couple-planning-shasta.webp` (3:2, same dimensions).

**Tier**: default edit model (one call). If the URL text or screen integration looks off after the edit, I'll do one targeted re-edit rather than regenerating from scratch — keeps credit cost low.

No code changes — asset-only update.
