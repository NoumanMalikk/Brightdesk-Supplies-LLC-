import type { ShippingClassId } from "@/types/product";

export type ShippingClass = {
  id: ShippingClassId;
  name: string;
  description: string;
  demoNote: string;
};

export const shippingClasses: ShippingClass[] = [
  {
    id: "small-furniture-parcel",
    name: "Small Furniture Parcel",
    description: "Compact pieces typically suitable for standard parcel handling when configured.",
    demoNote: "Demonstration class only. Live rates require carrier configuration.",
  },
  {
    id: "standard-furniture-parcel",
    name: "Standard Furniture Parcel",
    description: "Standard boxed furniture shipments based on size and weight.",
    demoNote: "Demonstration class only. Live rates require carrier configuration.",
  },
  {
    id: "multi-box-furniture",
    name: "Multi-Box Furniture",
    description: "Products shipped in multiple cartons.",
    demoNote: "Demonstration class only. Box counts must be verified before live sale.",
  },
  {
    id: "oversized-furniture",
    name: "Oversized Furniture",
    description: "Larger furniture that may require oversized handling.",
    demoNote: "Demonstration class only. Not a delivery-date guarantee.",
  },
  {
    id: "upholstered-furniture",
    name: "Upholstered Furniture",
    description: "Upholstered seating and soft goods with specialty packing considerations.",
    demoNote: "Demonstration class only. Live rates require carrier configuration.",
  },
  {
    id: "fragile-surface",
    name: "Fragile Surface",
    description: "Items with surfaces that require careful handling.",
    demoNote: "Demonstration class only.",
  },
  {
    id: "glass-component",
    name: "Glass Component",
    description: "Products that include glass components when verified.",
    demoNote: "Specialty shipping review may be required.",
  },
  {
    id: "freight-review-required",
    name: "Freight Review Required",
    description: "Items that require freight review before shipping can be confirmed.",
    demoNote: "A shipping quote is required. No invented flat rate is presented as real.",
  },
];
