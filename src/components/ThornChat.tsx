import { useCallback, useEffect, useRef, useState } from "react";
import { X, Send, RotateCcw } from "lucide-react";
import {
  MOOD_ALT,
  MOOD_IMAGES,
  detectMood,
  extractMoodTag,
  stripPartialMoodTag,
  type ThornMood,
} from "@/lib/thorn-moods";

type Msg = { role: "user" | "assistant"; content: string };

const STORAGE_KEY = "thorn-chat-history";
const MAX_STORED = 30;

const QUICK_ASKS = [
  "Houseboat rates",
  "Cabins",
  "Pet policy",
  "Directions",
  "Summer sale",
];

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

/** Very small markdown renderer: **bold**, links, and line breaks. */
function renderRich(text: string) {
  const lines = text.split("\n");
  return lines.map((line, i) => {
    const parts: React.ReactNode[] = [];
    const rx =
      /(\[[^\]]+\]\([^)\s]+\))|(\*\*[^*]+\*\*)|(https?:\/\/[^\s)]+)|(\/[a-z0-9-]+(?:\/[a-z0-9-]+)*)|(\b\d{3}-\d{3}-\d{4}\b)/gi;
    let last = 0;
    let m: RegExpExecArray | null;
    while ((m = rx.exec(line)) !== null) {
      if (m.index > last) parts.push(line.slice(last, m.index));
      const token = m[0];
      const md = token.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
      if (md) {
        const href = md[2];
        parts.push(
          <a
            key={`${i}-${m.index}`}
            href={href}
            target={href.startsWith("http") ? "_blank" : undefined}
            rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
            className="font-medium text-primary underline underline-offset-2"
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
          <a
            key={`${i}-${m.index}`}
            href={`tel:+1${token.replace(/-/g, "")}`}
            className="font-semibold text-primary underline underline-offset-2"
          >
            {token}
          </a>,
        );
      } else {
        parts.push(
          <a
            key={`${i}-${m.index}`}
            href={token}
            target={token.startsWith("http") ? "_blank" : undefined}
            rel={token.startsWith("http") ? "noopener noreferrer" : undefined}
            className="text-primary underline underline-offset-2"
          >
            {token}
          </a>,
        );
      }
      last = m.index + token.length;
    }
    if (last < line.length) parts.push(line.slice(last));
    return (
      <span key={i} className="block">
        {parts.length ? parts : "\u00A0"}
      </span>
    );
  });
}

