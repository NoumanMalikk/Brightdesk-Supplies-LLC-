import type { Metadata } from "next";
import { storeConfig } from "@/data/store-config";

export const metadata: Metadata = {
  title: "About",
  description: "About for Brightdesk Supplies LLC.",
};

export default function Page() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6 prose-like">
      <h1 className="font-display text-4xl font-semibold">About</h1>
      <div className="mt-6 space-y-4 text-soft-graphite leading-relaxed">
        
        <p>Brightdesk Supplies LLC is a Bronx, New York-based furniture business operating across office furniture, home-office furniture and upholstered household furniture categories. The online catalog is designed to help customers review dimensions, materials, finishes, upholstery and shipping information before ordering. Product specifications, manufacturing information and availability must always be based on current verified product records.</p>
        <p>This page does not invent founding years, factory ownership, manufacturing capacity, staff size, awards or designer collaborations.</p>
        {storeConfig.showOwnerNamePublicly ? <p>Owner: {storeConfig.ownerName}</p> : null}

      </div>
    </div>
  );
}
