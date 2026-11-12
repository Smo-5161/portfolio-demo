import Link from "next/link";
import EmptyState from "./EmptyState";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/types";
import { publishedRoutes } from "@/lib/portfolio-data";
import { JsonLd, breadcrumbJsonLd, projectListJsonLd } from "@/lib/jsonld";

type Props = {
  path: string;
  title: string;
  items: Project[];
  emptyMessage: string;
};

const tones = ["bg-brand-100!", "bg-accent-100!", "bg-accent-50!", "bg-brand-50!"];

export default function ProjectSection({ path, title, items, emptyMessage }: Props) {
  // Internal linking: every project page links to the other sections of the portfolio.
  const others = publishedRoutes.filter((r) => r.portfolio && r.path !== path);

  return (
    <main>
      <JsonLd data={breadcrumbJsonLd(path, title)} />
      <div className="hero-gradient border-b border-stroke">
        <div className="max-w-6xl mx-auto px-6 py-14">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-500 mb-4">
            <Link href="/" className="link">
              Home
            </Link>{" "}
            <span aria-hidden="true">›</span>{" "}
            <Link href="/#portfolio" className="link">
              Portfolio
            </Link>{" "}
            <span aria-hidden="true">›</span> {title}
          </nav>
          <h1 className="text-4xl">{title}</h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-6 py-12">
        {items.length === 0 ? (
          <EmptyState message={emptyMessage} />
        ) : (
          <>
            <JsonLd data={projectListJsonLd(title, items)} />
            <div className="space-y-10">
              {items.map((p) => (
                <ProjectCard key={p.id} project={p} />
              ))}
            </div>
          </>
        )}

        <nav aria-labelledby="other-projects" className="mt-16">
          <h2 id="other-projects" className="text-xl mb-4">
            Explore the rest of the portfolio
          </h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {others.map((r, i) => (
              <li key={r.path}>
                <Link
                  href={r.path}
                  className={`card card-interactive border-transparent! block h-full p-5 ${tones[i % tones.length]}`}
                >
                  <span className="block font-medium mb-1">{r.label} →</span>
                  <span className="block text-sm text-ink-700">{r.description}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
