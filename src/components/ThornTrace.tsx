import { useEffect, useState } from "react";

const LINES = [
  "> initiating trace…",
  "> resolving client socket",
  "> reading X-Forwarded-For chain",
  "> geo lookup … Shasta County node",
  "> fingerprinting session",
  "> writing abuse record → thorn_abuse_events",
  "> applying access rule: DENY *",
];

/** Theatrical "we're tracing you" terminal shown on a second offense. */
export function ThornTrace({ ip }: { ip: string }) {
  const [shown, setShown] = useState(1);

  useEffect(() => {
    if (shown >= LINES.length) return;
    const t = window.setTimeout(() => setShown((n) => n + 1), 520);
    return () => window.clearTimeout(t);
  }, [shown]);

  return (
    <div
      role="status"
      className="my-2 overflow-hidden rounded-lg border border-destructive/50 bg-secondary font-mono text-[11px] leading-relaxed text-primary-foreground shadow-inner"
    >
      <div className="flex items-center gap-1.5 border-b border-white/10 bg-black/30 px-2.5 py-1.5">
        <span className="h-2 w-2 rounded-full bg-destructive" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
        <span className="h-2 w-2 rounded-full bg-white/40" aria-hidden="true" />
        <span className="ml-1 text-[10px] uppercase tracking-wider text-white/70">
          silverthorn · security
        </span>
      </div>
      <div className="space-y-0.5 overflow-x-auto px-3 py-2.5">
        {LINES.slice(0, shown).map((l) => (
          <p key={l} className="whitespace-pre-wrap break-words text-white/85">
            {l}
          </p>
        ))}
        {shown >= LINES.length && (
          <>
            <p className="break-all text-white/85">&gt; client address: {ip}</p>
            <p className="font-semibold text-destructive">&gt; ACCESS REVOKED</p>
          </>
        )}
        <span className="inline-block h-3 w-1.5 animate-pulse bg-primary align-middle motion-reduce:animate-none" />
      </div>
    </div>
  );
}