export function ThornChat() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mood, setMood] = useState<ThornMood>("wave");
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
    setMessages(loadHistory());
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      window.localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(messages.slice(-MAX_STORED)),
      );
    } catch {
      /* storage full or blocked — chat still works in memory */
    }
  }, [messages, mounted]);

  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
      inputRef.current?.focus();
    }
  }, [messages, open, loading]);

  // Thorn dozes off when the panel sits idle.
  useEffect(() => {
    if (!open || loading) return;
    const t = window.setTimeout(() => setMood("resting"), 60000);
    return () => window.clearTimeout(t);
  }, [open, loading, messages]);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || loading) return;
      setError(null);
      setInput("");
      const next: Msg[] = [...messages, { role: "user", content: text }];
      setMessages(next);
      setMood(detectMood(text) ?? "thinking");
      setLoading(true);

      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: next }),
        });

        if (res.status === 429) throw new Error("Thorn is getting a lot of belly rubs right now — try again in a minute.");
        if (res.status === 402) throw new Error("Thorn is out of treats for today. Please call 800-332-3044.");
        if (!res.ok || !res.body) throw new Error("Thorn couldn't reach the front desk. Try again, or call 800-332-3044.");

        setMessages((m) => [...m, { role: "assistant", content: "" }]);
        const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
        let acc = "";
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          acc += value;
          const visible = stripPartialMoodTag(acc);
          setMessages((m) => {
            const copy = [...m];
            copy[copy.length - 1] = { role: "assistant", content: visible };
            return copy;
          });
        }

        const { text: clean, mood: tagged } = extractMoodTag(acc);
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: clean };
          return copy;
        });
        setMood(tagged ?? detectMood(clean) ?? "helping");
      } catch (e) {
        setError(e instanceof Error ? e.message : "Something went wrong.");
        setMood("helping");
      } finally {
        setLoading(false);
      }
    },
    [loading, messages],
  );

  if (!mounted) return null;

  return (
    <>
      {/* Launcher */}
      {!open && (
        <button
          type="button"
          onClick={() => {
            setOpen(true);
            setMood("wave");
          }}
          aria-label="Chat with Thorn, the Silverthorn Resort assistant"
          className="group fixed right-3 z-40 flex items-end gap-2 md:right-5"
          style={{ bottom: "max(1rem, calc(env(safe-area-inset-bottom) + 0.75rem))" }}
        >
          <span className="hidden rounded-full border border-primary/30 bg-card px-3 py-1.5 text-xs font-semibold text-secondary shadow-md transition-transform group-hover:scale-105 sm:inline-block">
            Chat with Thorn 🐾
          </span>
          <img
            src={MOOD_IMAGES.wave}
            alt={MOOD_ALT.wave}
            width={512}
            height={512}
            loading="lazy"
            className="h-16 w-16 drop-shadow-[0_6px_14px_rgba(0,0,0,0.25)] transition-transform group-hover:-translate-y-1 md:h-20 md:w-20"
          />
        </button>
      )}

      {/* Panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Chat with Thorn"
          className="fixed right-2 left-2 z-50 flex max-h-[80vh] flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-2xl sm:left-auto sm:right-5 sm:w-[380px]"
          style={{ bottom: "max(0.5rem, env(safe-area-inset-bottom))" }}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 border-b border-border bg-secondary px-4 py-3 text-secondary-foreground">
            <img
              src={MOOD_IMAGES[mood]}
              alt={MOOD_ALT[mood]}
              width={512}
              height={512}
              loading="lazy"
              className="h-11 w-11 shrink-0 transition-opacity"
            />
            <div className="min-w-0 flex-1">
              <p className="font-display text-lg font-semibold leading-tight">Thorn</p>
              <p className="flex items-center gap-1.5 text-xs opacity-80">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                Resort dog & guest helper
              </p>
            </div>
            {messages.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setMessages([]);
                  setError(null);
                  setMood("wave");
                }}
                aria-label="Start a new conversation"
                className="rounded-full p-1.5 opacity-70 transition-opacity hover:opacity-100"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            )}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-1.5 opacity-70 transition-opacity hover:opacity-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Transcript */}
          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.length === 0 && (
              <div className="space-y-3">
                <p className="text-base font-semibold text-secondary">Hi, I'm Thorn! 🐾</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  I live here at Silverthorn Resort on Shasta Lake. Ask me about houseboats,
                  cabins, boat rentals, policies, or planning your trip.
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {QUICK_ASKS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => send(q)}
                      className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs font-medium text-secondary transition-colors hover:bg-primary hover:text-primary-foreground"
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
                  <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-3.5 py-2 text-sm text-primary-foreground">
                    {m.content}
                  </div>
                </div>
              ) : (
                <div key={i} className="max-w-[95%] space-y-1 text-sm leading-relaxed text-foreground">
                  {renderRich(m.content)}
                </div>
              ),
            )}

            {loading && (
              <p className="animate-pulse text-sm text-muted-foreground">Thorn is sniffing around…</p>
            )}
            {error && (
              <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
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
                placeholder="Ask Thorn anything…"
                aria-label="Message Thorn"
                className="max-h-24 flex-1 resize-none rounded-xl border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <button
                type="button"
                onClick={() => send(input)}
                disabled={loading || !input.trim()}
                aria-label="Send message"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[11px] text-muted-foreground">
              Thorn is an AI helper — for availability call{" "}
              <a href="tel:+18003323044" className="font-medium text-primary">
                800-332-3044
              </a>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
