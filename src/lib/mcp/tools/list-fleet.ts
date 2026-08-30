import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { houseboats } from "@/data/houseboats";
import { BOATS } from "@/data/silverthorn-boats";

export default defineTool({
  name: "list_fleet",
  title: "List rental fleet",
  description:
    "List Silverthorn Resort's rental fleet: houseboats (Queen, Queen I, Queen II, Senator) and small boats (patio, ski, fishing boats, jet skis) with capacity, pricing and page URLs.",
  inputSchema: {
    kind: z
      .enum(["houseboats", "small_boats", "all"])
      .default("all")
      .describe("Which part of the fleet to list."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ kind }) => {
    const want = kind ?? "all";
    const hb =
      want === "small_boats"
        ? []
        : houseboats.map((h) => ({
            name: h.name,
            slug: h.slug,
            url: `/houseboats/${h.slug}`,
            sleeps: (h as unknown as { sleeps?: unknown }).sleeps ?? null,
            length: (h as unknown as { length?: unknown }).length ?? null,
          }));
    const sb =
      want === "houseboats"
        ? []
        : BOATS.map((b) => ({
            name: b.name,
            slug: b.slug,
            url: `/small-boats/${b.slug}`,
            category: b.category,
            capacity: b.capacity,
            dailyPrice: b.dailyPrice,
            weeklyPrice: b.weeklyPrice,
            deposit: b.deposit,
          }));
    const payload = { houseboats: hb, smallBoats: sb };
    return {
      content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
      structuredContent: payload,
    };
  },
});
