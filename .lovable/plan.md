Update the "What is the cancellation and rental policy?" FAQ in `src/routes/faq.tsx`.

Currently the answer links to `/houseboats/queen` via an internal TanStack `<Link>`. Replace it with an external anchor to `https://silverthornresort.com/houseboats/policy` that opens in a new tab (`target="_blank" rel="noopener noreferrer"`), while preserving the existing link styling and surrounding sentence.

Acceptance criteria:
- The "Houseboat Rental Policy" link points to `https://silverthornresort.com/houseboats/policy`.
- The link opens in a new tab.
- All other FAQ content and page metadata remain unchanged.