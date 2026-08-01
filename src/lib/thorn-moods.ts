import wave from "@/assets/thorn/wave.webp.asset.json";
import helping from "@/assets/thorn/helping.webp.asset.json";
import thinking from "@/assets/thorn/thinking.webp.asset.json";
import resting from "@/assets/thorn/resting.webp.asset.json";
import celebrate from "@/assets/thorn/celebrate.webp.asset.json";
import houseboat from "@/assets/thorn/houseboat.webp.asset.json";
import lifevest from "@/assets/thorn/lifevest.webp.asset.json";
import fishing from "@/assets/thorn/fishing.webp.asset.json";
import sunglasses from "@/assets/thorn/sunglasses.webp.asset.json";

export type ThornMood =
  | "wave"
  | "helping"
  | "thinking"
  | "resting"
  | "celebrate"
  | "houseboat"
  | "lifevest"
  | "fishing"
  | "sunglasses";

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
];

const PATTERNS: { mood: ThornMood; rx: RegExp }[] = [
  {
    mood: "celebrate",
    rx: /\b(book(ed|ing)?|reserve|reservation|see you|sounds great|awesome|perfect|love it|20% ?off|break20)\b/i,
  },
  { mood: "houseboat", rx: /\b(houseboat|queen|senator|sleep\s*\d+|deck|slide)\b/i },
  { mood: "fishing", rx: /\b(fish|fishing|bass|trout|salmon|catfish)\b/i },
  { mood: "lifevest", rx: /\b(safety|life\s*vest|life\s*jacket|rules?|polic(y|ies)|deposit|age)\b/i },
  { mood: "sunglasses", rx: /\b(summer|sun|swim|beach|weather|hot|season)\b/i },
  { mood: "helping", rx: /\b(cabin|small boat|patio|ski|wave ?runner|moorage|slip|price|rate|cost|hours|directions|contact)\b/i },
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

/** Remove a partial/complete mood tag while streaming so it never flashes on screen. */
export function stripPartialMoodTag(text: string): string {
  return text.replace(/\s*\[mood:?[a-z]*\]?\s*$/i, "");
}
