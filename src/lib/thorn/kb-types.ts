/** Shared shape for every Thorn knowledge entry (ported from Boatie's KEntry). */
export type KEntry = {
  slug: string;
  type: "houseboat" | "small_boat" | "page" | "local";
  name: string;
  url: string;
  summary?: string;
  highlights?: string[];
  best_for?: string[];
  layout?: string;
  amenities?: Record<string, string[]>;
  specs?: Record<string, unknown>;
  faqs?: { q: string; a: string }[];
};
