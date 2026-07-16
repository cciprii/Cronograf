import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Toaster } from "sonner";

import appCss from "../styles.css?url";
import { supabase } from "@/integrations/supabase/client";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
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
        <h1 className="text-xl font-semibold text-foreground">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="mt-6 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
        >
          Try again
        </button>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "CronoGraf" },
      { name: "description", content: "Build and explore your ancestry tree." },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>{children}<Scripts /></body>
    </html>
  );
}

function NavBar() {
  const [email, setEmail] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setEmail(session?.user?.email ?? null);
      router.invalidate();
    });
    supabase.auth.getSession().then(({ data }) => setEmail(data.session?.user?.email ?? null));
    return () => subscription.unsubscribe();
  }, [router]);

  const linkCls = "px-3 py-1.5 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-accent transition-colors";
  const activeCls = "bg-accent text-foreground";

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="text-lg font-bold tracking-tight">CronoGraf</Link>
        <div className="flex items-center gap-1">
          <Link to="/" className={linkCls} activeProps={{ className: `${linkCls} ${activeCls}` }} activeOptions={{ exact: true }}>Home</Link>
          <Link to="/ancestry" className={linkCls} activeProps={{ className: `${linkCls} ${activeCls}` }}>Ancestry Tree</Link>
          <Link to="/wiki" className={linkCls} activeProps={{ className: `${linkCls} ${activeCls}` }}>Wiki</Link>
          {email ? (
            <>
              <span className="ml-2 hidden text-xs text-muted-foreground sm:inline">{email}</span>
              <button
                onClick={async () => { await supabase.auth.signOut(); router.navigate({ to: "/" }); }}
                className={linkCls}
              >Sign out</button>
            </>
          ) : (
            <Link to="/login" className={linkCls} activeProps={{ className: `${linkCls} ${activeCls}` }}>Login</Link>
          )}
        </div>
      </nav>
    </header>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex min-h-screen flex-col">
        <NavBar />
        <main className="flex-1"><Outlet /></main>
      </div>
      <Toaster richColors position="top-center" />
    </QueryClientProvider>
  );
}
