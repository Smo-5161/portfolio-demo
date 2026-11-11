import EmptyState from "./EmptyState";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/types";

type Props = {
  title: string;
  items: Project[];
  emptyMessage: string;
};

export default function ProjectSection({ title, items, emptyMessage }: Props) {
  // Données structurées : liste des projets en CreativeWork (lisible par Google et les LLM).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    itemListElement: items.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CreativeWork",
        name: p.name,
        ...(p.url && { url: p.url }),
        ...(p.description && { description: p.description }),
        creator: { "@type": "Person", name: "Antoine Smolar" },
      },
    })),
  };

  return (
    <main>
      <div className="hero-gradient border-b border-stroke">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <p className="eyebrow mb-2">Portfolio</p>
          <h1 className="text-4xl">{title}</h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {items.length === 0 ? (
          <EmptyState message={emptyMessage} />
        ) : (
          <>
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <div className="space-y-10">
              {items.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}
