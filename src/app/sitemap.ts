import type { MetadataRoute } from "next";
import { storeConfig } from "@/data/store-config";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { functionalZones } from "@/data/functional-zones";
import { rooms } from "@/data/rooms";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = storeConfig.siteUrl;
  const staticRoutes = [
    "", "/shop", "/search", "/wishlist", "/compare", "/workspace-builder", "/room-board",
    "/materials-finishes", "/upholstery-care", "/measuring-guide", "/furniture-safety",
    "/assembly-information", "/request-a-quote", "/about", "/contact", "/shipping-policy",
    "/return-refund-policy", "/privacy-policy", "/terms-conditions", "/accessibility", "/faq", "/track-order",
  ];
  return [
    ...staticRoutes.map((path) => ({ url: `${base}${path}`, changeFrequency: "weekly" as const, priority: path === "" ? 1 : 0.7 })),
    ...categories.map((c) => ({ url: `${base}/collections/${c.slug}`, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...functionalZones.map((z) => ({ url: `${base}/zones/${z.slug}`, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...rooms.map((r) => ({ url: `${base}/rooms/${r.slug}`, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...products.map((p) => ({ url: `${base}/products/${p.slug}`, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
