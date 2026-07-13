import { describe, expect, it } from "vitest";
import { products, assertProductCount } from "@/data/products";
import { cartSubtotal, lineTotal, clampQuantity } from "@/lib/cart-calculations";
import { formatDimensions, formatPrice } from "@/lib/format";
import {
  canPurchaseInMode,
  isProductionReady,
  validateFinish,
  validateOrientation,
  validateSetContents,
  validateUpholstery,
  validateCartLine,
} from "@/lib/product-validation";
import { calculateDemoShipping } from "@/lib/shipping";
import { estimateCombinedFootprint } from "@/lib/footprint";
import { generateOrderReference } from "@/lib/order-reference";
import { contactSchema, newsletterSchema } from "@/lib/schemas";
import type { CartLine } from "@/types/product";

describe("catalog", () => {
  it("contains exactly 26 products", () => {
    expect(products.length).toBe(26);
    expect(() => assertProductCount()).not.toThrow();
  });

  it("includes required assortment categories", () => {
    const titles = products.map((p) => p.title).join(" ");
    expect(titles).toMatch(/Writing Desk/);
    expect(titles).toMatch(/Executive Desk/);
    expect(titles).toMatch(/Cornergrid/);
    expect(titles).toMatch(/Meeting Table/);
    expect(titles).toMatch(/Training Table/);
    expect(titles).toMatch(/Pedestal|Credenza|Bookcase/);
    expect(titles).toMatch(/Task Chair/);
    expect(titles).toMatch(/Guest Chair/);
    expect(titles).toMatch(/Lounge Chair/);
    expect(titles).toMatch(/Loveseat/);
    expect(titles).toMatch(/Storage Bench/);
    expect(titles).toMatch(/Ottoman/);
    expect(titles).toMatch(/Reception Composition/);
  });

  it("marks all initial products as not production ready", () => {
    expect(products.every((p) => p.productionReady === false)).toBe(true);
    expect(products.every((p) => !isProductionReady(p))).toBe(true);
  });
});

describe("pricing and cart", () => {
  it("formats prices", () => {
    expect(formatPrice(249)).toBe("$249.00");
  });

  it("calculates line and cart totals", () => {
    const line = {
      productId: "prod-001",
      sku: "BDS-DSK-001",
      slug: "x",
      title: "t",
      quantity: 2,
      unitPrice: 249,
      finishId: null,
      finishLabel: null,
      upholsteryId: null,
      upholsteryLabel: null,
      orientationId: null,
      orientationLabel: null,
      width: 42,
      height: null,
      depth: null,
      boxCount: null,
      shippingClass: "standard-furniture-parcel",
      assemblyRequired: "Verification required",
      imagePath: null,
      addedAt: new Date().toISOString(),
    } satisfies CartLine;
    expect(lineTotal(line)).toBe(498);
    expect(cartSubtotal([line, { ...line, quantity: 1 }])).toBe(747);
  });

  it("clamps quantities", () => {
    expect(clampQuantity(0)).toBe(1);
    expect(clampQuantity(150)).toBe(99);
  });
});

describe("variant validation", () => {
  const desk = products.find((p) => p.sku === "BDS-DSK-001")!;
  const set = products.find((p) => p.sku === "BDS-SET-026")!;

  it("validates finishes and upholstery", () => {
    expect(validateFinish(desk, "birch-light")).toBe(true);
    expect(validateFinish(desk, "nope")).toBe(false);
    expect(validateUpholstery(desk, null)).toBe(true);
  });

  it("validates orientation for executive desk", () => {
    const exec = products.find((p) => p.sku === "BDS-DSK-003")!;
    expect(validateOrientation(exec, "left-return")).toBe(true);
  });

  it("validates set contents", () => {
    expect(validateSetContents(set).ok).toBe(true);
  });

  it("blocks live purchase for incomplete products", () => {
    expect(canPurchaseInMode(desk, "live")).toBe(false);
    expect(canPurchaseInMode(desk, "demo")).toBe(true);
  });
});

describe("shipping and footprint", () => {
  it("returns demonstration shipping or quote required", () => {
    const line = {
      productId: "prod-001",
      sku: "BDS-DSK-001",
      slug: "x",
      title: "t",
      quantity: 1,
      unitPrice: 249,
      finishId: null,
      finishLabel: null,
      upholsteryId: null,
      upholsteryLabel: null,
      orientationId: null,
      orientationLabel: null,
      width: 42,
      height: null,
      depth: null,
      boxCount: null,
      shippingClass: "standard-furniture-parcel" as const,
      assemblyRequired: "Verification required" as const,
      imagePath: null,
      addedAt: "",
    };
    const demo = calculateDemoShipping({ lines: [line] });
    expect(demo.type).toBe("demonstration");
    expect(demo.note.toLowerCase()).toContain("demonstration");

    const freight = calculateDemoShipping({
      lines: [{ ...line, shippingClass: "freight-review-required" }],
    });
    expect(freight.type).toBe("quote-required");
  });

  it("estimates footprint with disclaimer", () => {
    const estimate = estimateCombinedFootprint([
      { width: 42, depth: 24, title: "A" },
      { width: 30, depth: 20, title: "B" },
    ]);
    expect(estimate.widthInches).toBe(42);
    expect(estimate.depthInches).toBe(44);
    expect(estimate.note).toMatch(/Confirm room/);
  });
});

describe("dimensions and orders", () => {
  it("formats dimensions", () => {
    expect(formatDimensions({ width: 42, height: "Verification required", depth: null })).toContain('W 42"');
  });

  it("generates non-guessable order references", () => {
    const a = generateOrderReference();
    const b = generateOrderReference();
    expect(a).toMatch(/^BDS-/);
    expect(a).not.toBe(b);
  });
});

describe("schemas", () => {
  it("validates contact and newsletter forms", () => {
    expect(
      contactSchema.safeParse({
        name: "Alex Example",
        email: "alex@example.com",
        topic: "Product question",
        message: "Need dimensions clarification please.",
        privacyAcknowledged: true,
      }).success,
    ).toBe(true);

    expect(
      newsletterSchema.safeParse({
        email: "alex@example.com",
        privacyAcknowledged: true,
        marketingConsent: true,
      }).success,
    ).toBe(true);
  });
});

describe("cart line validation", () => {
  it("rejects price tampering", () => {
    const product = products[0];
    const line: CartLine = {
      productId: product.id,
      sku: product.sku,
      slug: product.slug,
      title: product.title,
      quantity: 1,
      unitPrice: product.demoPrice + 10,
      finishId: product.colorways.find((c) => c.type === "finish")?.id ?? null,
      finishLabel: null,
      upholsteryId: product.colorways.find((c) => c.type === "upholstery")?.id ?? null,
      upholsteryLabel: null,
      orientationId: null,
      orientationLabel: null,
      width: typeof product.width === "number" ? product.width : null,
      height: typeof product.height === "number" ? product.height : null,
      depth: typeof product.depth === "number" ? product.depth : null,
      boxCount: typeof product.boxCount === "number" ? product.boxCount : null,
      shippingClass: product.shippingClass,
      assemblyRequired: product.assemblyRequired,
      imagePath: null,
      addedAt: "",
    };
    const result = validateCartLine(line, "demo");
    expect(result.ok).toBe(false);
  });
});
