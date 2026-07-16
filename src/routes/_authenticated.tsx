import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated")({
  component: AuthLayout,
});

function AuthLayout() {
  const navigate = useNavigate();
  const [state, setState] = useState<"loading" | "in" | "out">("loading");

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      setState(session ? "in" : "out");
    });
    supabase.auth.getSession().then(({ data }) => setState(data.session ? "in" : "out"));
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (state === "out") navigate({ to: "/login" });
  }, [state, navigate]);

  if (state !== "in") {
    return (
      <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center text-sm text-muted-foreground">
        {state === "loading" ? "Loading…" : "Redirecting to login…"}
      </div>
    );
  }
  return <Outlet />;
}
