## Goal
When Paula, Keri, or Ryan talk to Thorn, he recognizes them as Silverthorn staff, greets them warmly, says hi to his brother Boatie, and follows the conversation like a friendly coworker.

## Current state (verified)
- Thorn's staff greetings live in the `thorn_staff_roster` table.
- `paula` already exists but has a generic greeting.
- `keri` and `ryan` are not in the roster.
- Matching already works for first names via `matchStaff()` in `src/lib/thorn/runtime.server.ts`.

## Plan
1. **Update Paula's row**
   - Change greeting to: *"Hi Paula! It's so nice to see you here visiting me — thank you! 🐾 Say hi to my brother Boatie for me. Tail's wagging and I'm ready to help!"*
   - Update tone notes to: coworker/friendly, no guest sales pitch.

2. **Insert Keri's row**
   - `staff_key`: `keri`
   - `display_name`: `Keri`
   - `greeting`: *"Hi Keri! It's so nice to see you here visiting me — thank you! 🐾 Say hi to my brother Boatie for me. Tail's wagging and I'm ready to help!"*
   - `tone_notes`: friendly coworker tone, follow her lead, no guest sales pitch.

3. **Insert Ryan's row**
   - `staff_key`: `ryan`
   - `display_name`: `Ryan`
   - `greeting`: same pattern as Keri/Paula with Ryan's name.
   - `tone_notes`: same friendly coworker guidance.

4. **Verify**
   - Re-query `thorn_staff_roster` to confirm the three names are active with the new greetings.
   - Run a quick chat test message like "Hi Thorn this is Paula" and confirm Thorn replies with the Boatie greeting.

## Notes
- No code changes are required; the existing staff-matching logic will pick these up from the database.
- Staff testers are already exempt from real bans, so the new rows inherit that safety.
- If any of these staff prefer a different nickname or greeting wording, we can adjust after testing.