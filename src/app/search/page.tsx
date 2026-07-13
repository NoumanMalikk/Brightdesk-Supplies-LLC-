import type { Metadata } from "next";
import { ShopCatalog } from "@/components/product/shop-catalog";

export const metadata: Metadata = {
  title: "Search",
  description: "Search Brightdesk furniture by title, SKU, zone, finish and dimensions.",
};

type Props = { searchParams: Promise<{ q?: string }> };

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;
  return <ShopCatalog initialQuery={q ?? ""} />;
}
