import wave from "@/assets/thorn/wave.webp.asset.json";
import helping from "@/assets/thorn/helping.webp.asset.json";
import thinking from "@/assets/thorn/thinking.webp.asset.json";
import resting from "@/assets/thorn/resting.webp.asset.json";
import celebrate from "@/assets/thorn/celebrate.webp.asset.json";
import houseboat from "@/assets/thorn/houseboat.webp.asset.json";
import lifevest from "@/assets/thorn/lifevest.webp.asset.json";
import fishing from "@/assets/thorn/fishing.webp.asset.json";
import sunglasses from "@/assets/thorn/sunglasses.webp.asset.json";
import upsetImg from "@/assets/thorn/upset.webp";

export type ThornMood =
  | "wave"
  | "helping"
  | "thinking"
  | "resting"
  | "celebrate"
  | "houseboat"
  | "lifevest"
  | "fishing"
  | "sunglasses"
  | "upset";

export const MOOD_IMAGES: Record<ThornMood, string> = {
  wave: wave.url,
  helping: helping.url,
  thinking: thinking.url,
  resting: resting.url,
  celebrate: celebrate.url,
  houseboat: houseboat.url,
  lifevest: lifevest.url,
  fishing: fishing.url,
  sunglasses: sunglasses.url,
  upset: upsetImg,
};

export const MOOD_ALT: Record<ThornMood, string> = {
  wave: "Thorn, the Silverthorn Resort dog, waving hello",
  helping: "Thorn wearing glasses, ready to help with your Shasta Lake trip",
  thinking: "Thorn thinking about your question",
  resting: "Thorn curled up napping at the marina",
  celebrate: "Thorn celebrating your Shasta Lake booking",
  houseboat: "Thorn standing on a Silverthorn houseboat deck",
  lifevest: "Thorn wearing an orange life vest",
  fishing: "Thorn holding a fishing rod on Shasta Lake",
  sunglasses: "Thorn in sunglasses at the Silverthorn marina",
  upset: "Thorn looking upset, one paw raised to say stop",
};

/** Short status line announced next to the avatar so the mood isn't colour/art only. */
export const MOOD_STATUS: Record<ThornMood, string> = {
  wave: "Saying hello",
  helping: "Looking that up",
  thinking: "Thinking…",
  resting: "Taking a nap",
  celebrate: "Excited for your trip",
  houseboat: "Talking houseboats",
  lifevest: "Going over the rules",
  fishing: "Talking fishing",
  sunglasses: "Feeling the summer sun",
  upset: "Not happy",
};

const MOOD_LIST: ThornMood[] = [
  "wave",
  "helping",
  "thinking",
  "resting",
  "celebrate",
  "houseboat",
  "lifevest",
  "fishing",
  "sunglasses",
  "upset",
];

const PATTERNS: { mood: ThornMood; rx: RegExp }[] = [
  {
    mood: "wave",
    rx: /^\s*(hi|hey|hello|yo|howdy|good (morning|afternoon|evening)|thanks|thank you|bye|goodbye|see ya)\b/i,
  },
  {
    mood: "celebrate",
    rx: /\b(book(ed|ing)?|reserve|reservation|see you|sounds great|awesome|perfect|love it|20% ?off|break20)\b/i,
  },
  {
    // Directions / travel questions — Thorn puts the shades on for the drive up.
    mood: "sunglasses",
    rx: /\b(directions?|drive|driving|driv(e|ing) time|how far|how long.*(drive|get there)|map|address|gps|route|i-?5|freeway|exit|gilman|redding|sacramento|bay area|airport|park(ing)?\b.*(lot|where)|get (there|here))\b/i,
  },
  { mood: "helping", rx: /\b(pet|pets|dog|dogs|puppy|puppies|cat|cats|leash|kennel|pet[- ]?friendly)\b/i },
  { mood: "houseboat", rx: /\b(houseboat|queen|senator|presidential|sleep\s*\d+|deck|slide)\b/i },
  { mood: "fishing", rx: /\b(fish|fishing|bass|trout|salmon|catfish)\b/i },
  {
    mood: "lifevest",
    rx: /\b(safety|life\s*vest|life\s*jacket|rules?|polic(y|ies)|deposit|cancel(lation)?|refund|check[- ]?(in|out)|contract|insurance|age|21)\b/i,
  },
  { mood: "sunglasses", rx: /\b(summer|sun|swim|beach|weather|hot|season)\b/i },
  {
    mood: "helping",
    rx: /\b(cabin|small boat|patio|ski|wave ?runner|moorage|slip|price|rate|cost|hours|contact|pet|dog)\b/i,
  },
];

/** Guess a mood from message text when the model didn't tag one. */
export function detectMood(text: string): ThornMood | null {
  if (!text) return null;
  for (const { mood, rx } of PATTERNS) {
    if (rx.test(text)) return mood;
  }
  return null;
}

/** Strip an optional trailing [mood:xxx] tag emitted by the model. */
export function extractMoodTag(text: string): { text: string; mood: ThornMood | null } {
  const match = text.match(/\s*\[mood:\s*([a-z]+)\s*\]\s*$/i);
  if (!match) return { text, mood: null };
  const candidate = match[1].toLowerCase() as ThornMood;
  return {
    text: text.slice(0, match.index).trimEnd(),
    mood: MOOD_LIST.includes(candidate) ? candidate : null,
  };
}

/** Pull a trailing [sources: id, id] tag (policy mode) out of the reply. */
export function extractSources(text: string): { text: string; sources: string[] } {
  const match = text.match(/\s*\[sources?:\s*([a-z0-9,\-\s]*)\]\s*$/i);
  if (!match) return { text, sources: [] };
  const ids = match[1]
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return { text: text.slice(0, match.index).trimEnd(), sources: Array.from(new Set(ids)) };
}

/** Remove partial/complete trailing tags while streaming so they never flash on screen. */
export function stripPartialTags(text: string): string {
  return text
    .replace(/\s*\[sources?:?[a-z0-9,\-\s]*\]?\s*$/i, "")
    .replace(/\s*\[mood:?[a-z]*\]?\s*$/i, "")
    .replace(/\s*\[sources?:?[a-z0-9,\-\s]*\]?\s*$/i, "");
}
