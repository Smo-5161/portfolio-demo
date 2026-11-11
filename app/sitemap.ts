import type { MetadataRoute } from "next";
import { SITE_URL, SITE_UPDATED, routes } from "@/lib/site";
import tools from "@/data/tools.json";

export default function sitemap(): MetadataRoute.Sitemap {
  return (
    routes
      // Pages kept out of Google (noindex) are not listed either.
      .filter((r) => !(r.path === "/internal-tools" && tools.length === 0))
      .map((r) => ({
        url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
        lastModified: SITE_UPDATED,
        changeFrequency: "monthly" as const,
        priority: r.path === "/" ? 1 : 0.7,
      }))
  );
}
