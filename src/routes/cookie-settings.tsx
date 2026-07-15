import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { getConsent, setConsent } from "@/lib/cookie-consent";

export const Route = createFileRoute("/cookie-settings")({
  head: () => ({
    meta: [
      { title: "Cookie Settings | Silverthorn Resort" },
      { name: "description", content: "Manage your cookie preferences for silverthornresort.com." },
      { property: "og:title", content: "Cookie Settings | Silverthorn Resort" },
      { property: "og:description", content: "Manage your cookie preferences for silverthornresort.com." },
      { name: "robots", content: "index,follow" },
    ],
    links: [{ rel: "canonical", href: "https://silverthornresort.com/cookie-settings" }],
  }),
  component: CookieSettingsPage,
});

function CookieSettingsPage() {
  const [analytics, setAnalytics] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const c = getConsent();
    if (c) {
      setAnalytics(c.analytics);
      setSavedAt(c.decidedAt);
    }
    setHydrated(true);
  }, []);

  const save = () => {
    const s = setConsent(analytics);
    setSavedAt(s.decidedAt);
  };

  return (
    <main className="max-w-3xl mx-auto px-6 py-16" style={{ color: "#1B2B3A" }}>
      <h1 className="text-4xl font-bold mb-3">Cookie Settings</h1>
      <p className="text-muted-foreground mb-8">
        Choose which cookies you allow on silverthornresort.com. See our{" "}
        <Link to="/privacy" className="underline">Privacy Policy</Link> for details.
      </p>

      <div className="space-y-4">
        <Card
          title="Strictly necessary"
          desc="Required for the site to function (page routing, security, form submission). Always on."
          right={<span className="text-xs uppercase tracking-wider px-2 py-1 rounded" style={{ backgroundColor: "rgba(27,43,58,0.08)" }}>Always on</span>}
        />

        <Card
          title="Analytics (Google Analytics 4)"
          desc="Helps us understand which pages are useful so we can improve them. No advertising cookies."
          right={
            <label className="inline-flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="h-4 w-4"
                aria-label="Enable analytics cookies"
              />
              <span className="text-sm">{analytics ? "On" : "Off"}</span>
            </label>
          }
        />
      </div>

      <div className="mt-8 flex items-center gap-4 flex-wrap">
        <button
          onClick={save}
          disabled={!hydrated}
          className="px-5 py-2 rounded-md text-white text-sm font-medium disabled:opacity-50"
          style={{ backgroundColor: "#E8640A" }}
        >
          Save preferences
        </button>
        {savedAt && (
          <span className="text-xs text-muted-foreground">
            Last saved {new Date(savedAt).toLocaleString()}
          </span>
        )}
      </div>
    </main>
  );
}

function Card({ title, desc, right }: { title: string; desc: string; right: React.ReactNode }) {
  return (
    <div className="rounded-lg border p-5 flex items-start justify-between gap-4" style={{ borderColor: "rgba(27,43,58,0.15)" }}>
      <div>
        <div className="font-semibold mb-1">{title}</div>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <div className="shrink-0">{right}</div>
    </div>
  );
}
