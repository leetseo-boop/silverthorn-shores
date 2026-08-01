import { useCallback, useEffect, useRef, useState } from "react";
import { X, Send, RotateCcw, ScrollText, ExternalLink } from "lucide-react";
import { getConsent } from "@/lib/cookie-consent";
import { ThornTrace } from "@/components/ThornTrace";
import { POLICY_SOURCES } from "@/lib/thorn-sources";
import {
  MOOD_ALT,
  MOOD_IMAGES,
  MOOD_STATUS,
  detectMood,
  extractMoodTag,
  extractSources,
  stripPartialTags,
  type ThornMood,
} from "@/lib/thorn-moods";

type Msg = { role: "user" | "assistant"; content: string; sources?: string[] };

const STORAGE_KEY = "thorn-chat-history";
const SESSION_KEY = "thorn-session-id";
const MAX_STORED = 30;

const QUICK_ASKS = ["Houseboat rates", "Cabins", "Pet policy", "Directions", "Summer sale"];
const POLICY_ASKS = [
  "Cancellation policy",
  "Deposits",
  "Check-in / check-out",
  "Pets",
  "Age requirement",
];

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),[tabindex]:not([tabindex="-1"])';

function getSessionId(): string {
  if (typeof window === "undefined") return "anon";
  try {
    let id = window.localStorage.getItem(SESSION_KEY);
    if (!id) {
      id = `s_${Math.random().toString(36).slice(2)}${Date.now().toString(36)}`;
      window.localStorage.setItem(SESSION_KEY, id);
    }
    return id;
  } catch {
    return "anon";
  }
}

function loadHistory(): Msg[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return Array.isArray(parsed) ? (parsed as Msg[]).slice(-MAX_STORED) : [];
  } catch {
    return [];
  }
}

/** Turn "/houseboats/policy#cancellation" into "Houseboat Policy · Cancellation". */
function pathLabel(path: string): string {
  const [p, hash] = path.split("#");
  const words = p
    .split("/")
    .filter(Boolean)
    .map((s) => s.replace(/-/g, " "))
    .join(" · ");
  const pretty = (s: string) => s.replace(/\b\w/g, (c) => c.toUpperCase());
  return pretty(hash ? `${words} · ${hash.replace(/-/g, " ")}` : words) || path;
}

/** Very small markdown renderer: links, **bold**, phone numbers, line breaks. */
function renderRich(text: string) {
  const lines = text.split("\n");
  return lines.map((rawLine, i) => {
    const bullet = /^\s*[*-]\s+/.test(rawLine);
    const line = bullet ? rawLine.replace(/^\s*[*-]\s+/, "") : rawLine;
    const parts: React.ReactNode[] = [];
    const rx =
      /(\[[^\]]+\]\([^)\s]+\))|(\*\*[^*]+\*\*)|(https?:\/\/[^\s)]+)|(\/[a-z0-9-]+(?:\/[a-z0-9-]+)*)|(\b\d{3}-\d{3}-\d{4}\b)/gi;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = rx.exec(line)) !== null) {
      if (m.index > last) parts.push(line.slice(last, m.index));
      const token = m[0];
      const md = token.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      const linkClass =
        "rounded-sm font-medium text-primary underline underline-offset-2 [overflow-wrap:anywhere] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1";
      if (md) {
        const href = md[2];
        parts.push(
          <a
            key={`${i}-${m.index}`}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className={linkClass}
          >
            {md[1]}
          </a>,
        );
      } else if (token.startsWith("**")) {
        parts.push(
          <strong key={`${i}-${m.index}`} className="font-semibold">
            {token.slice(2, -2)}
          </strong>,
        );
      } else if (/^\d{3}-\d{3}-\d{4}$/.test(token)) {
        parts.push(
          <a key={`${i}-${m.index}`} href={`tel:+1${token.replace(/-/g, "")}`} className={linkClass}>
            {token}
          </a>,
        );
      } else {
        const isExternal = token.startsWith("http");
        parts.push(
          <a
            key={`${i}-${m.index}`}
            href={token}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className={linkClass}
          >
            {isExternal ? token : pathLabel(token)}
          </a>,
        );
      }
      last = m.index + token.length;
    }
    if (last < line.length) parts.push(line.slice(last));
    return (
      <span key={i} className={bullet ? "flex gap-2 pl-1" : "block"}>
        {bullet && <span aria-hidden="true" className="text-primary">•</span>}
        <span>{parts.length ? parts : "\u00A0"}</span>
      </span>
    );
  });
}

const ICON_BTN =
  "inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary sm:h-11 sm:w-11";

