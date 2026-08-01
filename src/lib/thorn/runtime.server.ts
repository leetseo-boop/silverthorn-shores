// Server-only runtime for Thorn: learned facts, staff roster, chat logging,
// abuse tracking and IP bans. Never imported from client code.
import { hashIp, maskIp } from "./profanity";

type Admin = Awaited<typeof import("@/integrations/supabase/client.server")>["supabaseAdmin"];

let adminPromise: Promise<Admin> | null = null;
export async function getAdmin(): Promise<Admin> {
  if (!adminPromise) {
    adminPromise = import("@/integrations/supabase/client.server").then((m) => m.supabaseAdmin);
  }
  return adminPromise;
}

function salt(): string {
  return process.env["THORN_IP_SALT"] || process.env["SUPABASE_SERVICE_ROLE_KEY"] || "thorn-static-salt";
}

export async function ipIdentity(ip: string) {
  return { ipHash: await hashIp(ip, salt()), ipPreview: maskIp(ip) };
}

/* ------------------------------ bans ------------------------------ */

/** Bans expire on their own so a shared/rotating IP isn't blocked forever. */
export const BAN_TTL_DAYS = 30;

let banCache: { fetched: number; set: Set<string> } | null = null;

export async function loadBannedHashes(force = false): Promise<Set<string>> {
  if (!force && banCache && Date.now() - banCache.fetched < 60_000) return banCache.set;
  try {
    const admin = await getAdmin();
    const cutoff = new Date(Date.now() - BAN_TTL_DAYS * 86_400_000).toISOString();
    const { data } = await admin
      .from("thorn_banned_ips")
      .select("ip_hash, banned_at")
      .gte("banned_at", cutoff);
    const set = new Set((data ?? []).map((r: { ip_hash: string }) => r.ip_hash));
    banCache = { fetched: Date.now(), set };
    return set;
  } catch {
    return banCache?.set ?? new Set<string>();
  }
}

export async function isBanned(ipHash: string): Promise<boolean> {
  return (await loadBannedHashes()).has(ipHash);
}

export async function banIp(ipHash: string, ipPreview: string, reason: string) {
  const admin = await getAdmin();
  await admin
    .from("thorn_banned_ips")
    .upsert({ ip_hash: ipHash, ip_preview: ipPreview, reason, banned_at: new Date().toISOString() });
  banCache = null;
}

/**
 * Staff and allow-listed office IPs can exercise the abuse flow (warning +
 * trace theatre) without ever writing a real, site-wide ban.
 */
export function isBanExempt(ip: string): boolean {
  const raw = process.env["THORN_BAN_ALLOWLIST"] || "";
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .includes(ip);
}


/** Count prior offenses for this IP so we can warn once, then ban. */
export async function countOffenses(ipHash: string): Promise<number> {
  const admin = await getAdmin();
  const { count } = await admin
    .from("thorn_abuse_events")
    .select("id", { count: "exact", head: true })
    .eq("ip_hash", ipHash);
  return count ?? 0;
}

export async function logAbuse(row: {
  ipHash: string;
  ipPreview: string;
  sessionId?: string;
  term?: string;
  message?: string;
  offenseNo: number;
}) {
  const admin = await getAdmin();
  await admin.from("thorn_abuse_events").insert({
    ip_hash: row.ipHash,
    ip_preview: row.ipPreview,
    session_id: row.sessionId ?? null,
    term: row.term ?? null,
    message: (row.message ?? "").slice(0, 500),
    offense_no: row.offenseNo,
  });
}

/* --------------------------- chat logging --------------------------- */

export async function logMessages(rows: {
  sessionId: string;
  ipHash: string;
  ipPreview: string;
  mode: string;
  model?: string;
  userText: string;
  assistantText?: string;
  latencyMs?: number;
  handoff?: boolean;
}) {
  try {
    const admin = await getAdmin();
    const base = {
      session_id: rows.sessionId,
      ip_hash: rows.ipHash,
      ip_preview: rows.ipPreview,
      mode: rows.mode,
      model: rows.model ?? null,
    };
    const payload = [
      { ...base, role: "user", content: rows.userText.slice(0, 4000) },
    ];
    if (rows.assistantText) {
      payload.push({
        ...base,
        role: "assistant",
        content: rows.assistantText.slice(0, 8000),
        latency_ms: rows.latencyMs ?? null,
        handoff: rows.handoff ?? false,
      } as (typeof payload)[number]);
    }
    await admin.from("thorn_messages").insert(payload);
  } catch (err) {
    console.error("[thorn] log failed", err instanceof Error ? err.message : err);
  }
}

