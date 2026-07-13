export const legalConfig = {
  hasUnresolvedPlaceholders: true,
  productionLaunchBlocked: true,
  placeholderToken: "[BUSINESS REVIEW REQUIRED: insert approved policy]",
  returnWindow: "[BUSINESS REVIEW REQUIRED: insert approved policy]",
  refundPeriod: "[BUSINESS REVIEW REQUIRED: insert approved policy]",
  restockingFee: "[BUSINESS REVIEW REQUIRED: insert approved policy]",
  processingTime: "[BUSINESS REVIEW REQUIRED: insert approved policy]",
  deliveryTime: "[BUSINESS REVIEW REQUIRED: insert approved policy]",
  cancellationPeriod: "[BUSINESS REVIEW REQUIRED: insert approved policy]",
  warranty: "[BUSINESS REVIEW REQUIRED: insert approved policy]",
  finalSaleProducts: "[BUSINESS REVIEW REQUIRED: insert approved policy]",
  freightPolicy: "[BUSINESS REVIEW REQUIRED: insert approved policy]",
  whiteGlovePolicy: "[BUSINESS REVIEW REQUIRED: insert approved policy]",
  assemblyPolicy: "[BUSINESS REVIEW REQUIRED: insert approved policy]",
  damagedItemProcess: "[BUSINESS REVIEW REQUIRED: insert approved policy]",
  customOrderPolicy: "[BUSINESS REVIEW REQUIRED: insert approved policy]",
  privacyEffectiveDate: "[BUSINESS REVIEW REQUIRED: insert approved policy]",
  termsEffectiveDate: "[BUSINESS REVIEW REQUIRED: insert approved policy]",
};

export function legalText(field: keyof typeof legalConfig): string {
  const value = legalConfig[field];
  return typeof value === "string" ? value : String(value);
}
