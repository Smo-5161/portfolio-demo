import ProjectSection from "@/components/ProjectSection";
import data from "@/data/research.json";
import type { Project } from "@/lib/types";
import { pageMetadata } from "@/lib/seo";

// Empty page = thin content: kept out of Google until an entry is added.
export const metadata = pageMetadata("/research", { noindex: (data as Project[]).length === 0 });

export default function ResearchPage() {
  return (
    <ProjectSection
      path="/research"
      title="Research & Hackathons"
      items={data as Project[]}
      emptyMessage="No research projects or hackathons listed yet."
    />
  );
}
