import ProjectSection from "@/components/ProjectSection";
import data from "@/data/hackathons.json";
import type { Project } from "@/lib/types";
import { pageMetadata } from "@/lib/seo";

// Empty page = thin content: kept out of Google until an entry is added.
export const metadata = pageMetadata("/hackathons", { noindex: (data as Project[]).length === 0 });

export default function HackathonsPage() {
  return (
    <ProjectSection
      path="/hackathons"
      title="Hackathons"
      items={data as Project[]}
      emptyMessage="No hackathons listed yet."
    />
  );
}
