import ProjectSection from "@/components/ProjectSection";
import data from "@/data/sites.json";
import type { Project } from "@/lib/types";

export default function SitesWebPage() {
  return (
    <ProjectSection
      title="Sites Web"
      items={data as Project[]}
      emptyMessage="Aucun projet publié pour le moment. Section en cours d'optimisation."
    />
  );
}
