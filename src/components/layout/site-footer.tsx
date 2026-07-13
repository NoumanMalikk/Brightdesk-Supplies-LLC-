import Link from "next/link";
import { BrandLogo } from "@/components/ui/brand-logo";
import { storeConfig } from "@/data/store-config";
import { functionalZones } from "@/data/functional-zones";
import { categories } from "@/data/categories";
import { rooms } from "@/data/rooms";
import { customerInfoLinks, footerLegalLinks } from "@/data/navigation";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-border-stone bg-blueprint-ink text-paper-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        <div>
          <div className="text-paper-cream">
            <BrandLogo className="text-paper-cream [&_img]:brightness-0 [&_img]:invert" />
          </div>
          <p className="mt-4 max-w-xs text-sm text-birch-light">{storeConfig.tagline}</p>
          <p className="mt-2 text-sm text-birch-light/80">{storeConfig.positioning}</p>
          <p className="mt-4 text-sm">{storeConfig.publicLocationLabel}</p>
          {storeConfig.showFullBusinessAddress && (
            <p className="mt-1 text-sm text-birch-light/80">
              {storeConfig.registeredAddress.line1}, {storeConfig.registeredAddress.city},{" "}
              {storeConfig.registeredAddress.state} {storeConfig.registeredAddress.postalCode}
            </p>
          )}
          <p className="mt-2 text-sm">
            <a href={`tel:${storeConfig.phoneE164}`} className="underline-offset-2 hover:underline">
              {storeConfig.phoneDisplay}
            </a>
          </p>
          {storeConfig.contactEmail && (
            <p className="mt-1 text-sm">
              <a href={`mailto:${storeConfig.contactEmail}`} className="underline-offset-2 hover:underline">
                {storeConfig.contactEmail}
              </a>
            </p>
          )}
        </div>
        <div>
          <h2 className="font-display text-sm font-semibold tracking-wide text-drafting-yellow">Functional zones</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {functionalZones.map((z) => (
              <li key={z.id}><Link href={`/zones/${z.slug}`} className="hover:underline">{z.name}</Link></li>
            ))}
          </ul>
          <h2 className="mt-6 font-display text-sm font-semibold tracking-wide text-drafting-yellow">Rooms</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {rooms.map((r) => (
              <li key={r.slug}><Link href={`/rooms/${r.slug}`} className="hover:underline">{r.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-sm font-semibold tracking-wide text-drafting-yellow">Furniture</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.filter((c) => !c.parent).slice(0, 10).map((c) => (
              <li key={c.slug}><Link href={`/collections/${c.slug}`} className="hover:underline">{c.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-display text-sm font-semibold tracking-wide text-drafting-yellow">Customer information</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {customerInfoLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:underline">{l.label}</Link></li>
            ))}
          </ul>
          <h2 className="mt-6 font-display text-sm font-semibold tracking-wide text-drafting-yellow">Legal</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {footerLegalLinks.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:underline">{l.label}</Link></li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-6 text-sm text-birch-light/70 md:flex-row md:items-center md:justify-between md:px-6">
          <p>© {year} {storeConfig.legalName}. All rights reserved.</p>
          <p>Bronx, New York-based furniture business.</p>
        </div>
      </div>
    </footer>
  );
}
