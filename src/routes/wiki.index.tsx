import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/wiki/")({
  component: WikiIndex,
  head: () => ({ meta: [{ title: "Wiki — CronoGraf" }] }),
});

const entries = [
  {
    slug: "milan",
    title: "Ducatul Milanului",
    desc: "Renaissance Milan: art, science, and innovations.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Flag_of_the_Duchy_of_Milan_%281450%29.svg/1024px-Flag_of_the_Duchy_of_Milan_%281450%29.svg.png",
  },
  {
    slug: "venice",
    title: "Republica Veneția",
    desc: "Maritime republic: oligarchy, art and discovery.",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Flag_of_Republic_of_Venice_%281659-1675%29.svg/1920px-Flag_of_Republic_of_Venice_%281659-1675%29.svg.png",
  },
];

function WikiIndex() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="text-3xl font-bold">Wiki Nodes</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Explore interactive node-graphs of historical topics.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {entries.map((e) => (
          <Link
            key={e.slug}
            to="/wiki/$slug"
            params={{ slug: e.slug }}
            className="group overflow-hidden rounded-xl border bg-card shadow-sm transition-shadow hover:shadow-md"
          >
            <div
              className="h-40 bg-muted bg-cover bg-center"
              style={{ backgroundImage: `url(${e.img})` }}
            />
            <div className="p-4">
              <div className="text-lg font-semibold group-hover:text-primary">{e.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{e.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
