"use client";

import { useMemo, useState, useEffect } from "react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/product/product-card";
import { functionalZones } from "@/data/functional-zones";
import type { Product } from "@/types/product";

type SortKey =
  | "featured"
  | "newest"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "name-desc"
  | "width-asc"
  | "depth-asc"
  | "height-asc";

type ViewMode = "editorial" | "technical" | "list";

function num(v: Product["width"]) {
  return typeof v === "number" ? v : Number.POSITIVE_INFINITY;
}

export function ShopCatalog({ initialQuery = "" }: { initialQuery?: string }) {
  const [zone, setZone] = useState("");
  const [category, setCategory] = useState("");
  const [assembly, setAssembly] = useState("");
  const [sort, setSort] = useState<SortKey>("featured");
  const [view, setView] = useState<ViewMode>("editorial");
  const [query, setQuery] = useState(initialQuery);
  const [priceMax, setPriceMax] = useState(2000);

  useEffect(() => {
    const saved = localStorage.getItem("brightdesk-catalog-view") as ViewMode | null;
    if (saved) setView(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("brightdesk-catalog-view", view);
  }, [view]);

  const categories = useMemo(() => [...new Set(products.map((p) => p.category))], []);

  const filtered = useMemo(() => {
    let list = [...products];
    if (query) {
      const q = query.toLowerCase();
      list = list.filter((p) =>
        [p.title, p.sku, p.category, ...p.searchKeywords].join(" ").toLowerCase().includes(q),
      );
    }
    if (zone) list = list.filter((p) => p.functionalZones.includes(zone as Product["functionalZones"][number]));
    if (category) list = list.filter((p) => p.category === category);
    if (assembly === "yes") list = list.filter((p) => p.assemblyRequired === true);
    if (assembly === "no") list = list.filter((p) => p.assemblyRequired === false);
    if (assembly === "pending") list = list.filter((p) => p.assemblyRequired === "Verification required");
    list = list.filter((p) => p.demoPrice <= priceMax);

    list.sort((a, b) => {
      switch (sort) {
        case "newest":
          return Number(b.newArrival) - Number(a.newArrival);
        case "price-asc":
          return a.demoPrice - b.demoPrice;
        case "price-desc":
          return b.demoPrice - a.demoPrice;
        case "name-asc":
          return a.title.localeCompare(b.title);
        case "name-desc":
          return b.title.localeCompare(a.title);
        case "width-asc":
          return num(a.width) - num(b.width);
        case "depth-asc":
          return num(a.depth) - num(b.depth);
        case "height-asc":
          return num(a.height) - num(b.height);
        default:
          return Number(b.featured) - Number(a.featured);
      }
    });
    return list;
  }, [zone, category, assembly, sort, query, priceMax]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-semibold">Shop furniture</h1>
      <p className="mt-3 max-w-2xl text-soft-graphite">
        Filter by zone, category, dimensions context and assembly status. Demonstration catalog - incomplete products are blocked from live checkout.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="space-y-5 rounded-lg border border-border-stone bg-gallery-white p-4" aria-label="Filters">
          <div>
            <label htmlFor="shop-q" className="text-sm font-medium">Search</label>
            <input id="shop-q" value={query} onChange={(e) => setQuery(e.target.value)} className="mt-1 h-11 w-full rounded-md border border-border-stone px-3 text-sm" />
          </div>
          <div>
            <label htmlFor="zone" className="text-sm font-medium">Functional zone</label>
            <select id="zone" value={zone} onChange={(e) => setZone(e.target.value)} className="mt-1 h-11 w-full rounded-md border border-border-stone px-3 text-sm">
              <option value="">All zones</option>
              {functionalZones.map((z) => (
                <option key={z.id} value={z.id}>{z.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="category" className="text-sm font-medium">Category</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)} className="mt-1 h-11 w-full rounded-md border border-border-stone px-3 text-sm">
              <option value="">All categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="assembly" className="text-sm font-medium">Assembly</label>
            <select id="assembly" value={assembly} onChange={(e) => setAssembly(e.target.value)} className="mt-1 h-11 w-full rounded-md border border-border-stone px-3 text-sm">
              <option value="">Any</option>
              <option value="yes">Assembly required</option>
              <option value="no">No assembly required</option>
              <option value="pending">Verification required</option>
            </select>
          </div>
          <div>
            <label htmlFor="price" className="text-sm font-medium">Max price (${priceMax})</label>
            <input id="price" type="range" min={100} max={2000} step={50} value={priceMax} onChange={(e) => setPriceMax(Number(e.target.value))} className="mt-2 w-full" />
          </div>
        </aside>

        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <label htmlFor="sort" className="text-sm font-medium">Sort</label>
            <select id="sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)} className="h-11 rounded-md border border-border-stone px-3 text-sm">
              <option value="featured">Featured</option>
              <option value="newest">Newest catalog additions</option>
              <option value="price-asc">Price low to high</option>
              <option value="price-desc">Price high to low</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
              <option value="width-asc">Width low to high</option>
              <option value="depth-asc">Depth low to high</option>
              <option value="height-asc">Height low to high</option>
            </select>
            <div className="ml-auto flex gap-2" role="group" aria-label="Catalog view">
              {(["editorial", "technical", "list"] as ViewMode[]).map((v) => (
                <button
                  key={v}
                  type="button"
                  aria-pressed={view === v}
                  className={`h-11 rounded-md border px-3 text-sm capitalize ${view === v ? "border-blueprint-ink bg-paper-cream" : "border-border-stone"}`}
                  onClick={() => setView(v)}
                >
                  {v}
                </button>
              ))}
            </div>
            <p className="w-full text-sm text-soft-graphite">{filtered.length} products</p>
          </div>

          {view === "list" ? (
            <ul className="divide-y divide-border-stone rounded-lg border border-border-stone bg-gallery-white">
              {filtered.map((p) => (
                <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 p-4">
                  <div>
                    <a href={`/products/${p.slug}`} className="font-medium hover:underline">{p.title}</a>
                    <p className="font-measure text-xs text-soft-graphite">{p.sku} · W {String(p.width)} · ${p.demoPrice.toFixed(2)}</p>
                  </div>
                  <a href={`/products/${p.slug}`} className="text-sm text-workspace-blue underline">View</a>
                </li>
              ))}
            </ul>
          ) : (
            <div className={`grid gap-6 ${view === "technical" ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"}`}>
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
