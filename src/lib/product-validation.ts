import type { CartLine, Product, StoreMode } from "@/types/product";
import { getProductById } from "@/data/products";
import { storeConfig } from "@/data/store-config";

export function isProductionReady(product: Product): boolean {
  return (
    product.productionReady === true &&
    product.imageVerificationStatus === "verified" &&
    product.specificationVerificationStatus === "verified" &&
    product.safetyVerificationStatus === "verified"
  );
}

export function canPurchaseInMode(product: Product, mode: StoreMode = storeConfig.storeMode): boolean {
  if (mode === "demo") {
    return product.imageVerificationStatus !== "missing";
  }
  return isProductionReady(product);
}

export function getPrimaryActionLabel(product: Product): string {
  if (!canPurchaseInMode(product)) return "View Specifications";
  const finishes = product.colorways.filter((c) => c.type === "finish");
  const upholstery = product.colorways.filter((c) => c.type === "upholstery");
  const orientations = product.colorways.filter((c) => c.type === "orientation");
  if (orientations.length > 1 && !product.orientation?.length) return "Choose Orientation";
  if (product.orientation && product.orientation.length > 1) return "Choose Orientation";
  if (upholstery.length > 1) return "Choose Upholstery";
  if (finishes.length > 1) return "Choose Finish";
  return "Add to Cart";
}

export function validateFinish(product: Product, finishId: string | null): boolean {
  const finishes = product.colorways.filter((c) => c.type === "finish");
  if (finishes.length === 0) return finishId === null;
  if (!finishId) return finishes.length === 1;
  return finishes.some((f) => f.id === finishId);
}

export function validateUpholstery(product: Product, upholsteryId: string | null): boolean {
  const options = product.colorways.filter((c) => c.type === "upholstery");
  if (options.length === 0) return upholsteryId === null;
  if (!upholsteryId) return options.length === 1;
  return options.some((u) => u.id === upholsteryId);
}

export function validateOrientation(product: Product, orientationId: string | null): boolean {
  const options = product.colorways.filter((c) => c.type === "orientation");
  const labels = product.orientation ?? [];
  if (options.length === 0 && labels.length <= 1) return orientationId === null || labels.length === 0;
  if (!orientationId) return options.length <= 1 && labels.length <= 1;
  return options.some((o) => o.id === orientationId) || labels.includes(orientationId);
}

export function validateSetContents(product: Product): { ok: boolean; message?: string } {
  if (product.sku !== "BDS-SET-026") return { ok: true };
  if (!product.setComponents || product.setComponents.length === 0) {
    return { ok: false, message: "Set component SKUs require verification." };
  }
  const expected = [
    { sku: "BDS-CHR-017", quantity: 1 },
    { sku: "BDS-TBL-025", quantity: 1 },
  ];
  for (const item of expected) {
    const match = product.setComponents.find((c) => c.sku === item.sku && c.quantity === item.quantity);
    if (!match) return { ok: false, message: "Reception set contents do not match verified components." };
  }
  return { ok: true };
}

export type CartValidationResult = { ok: true; product: Product } | { ok: false; error: string };

export function validateCartLine(line: CartLine, mode: StoreMode = storeConfig.storeMode): CartValidationResult {
  const product = getProductById(line.productId);
  if (!product) return { ok: false, error: "Product does not exist." };
  if (product.sku !== line.sku) return { ok: false, error: "SKU mismatch." };
  if (!canPurchaseInMode(product, mode)) {
    return { ok: false, error: "Product is not available for purchase in the current store mode." };
  }
  if (mode === "live" && !isProductionReady(product)) {
    return { ok: false, error: "Incomplete products cannot enter live checkout." };
  }
  if (line.unitPrice !== product.demoPrice) {
    return { ok: false, error: "Price mismatch. Prices are validated server-side." };
  }
  if (line.quantity < 1 || line.quantity > 99) {
    return { ok: false, error: "Invalid quantity." };
  }
  if (!validateFinish(product, line.finishId)) return { ok: false, error: "Invalid finish selection." };
  if (!validateUpholstery(product, line.upholsteryId)) return { ok: false, error: "Invalid upholstery selection." };
  if (!validateOrientation(product, line.orientationId)) return { ok: false, error: "Invalid orientation selection." };
  if (line.boxCount !== product.boxCount && typeof product.boxCount === "number") {
    return { ok: false, error: "Box count mismatch." };
  }
  if (line.shippingClass !== product.shippingClass) {
    return { ok: false, error: "Shipping class mismatch." };
  }
  const setCheck = validateSetContents(product);
  if (!setCheck.ok) return { ok: false, error: setCheck.message ?? "Invalid set contents." };
  return { ok: true, product };
}
