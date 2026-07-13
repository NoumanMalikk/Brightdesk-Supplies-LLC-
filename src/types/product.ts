export type VerificationStatus =
  | "pending"
  | "verified"
  | "missing"
  | "incomplete";

export type StoreMode = "demo" | "live";

export type FunctionalZoneId = "focus" | "meet" | "store" | "welcome" | "reset";

export type RoomId =
  | "home-office"
  | "private-office"
  | "open-workspace"
  | "meeting-room"
  | "reception"
  | "lounge"
  | "bedroom-workspace"
  | "living-area"
  | "entry-workspace"
  | "small-home-office"
  | "training-room"
  | "flexible-workspace"
  | "break-area"
  | "informal-meeting"
  | "shared-office"
  | "print-area"
  | "reading-area"
  | "waiting-area"
  | "entry-area"
  | "bedroom";

export type ShippingClassId =
  | "small-furniture-parcel"
  | "standard-furniture-parcel"
  | "multi-box-furniture"
  | "oversized-furniture"
  | "upholstered-furniture"
  | "fragile-surface"
  | "glass-component"
  | "freight-review-required";

export type Colorway = {
  id: string;
  label: string;
  type: "finish" | "upholstery" | "frame" | "orientation";
  swatchHex?: string;
  imageKey?: string;
};

export type PackageDimensions = {
  width: number | null | "Verification required";
  height: number | null | "Verification required";
  depth: number | null | "Verification required";
  unit: "in";
};

export type Product = {
  id: string;
  slug: string;
  sku: string;
  supplierSku: string | "Verification required" | "Pending supplier documentation";
  title: string;
  category: string;
  subcategory: string;
  functionalZones: FunctionalZoneId[];
  rooms: string[];
  style: string | "Verification required";
  materials: string[] | ["Verification required"];
  woodSpecies: string | null | "Verification required" | "Pending manufacturing specification";
  woodConstruction: string | null | "Verification required" | "Pending manufacturing specification";
  frameMaterial: string | null | "Verification required" | "Pending manufacturing specification";
  surfaceFinish: string | null | "Verification required";
  upholsteryMaterial: string | null | "Verification required" | "Pending supplier documentation";
  upholsteryColor: string | null | "Verification required";
  foamSpecification: string | null | "Verification required" | "Pending manufacturing specification";
  colorways: Colorway[];
  width: number | null | "Verification required";
  height: number | null | "Verification required";
  depth: number | null | "Verification required";
  seatWidth: number | null | "Verification required";
  seatHeight: number | null | "Verification required";
  seatDepth: number | null | "Verification required";
  armHeight: number | null | "Verification required";
  backHeight: number | null | "Verification required";
  clearance: number | null | "Verification required";
  weight: number | null | "Verification required" | "Pending physical product inspection";
  packageDimensions: PackageDimensions;
  packageWeight: number | null | "Verification required" | "Pending physical product inspection";
  boxCount: number | null | "Verification required";
  assemblyRequired: boolean | "Verification required";
  assemblyInstructions: string | null | "Verification required" | "Pending supplier documentation";
  hardwareIncluded: boolean | null | "Verification required";
  toolsRequired: string[] | null | "Verification required";
  weightCapacity: number | null | "Verification required" | "Pending manufacturing specification";
  seatingCapacity: number | null | "Verification required";
  cableManagement: boolean | null | "Verification required";
  drawerCount: number | null | "Verification required";
  shelfCount: number | null | "Verification required";
  doorCount: number | null | "Verification required";
  orientation: string[] | null;
  careInstructions: string | null | "Verification required" | "Pending supplier documentation";
  countryOfOrigin: string | null | "Verification required" | "Pending supplier documentation";
  manufacturer: string | null | "Verification required" | "Pending supplier documentation";
  packageContents: string[];
  warnings: string[];
  shippingClass: ShippingClassId;
  demoPrice: number;
  currency: "USD";
  imageGallery: string[];
  imageSourceRecord: string;
  imageVerificationStatus: VerificationStatus;
  specificationVerificationStatus: VerificationStatus;
  safetyVerificationStatus: VerificationStatus;
  productionReady: boolean;
  featured: boolean;
  newArrival: boolean;
  relatedProductIds: string[];
  crossSellProductIds: string[];
  comparisonFields: string[];
  workspaceCompatibilityIds: string[];
  searchKeywords: string[];
  seoTitle: string;
  seoDescription: string;
  description: string;
  shortDescription: string;
  footprintBand:
    | "under-30"
    | "30-42"
    | "43-60"
    | "61-72"
    | "over-72"
    | "wall-mounted"
    | "multi-piece-seating";
  tableShape?: "round" | "rectangular" | "square" | null;
  setComponents?: { productId: string; sku: string; quantity: number }[];
};

export type CartLine = {
  productId: string;
  sku: string;
  slug: string;
  title: string;
  quantity: number;
  unitPrice: number;
  finishId: string | null;
  finishLabel: string | null;
  upholsteryId: string | null;
  upholsteryLabel: string | null;
  orientationId: string | null;
  orientationLabel: string | null;
  width: number | null;
  height: number | null;
  depth: number | null;
  boxCount: number | null;
  shippingClass: ShippingClassId;
  assemblyRequired: boolean | "Verification required";
  imagePath: string | null;
  addedAt: string;
};

export type WishlistItem = {
  productId: string;
  finishId: string | null;
  upholsteryId: string | null;
  orientationId: string | null;
  addedAt: string;
};

export type CompareItem = {
  productId: string;
  addedAt: string;
};
