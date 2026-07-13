import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(120),
  email: z.string().email("Valid email is required"),
  phone: z.string().min(7).max(30).optional().or(z.literal("")),
  topic: z.enum([
    "Product question",
    "Dimensions question",
    "Materials or finish",
    "Upholstery",
    "Assembly",
    "Furniture safety",
    "Existing order",
    "Shipping",
    "Returns",
    "Quote request",
    "Website support",
    "Other",
  ]),
  message: z.string().min(10, "Please provide more detail").max(5000),
  privacyAcknowledged: z.literal(true, {
    errorMap: () => ({ message: "Privacy acknowledgment is required" }),
  }),
  website: z.string().max(0).optional(),
});

export const quoteLineSchema = z.object({
  productId: z.string(),
  sku: z.string(),
  finish: z.string().optional(),
  upholstery: z.string().optional(),
  orientation: z.string().optional(),
  quantity: z.number().int().min(1).max(999),
});

export const quoteSchema = z.object({
  contactName: z.string().min(2).max(120),
  companyName: z.string().max(160).optional().or(z.literal("")),
  email: z.string().email(),
  phone: z.string().min(7).max(30),
  shippingZip: z.string().min(5).max(10),
  products: z.array(quoteLineSchema).min(1, "Select at least one product"),
  buildingType: z.string().max(80).optional().or(z.literal("")),
  floorLevel: z.string().max(40).optional().or(z.literal("")),
  elevatorAvailability: z.string().max(40).optional().or(z.literal("")),
  loadingDockAvailability: z.string().max(40).optional().or(z.literal("")),
  requestedDeliveryWindow: z.string().max(120).optional().or(z.literal("")),
  additionalDetails: z.string().max(5000).optional().or(z.literal("")),
  contactConsent: z.literal(true),
  privacyAcknowledged: z.literal(true),
  website: z.string().max(0).optional(),
});

export const newsletterSchema = z.object({
  email: z.string().email(),
  privacyAcknowledged: z.literal(true),
  marketingConsent: z.literal(true),
  website: z.string().max(0).optional(),
});

export const checkoutCustomerSchema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1).max(80),
  lastName: z.string().min(1).max(80),
  phone: z.string().min(7).max(30),
  companyName: z.string().max(160).optional().or(z.literal("")),
  purchaseOrderReference: z.string().max(80).optional().or(z.literal("")),
});

export const addressSchema = z.object({
  line1: z.string().min(3).max(120),
  line2: z.string().max(120).optional().or(z.literal("")),
  city: z.string().min(2).max(80),
  state: z.string().min(2).max(40),
  postalCode: z.string().min(5).max(10),
  country: z.literal("United States"),
});

export const deliveryAccessSchema = z.object({
  buildingType: z.string().max(80).optional().or(z.literal("")),
  locationType: z.enum(["residence", "commercial", ""]).optional(),
  floorLevel: z.string().max(40).optional().or(z.literal("")),
  elevatorAvailability: z.enum(["yes", "no", "unknown", ""]).optional(),
  loadingDockAvailability: z.enum(["yes", "no", "unknown", ""]).optional(),
  restrictedAccess: z.string().max(240).optional().or(z.literal("")),
  deliveryContactPhone: z.string().max(30).optional().or(z.literal("")),
});

export const trackOrderSchema = z.object({
  orderReference: z.string().min(8).max(64),
  email: z.string().email(),
});

export const checkoutAgreementsSchema = z.object({
  termsAcknowledged: z.literal(true),
  privacyAcknowledged: z.literal(true),
  dimensionsReviewed: z.literal(true),
  doorwayAccessReviewed: z.literal(true),
  finishUpholsteryConfirmed: z.literal(true),
  assemblyReviewed: z.literal(true),
  marketingConsent: z.boolean().default(false),
});
