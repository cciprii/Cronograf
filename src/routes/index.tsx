import { createFileRoute, Link } from "@tanstack/react-router";
import { TreePine, LogIn, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "CronoGraf — Arborele tău genealogic" },
      { name: "description", content: "Construiește, editează și salvează propriul arbore genealogic." },
    ],
  }),
});

function Index() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-20">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight text-foreground">CronoGraf</h1>
        <p className="mt-4 text-lg text-muted-foreground" />
        <div className="mt-8 flex justify-center gap-3">
          <Link to="/ancestry" className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90">
            <TreePine className="h-4 w-4" /> Deschide arborele genealogic
          </Link>
          <Link to="/login" className="inline-flex items-center gap-2 rounded-md border bg-background px-5 py-2.5 text-sm font-medium hover:bg-accent">
            <LogIn className="h-4 w-4" /> Autentificare
          </Link>
        </div>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-3">
        {[
          { icon: Users, title: "Personal", desc: "Fiecare cont are propriul său arbore privat." },
          { icon: TreePine, title: "Etichete automate", desc: "Mută o persoană deasupra rădăcinii — devine părinte, bunic, și așa mai departe." },
          { icon: LogIn, title: "Salvat", desc: "Un singur clic pentru a păstra modificările." },
        ].map((f) => (
          <div key={f.title} className="rounded-lg border bg-card p-5">
            <f.icon className="h-5 w-5 text-primary" />
            <h3 className="mt-3 font-semibold">{f.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