export async function logAssistant(rows: {
  sessionId: string;
  ipHash: string;
  ipPreview: string;
  mode: string;
  model?: string;
  assistantText: string;
  latencyMs?: number;
  handoff?: boolean;
}) {
  try {
    const admin = await getAdmin();
    const { error } = await admin.from("thorn_messages").insert({
      session_id: rows.sessionId,
      ip_hash: rows.ipHash,
      ip_preview: rows.ipPreview,
      mode: rows.mode,
      model: rows.model ?? null,
      role: "assistant",
      content: rows.assistantText.slice(0, 8000),
      latency_ms: rows.latencyMs ?? null,
      handoff: rows.handoff ?? false,
    });
    if (error) console.error("[thorn] assistant log failed", error.message);
  } catch (err) {
    console.error("[thorn] assistant log threw", err instanceof Error ? err.message : err);
  }
}

/* --------------------------- learned facts --------------------------- */

let factsCache: { fetched: number; text: string } | null = null;

export async function learnedFactsBlock(): Promise<string> {
  if (factsCache && Date.now() - factsCache.fetched < 5 * 60_000) return factsCache.text;
  try {
    const admin = await getAdmin();
    const { data } = await admin
      .from("thorn_learned_facts")
      .select("topic, answer, hits")
      .eq("approved", true)
      .order("hits", { ascending: false })
      .limit(40);
    const text =
      data && data.length
        ? `\n\n## LEARNED FACTS (approved by staff — authoritative for these topics)\n${data
            .map((r: { topic: string; answer: string }) => `- **${r.topic}** — ${r.answer}`)
            .join("\n")}`
        : "";
    factsCache = { fetched: Date.now(), text };
    return text;
  } catch {
    return "";
  }
}

/* ----------------------------- staff roster ----------------------------- */

let rosterCache: { fetched: number; rows: StaffRow[] } | null = null;
export type StaffRow = { staff_key: string; display_name: string; greeting: string; tone_notes: string | null };

export async function loadRoster(): Promise<StaffRow[]> {
  if (rosterCache && Date.now() - rosterCache.fetched < 60_000) return rosterCache.rows;
  try {
    const admin = await getAdmin();
    const { data } = await admin
      .from("thorn_staff_roster")
      .select("staff_key, display_name, greeting, tone_notes")
      .eq("is_active", true);
    const rows = (data ?? []) as StaffRow[];
    rosterCache = { fetched: Date.now(), rows };
    return rows;
  } catch {
    return [];
  }
}

/** Match "this is mike" / "hey it's paula" against the live roster. */
export function matchStaff(text: string, roster: StaffRow[]): StaffRow | null {
  const t = text.toLowerCase();
  for (const r of roster) {
    const key = r.staff_key.toLowerCase();
    if (new RegExp(`\\b${key.replace(/[^a-z0-9]/g, "")}\\b`).test(t.replace(/[^a-z0-9\s]/g, ""))) {
      return r;
    }
  }
  return null;
}

const NOT_NAMES = new Set([
  "staff", "here", "back", "ready", "testing", "just", "the", "your", "and", "with", "from",
]);

/**
 * Fallback for staff who aren't on the roster yet:
 * "hi thorn this is staff Jenna", "hello I am Jenna from Silverthorn".
 * Thorn assumes he knows them and greets by name.
 */
export function matchAdHocStaff(text: string): StaffRow | null {
  const t = text.replace(/[^A-Za-z0-9\s'’,.!-]/g, " ");
  const patterns = [
    /\b(?:this is|it'?s|i am|i'?m)\s+staff\s+([A-Za-z][A-Za-z'’-]{1,20})/i,
    /\bstaff\s*[:,-]?\s*([A-Za-z][A-Za-z'’-]{1,20})/i,
    /\b(?:this is|it'?s|i am|i'?m)\s+([A-Za-z][A-Za-z'’-]{1,20})\s*(?:,|\.|!)?\s*(?:from|at|with)\s+silverthorn/i,
  ];
  for (const re of patterns) {
    const m = t.match(re);
    const raw = m?.[1]?.trim();
    if (!raw) continue;
    const lower = raw.toLowerCase();
    if (NOT_NAMES.has(lower)) continue;
    const display = raw.charAt(0).toUpperCase() + raw.slice(1);
    return {
      staff_key: `adhoc:${lower}`,
      display_name: display,
      greeting: `Hi ${display}! 🐾 Tail's wagging — I'm here and ready. Let's do this!`,
      tone_notes: "Coworker tone: friendly, caring, ready for a test. No guest sales pitch.",
    };
  }
  return null;
}


export async function rememberStaffSession(sessionId: string, staff: StaffRow) {
  try {
    const admin = await getAdmin();
    await admin.from("thorn_staff_sessions").upsert({
      session_id: sessionId,
      staff_key: staff.staff_key,
      display_name: staff.display_name,
      last_seen_at: new Date().toISOString(),
    });
  } catch {
    /* non-fatal */
  }
}

export async function staffForSession(sessionId: string): Promise<StaffRow | null> {
  try {
    const admin = await getAdmin();
    const { data } = await admin
      .from("thorn_staff_sessions")
      .select("staff_key")
      .eq("session_id", sessionId)
      .maybeSingle();
    if (!data?.staff_key) return null;
    const roster = await loadRoster();
    return roster.find((r) => r.staff_key === data.staff_key) ?? null;
  } catch {
    return null;
  }
}
