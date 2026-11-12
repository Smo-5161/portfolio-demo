import type { MetadataRoute } from "next";
import { SITE_URL, SITE_UPDATED } from "@/lib/site";
import { publishedRoutes } from "@/lib/portfolio-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return (
    // Empty portfolio sections are noindex, so they are left out of the sitemap too.
    publishedRoutes.map((r) => ({
        url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
        lastModified: SITE_UPDATED,
        changeFrequency: "monthly" as const,
        priority: r.path === "/" ? 1 : 0.7,
      }))
  );
}
