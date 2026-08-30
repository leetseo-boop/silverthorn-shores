import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { searchKnowledge, renderContext } from "@/lib/thorn/search";

export default defineTool({
  name: "search_resort_knowledge",
  title: "Search resort knowledge",
  description:
    "Search Silverthorn Resort's public knowledge base (houseboats, cabins, small boats, marina pages, FAQs, Shasta Lake and Forest Service info) and return the best matching entries with their page URLs.",
  inputSchema: {
    query: z.string().trim().min(2).describe("What to look up, e.g. 'Queen houseboat hot tub' or 'boat ramps'."),
    limit: z.number().int().min(1).max(10).default(5).describe("Maximum entries to return."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, limit }) => {
    const hits = searchKnowledge(query, limit ?? 5);
    if (hits.length === 0) {
      return { content: [{ type: "text", text: `No knowledge entries matched "${query}".` }] };
    }
    return {
      content: [{ type: "text", text: renderContext(hits) }],
      structuredContent: {
        results: hits.map((e) => ({ name: e.name, type: e.type, url: e.url, summary: e.summary ?? null })),
      },
    };
  },
});
