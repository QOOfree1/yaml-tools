import type { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://yaml-tools.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const langs = ["en", "zh"];
  const pages = ["", "/yaml-formatter", "/yaml-to-json", "/yaml-query"];

  const entries: MetadataRoute.Sitemap = [];

  for (const lang of langs) {
    for (const page of pages) {
      const url = `${BASE_URL}/${lang}${page}`;
      const priority = page === "" ? 1.0 : 0.8;
      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority,
        alternates: {
          languages: Object.fromEntries(
            langs.map((l) => [l, `${BASE_URL}/${l}${page}`])
          ),
        },
      });
    }
  }

  return entries;
}
