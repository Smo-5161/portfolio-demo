import ProjectSection from "@/components/ProjectSection";
import data from "@/data/tools.json";
import type { Project } from "@/lib/types";

export default function OutilsInternesPage() {
  return (
    <ProjectSection
      title="Applications & Outils Internes"
      items={data as Project[]}
      emptyMessage="Aucun outil interne répertorié."
    />
  );
}
