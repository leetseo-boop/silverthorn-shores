# Remove Bartenders / Restaurant Servers from Employment Page

## What we're doing
Remove the "Bartenders / Restaurant Servers" item from the seasonal positions list on `/employment`.

## File to edit
- `src/routes/employment.tsx`

## Change
In the `seasonal` array (lines 29-36), delete the line:
```ts
  "Bartenders / Restaurant Servers",
```

No other content, styling, or SEO metadata changes. The page's structure and remaining seasonal roles stay intact.

## Verification
- Build the project to confirm no TypeScript/JSX errors.
- Optionally load `/employment` in the preview to confirm the item is gone.