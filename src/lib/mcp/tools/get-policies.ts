import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { POLICY_FACTS } from "@/lib/thorn-knowledge";

export default defineTool({
  name: "get_resort_policies",
  title: "Get resort policies",
  description:
    "Return Silverthorn Resort's exact published policy facts (deposits, cancellation, check-in/out, fuel, pets, parking) for houseboats and cabins, with the page each fact lives on.",
  inputSchema: {
    topic: z
      .string()
      .trim()
      .optional()
      .describe("Optional filter, e.g. 'cancellation', 'pets', 'deposit'. Omit to return every policy fact."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ topic }) => {
    const q = topic?.toLowerCase() ?? "";
    const facts = q
      ? POLICY_FACTS.filter((f) => JSON.stringify(f).toLowerCase().includes(q))
      : POLICY_FACTS;
    if (facts.length === 0) {
      return { content: [{ type: "text", text: `No policy facts matched "${topic}".` }] };
    }
    return {
      content: [{ type: "text", text: JSON.stringify(facts, null, 2) }],
      structuredContent: { facts },
    };
  },
});
