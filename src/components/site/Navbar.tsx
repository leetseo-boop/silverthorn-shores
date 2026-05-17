import { useEffect, useState } from "react";
import { BookNowButton } from "./BookNowButton";

const links = [
  { href: "#fleet", label: "Fleet" },
  { href: "#about", label: "About" },
  { href: "#testimonials", label: "Reviews" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 bg-navy/95 backdrop-blur supports-[backdrop-filter]:bg-navy/80 text-white transition-shadow ${
        scrolled ? "shadow-lg shadow-black/20 border-b border-white/10" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl flex items-center justify-between px-5 sm:px-8 h-16">
        <a href="#top" className="flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-primary" />
          <span className="font-display text-xl tracking-wide">
            Silverthorn <span className="text-white/70">Resort</span>
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-white/80">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-white transition-colors">
              {l.label}
            </a>
          ))}
        </nav>
        <BookNowButton size="sm" />
      </div>
    </header>
  );
}
