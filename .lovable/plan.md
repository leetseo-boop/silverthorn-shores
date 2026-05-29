## Remove "Executive" row from Parking Permits table

**File:** `src/routes/houseboats.policy.tsx` (line 60)

Remove this entry from the `PERMITS` array:
```
{ boat: "Executive", count: 3, to: "/houseboats" },
```

The Parking Permits table on `/houseboats/policy` will no longer list the Executive houseboat row. No other content is touched.