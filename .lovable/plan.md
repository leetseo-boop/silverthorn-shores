## Pull Queen I images from Shasta Shores Reimagined

Source project `d7132c39` has 10+ Queen I photos in `src/assets/`. Copy 5 into this project's `public/images/` using the filenames the `/houseboats/queen-i` page already references — no code changes needed.

### Mapping

| Source (Shasta Shores `src/assets/`) | Destination (this project) |
|---|---|
| `queen-i-houseboat-shasta-lake-01.jpg` | `public/images/queen-i-hero.jpg` |
| `queen-i-houseboat-lower-deck-exterior-silverthorn.jpg` | `public/images/queen-i-gallery-1.jpg` |
| `queen-i-houseboat-upper-deck-panoramic-mountain-view.jpg` | `public/images/queen-i-gallery-2.jpg` |
| `queen-i-houseboat-stateroom-lakeview-deck-access.jpg` | `public/images/queen-i-gallery-3.jpg` |
| `queen-i-houseboat-aft-deck-spiral-staircase-shasta-lake.jpg` | `public/images/queen-i-gallery-4.jpg` |

### Notes

- I'll preview the hero candidate (`-01.jpg`) before copying to confirm it's a strong exterior shot; if not, swap with another from the numbered set (02–10).
- No source file edits — `houseboats.queen-i.tsx` already points at these exact paths.
- Out of scope: fleet thumbnails (queen-thumb, queen-ii-thumb, senator-thumb) and any Queen / Queen II / Senator page images — ask if you want those next.
