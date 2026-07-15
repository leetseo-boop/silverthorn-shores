import { cn } from "@/lib/utils";

const SOCIALS = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/silverthornresort/",
    color: "#1877F2",
    svg: (
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/silverthornresortandmarina",
    color: "url(#instagram-gradient)",
    svg: (
      <>
        <defs>
          <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f09433" />
            <stop offset="25%" stopColor="#e6683c" />
            <stop offset="50%" stopColor="#dc2743" />
            <stop offset="75%" stopColor="#cc2366" />
            <stop offset="100%" stopColor="#bc1888" />
          </linearGradient>
        </defs>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
      </>
    ),
  },
  {
    name: "TikTok",
    href: "https://www.tiktok.com/@houseboats.com",
    color: "#000000",
    svg: (
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.53V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@houseboatslakeshasta",
    color: "#FF0000",
    svg: (
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    ),
  },
  {
    name: "Pinterest",
    href: "https://www.pinterest.com/shastalakehouseboats",
    color: "#BD081C",
    svg: (
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.911 2.168-2.911 1.022 0 1.516.767 1.516 1.687 0 1.026-.653 2.559-.991 3.984-.282 1.187.599 2.153 1.776 2.153 2.132 0 3.771-2.247 3.771-5.493 0-2.874-2.064-4.883-5.012-4.883-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.311 1.261c-.05.201-.166.243-.381.147-1.42-.661-2.303-2.731-2.303-4.391 0-3.576 2.599-6.858 7.495-6.858 3.94 0 6.995 2.806 6.995 6.555 0 3.91-2.466 7.072-6.174 7.072-1.205 0-2.335-.626-2.722-1.366l-.74 2.808c-.267 1.026-.987 2.314-1.465 3.099A12 12 0 1 0 24 12c0-6.627-5.373-12-12-12z" />
    ),
  },
];

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)} role="list" aria-label="Social media links">
      {SOCIALS.map((social) => (
        <a
          key={social.name}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Silverthorn Resort on ${social.name}`}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-muted text-foreground transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          role="listitem"
        >
          <svg
            viewBox="0 0 24 24"
            width={20}
            height={20}
            fill={social.color}
            aria-hidden="true"
          >
            {social.svg}
          </svg>
        </a>
      ))}
    </div>
  );
}
