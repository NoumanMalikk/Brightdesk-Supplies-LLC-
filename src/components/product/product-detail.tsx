"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/types/product";
import type { ProductSafetyRecord } from "@/data/product-safety";
import { ProductImage } from "@/components/product/product-image";
import { ProductCard } from "@/components/product/product-card";
import { formatAssembly, formatDimensions, formatPrice, displayVerification } from "@/lib/format";
import { canPurchaseInMode, getPrimaryActionLabel } from "@/lib/product-validation";
import { useCartStore } from "@/store/cart-store";
import { useWishlistStore } from "@/store/wishlist-store";
import { useCompareStore } from "@/store/compare-store";
import { useWorkspaceStore } from "@/store/workspace-store";
import { useRecentlyViewedStore } from "@/store/recently-viewed-store";
import { useUiStore } from "@/store/ui-store";
import { getProductById } from "@/data/products";
import { storeConfig } from "@/data/store-config";
import { Button } from "@/components/ui/button";

export function ProductDetail({
  product,
  safety,
}: {
  product: Product;
  safety?: ProductSafetyRecord;
}) {
  const finishes = product.colorways.filter((c) => c.type === "finish");
  const upholstery = product.colorways.filter((c) => c.type === "upholstery");
  const orientations = product.colorways.filter((c) => c.type === "orientation");
  const [finishId, setFinishId] = useState(finishes[0]?.id ?? null);
  const [upholsteryId, setUpholsteryId] = useState(upholstery[0]?.id ?? null);
  const [orientationId, setOrientationId] = useState(orientations[0]?.id ?? null);
  const [qty, setQty] = useState(1);
  const [message, setMessage] = useState("");

  const addProduct = useCartStore((s) => s.addProduct);
  const wish = useWishlistStore();
  const compare = useCompareStore();
  const setWorkspace = useWorkspaceStore((s) => s.setSlot);
  const addRecent = useRecentlyViewedStore((s) => s.add);
  const setCartOpen = useUiStore((s) => s.setCartOpen);

  useEffect(() => {
    addRecent(product.id);
  }, [product.id, addRecent]);

  const purchasable = canPurchaseInMode(product, storeConfig.storeMode);
  const related = product.relatedProductIds.map((id) => getProductById(id)).filter(Boolean);

  function selectedLabel(id: string | null, list: typeof product.colorways) {
    return list.find((c) => c.id === id)?.label ?? null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:px-6">
      <nav className="mb-6 text-sm text-soft-graphite" aria-label="Breadcrumb">
        <Link href="/shop" className="hover:underline">Shop</Link>
        <span className="mx-2">/</span>
        <Link href={`/collections/${product.category.toLowerCase().replace(/\s+/g, "-")}`} className="hover:underline">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span>{product.title}</span>
      </nav>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="overflow-hidden rounded-xl border border-border-stone bg-gallery-white">
            <ProductImage
              src={product.imageGallery[0]}
              alt={`${product.title} studio product photograph`}
              title={product.title}
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          {product.imageGallery.length > 1 && (
            <div className="mt-3 grid grid-cols-4 gap-2">
              {product.imageGallery.map((src) => (
                <div key={src} className="overflow-hidden rounded-md border border-border-stone">
                  <ProductImage src={src} alt={`${product.title} gallery view`} title={product.title} sizes="120px" />
                </div>
              ))}
            </div>
          )}
          <p className="mt-3 text-xs text-soft-graphite">
            Studio catalog imagery for {product.title}. Confirm finish and upholstery against verified product records before live purchase.
          </p>
        </div>

        <div>
          <p className="text-sm uppercase tracking-wide text-workspace-blue">{product.functionalZones.join(" · ")}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold md:text-4xl">{product.title}</h1>
          <p className="mt-2 font-measure text-sm text-soft-graphite">SKU {product.sku}</p>
          <p className="mt-4 font-display text-3xl font-semibold">{formatPrice(product.demoPrice)}</p>
          {storeConfig.storeMode === "demo" && (
            <p className="mt-1 text-sm text-drafting-yellow-foreground text-soft-graphite">Demonstration price — verification required before live purchase.</p>
          )}
          <p className="mt-4 text-soft-graphite">{product.description}</p>
          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div><dt className="text-soft-graphite">Dimensions</dt><dd className="font-measure font-medium">{formatDimensions(product)}</dd></div>
            <div><dt className="text-soft-graphite">Assembly</dt><dd className="font-medium">{formatAssembly(product.assemblyRequired)}</dd></div>
            <div><dt className="text-soft-graphite">Shipping class</dt><dd className="font-medium">{product.shippingClass.replace(/-/g, " ")}</dd></div>
            <div><dt className="text-soft-graphite">Box count</dt><dd className="font-measure font-medium">{displayVerification(product.boxCount)}</dd></div>
          </dl>

          {finishes.length > 0 && (
            <fieldset className="mt-6">
              <legend className="mb-2 text-sm font-medium">Finish</legend>
              <div className="flex flex-wrap gap-2">
                {finishes.map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={finishId === f.id}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-md border px-3 text-sm ${finishId === f.id ? "border-blueprint-ink bg-paper-cream" : "border-border-stone"}`}
                    onClick={() => setFinishId(f.id)}
                  >
                    <span className="h-4 w-4 rounded-full border border-border-stone" style={{ backgroundColor: f.swatchHex }} />
                    {f.label}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {upholstery.length > 0 && (
            <fieldset className="mt-6">
              <legend className="mb-2 text-sm font-medium">Upholstery</legend>
              <div className="flex flex-wrap gap-2">
                {upholstery.map((u) => (
                  <button
                    key={u.id}
                    type="button"
                    aria-pressed={upholsteryId === u.id}
                    className={`inline-flex min-h-11 items-center gap-2 rounded-md border px-3 text-sm ${upholsteryId === u.id ? "border-upholstery-rust bg-paper-cream" : "border-border-stone"}`}
                    onClick={() => setUpholsteryId(u.id)}
                  >
                    <span className="h-4 w-4 rounded-full border border-border-stone" style={{ backgroundColor: u.swatchHex }} />
                    {u.label}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          {orientations.length > 0 && (
            <fieldset className="mt-6">
              <legend className="mb-2 text-sm font-medium">Orientation</legend>
              <div className="flex flex-wrap gap-2">
                {orientations.map((o) => (
                  <button
                    key={o.id}
                    type="button"
                    aria-pressed={orientationId === o.id}
                    className={`inline-flex min-h-11 items-center rounded-md border px-3 text-sm ${orientationId === o.id ? "border-blueprint-ink bg-paper-cream" : "border-border-stone"}`}
                    onClick={() => setOrientationId(o.id)}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </fieldset>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <label htmlFor="qty" className="text-sm font-medium">Qty</label>
            <input
              id="qty"
              type="number"
              min={1}
              max={99}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="h-11 w-20 rounded-md border border-border-stone bg-gallery-white px-3"
            />
            <Button
              disabled={!purchasable}
              onClick={() => {
                const result = addProduct(product, {
                  quantity: qty,
                  finishId,
                  finishLabel: selectedLabel(finishId, finishes),
                  upholsteryId,
                  upholsteryLabel: selectedLabel(upholsteryId, upholstery),
                  orientationId,
                  orientationLabel: selectedLabel(orientationId, orientations),
                });
                if (result.ok) {
                  setMessage("Added to cart.");
                  setCartOpen(true);
                } else {
                  setMessage(result.error ?? "Unable to add");
                }
              }}
            >
              {purchasable ? "Add to Cart" : getPrimaryActionLabel(product)}
            </Button>
            <Button
              variant="outline"
              onClick={() =>
                wish.toggle({ productId: product.id, finishId, upholsteryId, orientationId })
              }
            >
              Wishlist
            </Button>
            <Button variant="outline" onClick={() => compare.toggle(product.id)}>Compare</Button>
            <Button
              variant="ghost"
              onClick={() => {
                if (product.category.toLowerCase().includes("desk") || product.category.toLowerCase().includes("table")) {
                  setWorkspace("deskId", product.id);
                } else if (product.category.toLowerCase().includes("chair") || product.category.toLowerCase().includes("task") || product.category.toLowerCase().includes("swivel")) {
                  setWorkspace("primaryChairId", product.id);
                } else if (product.category.toLowerCase().includes("storage") || product.category.toLowerCase().includes("credenza") || product.category.toLowerCase().includes("bookcase") || product.category.toLowerCase().includes("pedestal")) {
                  setWorkspace("storageId", product.id);
                } else if (product.category.toLowerCase().includes("guest")) {
                  setWorkspace("guestSeatId", product.id);
                } else {
                  setWorkspace("softSeatingId", product.id);
                }
                setMessage("Added to workspace builder.");
              }}
            >
              Add to workspace
            </Button>
            <Link href="/request-a-quote" className="text-sm underline">Request quote</Link>
          </div>
          <p className="mt-3 text-sm" role="status" aria-live="polite">{message}</p>
          {!purchasable && (
            <p className="mt-3 rounded-md border border-drafting-yellow bg-drafting-yellow/20 p-3 text-sm">
              Live purchase is blocked until images, specifications and safety information are verified.
            </p>
          )}
        </div>
      </div>

      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <SpecSection title="Product Overview" body={product.shortDescription} />
        <SpecSection title="Dimensions" body={formatDimensions(product)} mono />
        <SpecSection title="Materials and Construction" body={Array.isArray(product.materials) ? product.materials.join(", ") : String(product.materials)} />
        <SpecSection title="Finish or Upholstery" body={[product.surfaceFinish, product.upholsteryMaterial, product.upholsteryColor].filter(Boolean).map(String).join(" · ") || "Verification required."} />
        <SpecSection title="Storage and Features" body={`Drawers: ${displayVerification(product.drawerCount)}. Shelves: ${displayVerification(product.shelfCount)}. Doors: ${displayVerification(product.doorCount)}. Cable management: ${displayVerification(product.cableManagement)}.`} />
        <SpecSection title="Assembly" body={`${formatAssembly(product.assemblyRequired)}. Hardware included: ${displayVerification(product.hardwareIncluded)}. Tools: ${displayVerification(Array.isArray(product.toolsRequired) ? product.toolsRequired.join(", ") : product.toolsRequired)}. Instructions: ${displayVerification(product.assemblyInstructions)}.`} />
        <SpecSection title="Package Contents" body={product.packageContents.join(" ")} />
        <SpecSection title="Care" body={displayVerification(product.careInstructions)} />
        <SpecSection title="Furniture Safety" body={safety ? `Weight capacity: ${safety.weightCapacity}. Tip-over: ${safety.tipOverRisk}. Anchoring: ${safety.wallAnchoring}. Warnings: ${safety.manufacturerWarnings}.` : "Verification required."} />
        <SpecSection title="Shipping Information" body={`Class: ${product.shippingClass}. Package weight: ${displayVerification(product.packageWeight)}. Box count: ${displayVerification(product.boxCount)}. White-glove and assembly services are not enabled.`} />
        <SpecSection title="Product Verification" body={`Images: ${product.imageVerificationStatus}. Specs: ${product.specificationVerificationStatus}. Safety: ${product.safetyVerificationStatus}. Production ready: ${product.productionReady ? "yes" : "no"}.`} />
      </div>

      {product.sku === "BDS-SET-026" && product.setComponents && (
        <div className="mt-10 rounded-lg border border-border-stone bg-gallery-white p-6">
          <h2 className="font-display text-xl font-semibold">Set components</h2>
          <p className="mt-2 text-sm text-soft-graphite">No bundle discount. View component prices individually.</p>
          <ul className="mt-4 space-y-2">
            {product.setComponents.map((c) => {
              const component = getProductById(c.productId);
              return (
                <li key={c.sku}>
                  {component ? (
                    <Link href={`/products/${component.slug}`} className="underline">
                      {component.title} — {formatPrice(component.demoPrice)}
                    </Link>
                  ) : (
                    c.sku
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">Related furniture</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => p && <ProductCard key={p.id} product={p} />)}
          </div>
        </section>
      )}
    </div>
  );
}

function SpecSection({ title, body, mono }: { title: string; body: string; mono?: boolean }) {
  return (
    <section className="rounded-lg border border-border-stone bg-gallery-white p-5">
      <h2 className="font-display text-lg font-semibold">{title}</h2>
      <p className={`mt-2 text-sm text-soft-graphite ${mono ? "font-measure" : ""}`}>{body || "Verification required."}</p>
    </section>
  );
}
