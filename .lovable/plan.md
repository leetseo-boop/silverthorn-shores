1. Open `src/routes/faq.tsx`.
2. In the `Can I bring my pet?` FAQ entry, replace the rendered answer text to clarify the new pet limit/pricing:
   - State that houseboats allow a maximum of 2 pets.
   - State that the first pet is free and the second pet is $50.
   - Remove the existing “Each additional pet...” language and the $95/hour cleaning detail (or keep only what the user confirmed; default to the new concise rule).
3. Append a link labeled "Pet Policy" that points to `https://houseboats.com/trip-preparation/pet-policy`, opens in a new window (`target="_blank"`), and uses `rel="noopener noreferrer"`. Match the existing `text-primary underline underline-offset-2 hover:opacity-80` link style used elsewhere on the FAQ page.
4. Leave all other FAQ questions, the JSON-LD structured data, page metadata, and layout unchanged.
5. Validate that the link is keyboard-focusable and renders correctly on desktop and mobile.