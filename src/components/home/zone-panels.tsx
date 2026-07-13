"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { functionalZones } from "@/data/functional-zones";
import { getProductBySku } from "@/data/products";

const features: Record<string, string[]> = {
  focus: ["BDS-DSK-001", "BDS-CHR-015", "BDS-STO-010", "BDS-STO-013"],
  meet: ["BDS-MTG-006", "BDS-MTG-007", "BDS-CHR-017", "BDS-STO-011"],
  store: ["BDS-STO-010", "BDS-STO-012", "BDS-STO-011", "BDS-STO-014"],
  welcome: ["BDS-LNG-019", "BDS-LNG-021", "BDS-LNG-023", "BDS-TBL-025"],
  reset: ["BDS-CHR-018", "BDS-LNG-024", "BDS-DSK-002", "BDS-LNG-020"],
};

const accents: Record<string, string> = {
  ink: "border-blueprint-ink",
  blue: "border-workspace-blue",
  moss: "border-soft-moss",
  rust: "border-upholstery-rust",
  yellow: "border-drafting-yellow",
};

export function ZonePanels() {
  const reduce = useReducedMotion();
  return (
    <section className="mx-auto max-w-7xl px-4 py-16 md:px-6" aria-labelledby="zones-heading">
      <h2 id="zones-heading" className="font-display text-3xl font-semibold md:text-4xl">Five functional zones</h2>
      <p className="mt-3 max-w-2xl text-soft-graphite">Furniture organized around activities — not a warehouse catalog of unrelated desks and sofas.</p>
      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {functionalZones.map((zone, i) => (
          <motion.div
            key={zone.id}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className={`rounded-xl border-2 bg-gallery-white p-6 ${accents[zone.accent]}`}
          >
            <Link href={`/zones/${zone.slug}`} className="block">
              <h3 className="font-display text-2xl font-semibold">{zone.name}</h3>
              <p className="mt-2 text-soft-graphite">{zone.headline}</p>
              <ul className="mt-4 space-y-1 text-sm">
                {(features[zone.id] ?? zone.productSkus.slice(0, 4)).map((sku) => {
                  const p = getProductBySku(sku);
                  return p ? <li key={sku}>{p.title}</li> : null;
                })}
              </ul>
              <span className="mt-4 inline-block text-sm font-medium text-workspace-blue">Explore {zone.name} →</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
