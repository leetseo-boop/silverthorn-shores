import { useEffect, useState } from "react";
import { ChevronDown, ArrowUp, Clock } from "lucide-react";

const NAVY = "#1B2B3A";
const ORANGE = "#E8640A";
const SAND = "#F4EFE6";

type TocItem = { id: string; title: string };

/** Sticky collapsible TOC visible only on mobile (<lg). Desktop sidebar TOC is unchanged. */
export function MobileToc({ sections }: { sections: TocItem[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="lg:hidden sticky top-16 z-30 border-b"
      style={{ backgroundColor: SAND, borderColor: "rgba(27,43,58,0.12)" }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-2 px-5 py-3"
        aria-expanded={open}
      >
        <span className="inline-flex items-center gap-2">
          <Clock className="w-4 h-4" style={{ color: ORANGE }} />
          <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: NAVY }}>
            On this page
          </span>
        </span>
        <ChevronDown
          className="w-4 h-4 transition-transform"
          style={{ color: NAVY, transform: open ? "rotate(180deg)" : "none" }}
        />
      </button>
      {open && (
        <nav className="max-h-[60vh] overflow-y-auto px-3 pb-3 grid gap-1 bg-white border-t"
          style={{ borderColor: "rgba(27,43,58,0.08)" }}>
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className="block rounded-md px-3 py-3 text-sm font-medium hover:bg-orange-50"
              style={{ color: NAVY }}
            >
              {s.title}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
}

/** Floating back-to-top button, mobile only. Appears after 600px scroll. */
export function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="lg:hidden fixed bottom-4 right-4 z-40 w-12 h-12 rounded-full shadow-lg flex items-center justify-center"
      style={{ backgroundColor: NAVY, color: "white" }}
    >
      <ArrowUp className="w-5 h-5" style={{ color: ORANGE }} />
    </button>
  );
}
