"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { ButtonLink } from "@/components/ui/button";
import { getProductBySku } from "@/data/products";
import { storeConfig } from "@/data/store-config";

const primary = getProductBySku("BDS-DSK-001");
const chair = getProductBySku("BDS-CHR-015");
const lounge = getProductBySku("BDS-CHR-018");
const storage = getProductBySku("BDS-STO-011");

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-border-stone">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 15% 20%, rgba(216,199,168,0.45), transparent 55%), radial-gradient(ellipse 70% 50% at 85% 30%, rgba(62,102,115,0.12), transparent 50%), linear-gradient(180deg, rgba(246,241,232,0.15) 0%, rgba(246,241,232,0.9) 100%)",
        }}
      />
      <div className="draft-grid pointer-events-none absolute inset-0 opacity-35" aria-hidden />

      <div className="relative mx-auto grid min-h-[min(42rem,calc(100vh-10.5rem))] max-w-7xl items-center gap-10 px-4 py-14 md:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14 lg:py-16">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-xl"
        >
          <p className="font-display text-sm font-semibold tracking-[0.22em] text-workspace-blue uppercase">
            {storeConfig.brandShort}
          </p>
          <h1 className="mt-5 font-display text-[2.35rem] font-semibold leading-[1.08] tracking-[-0.03em] text-blueprint-ink sm:text-5xl lg:text-[3.35rem]">
            Build the room around what needs to happen there.
          </h1>
          <p className="mt-6 max-w-md text-base leading-relaxed text-soft-graphite sm:text-lg">
            Desks, seating, storage and lounge furniture organized around focus, collaboration, organization and
            comfort.
          </p>

          <motion.div
            className="mt-7 h-px w-28 origin-left bg-drafting-yellow"
            initial={reduce ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/shop" size="lg" className="min-w-[10.5rem]">
              Shop Furniture
            </ButtonLink>
            <ButtonLink
              href="/zones/focus"
              variant="outline"
              size="lg"
              className="min-w-[10.5rem] border-border-stone/80 bg-gallery-white/80 backdrop-blur-sm"
            >
              Explore Functional Zones
            </ButtonLink>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative aspect-[5/4] w-full overflow-hidden lg:aspect-[4/3]">
            <div
              className="absolute inset-0 bg-gradient-to-br from-[#fbf8f2] via-[#f3ebe0] to-[#ddd2bf]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-[12%] top-[18%] h-[42%] rounded-full bg-white/70 blur-3xl"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#cbbca3]/40 to-transparent"
              aria-hidden
            />

            {primary?.imageGallery[0] && (
              <motion.div
                className="absolute inset-x-[10%] top-[10%] bottom-[18%]"
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.22 }}
              >
                <Link href={`/products/${primary.slug}`} className="relative block h-full w-full" aria-label={primary.title}>
                  <Image
                    src={primary.imageGallery[0]}
                    alt={`${primary.title} studio product photograph`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 90vw, 42vw"
                    className="object-contain drop-shadow-[0_28px_50px_rgba(33,49,60,0.14)]"
                  />
                </Link>
              </motion.div>
            )}

            {storage?.imageGallery[0] && (
              <motion.div
                className="absolute top-[6%] right-[6%] h-[26%] w-[27%]"
                initial={reduce ? false : { opacity: 0, y: -12 }}
                animate={{ opacity: 0.95, y: 0 }}
                transition={{ duration: 0.7, delay: 0.38 }}
                whileHover={reduce ? undefined : { y: -4, opacity: 1 }}
              >
                <Link href={`/products/${storage.slug}`} className="relative block h-full w-full" aria-label={storage.title}>
                  <Image
                    src={storage.imageGallery[0]}
                    alt={`${storage.title} studio product photograph`}
                    fill
                    sizes="160px"
                    className="object-contain drop-shadow-[0_18px_30px_rgba(33,49,60,0.12)]"
                  />
                </Link>
              </motion.div>
            )}

            {lounge?.imageGallery[0] && (
              <motion.div
                className="absolute bottom-[7%] left-[2%] h-[34%] w-[30%]"
                initial={reduce ? false : { opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.48 }}
                whileHover={reduce ? undefined : { y: -4 }}
              >
                <Link href={`/products/${lounge.slug}`} className="relative block h-full w-full" aria-label={lounge.title}>
                  <Image
                    src={lounge.imageGallery[0]}
                    alt={`${lounge.title} studio product photograph`}
                    fill
                    sizes="180px"
                    className="object-contain drop-shadow-[0_18px_30px_rgba(33,49,60,0.12)]"
                  />
                </Link>
              </motion.div>
            )}

            {chair?.imageGallery[0] && (
              <motion.div
                className="absolute right-[1%] bottom-[5%] h-[40%] w-[36%]"
                initial={reduce ? false : { opacity: 0, x: 14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.42 }}
                whileHover={reduce ? undefined : { y: -4 }}
              >
                <Link href={`/products/${chair.slug}`} className="relative block h-full w-full" aria-label={chair.title}>
                  <Image
                    src={chair.imageGallery[0]}
                    alt={`${chair.title} studio product photograph`}
                    fill
                    sizes="200px"
                    className="object-contain drop-shadow-[0_18px_30px_rgba(33,49,60,0.12)]"
                  />
                </Link>
              </motion.div>
            )}

            <div className="pointer-events-none absolute inset-x-8 bottom-4 flex items-center gap-3" aria-hidden>
              <span className="h-px flex-1 bg-blueprint-ink/20" />
              <span className="font-measure text-[10px] tracking-[0.2em] text-soft-graphite uppercase">
                Focus composition
              </span>
              <span className="h-px flex-1 bg-blueprint-ink/20" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
