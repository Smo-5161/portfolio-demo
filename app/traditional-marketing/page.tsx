import ProjectSection from "@/components/ProjectSection";
import data from "@/data/traditional-marketing.json";
import type { Project } from "@/lib/types";
import { pageMetadata } from "@/lib/seo";

// Empty page = thin content: kept out of Google until an entry is added.
export const metadata = pageMetadata("/traditional-marketing", { noindex: (data as Project[]).length === 0 });

export default function TraditionalMarketingPage() {
  return (
    <ProjectSection
      path="/traditional-marketing"
      title="Traditional Marketing"
      items={data as Project[]}
      emptyMessage="No campaigns listed yet."
    />
  );
}
