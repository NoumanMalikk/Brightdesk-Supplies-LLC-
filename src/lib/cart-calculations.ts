import type { CartLine } from "@/types/product";

export function lineTotal(line: CartLine): number {
  return Math.round(line.unitPrice * line.quantity * 100) / 100;
}

export function cartSubtotal(lines: CartLine[]): number {
  return Math.round(lines.reduce((sum, line) => sum + lineTotal(line), 0) * 100) / 100;
}

export function clampQuantity(quantity: number): number {
  if (!Number.isFinite(quantity)) return 1;
  return Math.min(99, Math.max(1, Math.floor(quantity)));
}
