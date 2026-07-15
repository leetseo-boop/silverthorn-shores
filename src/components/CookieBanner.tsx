import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { getConsent, setConsent, applyConsent } from "@/lib/cookie-consent";

const HIDDEN_PREFIXES = ["/admin", "/cookie-settings", "/privacy", "/terms"];

export function CookieBanner() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    if (existing) {
      applyConsent(existing);
      setVisible(false);
    } else {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;
  if (HIDDEN_PREFIXES.some((p) => pathname.startsWith(p))) return null;

  const decide = (analytics: boolean) => {
    setConsent(analytics);
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed z-50 bottom-4 left-4 right-4 sm:right-auto sm:max-w-md rounded-xl shadow-xl border p-4 text-sm"
      style={{ backgroundColor: "#ffffff", borderColor: "rgba(27,43,58,0.15)", color: "#1B2B3A" }}
    >
      <p className="mb-3 leading-snug">
        We use cookies for basic site functionality and, with your permission, Google Analytics to
        improve the site.{" "}
        <Link to="/privacy" className="underline" style={{ color: "#1A6FA8" }}>
          Learn more
        </Link>
        .
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => decide(true)}
          className="px-3 py-1.5 rounded-md text-white text-xs font-medium"
          style={{ backgroundColor: "#E8640A" }}
        >
          Accept
        </button>
        <button
          onClick={() => decide(false)}
          className="px-3 py-1.5 rounded-md text-xs font-medium border"
          style={{ borderColor: "rgba(27,43,58,0.25)", color: "#1B2B3A" }}
        >
          Decline
        </button>
        <Link
          to="/cookie-settings"
          onClick={() => setVisible(false)}
          className="px-3 py-1.5 rounded-md text-xs font-medium"
          style={{ color: "#1A6FA8" }}
        >
          Settings
        </Link>
      </div>
    </div>
  );
}
