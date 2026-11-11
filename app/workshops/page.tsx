import ProjectSection from "@/components/ProjectSection";
import data from "@/data/workshops.json";
import type { Project } from "@/lib/types";
import { pageMetadata } from "@/lib/seo";

// Empty page = thin content: kept out of Google until an entry is added.
export const metadata = pageMetadata("/workshops", { noindex: (data as Project[]).length === 0 });

export default function WorkshopsPage() {
  return (
    <ProjectSection
      path="/workshops"
      title="Workshops & Talks"
      items={data as Project[]}
      emptyMessage="No workshops or talks listed yet."
    />
  );
}
