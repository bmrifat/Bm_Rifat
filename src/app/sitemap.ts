import { MetadataRoute } from "next";
import { ventures } from "@/data/ventures";
import { posts } from "@/data/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://bmrifat.com";
  const locales = ["en", "bn"];

  const staticPages = [
    "",
    "/contact",
    "/writing",
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
      });
    }

    for (const v of ventures) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/ventures/${v.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.9,
      });
    }

    for (const p of posts) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/writing/${p.slug}`,
        lastModified: new Date(p.date),
        changeFrequency: "never",
        priority: 0.7,
      });
    }
  }

  return sitemapEntries;
}
