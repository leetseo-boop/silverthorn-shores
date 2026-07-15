import { useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { Nav, Footer } from "@/components/SilverthornHomePage";
import { CookieBanner } from "@/components/CookieBanner";
import { initBookingTracker } from "@/lib/booking-tracker";
import { applyConsent } from "@/lib/cookie-consent";

const GA_ID = "G-QT7MJVJMQM";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Silverthorn Resort" },
      { name: "description", content: "Family-run Shasta Lake resort. Houseboats, cabins, and boat rentals on the Pit River Arm since 1986." },
      { name: "author", content: "Silverthorn Resort" },
      { property: "og:title", content: "Silverthorn Resort" },
      { property: "og:description", content: "Family-run Shasta Lake resort. Houseboats, cabins, and boat rentals on the Pit River Arm since 1986." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Silverthorn Resort" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Silverthorn Resort" },
      { name: "twitter:description", content: "Family-run Shasta Lake resort. Houseboats, cabins, and boat rentals on the Pit River Arm since 1986." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1c9f7742-b8b1-4a1a-83b6-9925c27595ca/id-preview-ed26b57c--b4468682-e064-4db8-b78d-4d6abc44895c.lovable.app-1779071583962.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/1c9f7742-b8b1-4a1a-83b6-9925c27595ca/id-preview-ed26b57c--b4468682-e064-4db8-b78d-4d6abc44895c.lovable.app-1779071583962.png" },
    ],
    links: [
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Playfair+Display:wght@500;600;700;900&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],

    scripts: [
      { src: `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`, async: true },
      {
        children: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{analytics_storage:'denied',ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});try{var c=JSON.parse(localStorage.getItem('str-cookie-consent')||'null');if(c&&c.analytics===true){gtag('consent','update',{analytics_storage:'granted'});}}catch(e){}gtag('js', new Date());gtag('config', '${GA_ID}');`,
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isAdmin = pathname.startsWith("/admin");

  useEffect(() => {
    initBookingTracker();
    applyConsent();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {!isAdmin && <Nav />}
      <Outlet />
      {!isAdmin && <Footer />}
      {!isAdmin && <CookieBanner />}
    </QueryClientProvider>
  );
}
