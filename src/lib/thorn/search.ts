// Keyword-scored retrieval over Thorn's knowledge base (ported from Boatie).
import { SITE_ENTRIES } from "./kb-site";
import { USDA_SHASTA_TRINITY } from "./kb-usda";
import type { KEntry } from "./kb-types";

export const KB: KEntry[] = [...SITE_ENTRIES, ...USDA_SHASTA_TRINITY];

export const SOURCE_COUNTS = {
  site: SITE_ENTRIES.length,
  usda: USDA_SHASTA_TRINITY.length,
  total: KB.length,
};

const KB_SEARCH = KB.map((e) => {
  const am = e.amenities ? Object.values(e.amenities).flat().join(" ") : "";
  const faqs = (e.faqs || []).map((f) => `${f.q} ${f.a}`).join(" ");
  const specs = e.specs
    ? Object.entries(e.specs).map(([k, v]) => `${k} ${Array.isArray(v) ? v.join(" ") : v}`).join(" ")
    : "";
  const haystack =
    `${e.name} ${e.summary || ""} ${e.layout || ""} ${am} ${(e.highlights || []).join(" ")} ${(e.best_for || []).join(" ")} ${faqs} ${specs}`.toLowerCase();
  return { e, name: e.name.toLowerCase(), haystack };
});

const STOP = new Set([
  "the", "and", "for", "you", "your", "are", "can", "with", "what", "how", "does", "did", "was",
  "there", "have", "has", "our", "who", "why", "when", "from", "that", "this", "any", "all", "out",
]);

export function searchKnowledge(query: string, limit = 5): KEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const tokens = Array.from(
    new Set(q.split(/[^a-z0-9]+/).filter((t) => t.length >= 3 && !STOP.has(t))),
  );
  if (tokens.length === 0) return [];
  return KB_SEARCH
    .map(({ e, name, haystack }) => {
      let score = 0;
      for (const t of tokens) {
        if (name.includes(t)) score += 5;
        score += haystack.split(t).length - 1;
      }
      return { e, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.e);
}

/** Render retrieved entries as a compact prompt block. */
export function renderContext(entries: KEntry[]): string {
  if (entries.length === 0) return "";
  return entries
    .map((e) => {
      const bits: string[] = [`### ${e.name} — ${e.url}`];
      if (e.summary) bits.push(e.summary.slice(0, 900));
      if (e.specs) {
        bits.push(
          Object.entries(e.specs)
            .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(", ") : String(v)}`)
            .join(" · "),
        );
      }
      if (e.highlights?.length) bits.push(e.highlights.slice(0, 8).map((h) => `- ${h}`).join("\n"));
      if (e.layout) bits.push(e.layout.slice(0, 400));
      if (e.amenities) {
        bits.push(
          Object.entries(e.amenities)
            .map(([k, v]) => `${k}: ${v.join(", ")}`)
            .join(" · ")
            .slice(0, 600),
        );
      }
      if (e.faqs?.length) {
        bits.push(e.faqs.slice(0, 4).map((f) => `Q: ${f.q}\nA: ${f.a}`).join("\n"));
      }
      return bits.join("\n");
    })
    .join("\n\n")
    .slice(0, 12000);
}
