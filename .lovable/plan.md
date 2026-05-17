# /contact updates

## 1. Social links (quick edits)
In `src/routes/contact.tsx`:
- Replace YouTube href with `https://www.youtube.com/@houseboatslakeshasta`
- Add TikTok as a 5th icon → `https://www.tiktok.com/@houseboats.com`. Since lucide-react has no TikTok glyph, use a small inline SVG (same 20px size, same circular border button styling as the others) so it visually matches.
- Mirror both in the `sameAs` array of the LocalBusiness JSON-LD.

## 2. Form behavior — switch from `mailto:` to real send
The current form opens the user's email client (`mailto:`), which:
- can't reliably BCC `marketing@houseboats.com`
- can't guarantee delivery to `reserve1@houseboats.com`
- can't show a real "thank you" (we don't know if they actually sent it)

To meet the three requirements (route to reserve1, thank-you confirmation, copy to marketing) we need a server-side send. Recommended path: **Lovable Cloud + Lovable Emails** (built-in, no external API keys).

### Steps
1. Enable Lovable Cloud.
2. Set up the email sender domain (required prerequisite — one-time dialog).
3. Scaffold app-email infrastructure + create two React Email templates in `src/lib/email-templates/`:
   - `contact-thank-you.tsx` — sent to the guest. Subject: "Thanks for contacting Silverthorn Resort". Body uses Playfair/DM Sans-ish inline styles, brand orange `#E8640A`, navy `#1B2B3A`, echoes their message, includes phone `800-332-3044`.
   - `contact-internal-notify.tsx` — sent to `reserve1@houseboats.com` with `marketing@houseboats.com` as a second recipient (one template, sent twice — one per recipient — keeping the "one recipient per send" rule). Subject: `New website inquiry — {name}`. Contains name, email, phone, dates, message.
4. Create a public server route `src/routes/api/public/contact.ts` (POST):
   - Zod-validate the same fields as today.
   - Generate one `submissionId = crypto.randomUUID()`.
   - Enqueue 3 emails via the existing `send-transactional-email` flow with idempotency keys:
     - `contact-thanks-{submissionId}` → guest
     - `contact-notify-reserve-{submissionId}` → reserve1@houseboats.com
     - `contact-notify-marketing-{submissionId}` → marketing@houseboats.com
   - Return `{ ok: true }`.
5. Update `src/routes/contact.tsx`:
   - Replace `mailto:` handler with `fetch('/api/public/contact', …)`.
   - On success, replace the form with a centered thank-you panel: heading "Thank you!", body "We've received your message and a member of our team will be in touch shortly. For immediate help, call **800-332-3044**." Keep the navy/orange styling, soft sand background card.
   - On error, show inline error + fallback to phone.
   - Keep client-side zod validation as-is.

## Open question
The email rewrite requires enabling **Lovable Cloud** and configuring an email sender domain (one-time setup). If you'd rather keep things simple and skip the backend, I can instead just open `mailto:reserve1@houseboats.com` with `marketing@houseboats.com` in CC and show a static "thank you" — but delivery and the marketing copy then depend on the user's email client. **Confirm: proceed with Lovable Cloud + Emails (recommended)?**
