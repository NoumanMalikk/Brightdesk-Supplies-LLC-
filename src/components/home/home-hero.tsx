"use client";

import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/ui/button";
import { ProductImage } from "@/components/product/product-image";
import { getProductBySku } from "@/data/products";

const heroSkus = ["BDS-DSK-001", "BDS-CHR-015", "BDS-STO-011", "BDS-CHR-018", "BDS-LNG-024"];

export function HomeHero() {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden border-b border-border-stone">
      <div className="draft-grid absolute inset-0 opacity-60" aria-hidden />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-16 md:px-6 lg:grid-cols-2 lg:py-24">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-medium uppercase tracking-[0.18em] text-workspace-blue">
            Office, home-office and upholstered furniture
          </p>
          <h1 className="mt-4 font-display text-4xl font-semibold leading-tight text-blueprint-ink md:text-5xl lg:text-6xl">
            Build the room around what needs to happen there.
          </h1>
          <p className="mt-5 max-w-xl text-lg text-soft-graphite">
            Explore desks, seating, storage and lounge furniture organized around focus, collaboration, organization, welcoming guests and resetting between tasks.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/shop" size="lg">Shop Furniture</ButtonLink>
            <ButtonLink href="/zones/focus" variant="outline" size="lg">Explore Functional Zones</ButtonLink>
          </div>
          <p className="mt-5 max-w-lg text-sm text-soft-graphite">
            Dimensions, materials, finishes and upholstery information must match verified product records.
          </p>
        </motion.div>
        <motion.div
          className="relative min-h-[360px] rounded-xl border border-border-stone bg-gallery-white p-4 shadow-sm"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <div className="grid h-full grid-cols-6 grid-rows-6 gap-3">
            {heroSkus.map((sku, i) => {
              const p = getProductBySku(sku);
              if (!p) return null;
              const placements = [
                "col-span-4 row-span-3",
                "col-span-2 row-span-3",
                "col-span-3 row-span-3",
                "col-span-2 row-span-3",
                "col-span-1 row-span-3",
              ];
              return (
                <motion.a
                  key={sku}
                  href={`/products/${p.slug}`}
                  className={`overflow-hidden rounded-md border border-border-stone ${placements[i]}`}
                  whileHover={reduce ? undefined : { y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProductImage
                    src={p.imageGallery[0]}
                    alt={`${p.title} studio product photograph`}
                    title={p.title}
                    sizes="(max-width: 1024px) 50vw, 25vw"
                  />
                </motion.a>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-soft-graphite">Editorial composition of active catalog SKUs. Exact product photography pending verification.</p>
        </motion.div>
      </div>
    </section>
  );
}
