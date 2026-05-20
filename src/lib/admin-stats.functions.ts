import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type BookingClick = {
  id: string;
  boat_id: string | null;
  source_page: string;
  cta_location: string;
  destination_url: string;
  referrer: string | null;
  user_agent: string | null;
  created_at: string;
};

export type AdminStats = {
  isAdmin: boolean;
  totals: { all: number; today: number; last7: number; last30: number };
  byBoat: { key: string; count: number }[];
  bySourcePage: { key: string; count: number }[];
  byCta: { key: string; count: number }[];
  recent: BookingClick[];
};

export const getAdminStats = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<AdminStats> => {
    const { supabase, userId } = context;

    const { data: adminRow } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", userId)
      .maybeSingle();

    if (!adminRow) {
      return {
        isAdmin: false,
        totals: { all: 0, today: 0, last7: 0, last30: 0 },
        byBoat: [],
        bySourcePage: [],
        byCta: [],
        recent: [],
      };
    }

    const { data, error } = await supabase
      .from("booking_clicks")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) throw new Error(error.message);

    const rows = (data ?? []) as BookingClick[];
    const now = Date.now();
    const dayMs = 86400000;

    const totals = {
      all: rows.length,
      today: rows.filter((r) => new Date(r.created_at).toDateString() === new Date().toDateString()).length,
      last7: rows.filter((r) => now - new Date(r.created_at).getTime() <= 7 * dayMs).length,
      last30: rows.filter((r) => now - new Date(r.created_at).getTime() <= 30 * dayMs).length,
    };

    const tally = (key: keyof BookingClick) => {
      const m = new Map<string, number>();
      for (const r of rows) {
        const k = (r[key] as string | null) ?? "(none)";
        m.set(k, (m.get(k) ?? 0) + 1);
      }
      return Array.from(m, ([key, count]) => ({ key, count })).sort((a, b) => b.count - a.count);
    };

    return {
      isAdmin: true,
      totals,
      byBoat: tally("boat_id"),
      bySourcePage: tally("source_page"),
      byCta: tally("cta_location"),
      recent: rows.slice(0, 100),
    };
  });
