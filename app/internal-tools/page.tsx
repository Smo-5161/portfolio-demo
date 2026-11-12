import ProjectSection from "@/components/ProjectSection";
import data from "@/data/tools.json";
import type { Project } from "@/lib/types";
import { pageMetadata } from "@/lib/seo";

// Empty page = thin content: kept out of Google until a project is added.
export const metadata = pageMetadata("/internal-tools", { noindex: (data as Project[]).length === 0 });

export default function InternalToolsPage() {
  return (
    <ProjectSection
      path="/internal-tools"
      title="Internal Tools & Digital Transformation"
      items={data as Project[]}
      emptyMessage="No internal tools or digital transformation projects listed yet."
    />
  );
}
