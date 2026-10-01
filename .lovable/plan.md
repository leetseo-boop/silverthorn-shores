# Verify silverthornresort.com in Google Search Console

## Goal
Verify the silverthornresort.com property in Search Console using the provided meta tag, then submit the sitemap so Google picks up the latest site changes (Fall Sale, new hours, cabins SEO).

## Steps

1. **Add the verification tag** to the site root `<head>` in `src/routes/__root.tsx`:
   `<meta name="google-site-verification" content="5U81lfO0jkwH89NDIu5K_EjBEhP64RN69gX52co79xs" />`
   (preserving any existing verification tags)

2. **Publish the site** so the tag is live at https://www.silverthornresort.com/ — requires your publish approval.

3. **Confirm the tag is live** by fetching the published homepage HTML and checking the exact tag is present.

4. **Verify with Google** via the connected Silverthorn Google account (Site Verification API, META method) for `https://www.silverthornresort.com/`.

5. **Add the verified property** to Search Console, then re-list properties and select the exact verified URL-prefix.

6. **Submit the sitemap** `https://www.silverthornresort.com/sitemap.xml` to the verified property.

7. **Report back** the verification and sitemap status.

## Technical details
- Verification uses the existing workspace Google Search Console connection (Silverthorn account) through the connector gateway — no new credentials needed.
- The meta tag stays in the site permanently; removing it later would break verification.
- Only the website is affected — Bluehost DNS/email records are untouched.
- If verification fails because the tag isn't live yet, we re-check the published HTML rather than re-publishing blindly.
