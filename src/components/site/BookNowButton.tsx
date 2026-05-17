import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  children?: React.ReactNode;
  variant?: "primary" | "outline";
  size?: "sm" | "md" | "lg";
};

export function BookNowButton({
  className,
  children = "Book Now",
  variant = "primary",
  size = "md",
}: Props) {
  const base =
    "inline-flex items-center justify-center font-medium tracking-wide transition-colors rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60";
  const sizes = {
    sm: "h-9 px-4 text-sm",
    md: "h-11 px-6 text-sm",
    lg: "h-13 px-8 text-base",
  } as const;
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
    outline:
      "border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm",
  } as const;
  return (
    <a
      href="https://rentals.silverthornresort.com"
      target="_blank"
      rel="noopener noreferrer"
      className={cn(base, sizes[size], variants[variant], className)}
    >
      {children}
      <span aria-hidden className="ml-2">→</span>
    </a>
  );
}
