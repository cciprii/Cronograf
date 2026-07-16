import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({ meta: [{ title: "Login — CronoGraf" }] }),
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Bine ai revenit");
        navigate({ to: "/ancestry" });
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/ancestry` },
        });
        if (error) throw error;
        toast.success("Contul a fost creat. Verifică email-ul dacă este necesară confirmarea.");
        navigate({ to: "/ancestry" });
      }
    } catch (err: any) {
      toast.error(err.message ?? "Autentificarea a eșuat");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[calc(100vh-3.5rem)] max-w-md items-center px-4 py-12">
      <div className="w-full rounded-xl border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-semibold">{mode === "signin" ? "Autentificare" : "Creează cont"}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "signin" ? "Autentifică-te pentru a accesa arborele tău genealogic." : "Înregistrează-te pentru a-ți construi arborele privat."}
        </p>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email" required value={email} disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Parolă</label>
            <input
              type="password" required minLength={6} value={password} disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-60"
          >
            {loading ? "Se procesează…" : mode === "signin" ? "Autentifică-te" : "Înregistrează-te"}
          </button>
        </form>

        <button
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-foreground"
        >
          {mode === "signin" ? "Nu ai cont? Creează unul" : "Ai deja un cont? Autentifică-te"}
        </button>
      </div>
    </div>
  );
}
