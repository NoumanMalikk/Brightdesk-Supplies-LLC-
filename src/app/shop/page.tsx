import type { Metadata } from "next";
import { ShopCatalog } from "@/components/product/shop-catalog";

export const metadata: Metadata = {
  title: "Shop Furniture",
  description: "Browse Brightdesk desks, seating, storage, meeting furniture and upholstered pieces by zone, room and category.",
};

export default function ShopPage() {
  return <ShopCatalog />;
}
