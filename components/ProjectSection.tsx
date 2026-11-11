import EmptyState from "./EmptyState";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/types";
import { projectListJsonLd } from "@/lib/jsonld";

type Props = {
  title: string;
  items: Project[];
  emptyMessage: string;
};

export default function ProjectSection({ title, items, emptyMessage }: Props) {
  const jsonLd = projectListJsonLd(title, items);

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
