import type { CartLine, ShippingClassId } from "@/types/product";
import { shippingClasses } from "@/data/shipping-classes";

export type ShippingQuoteResult =
  | {
      type: "demonstration";
      label: string;
      amount: number;
      note: string;
      classIds: ShippingClassId[];
    }
  | {
      type: "quote-required";
      label: string;
      amount: null;
      note: string;
      classIds: ShippingClassId[];
    };

export function getShippingClass(id: ShippingClassId) {
  return shippingClasses.find((c) => c.id === id);
}

export function calculateDemoShipping(input: {
  lines: CartLine[];
  destinationState?: string;
  destinationZip?: string;
}): ShippingQuoteResult {
  const classIds = [...new Set(input.lines.map((l) => l.shippingClass))];
  if (classIds.includes("freight-review-required") || classIds.includes("glass-component")) {
    return {
      type: "quote-required",
      label: "Freight or specialty shipping review required",
      amount: null,
      note: "Live carrier rates are not configured. A shipping quote is required for freight-review or specialty items. Demonstration flat rates are not presented as real shipping.",
      classIds,
    };
  }

  let demoAmount = 0;
  for (const line of input.lines) {
    const qty = line.quantity;
    switch (line.shippingClass) {
      case "small-furniture-parcel":
        demoAmount += 25 * qty;
        break;
      case "standard-furniture-parcel":
        demoAmount += 45 * qty;
        break;
      case "multi-box-furniture":
        demoAmount += 75 * qty;
        break;
      case "oversized-furniture":
        demoAmount += 120 * qty;
        break;
      case "upholstered-furniture":
        demoAmount += 95 * qty;
        break;
      case "fragile-surface":
        demoAmount += 85 * qty;
        break;
      default:
        demoAmount += 55 * qty;
    }
  }

  return {
    type: "demonstration",
    label: "Demonstration shipping estimate",
    amount: Math.round(demoAmount * 100) / 100,
    note: "Demonstration estimate only. Not a live carrier rate. Shipping is calculated by product size, weight, box count, class and destination when carriers are configured.",
    classIds,
  };
}
