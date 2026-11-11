import type { MetadataRoute } from "next";
import { SITE_URL, SITE_UPDATED, routes } from "@/lib/site";
import tools from "@/data/tools.json";
import workshops from "@/data/workshops.json";
import research from "@/data/research.json";

// Portfolio pages without any entry yet are noindex, so they are left out of the sitemap too.
const emptyPages = new Set(
  Object.entries({ "/internal-tools": tools, "/workshops": workshops, "/research": research })
    .filter(([, items]) => items.length === 0)
    .map(([path]) => path),
);

export default function sitemap(): MetadataRoute.Sitemap {
  return (
    routes
      .filter((r) => !emptyPages.has(r.path))
      .map((r) => ({
        url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
        lastModified: SITE_UPDATED,
        changeFrequency: "monthly" as const,
        priority: r.path === "/" ? 1 : 0.7,
      }))
  );
}
