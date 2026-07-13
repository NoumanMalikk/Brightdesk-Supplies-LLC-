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

export default function CheckoutPage() {
  const lines = useCartStore((s) => s.lines);
  const [step, setStep] = useState(0);
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

  async function startPayment() {
    setError("");
    if (!form.termsAcknowledged || !form.privacyAcknowledged || !form.dimensionsReviewed || !form.doorwayAccessReviewed || !form.finishUpholsteryConfirmed || !form.assemblyReviewed) {
      setError("Please complete all required acknowledgments.");
      return;
    }
    if (shipping.type === "quote-required") {
      setError("Freight or specialty shipping requires a quote before payment.");
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
        <p className="mt-4">Your cart is empty. <Link href="/shop" className="underline">Continue shopping</Link>.</p>
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
        {steps.map((s, i) => (
          <li key={s}>
            <button type="button" className={`rounded-full px-3 py-1 text-sm ${i === step ? "bg-blueprint-ink text-paper-cream" : "bg-border-stone/40"}`} onClick={() => setStep(i)}>
              {i + 1}. {s}
            </button>
          </li>
        ))}
      </ol>

      <div className="mt-8 space-y-4 rounded-xl border border-border-stone bg-gallery-white p-6">
        {step === 0 && (
          <>
            {(["email", "firstName", "lastName", "phone", "companyName", "purchaseOrderReference"] as const).map((key) => (
              <div key={key}>
                <label className="text-sm font-medium capitalize" htmlFor={key}>{key.replace(/([A-Z])/g, " $1")}</label>
                <input id={key} className="mt-1 h-11 w-full rounded-md border border-border-stone px-3" value={form[key]} onChange={(e) => update(key, e.target.value)} required={!["companyName", "purchaseOrderReference"].includes(key)} />
              </div>
            ))}
          </>
        )}
        {step === 1 && (
          <>
            {(["line1", "line2", "city", "state", "postalCode"] as const).map((key) => (
              <div key={key}>
                <label className="text-sm font-medium" htmlFor={key}>{key}</label>
                <input id={key} className="mt-1 h-11 w-full rounded-md border border-border-stone px-3" value={form[key]} onChange={(e) => update(key, e.target.value)} required={key !== "line2"} />
              </div>
            ))}
            <p className="text-sm text-soft-graphite">Country: United States</p>
          </>
        )}
        {step === 2 && (
          <>
            <p className="text-sm text-soft-graphite">Delivery-access fields are collected for shipping method planning. No specific delivery service is promised.</p>
            {(["buildingType", "floorLevel", "restrictedAccess", "deliveryContactPhone"] as const).map((key) => (
              <div key={key}>
                <label className="text-sm font-medium" htmlFor={key}>{key}</label>
                <input id={key} className="mt-1 h-11 w-full rounded-md border border-border-stone px-3" value={form[key]} onChange={(e) => update(key, e.target.value)} />
              </div>
            ))}
          </>
        )}
        {step === 3 && (
          <>
            <ul className="space-y-2 text-sm">
              {lines.map((l) => (
                <li key={l.productId + l.finishId}>{l.quantity} × {l.title} — {formatPrice(l.unitPrice * l.quantity)}</li>
              ))}
            </ul>
            <p>Subtotal: {formatPrice(subtotal)}</p>
            <p>{shipping.label}: {shipping.amount === null ? "Quote required" : formatPrice(shipping.amount)}</p>
            <p className="text-xs text-soft-graphite">{shipping.note}</p>
            {shipping.type === "demonstration" && <p>Estimated tax (demo): {formatPrice(taxEstimate)}</p>}
            <p className="font-semibold">Estimated total: {shipping.type === "quote-required" ? "Pending quote" : formatPrice(total)}</p>
            {(["termsAcknowledged", "privacyAcknowledged", "dimensionsReviewed", "doorwayAccessReviewed", "finishUpholsteryConfirmed", "assemblyReviewed"] as const).map((key) => (
              <label key={key} className="flex items-start gap-2 text-sm">
                <input type="checkbox" checked={form[key]} onChange={(e) => update(key, e.target.checked)} className="mt-1" />
                <span>{key.replace(/([A-Z])/g, " $1")}</span>
              </label>
            ))}
            <label className="flex items-start gap-2 text-sm">
              <input type="checkbox" checked={form.marketingConsent} onChange={(e) => update("marketingConsent", e.target.checked)} className="mt-1" />
              <span>Optional marketing consent (unchecked by default)</span>
            </label>
          </>
        )}
        {step === 4 && (
          <div>
            <p className="text-sm text-soft-graphite">Payment uses Stripe Checkout or Payment Element. Ordinary inputs never collect card numbers.</p>
            <Button className="mt-4" disabled={loading} onClick={startPayment}>
              {loading ? "Starting secure payment…" : storeConfig.storeMode === "demo" ? "Continue to demo payment" : "Pay securely"}
            </Button>
          </div>
        )}
        {error && <p className="text-sm text-upholstery-rust" role="alert">{error}</p>}
        <div className="flex justify-between pt-4">
          <Button variant="outline" disabled={step === 0} onClick={() => setStep((s) => s - 1)}>Back</Button>
          {step < steps.length - 1 && (
            <Button onClick={() => setStep((s) => s + 1)}>Continue</Button>
          )}
        </div>
      </div>
    </div>
  );
}
