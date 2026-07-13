import type { Product } from "@/types/product";

export function formatPrice(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export function formatInches(value: number | null | string | undefined): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "string") return value;
  return `${value}"`;
}

export function formatDimensions(product: Pick<Product, "width" | "height" | "depth">): string {
  const w = formatInches(product.width);
  const h = formatInches(product.height);
  const d = formatInches(product.depth);
  if ([w, h, d].every((v) => v === "—" || v === "Verification required")) {
    return "Dimensions: Verification required";
  }
  return `W ${w} × D ${d} × H ${h}`;
}

export function displayVerification(
  value: string | number | boolean | null | undefined,
): string {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (typeof value === "number") return String(value);
  return value;
}

export function formatAssembly(value: boolean | "Verification required"): string {
  if (value === "Verification required") return "Assembly: Verification required";
  return value ? "Assembly required" : "No assembly required";
}
