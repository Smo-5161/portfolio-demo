import ProjectSection from "@/components/ProjectSection";
import data from "@/data/sites.json";
import type { Project } from "@/lib/types";

export default function WebsitesPage() {
  return (
    <ProjectSection
      title="Websites"
      items={data as Project[]}
      emptyMessage="No projects published yet. This section is being optimized."
    />
  );
}
