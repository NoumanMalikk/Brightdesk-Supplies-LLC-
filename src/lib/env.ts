import { storeConfig } from "@/data/store-config";
import { legalConfig } from "@/data/legal-config";

export function isDemoMode() {
  return storeConfig.storeMode !== "live";
}

export function isLiveMode() {
  return storeConfig.storeMode === "live";
}

export type EnvValidation = { ok: boolean; errors: string[] };

export function validateLiveEnv(): EnvValidation {
  const errors: string[] = [];
  if (!process.env.STRIPE_SECRET_KEY) errors.push("STRIPE_SECRET_KEY is required for live mode.");
  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    errors.push("NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is required for live mode.");
  }
  if (!process.env.STRIPE_WEBHOOK_SECRET) errors.push("STRIPE_WEBHOOK_SECRET is required for live mode.");
  if (!process.env.CONTACT_EMAIL) errors.push("CONTACT_EMAIL must be configured.");
  if (!process.env.RESEND_API_KEY) errors.push("RESEND_API_KEY is required for confirmation email.");
  if (!process.env.EMAIL_FROM) errors.push("EMAIL_FROM is required for confirmation email.");
  if (!process.env.ORDER_TRACKING_SECRET) errors.push("ORDER_TRACKING_SECRET is required.");
  if (legalConfig.productionLaunchBlocked || legalConfig.hasUnresolvedPlaceholders) {
    errors.push("Legal policy placeholders must be resolved before live launch.");
  }
  return { ok: errors.length === 0, errors };
}
