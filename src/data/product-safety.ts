export type ProductSafetyRecord = {
  productId: string;
  sku: string;
  weightCapacity: string;
  tipOverRisk: string;
  wallAnchoring: string;
  drawerSafety: string;
  shelfLoad: string;
  casterLocks: string;
  foldingMechanisms: string;
  pinchPoints: string;
  storageHinges: string;
  glassComponents: string;
  sharpCorners: string;
  assemblyHardware: string;
  flammabilityDocumentation: string;
  manufacturerWarnings: string;
  recallStatus: string;
  purchaseBlockedUntilVerified: boolean;
};

function safety(productId: string, sku: string, extras: Partial<ProductSafetyRecord> = {}): ProductSafetyRecord {
  return {
    productId,
    sku,
    weightCapacity: "Verification required",
    tipOverRisk: "Verification required",
    wallAnchoring: "Verification required",
    drawerSafety: "Verification required",
    shelfLoad: "Verification required",
    casterLocks: "Verification required",
    foldingMechanisms: "Verification required",
    pinchPoints: "Verification required",
    storageHinges: "Verification required",
    glassComponents: "Pending physical product inspection",
    sharpCorners: "Pending physical product inspection",
    assemblyHardware: "Pending supplier documentation",
    flammabilityDocumentation: "Pending manufacturing specification",
    manufacturerWarnings: "Pending supplier documentation",
    recallStatus: "Pending supplier documentation",
    purchaseBlockedUntilVerified: true,
    ...extras,
  };
}

export const productSafety: ProductSafetyRecord[] = [
  safety("prod-001", "BDS-DSK-001"),
  safety("prod-002", "BDS-DSK-002"),
  safety("prod-003", "BDS-DSK-003"),
  safety("prod-004", "BDS-DSK-004"),
  safety("prod-005", "BDS-DSK-005", { wallAnchoring: "Wall-anchor claim pending documentation" }),
  safety("prod-006", "BDS-MTG-006"),
  safety("prod-007", "BDS-MTG-007"),
  safety("prod-008", "BDS-MTG-008", { foldingMechanisms: "Pivot/folding mechanism pending verification", casterLocks: "Locking-caster claim pending verification" }),
  safety("prod-009", "BDS-MTG-009"),
  safety("prod-010", "BDS-STO-010", { drawerSafety: "Lock status pending verification", casterLocks: "Caster configuration pending verification" }),
  safety("prod-011", "BDS-STO-011"),
  safety("prod-012", "BDS-STO-012"),
  safety("prod-013", "BDS-STO-013", { tipOverRisk: "Tall furniture tip-over review required", wallAnchoring: "Anchoring guidance pending documentation", shelfLoad: "Shelf capacity pending documentation" }),
  safety("prod-014", "BDS-STO-014", { tipOverRisk: "Freestanding divider safety pending documentation" }),
  safety("prod-015", "BDS-CHR-015", { flammabilityDocumentation: "Upholstered-product flammability documentation pending" }),
  safety("prod-016", "BDS-CHR-016", { flammabilityDocumentation: "Upholstered-product flammability documentation pending" }),
  safety("prod-017", "BDS-CHR-017", { flammabilityDocumentation: "Upholstered-product flammability documentation pending" }),
  safety("prod-018", "BDS-CHR-018", { flammabilityDocumentation: "Upholstered-product flammability documentation pending" }),
  safety("prod-019", "BDS-LNG-019", { flammabilityDocumentation: "Upholstered-product flammability documentation pending" }),
  safety("prod-020", "BDS-LNG-020", { flammabilityDocumentation: "Upholstered-product flammability documentation pending" }),
  safety("prod-021", "BDS-LNG-021", { flammabilityDocumentation: "Upholstered-product flammability documentation pending" }),
  safety("prod-022", "BDS-LNG-022", { flammabilityDocumentation: "Upholstered-product flammability documentation pending" }),
  safety("prod-023", "BDS-LNG-023", { storageHinges: "Safety-hinge claim pending verification", flammabilityDocumentation: "Upholstered-product flammability documentation pending" }),
  safety("prod-024", "BDS-LNG-024", { flammabilityDocumentation: "Upholstered-product flammability documentation pending" }),
  safety("prod-025", "BDS-TBL-025"),
  safety("prod-026", "BDS-SET-026", { flammabilityDocumentation: "Component upholstery documentation pending" }),
];

export function getSafetyByProductId(productId: string) {
  return productSafety.find((s) => s.productId === productId);
}
