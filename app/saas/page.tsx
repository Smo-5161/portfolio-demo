import ProjectSection from "@/components/ProjectSection";
import data from "@/data/saas.json";
import type { Project } from "@/lib/types";

export default function SaasPage() {
  return (
    <ProjectSection
      title="SaaS"
      items={data as Project[]}
      emptyMessage="Aucun SaaS répertorié."
    />
  );
}
