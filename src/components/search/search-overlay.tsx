"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { X, Search } from "lucide-react";
import { products } from "@/data/products";
import { useUiStore } from "@/store/ui-store";
import { formatDimensions, formatPrice } from "@/lib/format";
import { ProductImage } from "@/components/product/product-image";

const RECENT_KEY = "brightdesk-recent-searches";

export function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUiStore();
  const [query, setQuery] = useState("");
  const [recent, setRecent] = useState<string[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!searchOpen) return;
    try {
      setRecent(JSON.parse(localStorage.getItem(RECENT_KEY) ?? "[]"));
    } catch {
      setRecent([]);
    }
  }, [searchOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [setSearchOpen]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return products
      .filter((p) => {
        const hay = [
          p.title,
          p.sku,
          String(p.supplierSku),
          p.category,
          p.subcategory,
          ...p.functionalZones,
          ...p.rooms,
          ...p.materials.map(String),
          ...p.searchKeywords,
          String(p.width),
          String(p.height),
          String(p.depth),
        ]
          .join(" ")
          .toLowerCase();
        return hay.includes(q);
      })
      .slice(0, 8);
  }, [query]);

  function saveRecent(term: string) {
    const next = [term, ...recent.filter((r) => r !== term)].slice(0, 6);
    setRecent(next);
    localStorage.setItem(RECENT_KEY, JSON.stringify(next));
  }

  if (!searchOpen) return null;

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Search">
      <button type="button" className="absolute inset-0 bg-blueprint-ink/50" aria-label="Close search" onClick={() => setSearchOpen(false)} />
      <div className="relative mx-auto mt-16 w-full max-w-2xl px-4">
        <div className="overflow-hidden rounded-xl border border-border-stone bg-gallery-white shadow-2xl">
          <div className="flex items-center gap-2 border-b border-border-stone px-4">
            <Search className="h-5 w-5 text-soft-graphite" />
            <input
              autoFocus
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setActive(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setActive((a) => Math.min(a + 1, Math.max(results.length - 1, 0)));
                }
                if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setActive((a) => Math.max(a - 1, 0));
                }
                if (e.key === "Enter" && results[active]) {
                  saveRecent(query);
                  setSearchOpen(false);
                  window.location.href = `/products/${results[active].slug}`;
                }
              }}
              placeholder="Search title, SKU, zone, finish, dimensions…"
              className="h-14 flex-1 bg-transparent text-base outline-none"
              aria-autocomplete="list"
              aria-controls="search-results"
              aria-activedescendant={results[active] ? `search-option-${results[active].id}` : undefined}
            />
            <button type="button" className="inline-flex min-h-11 min-w-11 items-center justify-center" aria-label="Close search" onClick={() => setSearchOpen(false)}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="max-h-[60vh] overflow-y-auto p-2" id="search-results" role="listbox" aria-label="Search results">
            {!query && recent.length > 0 && (
              <div className="p-3">
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-soft-graphite">Recent</p>
                <ul className="flex flex-wrap gap-2">
                  {recent.map((r) => (
                    <li key={r}>
                      <button type="button" className="rounded-full border border-border-stone px-3 py-1 text-sm" onClick={() => setQuery(r)}>
                        {r}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {query && results.length === 0 && (
              <p className="p-4 text-sm text-soft-graphite" role="status">No products match “{query}”.</p>
            )}
            {results.map((p, i) => (
              <Link
                key={p.id}
                id={`search-option-${p.id}`}
                role="option"
                aria-selected={i === active}
                href={`/products/${p.slug}`}
                className={`flex gap-3 rounded-lg p-3 ${i === active ? "bg-paper-cream" : "hover:bg-paper-cream"}`}
                onClick={() => {
                  saveRecent(query);
                  setSearchOpen(false);
                }}
              >
                <div className="h-16 w-16 overflow-hidden rounded border border-border-stone">
                  <ProductImage src={p.imageGallery[0]} alt={p.title} title={p.title} sizes="64px" />
                </div>
                <div>
                  <p className="font-medium">{p.title}</p>
                  <p className="font-measure text-xs text-soft-graphite">{formatDimensions(p)}</p>
                  <p className="text-xs text-soft-graphite">{p.functionalZones.join(", ")} · {formatPrice(p.demoPrice)}</p>
                </div>
              </Link>
            ))}
            {query && (
              <Link href={`/search?q=${encodeURIComponent(query)}`} className="block p-3 text-sm font-medium text-workspace-blue hover:underline" onClick={() => setSearchOpen(false)}>
                View all results for “{query}”
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
