"use client";

import { useMemo, useState } from "react";
import { useCartStore } from "@/store/cart-store";
import { cartSubtotal } from "@/lib/cart-calculations";
import { formatPrice } from "@/lib/format";
import { calculateDemoShipping } from "@/lib/shipping";
import { storeConfig } from "@/data/store-config";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const steps = ["Customer", "Shipping", "Access", "Review", "Payment"] as const;

const fieldLabels: Record<string, string> = {
  email: "Email",
  firstName: "First name",
  lastName: "Last name",
  phone: "Phone",
  companyName: "Company name (optional)",
  purchaseOrderReference: "Purchase order reference (optional)",
  line1: "Address line 1",
  line2: "Address line 2 (optional)",
  city: "City",
  state: "State",
  postalCode: "ZIP code",
  buildingType: "Building type",
  floorLevel: "Floor level",
  restrictedAccess: "Restricted access notes",
  deliveryContactPhone: "Delivery contact phone",
  termsAcknowledged: "I agree to the Terms and Conditions",
  privacyAcknowledged: "I acknowledge the Privacy Policy",
  dimensionsReviewed: "I reviewed product dimensions",
  doorwayAccessReviewed: "I reviewed doorway and delivery access",
  finishUpholsteryConfirmed: "Finish and upholstery selections are correct",
  assemblyReviewed: "I reviewed assembly requirements",
};

