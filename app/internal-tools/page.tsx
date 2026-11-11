import ProjectSection from "@/components/ProjectSection";
import data from "@/data/tools.json";
import type { Project } from "@/lib/types";

export default function InternalToolsPage() {
  return (
    <ProjectSection
      title="Apps & Internal Tools"
      items={data as Project[]}
      emptyMessage="No internal tools listed yet."
    />
  );
}
