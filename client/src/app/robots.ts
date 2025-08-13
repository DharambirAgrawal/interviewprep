import { SITE_URL } from "@/lib/seo";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = SITE_URL;
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: [
        "/dashboard",
        "/dashboard/*",
        "/auth",
        "/auth/*",
        "/interview/*",
      ],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
