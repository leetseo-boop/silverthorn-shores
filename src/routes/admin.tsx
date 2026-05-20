import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { getAdminStats, type AdminStats } from "@/lib/admin-stats.functions";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin · Silverthorn" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [session, setSession] = useState<{ email: string | null } | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(s ? { email: s.user.email ?? null } : null);
    });
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ? { email: data.session.user.email ?? null } : null);
      setLoadingSession(false);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (loadingSession) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Loading…</div>;
  }
  if (!session) return <LoginForm />;
  return <Dashboard email={session.email} />;
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-card border rounded-xl p-6 shadow-sm space-y-4">
        <div>
          <h1 className="text-xl font-semibold">Admin sign in</h1>
          <p className="text-xs text-muted-foreground mt-1">Private dashboard. Access restricted.</p>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm bg-background"
          />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-medium">Password</label>
          <input
            type="password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border px-3 py-2 text-sm bg-background"
          />
        </div>
        {error && <p className="text-xs text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-md bg-primary text-primary-foreground py-2 text-sm font-medium disabled:opacity-60"
        >
          {loading ? "…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

function Dashboard({ email }: { email: string | null }) {
  const fetchStats = useServerFn(getAdminStats);
  const navigate = useNavigate();
  const { data, isLoading, error, refetch } = useQuery<AdminStats>({
    queryKey: ["admin-stats"],
    queryFn: () => fetchStats(),
  });

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/admin" });
  };

  if (isLoading) return <div className="min-h-screen flex items-center justify-center text-sm">Loading dashboard…</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-sm text-red-600">{(error as Error).message}</div>;
  if (!data) return null;

  if (!data.isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="max-w-md text-center space-y-3">
          <h1 className="text-xl font-semibold">Not authorized</h1>
          <p className="text-sm text-muted-foreground">
            Your account ({email}) is signed in but not an admin. Ask the site owner to add you to <code>admin_users</code>.
          </p>
          <button onClick={signOut} className="text-xs underline">Sign out</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 space-y-8">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Booking Click Analytics</h1>
          <p className="text-xs text-muted-foreground">Signed in as {email}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => refetch()} className="text-xs px-3 py-1.5 rounded-md border">Refresh</button>
          <button onClick={signOut} className="text-xs px-3 py-1.5 rounded-md border">Sign out</button>
        </div>
      </header>

      <section className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Stat label="Today" value={data.totals.today} />
        <Stat label="Last 7 days" value={data.totals.last7} />
        <Stat label="Last 30 days" value={data.totals.last30} />
        <Stat label="All time" value={data.totals.all} />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BreakdownTable title="Clicks by boat" rows={data.byBoat} />
        <BreakdownTable title="Clicks by source page" rows={data.bySourcePage} />
        <BreakdownTable title="Clicks by CTA location" rows={data.byCta} />
      </div>

      <section>
        <h2 className="text-sm font-semibold mb-3">Recent clicks (last 100)</h2>
        <div className="overflow-x-auto border rounded-lg">
          <table className="w-full text-xs">
            <thead className="bg-muted/40">
              <tr>
                <th className="text-left p-2">Time</th>
                <th className="text-left p-2">Boat</th>
                <th className="text-left p-2">Source page</th>
                <th className="text-left p-2">CTA</th>
                <th className="text-left p-2">Destination</th>
              </tr>
            </thead>
            <tbody>
              {data.recent.map((r) => (
                <tr key={r.id} className="border-t">
                  <td className="p-2 whitespace-nowrap">{new Date(r.created_at).toLocaleString()}</td>
                  <td className="p-2">{r.boat_id ?? "—"}</td>
                  <td className="p-2">{r.source_page}</td>
                  <td className="p-2">{r.cta_location}</td>
                  <td className="p-2 truncate max-w-[280px]">{(() => { const safe = /^https:\/\//i.test(r.destination_url) ? r.destination_url : null; return safe ? <a className="underline" href={safe} target="_blank" rel="noopener noreferrer">{safe}</a> : <span className="text-muted-foreground">{r.destination_url}</span>; })()}</td>
                </tr>
              ))}
              {data.recent.length === 0 && (
                <tr><td colSpan={5} className="p-4 text-center text-muted-foreground">No clicks yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="border rounded-lg p-4 bg-card">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="text-2xl font-bold mt-1">{value}</div>
    </div>
  );
}

function BreakdownTable({ title, rows }: { title: string; rows: { key: string; count: number }[] }) {
  const max = rows[0]?.count ?? 1;
  return (
    <div className="border rounded-lg p-4 bg-card">
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      {rows.length === 0 ? (
        <p className="text-xs text-muted-foreground">No data yet.</p>
      ) : (
        <ul className="space-y-2">
          {rows.map((r) => (
            <li key={r.key} className="text-xs">
              <div className="flex justify-between mb-1">
                <span className="truncate pr-2">{r.key}</span>
                <span className="font-semibold tabular-nums">{r.count}</span>
              </div>
              <div className="h-1.5 bg-muted rounded">
                <div className="h-full bg-primary rounded" style={{ width: `${(r.count / max) * 100}%` }} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
