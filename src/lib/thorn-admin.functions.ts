import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type ThornMessage = {
  id: string;
  session_id: string;
  role: string;
  content: string;
  mode: string | null;
  ip_preview: string | null;
  handoff: boolean | null;
  latency_ms: number | null;
  created_at: string;
};

export type LearnedFact = {
  id: string;
  topic: string;
  question: string | null;
  answer: string;
  source: string | null;
  hits: number | null;
  approved: boolean | null;
  updated_at: string | null;
};

export type AbuseEvent = {
  id: string;
  ip_preview: string | null;
  term: string | null;
  message: string | null;
  offense_no: number | null;
  created_at: string;
};

export type BannedIp = {
  ip_hash: string;
  ip_preview: string | null;
  reason: string | null;
  banned_at: string;
};

export type ThornAdminData = {
  isAdmin: boolean;
  totals: { messages24h: number; sessions24h: number; handoffs24h: number; avgLatencyMs: number };
  topQuestions: { key: string; count: number }[];
  messages: ThornMessage[];
  facts: LearnedFact[];
  abuse: AbuseEvent[];
  bans: BannedIp[];
};

const EMPTY: ThornAdminData = {
  isAdmin: false,
  totals: { messages24h: 0, sessions24h: 0, handoffs24h: 0, avgLatencyMs: 0 },
  topQuestions: [],
  messages: [],
  facts: [],
  abuse: [],
  bans: [],
};

export const getThornAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<ThornAdminData> => {
    const { supabase, userId } = context;

    const { data: adminRow } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", userId)
      .maybeSingle();
    if (!adminRow) return EMPTY;

    const [msgRes, factRes, abuseRes, banRes] = await Promise.all([
      supabase
        .from("thorn_messages")
        .select("id, session_id, role, content, mode, ip_preview, handoff, latency_ms, created_at")
        .order("created_at", { ascending: false })
        .limit(300),
      supabase
        .from("thorn_learned_facts")
        .select("id, topic, question, answer, source, hits, approved, updated_at")
        .order("approved", { ascending: true })
        .order("hits", { ascending: false })
        .limit(100),
      supabase
        .from("thorn_abuse_events")
        .select("id, ip_preview, term, message, offense_no, created_at")
        .order("created_at", { ascending: false })
        .limit(100),
      supabase
        .from("thorn_banned_ips")
        .select("ip_hash, ip_preview, reason, banned_at")
        .order("banned_at", { ascending: false })
        .limit(100),
    ]);

    const messages = (msgRes.data ?? []) as ThornMessage[];
    const dayAgo = Date.now() - 86_400_000;
    const recent = messages.filter((m) => new Date(m.created_at).getTime() >= dayAgo);
    const latencies = recent.map((m) => m.latency_ms ?? 0).filter(Boolean);

    const questionTally = new Map<string, number>();
    for (const m of recent) {
      if (m.role !== "user") continue;
      const key = m.content.trim().slice(0, 70).toLowerCase();
      questionTally.set(key, (questionTally.get(key) ?? 0) + 1);
    }

    return {
      isAdmin: true,
      totals: {
        messages24h: recent.length,
        sessions24h: new Set(recent.map((m) => m.session_id)).size,
        handoffs24h: recent.filter((m) => m.handoff).length,
        avgLatencyMs: latencies.length
          ? Math.round(latencies.reduce((a, b) => a + b, 0) / latencies.length)
          : 0,
      },
      topQuestions: Array.from(questionTally, ([key, count]) => ({ key, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 12),
      messages,
      facts: (factRes.data ?? []) as LearnedFact[],
      abuse: (abuseRes.data ?? []) as AbuseEvent[],
      bans: (banRes.data ?? []) as BannedIp[],
    };
  });


async function assertAdmin(supabase: any, userId: string) {
  const { data } = await supabase.from("admin_users").select("user_id").eq("user_id", userId).maybeSingle();
  if (!data) throw new Error("Not authorized");
}

export const setFactApproval = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string; approved: boolean; answer?: string }) => data)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase
      .from("thorn_learned_facts")
      .update({
        approved: data.approved,
        ...(data.answer ? { answer: data.answer.slice(0, 2000) } : {}),
        updated_at: new Date().toISOString(),
      })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteFact = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase.from("thorn_learned_facts").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const unbanIp = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { ipHash: string }) => data)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase
      .from("thorn_banned_ips")
      .delete()
      .eq("ip_hash", data.ipHash);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

/** Wipe one test conversation (transcript + any abuse rows it produced). */
export const deleteSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: { sessionId: string }) => data)
  .handler(async ({ data, context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { error } = await context.supabase
      .from("thorn_messages")
      .delete()
      .eq("session_id", data.sessionId);
    if (error) throw new Error(error.message);
    await context.supabase.from("thorn_abuse_events").delete().eq("session_id", data.sessionId);
    return { ok: true };
  });

/** Clear every transcript belonging to a recognised staff session. */
export const clearStaffTestData = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context.supabase, context.userId);
    const { data: sessions } = await context.supabase
      .from("thorn_staff_sessions")
      .select("session_id");
    const ids = (sessions ?? []).map((s: { session_id: string }) => s.session_id);
    if (ids.length === 0) return { ok: true, cleared: 0 };
    const { error } = await context.supabase.from("thorn_messages").delete().in("session_id", ids);
    if (error) throw new Error(error.message);
    await context.supabase.from("thorn_abuse_events").delete().in("session_id", ids);
    return { ok: true, cleared: ids.length };
  });

