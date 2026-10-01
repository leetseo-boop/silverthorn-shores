# Project Architecture Rules

- All seasonal promotion dates, eligibility, copy constants, discount math, and schema helpers live in `src/lib/promo.ts` so visible pages, metadata, and Thorn stay synchronized.