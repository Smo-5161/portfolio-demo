import ProjectSection from "@/components/ProjectSection";
import data from "@/data/sites.json";
import type { Project } from "@/lib/types";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/websites");

export default function WebsitesPage() {
  return (
    <ProjectSection
      path="/websites"
      title="Websites"
      items={data as Project[]}
      emptyMessage="No projects published yet. This section is being optimized."
    />
  );
}
