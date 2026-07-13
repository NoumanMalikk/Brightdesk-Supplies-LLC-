"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Heart, GitCompareArrows, Search, ShoppingBag, Menu, X, Phone } from "lucide-react";
import { BrandLogo } from "@/components/ui/brand-logo";
import { primaryNav, customerInfoLinks } from "@/data/navigation";
import { storeConfig } from "@/data/store-config";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCompareStore } from "@/store/compare-store";
import { useUiStore } from "@/store/ui-store";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [solid, setSolid] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const cartCount = useCartStore((s) => s.lines.reduce((n, l) => n + l.quantity, 0));
  const wishCount = useWishlistStore((s) => s.items.length);
  const compareCount = useCompareStore((s) => s.items.length);
  const { setCartOpen, setSearchOpen, mobileNavOpen, setMobileNavOpen } = useUiStore();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileNavOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setMobileNavOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileNavOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        solid ? "border-border-stone bg-paper-cream/95 backdrop-blur-md" : "border-transparent bg-paper-cream/70 backdrop-blur-sm",
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-6">
        <button
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md lg:hidden"
          aria-label="Open menu"
          onClick={() => setMobileNavOpen(true)}
        >
          <Menu className="h-5 w-5" />
        </button>
        <BrandLogo priority />
        <nav className="ml-4 hidden flex-1 items-center gap-1 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <div key={item.id} className="relative" ref={item.id === openMenu ? menuRef : undefined}>
              <button
                type="button"
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium text-blueprint-ink transition-colors hover:bg-birch-light/40",
                  openMenu === item.id && "bg-birch-light/50",
                )}
                aria-expanded={openMenu === item.id}
                aria-haspopup="true"
                onClick={() => setOpenMenu((v) => (v === item.id ? null : item.id))}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setOpenMenu((v) => (v === item.id ? null : item.id));
                  }
                }}
              >
                {item.label}
              </button>
              {openMenu === item.id && (
                <div
                  className="absolute left-0 top-full z-50 mt-2 min-w-[520px] rounded-lg border border-border-stone bg-gallery-white p-6 shadow-lg"
                  role="menu"
                >
                  <div className="grid grid-cols-2 gap-6">
                    {item.columns.map((col) => (
                      <div key={col.title}>
                        <p className="mb-3 font-display text-sm font-semibold text-workspace-blue">{col.title}</p>
                        <ul className="space-y-2">
                          {col.links.map((link) => (
                            <li key={link.href + link.label}>
                              <Link
                                href={link.href}
                                className="block rounded-md px-2 py-1.5 text-sm hover:bg-paper-cream"
                                onClick={() => setOpenMenu(null)}
                              >
                                <span className="font-medium">{link.label}</span>
                                {link.description && (
                                  <span className="mt-0.5 block text-xs text-soft-graphite">{link.description}</span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md hover:bg-birch-light/40"
            aria-label="Search"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="h-5 w-5" />
          </button>
          <Link href="/wishlist" className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-md hover:bg-birch-light/40" aria-label={`Wishlist, ${wishCount} items`}>
            <Heart className="h-5 w-5" />
            {wishCount > 0 && <span className="absolute right-1 top-1 rounded-full bg-upholstery-rust px-1.5 text-[10px] text-white">{wishCount}</span>}
          </Link>
          <Link href="/compare" className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-md hover:bg-birch-light/40" aria-label={`Compare, ${compareCount} items`}>
            <GitCompareArrows className="h-5 w-5" />
            {compareCount > 0 && <span className="absolute right-1 top-1 rounded-full bg-workspace-blue px-1.5 text-[10px] text-white">{compareCount}</span>}
          </Link>
          <button
            type="button"
            className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-md hover:bg-birch-light/40"
            aria-label={`Cart, ${cartCount} items`}
            onClick={() => setCartOpen(true)}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartCount > 0 && <span className="absolute right-1 top-1 rounded-full bg-blueprint-ink px-1.5 text-[10px] text-paper-cream">{cartCount}</span>}
          </button>
        </div>
      </div>

      {mobileNavOpen && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <button type="button" className="absolute inset-0 bg-blueprint-ink/40" aria-label="Close menu overlay" onClick={() => setMobileNavOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-full max-w-md flex-col bg-paper-cream shadow-xl">
            <div className="flex items-center justify-between border-b border-border-stone px-4 py-3">
              <BrandLogo />
              <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center" aria-label="Close menu" onClick={() => setMobileNavOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <button type="button" className="mb-4 flex w-full items-center gap-2 rounded-md border border-border-stone bg-gallery-white px-3 py-3 text-left text-sm" onClick={() => { setMobileNavOpen(false); setSearchOpen(true); }}>
                <Search className="h-4 w-4" /> Search furniture
              </button>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-workspace-blue">Shop by zone</p>
              <ul className="mb-6 space-y-1">
                {["focus", "meet", "store", "welcome", "reset"].map((z) => (
                  <li key={z}>
                    <Link href={`/zones/${z}`} className="block rounded-md px-2 py-2 capitalize" onClick={() => setMobileNavOpen(false)}>{z}</Link>
                  </li>
                ))}
              </ul>
              {primaryNav.map((item) => (
                <div key={item.id} className="mb-4">
                  <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-workspace-blue">{item.label}</p>
                  <ul className="space-y-1">
                    {item.columns.flatMap((c) => c.links).map((link) => (
                      <li key={item.id + link.href + link.label}>
                        <Link href={link.href} className="block rounded-md px-2 py-2 text-sm" onClick={() => setMobileNavOpen(false)}>{link.label}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-workspace-blue">Customer information</p>
              <ul className="mb-6 space-y-1">
                {customerInfoLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="block rounded-md px-2 py-2 text-sm" onClick={() => setMobileNavOpen(false)}>{link.label}</Link>
                  </li>
                ))}
              </ul>
              <a href={`tel:${storeConfig.phoneE164}`} className="inline-flex min-h-11 items-center gap-2 text-sm font-medium">
                <Phone className="h-4 w-4" /> {storeConfig.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
