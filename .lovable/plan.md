Add a new navigation item for the existing `/shasta-vs-lake-powell` comparison page under **Shasta Lake** in the site header.

### What will change
- File: `src/components/SilverthornHomePage.tsx`
- Location: `NAV_LINKS` constant, `Shasta Lake` submenu
- Insertion point: immediately after `Planning Guide`
- New item:
  - Label: `Shasta vs Lake Powell`
  - Href: `/shasta-vs-lake-powell`

### How it will work
The desktop dropdown and mobile drawer both read from `NAV_LINKS`, so the new link will appear in both places automatically without any extra components or logic.

### Verification
- Build the project to confirm no TypeScript/route errors.
- Check the header dropdown to confirm the item renders after `Planning Guide`.
- Click the link to confirm it navigates to `/shasta-vs-lake-powell`.