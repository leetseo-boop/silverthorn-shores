// Conservative server-side profanity detector (ported from Boatie).
// Flags obvious slurs and f/s-family terms in EN + ES while avoiding
// Scunthorpe-style false positives.

const PROFANITY: string[] = [
  // English f-family
  "fuck", "fucker", "fucking", "fuk", "fck", "motherfucker",
  // English s-family
  "shit", "shitty", "bullshit",
  // English vulgar
  "bitch", "bitches", "asshole", "asshat", "dickhead", "dipshit",
  "cunt", "twat", "wanker", "bastard", "douche", "douchebag",
  "prick", "jerkoff", "jackass", "slut", "whore",
  "pissed", "pussy", "cock", "dildo",
  // Slurs (zero tolerance)
  "nigger", "nigga", "niggas", "faggot", "fag", "tranny", "retard", "retarded",
  "kike", "spic", "chink", "gook", "wetback", "coon",
  // Spanish
  "puta", "putas", "puto", "putos", "mierda", "joder", "cabron", "cabrón",
  "pendejo", "pendeja", "verga", "chinga", "chingar", "chingada", "chingado",
  "culero", "culera", "maricon", "maricón", "pinche",
  "coño", "gilipollas", "follar",
];

const WHITELIST = new Set<string>([
  "scunthorpe", "class", "classic", "classes", "passes", "compass", "embassy",
  "assassin", "assess", "assist", "associate", "association", "cocktail",
  "shitake", "shiitake",
]);

const PROFANITY_SET = new Set(PROFANITY);

function normalize(input: string): string {
  return input
    .toLowerCase()
    .replace(/[àáâãäå]/g, "a")
    .replace(/[èéêë]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôõö]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/ñ/g, "n")
    .replace(/[4@]/g, "a")
    .replace(/3/g, "e")
    .replace(/[1!|]/g, "i")
    .replace(/0/g, "o")
    .replace(/\$/g, "s")
    .replace(/5/g, "s")
    .replace(/7/g, "t")
    .replace(/[^a-z\s]/g, " ");
}

export function detectProfanity(text: string): { hit: boolean; term?: string } {
  if (!text) return { hit: false };
  const tokens = normalize(text).split(/\s+/).filter(Boolean);
  for (const raw of tokens) {
    if (WHITELIST.has(raw)) continue;
    if (PROFANITY_SET.has(raw)) return { hit: true, term: raw };
    const collapsed = raw.replace(/(.)\1{2,}/g, "$1$1");
    if (collapsed !== raw && PROFANITY_SET.has(collapsed)) return { hit: true, term: collapsed };
  }
  return { hit: false };
}

/** Salted SHA-256 of the caller IP — the raw address is never stored. */
export async function hashIp(ip: string, salt: string): Promise<string> {
  const data = new TextEncoder().encode(`${salt}:${ip}`);
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

/** Human-readable masked preview for the admin dashboard, e.g. 76.14.23.x */
export function maskIp(ip: string): string {
  if (!ip || ip === "unknown") return "unknown";
  if (ip.includes(":")) {
    const parts = ip.split(":");
    return `${parts[0]}:${parts[1]}::x`;
  }
  const parts = ip.split(".");
  if (parts.length !== 4) return "unknown";
  return `${parts[0]}.${parts[1]}.${parts[2]}.x`;
}

export function clientIp(request: Request): string {
  return (
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}
