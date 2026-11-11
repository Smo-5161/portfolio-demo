import ProjectSection from "@/components/ProjectSection";
import data from "@/data/saas.json";
import type { Project } from "@/lib/types";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata("/saas");

export default function SaasPage() {
  return (
    <ProjectSection
      path="/saas"
      title="SaaS"
      items={data as Project[]}
      emptyMessage="No SaaS products listed yet."
    />
  );
}
