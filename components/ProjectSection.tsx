import EmptyState from "./EmptyState";
import type { Project } from "@/lib/types";

type Props = {
  title: string;
  items: Project[];
  emptyMessage: string;
};

export default function ProjectSection({ title, items, emptyMessage }: Props) {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-6">{title}</h1>
      {items.length === 0 ? (
        <EmptyState message={emptyMessage} />
      ) : (
        <ul className="space-y-4">
          {items.map((p) => (
            <li key={p.id} className="border border-gray-300 p-4">
              <h2 className="font-bold">{p.name}</h2>
              {p.description && <p className="text-sm">{p.description}</p>}
              {p.url && (
                <a href={p.url} className="text-sm underline">
                  {p.url}
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
