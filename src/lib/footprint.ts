import type { Product } from "@/types/product";

export type FootprintEstimate = {
  widthInches: number | null;
  depthInches: number | null;
  note: string;
};

export function numericDim(value: number | null | string | undefined): number | null {
  return typeof value === "number" ? value : null;
}

export function estimateCombinedFootprint(
  items: Pick<Product, "width" | "depth" | "title">[],
): FootprintEstimate {
  const widths = items.map((i) => numericDim(i.width)).filter((n): n is number => n !== null);
  const depths = items.map((i) => numericDim(i.depth)).filter((n): n is number => n !== null);
  return {
    widthInches: widths.length ? Math.max(...widths) : null,
    depthInches: depths.length ? depths.reduce((a, b) => a + b, 0) : null,
    note: "Approximate combined bounding footprint only. Confirm room, doorway and circulation dimensions before ordering. This tool does not guarantee physical fit.",
  };
}

export function footprintBandLabel(band: Product["footprintBand"]): string {
  const labels: Record<Product["footprintBand"], string> = {
    "under-30": "Under 30 inches wide",
    "30-42": "30-42 inches wide",
    "43-60": "43-60 inches wide",
    "61-72": "61-72 inches wide",
    "over-72": "Over 72 inches wide",
    "wall-mounted": "Wall-mounted",
    "multi-piece-seating": "Multi-piece seating",
  };
  return labels[band];
}
