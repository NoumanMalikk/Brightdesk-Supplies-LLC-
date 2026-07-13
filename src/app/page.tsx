import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { ProductCard } from "@/components/product/product-card";
import { products, getFeaturedProducts, getProductBySku } from "@/data/products";
import { footprintBandLabel } from "@/lib/footprint";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { HomeHero } from "@/components/home/home-hero";
import { ZonePanels } from "@/components/home/zone-panels";
import { WorkspaceBuilderTeaser } from "@/components/home/workspace-builder-teaser";

const footprintBands = ["under-30", "30-42", "43-60", "61-72", "over-72", "wall-mounted", "multi-piece-seating"] as const;

export default function HomePage() {
  const featured = getFeaturedProducts().slice(0, 8);
  const focusSkus = ["BDS-DSK-001", "BDS-CHR-015", "BDS-STO-010", "BDS-STO-013", "BDS-DSK-002"];
  const meetSkus = ["BDS-MTG-006", "BDS-MTG-007", "BDS-MTG-008", "BDS-CHR-017", "BDS-STO-011"];
  const softSkus = ["BDS-LNG-019", "BDS-LNG-021", "BDS-LNG-023", "BDS-LNG-024", "BDS-LNG-020"];
  const welcomeSkus = ["BDS-LNG-019", "BDS-LNG-021", "BDS-LNG-023", "BDS-TBL-025", "BDS-STO-011"];
  const storageSkus = ["BDS-STO-010", "BDS-STO-011", "BDS-STO-012", "BDS-STO-013", "BDS-STO-014"];
  const crossoverSkus = ["BDS-DSK-002", "BDS-CHR-018", "BDS-TBL-025", "BDS-LNG-023", "BDS-STO-014"];

  return (
    <div>
      <HomeHero />
      <ZonePanels />

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6" aria-labelledby="footprint-heading">
        <div className="mb-8 max-w-2xl">
          <h2 id="footprint-heading" className="font-display text-3xl font-semibold md:text-4xl">Furniture footprint index</h2>
          <p className="mt-3 text-soft-graphite">Browse by approximate width. Confirm exact dimensions and doorway clearance before ordering. Fit is not guaranteed without measurement review.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {footprintBands.map((band) => {
            const items = products.filter((p) => p.footprintBand === band).slice(0, 4);
            return (
              <div key={band} className="rounded-lg border border-border-stone bg-gallery-white p-5">
                <h3 className="font-display text-lg font-semibold">{footprintBandLabel(band)}</h3>
                <ul className="mt-3 space-y-2">
                  {items.length === 0 && <li className="text-sm text-soft-graphite">No products in this band yet.</li>}
                  {items.map((p) => (
                    <li key={p.id}>
                      <Link href={`/products/${p.slug}`} className="text-sm hover:underline">
                        <span className="font-medium">{p.title}</span>
                        <span className="mt-0.5 block font-measure text-xs text-soft-graphite">
                          W {typeof p.width === "number" ? `${p.width}"` : "—"} · {p.functionalZones[0]}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      <section className="border-y border-border-stone bg-gallery-white/70 py-16" aria-labelledby="featured-heading">
        <div className="mx-auto max-w-7xl px-4 md:px-6">
          <h2 id="featured-heading" className="font-display text-3xl font-semibold md:text-4xl">Featured furniture</h2>
          <p className="mt-3 max-w-2xl text-soft-graphite">A balanced selection across desks, storage, seating and lounge. Not labeled as best sellers.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <CollectionStrip
        id="focus-collection"
        title="Focus collection"
        copy="Compact desk, task chair, mobile pedestal, narrow bookcase and console workstation for individual work."
        skus={focusSkus}
      />

      <WorkspaceBuilderTeaser />

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6" aria-labelledby="materials-heading">
        <h2 id="materials-heading" className="font-display text-3xl font-semibold md:text-4xl">Start with the surface.</h2>
        <p className="mt-3 max-w-2xl text-soft-graphite">Explore finish and upholstery directions used in the catalog. Material composition claims require product-level verification.</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { name: "Light wood tones", hex: "#D8C7A8" },
            { name: "Medium wood tones", hex: "#A68968" },
            { name: "Dark wood tones", hex: "#4A3428" },
            { name: "Painted wood surfaces", hex: "#F6F1E8" },
            { name: "Metal frames", hex: "#3E6673" },
            { name: "Woven upholstery", hex: "#8FA494" },
            { name: "Smooth upholstery", hex: "#A75F48" },
          ].map((m) => (
            <Link key={m.name} href="/materials-finishes" className="flex items-center gap-3 rounded-lg border border-border-stone bg-gallery-white p-4 hover:border-workspace-blue">
              <span className="h-12 w-12 rounded-md border border-border-stone" style={{ backgroundColor: m.hex }} aria-hidden />
              <span className="text-sm font-medium">{m.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <CollectionStrip id="meet-collection" title="Meet collection" copy="Shared surfaces and seating for conversation. Compare width, depth and assembly requirements — seating capacity only when verified." skus={meetSkus} />
      <CollectionStrip id="soft-landing" title="Furniture for the moments between tasks." copy="Lounge chairs, loveseats, benches, ottomans and reading chairs. Comfort and durability claims require verification." skus={softSkus} accent="rust" />
      <CollectionStrip id="welcome-collection" title="Welcome collection" copy="Reception groupings shown as examples. Add each item separately — professional reception planning is not claimed." skus={welcomeSkus} />
      <CollectionStrip id="storage-architecture" title="Storage as architecture" copy="Pedestals, credenzas, cabinets, bookcases and dividers with exact product dimensions. Load capacities require verification." skus={storageSkus} />

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6" aria-labelledby="crossover-heading">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h2 id="crossover-heading" className="font-display text-3xl font-semibold md:text-4xl">One room can do more than one job.</h2>
            <p className="mt-4 text-soft-graphite">Pieces that can support both office and residential use when their verified functions allow — without invented multifunctionality claims.</p>
            <ButtonLink href="/zones/reset" className="mt-6" variant="outline">Explore Reset zone</ButtonLink>
          </div>
          {/* crossoverSkus used below */}
          <div className="grid grid-cols-2 gap-4">
            {crossoverSkus.slice(0, 4).map((sku) => {
              const p = getProductBySku(sku);
              return p ? <ProductCard key={p.id} product={p} /> : null;
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-border-stone bg-workspace-blue text-paper-cream">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-14 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold">Measure the route, not only the room.</h2>
            <p className="mt-3 text-birch-light">Review product dimensions, package dimensions, doorway clearance, stair access and assembly requirements before ordering.</p>
          </div>
          <ButtonLink href="/measuring-guide" variant="outline" className="border-paper-cream bg-transparent text-paper-cream hover:bg-paper-cream hover:text-blueprint-ink">
            Open the Measuring Guide
          </ButtonLink>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6" aria-labelledby="ordering-heading">
        <h2 id="ordering-heading" className="font-display text-3xl font-semibold">How ordering works</h2>
        <ol className="mt-8 grid gap-6 md:grid-cols-4">
          {[
            "Browse by zone, room or furniture type",
            "Review dimensions, materials and upholstery",
            "Select the exact finish or fabric",
            "Review shipping, tax and payment securely",
          ].map((step, i) => (
            <li key={step} className="rounded-lg border border-border-stone bg-gallery-white p-5">
              <span className="font-measure text-sm text-drafting-yellow">0{i + 1}</span>
              <p className="mt-3 font-medium">{step}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-upholstery-rust/10 py-16">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-6">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold">Planning more than one room?</h2>
            <p className="mt-3 text-soft-graphite">Submit the products, quantities and destination details you are considering for a structured quote review. Trade pricing, discounts, installation and delivery timing are not promised.</p>
          </div>
          <ButtonLink href="/request-a-quote">Request a Furniture Quote</ButtonLink>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-6" aria-labelledby="newsletter-heading">
        <div className="rounded-xl border border-border-stone bg-gallery-white p-8 md:p-10">
          <h2 id="newsletter-heading" className="font-display text-2xl font-semibold md:text-3xl">Receive new furniture and planning-guide updates.</h2>
          <p className="mt-3 max-w-xl text-soft-graphite">No discount promise. Consent is never prechecked. See the privacy policy for how contact information is handled.</p>
          <div className="mt-6 max-w-lg">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </div>
  );
}

function CollectionStrip({
  id,
  title,
  copy,
  skus,
  accent,
}: {
  id: string;
  title: string;
  copy: string;
  skus: string[];
  accent?: "rust";
}) {
  const items = skus.map((sku) => getProductBySku(sku)).filter(Boolean);
  return (
    <section className={`py-16 ${accent === "rust" ? "bg-upholstery-rust/5" : ""}`} aria-labelledby={id}>
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <h2 id={id} className="font-display text-3xl font-semibold md:text-4xl">{title}</h2>
        <p className="mt-3 max-w-2xl text-soft-graphite">{copy}</p>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((p) => p && <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
