import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { aiBots } from "@/lib/ai-bots";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // AI crawlers explicitly allowed (training, indexing and on-demand browsing).
      { userAgent: aiBots, allow: "/", disallow: "/api/" },
      { userAgent: "*", allow: "/", disallow: "/api/" },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
