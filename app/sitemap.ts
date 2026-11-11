import type { MetadataRoute } from "next";
import { SITE_URL, routes } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((r) => ({
    url: `${SITE_URL}${r.path === "/" ? "" : r.path}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: r.path === "/" ? 1 : 0.7,
  }));
}