export function ThornChat() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mood, setMood] = useState<ThornMood>("wave");
  const [policyMode, setPolicyMode] = useState(false);
  const [consentDecided, setConsentDecided] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);

  useEffect(() => {
    setMounted(true);
    setMessages(loadHistory());
    setConsentDecided(getConsent() !== null);
    const onConsent = () => setConsentDecided(true);
    window.addEventListener("str-consent-change", onConsent);
    return () => window.removeEventListener("str-consent-change", onConsent);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED)));
    } catch {
      /* storage full or blocked — chat still works in memory */
    }
  }, [messages, mounted]);

  // Keep the newest message in view and the composer ready to type in.
  useEffect(() => {
    if (!open) return;
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    inputRef.current?.focus();
  }, [messages, open, loading]);

  // Wake the assistant endpoint as soon as the panel opens.
  const warmed = useRef(false);
  useEffect(() => {
    if (!open || warmed.current) return;
    warmed.current = true;
    fetch("/api/chat", { method: "GET" }).catch(() => {});
  }, [open]);

  // Return focus to the launcher when the panel closes.
  useEffect(() => {
    if (!open && restoreFocus.current) {
      restoreFocus.current = false;
      launcherRef.current?.focus();
    }
  }, [open]);


  // Thorn dozes off when the panel sits idle.
  useEffect(() => {
    if (loading) return;
    const t = window.setTimeout(() => setMood("resting"), 60000);
    return () => window.clearTimeout(t);
  }, [open, loading, messages]);

  const closePanel = useCallback(() => {
    restoreFocus.current = true;
    setOpen(false);
  }, []);

  const onPanelKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        closePanel();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(
        panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE),
      ).filter((el) => el.offsetParent !== null);
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (e.shiftKey && (active === first || !panelRef.current.contains(active))) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    },
    [closePanel],
  );

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || loading) return;
      setError(null);
      setInput("");
      const next: Msg[] = [...messages, { role: "user", content: text }];
      setMessages(next);
      setMood("thinking");
      setLoading(true);

      // Switch to a topic mood a beat later so "thinking" is visible first.
      const topic = detectMood(text);
      const topicTimer = topic ? window.setTimeout(() => setMood(topic), 900) : undefined;

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: next.map(({ role, content }) => ({ role, content })),
            mode: policyMode ? "policy" : "general",
            sessionId: getSessionId(),
          }),
        });

        if (res.status === 403) {
          setMessages((m) => [
            ...m,
            {
              role: "assistant",
              content:
                "Your access to this site has been revoked after repeated abusive language.",
            },
          ]);
          setMood("upset");
          return;
        }
        if (res.status === 429)
          throw new Error("Thorn is getting a lot of belly rubs right now — try again in a minute.");
        if (res.status === 402)
          throw new Error("Thorn is out of treats for today. Please call 800-332-3044.");
        if (!res.ok || !res.body)
          throw new Error("Thorn couldn't reach the front desk. Try again, or call 800-332-3044.");

        setMessages((m) => [...m, { role: "assistant", content: "" }]);
        const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
        let acc = "";
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          acc += value;
          const visible = stripPartialTags(acc);
          setMessages((m) => {
            const copy = [...m];
            copy[copy.length - 1] = { role: "assistant", content: visible };
            return copy;
          });
        }

        const withoutSources = extractSources(acc);
        const withoutMood = extractMoodTag(withoutSources.text);
        const finalSources = withoutSources.sources.length
          ? withoutSources.sources
          : extractSources(withoutMood.text).sources;
        const clean = extractSources(withoutMood.text).text;

        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = {
            role: "assistant",
            content: clean,
            sources: finalSources.filter((id) => POLICY_SOURCES[id]),
          };
          return copy;
        });
        setMood(withoutMood.mood ?? topic ?? detectMood(clean) ?? "helping");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
        setMood("helping");
      } finally {
        if (topicTimer) window.clearTimeout(topicTimer);
        setLoading(false);
      }
    },
    [loading, messages, policyMode],
  );

  if (!mounted || (!consentDecided && !open)) return null;

  const asks = policyMode ? POLICY_ASKS : QUICK_ASKS;

  return (
    <>
      {/* Launcher */}
      {!open && (
        <button
          ref={launcherRef}
          type="button"
          onClick={() => {
            setOpen(true);
            if (messages.length === 0) setMood("wave");
          }}
          aria-label="Chat with Thorn, the Silverthorn Resort assistant"
          title={`Chat with Thorn — ${MOOD_STATUS[mood]}`}
          className="group fixed right-3 z-40 flex items-end gap-2 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 md:right-5"
          style={{ bottom: "max(1rem, calc(env(safe-area-inset-bottom) + 0.75rem))" }}
        >
          <span className="hidden rounded-full border border-primary/40 bg-card px-3 py-1.5 text-xs font-semibold text-secondary shadow-md transition-transform group-hover:scale-105 motion-reduce:transition-none sm:inline-block">
            Chat with Thorn 🐾
          </span>
          <img
            key={mood}
            src={MOOD_IMAGES[mood]}
            alt=""
            aria-hidden="true"
            width={512}
            height={512}
            loading="lazy"
            className="h-16 w-16 animate-in fade-in duration-300 motion-reduce:animate-none drop-shadow-[0_6px_14px_rgba(0,0,0,0.25)] transition-transform group-hover:-translate-y-1 motion-reduce:transition-none md:h-20 md:w-20"
          />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="Chat with Thorn, the Silverthorn Resort assistant"
          className="fixed right-2 left-2 z-50 flex max-h-[85dvh] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:left-auto sm:right-5 sm:w-[390px]"
          style={{ bottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
          onKeyDown={onPanelKeyDown}
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-secondary px-3 py-3 text-secondary-foreground">
            <img
              key={mood}
              src={MOOD_IMAGES[mood]}
              alt={MOOD_ALT[mood]}
              width={512}
              height={512}
              loading="lazy"
              className="h-11 w-11 shrink-0 animate-in fade-in duration-300 motion-reduce:animate-none"
            />
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-semibold leading-tight">Thorn</p>
              <p className="flex items-center gap-1.5 text-xs text-secondary-foreground">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                <span aria-live="polite">
                  {loading ? MOOD_STATUS.thinking : MOOD_STATUS[mood]}
                </span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPolicyMode((v) => !v)}
              aria-pressed={policyMode}
              aria-label="Policies and booking mode"
              title="Policies & Booking mode — answers straight from our policy pages"
              className={`${ICON_BTN} ${
                policyMode
                  ? "bg-primary text-primary-foreground"
                  : "text-secondary-foreground hover:bg-white/10"
              }`}
            >
              <ScrollText className="h-5 w-5" />
            </button>
            {messages.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setMessages([]);
                  setError(null);
                  setMood("wave");
                  inputRef.current?.focus();
                }}
                aria-label="Start a new conversation"
                className={`${ICON_BTN} text-secondary-foreground hover:bg-white/10`}
              >
                <RotateCcw className="h-5 w-5" />
              </button>
            )}
            <button
              type="button"
              onClick={closePanel}
              aria-label="Close chat"
              className={`${ICON_BTN} text-secondary-foreground hover:bg-white/10`}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {policyMode && (
            <p className="border-b border-border bg-primary/10 px-4 py-2 text-xs font-medium text-secondary">
              Policies &amp; Booking mode — answers come straight from our published policies, with
              links to the exact section.
            </p>
          )}

          {/* Transcript */}
          <div
            ref={scrollRef}
            role="log"
            aria-live="polite"
            aria-relevant="additions text"
            aria-label="Conversation with Thorn"
            tabIndex={0}
            className="flex-1 space-y-3 overflow-y-auto px-4 py-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
          >
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-base font-semibold text-secondary">Hi, I'm Thorn! 🐾</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {policyMode
                    ? "Ask me about deposits, cancellation, check-in and check-out, pets or age rules — I'll quote our policies and link the page."
                    : "I live here at Silverthorn Resort on Shasta Lake. Ask me about houseboats, cabins, boat rentals, policies, or planning your trip."}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {asks.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="min-h-9 rounded-full border border-primary/50 bg-primary/10 px-3 py-1.5 text-xs font-medium text-secondary transition-colors hover:bg-primary hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m, i) =>
              m.role === "user" ? (
                <div key={i} className="flex justify-end">
                  <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-primary-foreground">
                    <span className="sr-only">You said: </span>
                    {m.content}
                  </p>
                </div>
              ) : (
                <div key={i} className="max-w-[95%] space-y-1 text-sm leading-relaxed text-foreground">
                  <span className="sr-only">Thorn said: </span>
                  {(() => {
                    const trace = m.content.match(/\[\[TRACE\]\]([^[]*)\[\[\/TRACE\]\]/);
                    if (!trace) return renderRich(m.content);
                    const [before, after] = m.content.split(trace[0]);
                    return (
                      <>
                        {renderRich(before)}
                        <ThornTrace ip={trace[1].trim()} />
                        {renderRich(after ?? "")}
                      </>
                    );
                  })()}
                  {m.sources && m.sources.length > 0 && (
                    <div className="pt-2">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                        From our policies
                      </p>
                      <ul className="mt-1.5 flex flex-wrap gap-1.5">
                        {m.sources.map((id) => {
                          const src = POLICY_SOURCES[id];
                          if (!src) return null;
                          return (
                            <li key={id}>
                              <a
                                href={src.href}
                                className="inline-flex items-center gap-1 rounded-full border border-border bg-muted px-2.5 py-1 text-[11px] font-medium text-secondary transition-colors hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1"
                              >
                                {src.label}
                                <ExternalLink className="h-3 w-3" aria-hidden="true" />
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              ),
            )}

            {loading && (
              <p className="animate-pulse text-sm text-muted-foreground motion-reduce:animate-none">
                Thorn is sniffing around…
              </p>
            )}
            {error && (
              <p
                role="alert"
                className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive"
              >
                {error}
              </p>
            )}
          </div>

          {/* Composer */}
          <div className="border-t border-border bg-card p-3">
            <div className="flex items-end gap-2">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send(input);
                  }
                }}
                rows={1}
                placeholder={policyMode ? "Ask about a policy…" : "Ask Thorn anything…"}
                aria-label={policyMode ? "Ask Thorn about a policy" : "Message Thorn"}
                className="max-h-24 flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              />
              <button
                type="button"
                onClick={() => send(input)}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-50"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
