# Where "Needs staff input" lives — and making it writable

## Where it is today

In the Thorn admin (`/admin` → **Thorn — AI assistant** → **Knowledge** tab), the red number on the tab is the count of items waiting on you. Each card shows the topic, the guest question, Thorn's drafted answer, and a **Pending** badge. Right now you can only **Approve**, **Unapprove**, or **Delete** — there is no box to type your own answer, which is what's missing.

## What to add

1. **Edit the answer inline** — each pending/approved card gets an "Edit answer" button that opens a textarea with the current draft. Buttons: **Save**, **Save & approve**, **Cancel**. Saving writes your text as Thorn's authoritative answer for that topic.
2. **Add an answer manually** — a small "Add knowledge" form at the top of the Knowledge tab (topic, optional question, answer) so you can teach Thorn something without waiting for the nightly draft. Saved as approved immediately.
3. **Clearer status wording** — rename the Pending badge to "Needs your answer", and add a filter toggle: All / Needs your answer / Approved, so the queue is obvious.
4. **Unanswered questions feed** — surface the questions where Thorn handed off or said he didn't know (from the transcript log, last 7 days) as a short list with a one-click "Answer this" that pre-fills the add-knowledge form.

## Technical notes

- `setFactApproval` in `src/lib/thorn-admin.functions.ts` already accepts an optional `answer`, so inline editing needs only UI plus passing that field.
- New server fn `upsertFact` (topic, question, answer) writing to `thorn_learned_facts` with `source = 'staff'`, `approved = true`, admin-guarded like the existing functions.
- New server fn (or extend `getThornAdmin`) to return recent unanswered/hand-off user messages for item 4.
- All UI changes in `src/components/admin/ThornAdminPanel.tsx`; no changes to the chat runtime — `runtime.server.ts` already injects approved facts into Thorn's prompt.
