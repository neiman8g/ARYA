import type { MetadataRoute } from "next";
import { POSTS } from "@/lib/journal";
import { PRODUCTS } from "@/lib/products";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("", 1.0, "weekly"),
    page("/women", 0.9, "weekly"),
    page("/men", 0.9, "weekly"),
    page("/arya-standard", 0.9),
    ...PRODUCTS.map((p) => page(`/products/${p.slug}`, 0.8)),
    page("/blog", 0.6, "weekly"),
    ...POSTS.map((p) => page(`/blog/${p.slug}`, 0.8)),
    page("/about", 0.6),
    page("/faq", 0.6),
    page("/shipping-returns", 0.3, "yearly"),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly"),
  ];
}
