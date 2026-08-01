import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  deleteFact,
  getThornAdmin,
  setFactApproval,
  unbanIp,
  type ThornAdminData,
} from "@/lib/thorn-admin.functions";

type Tab = "overview" | "transcripts" | "knowledge" | "abuse";

const TABS: { id: Tab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "transcripts", label: "Transcripts" },
  { id: "knowledge", label: "Knowledge" },
  { id: "abuse", label: "Abuse & bans" },
];

export function ThornAdminPanel() {
  const fetchData = useServerFn(getThornAdmin);
  const [tab, setTab] = useState<Tab>("overview");
  const qc = useQueryClient();
  const { data, isLoading, error } = useQuery<ThornAdminData>({
    queryKey: ["thorn-admin"],
    queryFn: () => fetchData(),
  });

  const approve = useServerFn(setFactApproval);
  const remove = useServerFn(deleteFact);
  const lift = useServerFn(unbanIp);
  const invalidate = () => qc.invalidateQueries({ queryKey: ["thorn-admin"] });

  const approveM = useMutation({
    mutationFn: (v: { id: string; approved: boolean }) => approve({ data: v }),
    onSuccess: invalidate,
  });
  const deleteM = useMutation({
    mutationFn: (id: string) => remove({ data: { id } }),
    onSuccess: invalidate,
  });
  const unbanM = useMutation({
    mutationFn: (ipHash: string) => lift({ data: { ipHash } }),
    onSuccess: invalidate,
  });

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading Thorn data…</p>;
  if (error) return <p className="text-sm text-red-600">{(error as Error).message}</p>;
  if (!data?.isAdmin) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xl font-bold">Thorn — AI assistant</h2>
      </div>

      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Thorn admin sections">
        {TABS.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              tab === t.id ? "bg-primary text-primary-foreground border-primary" : "bg-card hover:bg-muted"
            }`}
          >
            {t.label}
            {t.id === "knowledge" && data.facts.some((f) => !f.approved) && (
              <span className="ml-1.5 rounded-full bg-destructive px-1.5 text-[10px] text-white">
                {data.facts.filter((f) => !f.approved).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            <Stat label="Messages (24h)" value={data.totals.messages24h} />
            <Stat label="Conversations (24h)" value={data.totals.sessions24h} />
            <Stat label="Hand-offs to staff" value={data.totals.handoffs24h} />
            <Stat label="Avg reply time" value={`${data.totals.avgLatencyMs} ms`} />
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h3 className="mb-3 text-sm font-semibold">Most asked (24h)</h3>
            {data.topQuestions.length === 0 ? (
              <p className="text-xs text-muted-foreground">No questions yet today.</p>
            ) : (
              <ul className="space-y-1.5 text-xs">
                {data.topQuestions.map((q) => (
                  <li key={q.key} className="flex justify-between gap-3">
                    <span className="truncate">{q.key}</span>
                    <span className="font-semibold tabular-nums">{q.count}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}

      {tab === "transcripts" && (
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full text-xs">
            <thead className="bg-muted/40">
              <tr>
                <th className="p-2 text-left">Time</th>
                <th className="p-2 text-left">Session</th>
                <th className="p-2 text-left">Role</th>
                <th className="p-2 text-left">Mode</th>
                <th className="p-2 text-left">Message</th>
              </tr>
            </thead>
            <tbody>
              {data.messages.map((m) => (
                <tr key={m.id} className="border-t align-top">
                  <td className="whitespace-nowrap p-2">{new Date(m.created_at).toLocaleString()}</td>
                  <td className="p-2 font-mono text-[10px]">{m.session_id.slice(0, 10)}</td>
                  <td className="p-2">{m.role}</td>
                  <td className="p-2">{m.mode ?? "—"}</td>
                  <td className="max-w-[420px] p-2">{m.content}</td>
                </tr>
              ))}
              {data.messages.length === 0 && (
                <tr>
                  <td colSpan={5} className="p-4 text-center text-muted-foreground">
                    No conversations logged yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tab === "knowledge" && (
        <div className="space-y-3">
          <p className="text-xs text-muted-foreground">
            Thorn drafts these every night at 00:00 PST from questions he couldn't fully answer. Approved
            facts go straight into his答 knowledge for the next chat.
          </p>
          {data.facts.length === 0 && (
            <p className="text-xs text-muted-foreground">Nothing drafted yet.</p>
          )}
          {data.facts.map((f) => (
            <div key={f.id} className="rounded-lg border bg-card p-4 text-xs">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold text-sm">{f.topic}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                    f.approved ? "bg-primary/15 text-primary" : "bg-muted text-muted-foreground"
                  }`}
                >
                  {f.approved ? "Approved" : "Pending"}
                </span>
                {f.hits ? <span className="text-muted-foreground">{f.hits} asks</span> : null}
              </div>
              {f.question && <p className="mt-2 text-muted-foreground">Q: {f.question}</p>}
              <p className="mt-1">{f.answer}</p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => approveM.mutate({ id: f.id, approved: !f.approved })}
                  className="rounded-md border px-2.5 py-1 font-medium hover:bg-muted"
                >
                  {f.approved ? "Unapprove" : "Approve"}
                </button>
                <button
                  onClick={() => deleteM.mutate(f.id)}
                  className="rounded-md border px-2.5 py-1 font-medium text-destructive hover:bg-destructive/10"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "abuse" && (
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-4">
            <h3 className="mb-3 text-sm font-semibold">Banned visitors</h3>
            {data.bans.length === 0 ? (
              <p className="text-xs text-muted-foreground">Nobody is banned.</p>
            ) : (
              <ul className="space-y-2 text-xs">
                {data.bans.map((b) => (
                  <li key={b.ip_hash} className="flex items-start justify-between gap-3 border-b pb-2">
                    <div>
                      <p className="font-mono">{b.ip_preview ?? "hidden"}</p>
                      <p className="text-muted-foreground">{b.reason}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {new Date(b.banned_at).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => unbanM.mutate(b.ip_hash)}
                      className="shrink-0 rounded-md border px-2 py-1 hover:bg-muted"
                    >
                      Unban
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="rounded-lg border bg-card p-4">
            <h3 className="mb-3 text-sm font-semibold">Recent offenses</h3>
            {data.abuse.length === 0 ? (
              <p className="text-xs text-muted-foreground">No incidents logged.</p>
            ) : (
              <ul className="space-y-2 text-xs">
                {data.abuse.map((a) => (
                  <li key={a.id} className="border-b pb-2">
                    <p className="font-mono">
                      {a.ip_preview ?? "hidden"} · offense #{a.offense_no}
                    </p>
                    <p className="text-muted-foreground">{a.message}</p>
                    <p className="text-[10px] text-muted-foreground">
                      {new Date(a.created_at).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-bold">{value}</div>
    </div>
  );
}
