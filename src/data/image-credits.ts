export type ImageCredit = {
  id: string;
  productId: string;
  sku: string;
  exactDimensions: string;
  exactOrientation: string;
  exactFinish: string;
  exactUpholstery: string;
  exactSetCount: string;
  exactPackageContents: string;
  sourceOrganization: string;
  sourceUrlOrReference: string;
  permissionBasis: string;
  dateObtained: string | null;
  dateVerified: string | null;
  verifiedBy: string | null;
  productionStatus: "pending" | "missing" | "verified";
  notes: string;
};

function credit(
  n: number,
  productId: string,
  sku: string,
  extras: Partial<ImageCredit> = {},
): ImageCredit {
  const id = `img-credit-${String(n).padStart(3, "0")}`;
  return {
    id,
    productId,
    sku,
    exactDimensions: "Pending physical product inspection",
    exactOrientation: "Pending verification",
    exactFinish: "Pending verification",
    exactUpholstery: "Not applicable or pending verification",
    exactSetCount: "1",
    exactPackageContents: "Pending supplier documentation",
    sourceOrganization: "Brightdesk studio catalog development assets",
    sourceUrlOrReference: `public/products/${productId}/`,
    permissionBasis: "Original studio catalog assets for Brightdesk development storefront",
    dateObtained: null,
    dateVerified: null,
    verifiedBy: null,
    productionStatus: "pending",
    notes: "Studio-style catalog image installed at public/products/[slug]/main.png. Pending physical inventory photography verification before live production claim.",
    ...extras,
  };
}

export const imageCredits: ImageCredit[] = [
  credit(1, "prod-001", "BDS-DSK-001", { exactDimensions: "42-inch width required", exactFinish: "Birch Light / Walnut Tone / Blueprint Ink", exactUpholstery: "N/A" }),
  credit(2, "prod-002", "BDS-DSK-002", { exactDimensions: "48-inch width, shallow depth", exactFinish: "Paper Cream / Medium Wood Tone" }),
  credit(3, "prod-003", "BDS-DSK-003", { exactDimensions: "66-inch primary desk with return", exactOrientation: "Left or right return must match image" }),
  credit(4, "prod-004", "BDS-DSK-004", { exactDimensions: "60 x 60-inch L footprint" }),
  credit(5, "prod-005", "BDS-DSK-005", { exactDimensions: "32-inch leaning desk with upper shelf", exactFinish: "Birch Light with Workspace Blue frame" }),
  credit(6, "prod-006", "BDS-MTG-006", { exactDimensions: "42-inch round top" }),
  credit(7, "prod-007", "BDS-MTG-007", { exactDimensions: "84-inch length" }),
  credit(8, "prod-008", "BDS-MTG-008", { exactDimensions: "60-inch training table", exactFinish: "Paper Cream / Workspace Blue" }),
  credit(9, "prod-009", "BDS-MTG-009", { exactDimensions: "36-inch round top" }),
  credit(10, "prod-010", "BDS-STO-010", { exactDimensions: "Pending", exactSetCount: "1", notes: "Must show exactly three drawers." }),
  credit(11, "prod-011", "BDS-STO-011", { exactDimensions: "60-inch width" }),
  credit(12, "prod-012", "BDS-STO-012", { exactDimensions: "36-inch width", notes: "No printer included in image." }),
  credit(13, "prod-013", "BDS-STO-013", { exactDimensions: "72-inch height, exactly 5 shelves" }),
  credit(14, "prod-014", "BDS-STO-014", { exactDimensions: "60-inch height open-cell divider" }),
  credit(15, "prod-015", "BDS-CHR-015", { exactUpholstery: "Soft Moss / Blueprint Ink / Upholstery Rust" }),
  credit(16, "prod-016", "BDS-CHR-016", { exactUpholstery: "Paper Cream / Soft Moss / Signal Coral" }),
  credit(17, "prod-017", "BDS-CHR-017", { exactSetCount: "2 identical chairs", exactUpholstery: "Blueprint Ink / Soft Moss / Upholstery Rust" }),
  credit(18, "prod-018", "BDS-CHR-018", { exactFinish: "Frame/upholstery pairings", exactUpholstery: "Soft Moss or Paper Cream pairings" }),
  credit(19, "prod-019", "BDS-LNG-019", { exactUpholstery: "Upholstery Rust / Soft Moss / Blueprint Ink", notes: "Exact channel pattern required." }),
  credit(20, "prod-020", "BDS-LNG-020", { exactUpholstery: "Paper Cream / Soft Moss / Workspace Blue", notes: "Ottoman not included." }),
  credit(21, "prod-021", "BDS-LNG-021", { exactDimensions: "58-inch width", exactUpholstery: "Soft Moss / Upholstery Rust / Blueprint Ink" }),
  credit(22, "prod-022", "BDS-LNG-022", { exactUpholstery: "Signal Coral / Soft Moss / Paper Cream", notes: "Armless silhouette required." }),
  credit(23, "prod-023", "BDS-LNG-023", { exactDimensions: "48-inch width", notes: "Must show storage opening." }),
  credit(24, "prod-024", "BDS-LNG-024", { exactDimensions: "28-inch diameter", exactUpholstery: "Upholstery Rust / Soft Moss / Workspace Blue" }),
  credit(25, "prod-025", "BDS-TBL-025", { exactSetCount: "2 nesting tables", exactFinish: "Birch Light tops / Blueprint Ink frames" }),
  credit(26, "prod-026", "BDS-SET-026", { exactSetCount: "2 guest chairs + 1 side table", notes: "No rugs, lamps, plants or extra furniture." }),
];
