// Lightweight cookie consent — controls Google Analytics via Consent Mode v2.
// Not a full CMP; no IAB TCF. Values stored in localStorage.

export type ConsentState = {
  analytics: boolean;
  decidedAt: string;
};

const KEY = "str-cookie-consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ConsentState;
    if (typeof parsed?.analytics !== "boolean") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function setConsent(analytics: boolean): ConsentState {
  const state: ConsentState = { analytics, decidedAt: new Date().toISOString() };
  if (typeof window !== "undefined") {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      /* ignore */
    }
  }
  applyConsent(state);
  window.dispatchEvent(new CustomEvent("str-consent-change", { detail: state }));
  return state;
}

export function applyConsent(state?: ConsentState | null) {
  if (typeof window === "undefined") return;
  const s = state ?? getConsent();
  const granted = s?.analytics === true;
  const gtag = window.gtag;
  if (typeof gtag === "function") {
    gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }
}