export default function CheckoutPage() {
  const lines = useCartStore((s) => s.lines);
  const [step, setStep] = useState(0);
  const [maxReachableStep, setMaxReachableStep] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    companyName: "",
    purchaseOrderReference: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "United States",
    buildingType: "",
    locationType: "",
    floorLevel: "",
    elevatorAvailability: "",
    loadingDockAvailability: "",
    restrictedAccess: "",
    deliveryContactPhone: "",
    billingSame: true,
    termsAcknowledged: false,
    privacyAcknowledged: false,
    dimensionsReviewed: false,
    doorwayAccessReviewed: false,
    finishUpholsteryConfirmed: false,
    assemblyReviewed: false,
    marketingConsent: false,
  });

  const subtotal = cartSubtotal(lines);
  const shipping = useMemo(
    () => calculateDemoShipping({ lines, destinationState: form.state, destinationZip: form.postalCode }),
    [lines, form.state, form.postalCode],
  );
  const shippingAmount = shipping.type === "demonstration" ? shipping.amount : 0;
  const taxEstimate = Math.round(subtotal * 0.08875 * 100) / 100;
  const total = subtotal + shippingAmount + (shipping.type === "demonstration" ? taxEstimate : 0);

  function update<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function validateStep(index: number): string | null {
    if (index === 0) {
      if (!form.email.trim() || !form.email.includes("@")) return "Enter a valid email.";
      if (!form.firstName.trim()) return "First name is required.";
      if (!form.lastName.trim()) return "Last name is required.";
      if (!form.phone.trim() || form.phone.trim().length < 7) return "Phone is required.";
    }
    if (index === 1) {
      if (!form.line1.trim()) return "Address line 1 is required.";
      if (!form.city.trim()) return "City is required.";
      if (!form.state.trim()) return "State is required.";
      if (!form.postalCode.trim() || form.postalCode.trim().length < 5) return "ZIP code is required.";
    }
    if (index === 3) {
      if (
        !form.termsAcknowledged ||
        !form.privacyAcknowledged ||
        !form.dimensionsReviewed ||
        !form.doorwayAccessReviewed ||
        !form.finishUpholsteryConfirmed ||
        !form.assemblyReviewed
      ) {
        return "Please complete all required acknowledgments before payment.";
      }
      if (shipping.type === "quote-required") {
        return "Freight or specialty shipping requires a quote before payment.";
      }
    }
    return null;
  }

  function goToStep(index: number) {
    if (index > maxReachableStep) return;
    setError("");
    setStep(index);
  }

  function continueNext() {
    const validationError = validateStep(step);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    const next = Math.min(step + 1, steps.length - 1);
    setMaxReachableStep((current) => Math.max(current, next));
    setStep(next);
  }

  async function startPayment() {
    setError("");
    const reviewError = validateStep(3);
    if (reviewError) {
      setError(reviewError);
      setStep(3);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: form, lines, shipping, agreements: form }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed");
      if (data.url) {
        window.location.href = data.url;
      } else if (data.demoSuccessUrl) {
        window.location.href = data.demoSuccessUrl;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout error");
    } finally {
      setLoading(false);
    }
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-display text-3xl font-semibold">Checkout</h1>
        <p className="mt-4">
          Your cart is empty.{" "}
          <Link href="/shop" className="underline">
            Continue shopping
          </Link>
          .
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-semibold">Checkout</h1>
      <p className="mt-2 text-sm text-soft-graphite">
        Store mode: {storeConfig.storeMode}. Card details are never collected in ordinary form fields.
        {storeConfig.storeMode === "demo" && " Stripe test mode / demonstration checkout."}
      </p>
      <ol className="mt-6 flex flex-wrap gap-2" aria-label="Checkout steps">
        {steps.map((s, i) => {
          const locked = i > maxReachableStep;
          const active = i === step;
          return (
            <li key={s}>
              <button
                type="button"
                disabled={locked}
                aria-current={active ? "step" : undefined}
                aria-disabled={locked}
                className={`rounded-full px-3 py-1 text-sm transition-colors ${
                  active
                    ? "bg-blueprint-ink text-paper-cream"
                    : locked
                      ? "cursor-not-allowed bg-border-stone/25 text-soft-graphite/50"
                      : "bg-border-stone/40 text-blueprint-ink hover:bg-border-stone/60"
                }`}
                onClick={() => goToStep(i)}
              >
                {i + 1}. {s}
              </button>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 space-y-4 rounded-xl border border-border-stone bg-gallery-white p-6">
        {step === 0 && (
          <>
            {(["email", "firstName", "lastName", "phone", "companyName", "purchaseOrderReference"] as const).map((key) => (
              <div key={key}>
                <label className="text-sm font-medium" htmlFor={key}>
                  {fieldLabels[key]}
                </label>
                <input
                  id={key}
                  type={key === "email" ? "email" : key === "phone" ? "tel" : "text"}
                  className="mt-1 h-11 w-full rounded-md border border-border-stone px-3"
                  value={form[key]}
                  onChange={(e) => update(key, e.target.value)}
                  required={!["companyName", "purchaseOrderReference"].includes(key)}
                />
              </div>
            ))}
          </>
        )}
        {step === 1 && (
          <>
            {(["line1", "line2", "city", "state", "postalCode"] as const).map((key) => (
              <div key={key}>
                <label className="text-sm font-medium" htmlFor={key}>
                  {fieldLabels[key]}
                </label>
                <input
                  id={key}
                  className="mt-1 h-11 w-full rounded-md border border-border-stone px-3"
                  value={form[key]}
                  onChange={(e) => update(key, e.target.value)}
                  required={key !== "line2"}
                />
              </div>
            ))}
            <p className="text-sm text-soft-graphite">Country: United States</p>
          </>
        )}
        {step === 2 && (
          <>
            <p className="text-sm text-soft-graphite">
              Delivery-access fields are collected for shipping method planning. No specific delivery service is promised.
            </p>
            {(["buildingType", "floorLevel", "restrictedAccess", "deliveryContactPhone"] as const).map((key) => (
              <div key={key}>
                <label className="text-sm font-medium" htmlFor={key}>
                  {fieldLabels[key]}
                </label>
                <input
                  id={key}
                  className="mt-1 h-11 w-full rounded-md border border-border-stone px-3"
                  value={form[key]}
                  onChange={(e) => update(key, e.target.value)}
                />
              </div>
            ))}
          </>
        )}
        {step === 3 && (
          <>
            <ul className="space-y-2 text-sm">
              {lines.map((l) => (
                <li key={l.productId + l.finishId}>
                  {l.quantity} x {l.title} - {formatPrice(l.unitPrice * l.quantity)}
                </li>
              ))}
            </ul>
            <p>Subtotal: {formatPrice(subtotal)}</p>
            <p>
              {shipping.label}: {shipping.amount === null ? "Quote required" : formatPrice(shipping.amount)}
            </p>
            <p className="text-xs text-soft-graphite">{shipping.note}</p>
            {shipping.type === "demonstration" && <p>Estimated tax (demo): {formatPrice(taxEstimate)}</p>}
            <p className="font-semibold">
              Estimated total: {shipping.type === "quote-required" ? "Pending quote" : formatPrice(total)}
            </p>
            {(
              [
                "termsAcknowledged",
                "privacyAcknowledged",
                "dimensionsReviewed",
                "doorwayAccessReviewed",
                "finishUpholsteryConfirmed",
                "assemblyReviewed",
              ] as const
            ).map((key) => (
              <label key={key} className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={form[key]}
                  onChange={(e) => update(key, e.target.checked)}
                  className="mt-1"
                />
                <span>{fieldLabels[key]}</span>
              </label>
            ))}
            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                checked={form.marketingConsent}
                onChange={(e) => update("marketingConsent", e.target.checked)}
                className="mt-1"
              />
              <span>Optional marketing consent (unchecked by default)</span>
            </label>
          </>
        )}
        {step === 4 && (
          <div>
            <p className="text-sm text-soft-graphite">
              Payment uses Stripe Checkout or Payment Element. Ordinary inputs never collect card numbers.
            </p>
            <Button className="mt-4" disabled={loading} onClick={startPayment}>
              {loading
                ? "Starting secure payment..."
                : storeConfig.storeMode === "demo"
                  ? "Continue to demo payment"
                  : "Pay securely"}
            </Button>
          </div>
        )}
        {error && (
          <p className="text-sm text-upholstery-rust" role="alert">
            {error}
          </p>
        )}
        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            disabled={step === 0}
            onClick={() => {
              setError("");
              setStep((s) => s - 1);
            }}
          >
            Back
          </Button>
          {step < steps.length - 1 && <Button onClick={continueNext}>Continue</Button>}
        </div>
      </div>
    </div>
  );
}
