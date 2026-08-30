import { auth, defineMcp } from "@lovable.dev/mcp-js";
import searchKnowledgeTool from "./tools/search-knowledge";
import getPoliciesTool from "./tools/get-policies";
import listFleetTool from "./tools/list-fleet";

// OAuth issuer must be the direct Supabase host; the project ref is inlined at build time.
const projectRef = import.meta.env['VITE_SUPABASE_PROJECT_ID'] ?? "project-ref-unset";

export default defineMcp({
  name: "silverthorn-shores",
  title: "Silverthorn Shores",
  version: "0.1.0",
  instructions:
    "Tools for Silverthorn Resort on Shasta Lake. Use `search_resort_knowledge` for general questions about the resort, lake and Forest Service areas, `get_resort_policies` for exact houseboat and cabin policy facts, and `list_fleet` for the houseboat and small-boat rental lineup. Never invent prices or availability — reservations are at 800-332-3044.",
  auth: auth.oauth.issuer({
    issuer: `https://${projectRef}.supabase.co/auth/v1`,
    acceptedAudiences: "authenticated",
  }),
  tools: [searchKnowledgeTool, getPoliciesTool, listFleetTool],
});
