"use client";

import { useState } from "react";
import Link from "next/link";
import { products } from "@/data/products";

export default function QuotePage() {
  const [status, setStatus] = useState("");
  const [productId, setProductId] = useState(products[0]?.id ?? "");
  const [form, setForm] = useState({
    contactName: "", companyName: "", email: "", phone: "", shippingZip: "",
    buildingType: "", floorLevel: "", elevatorAvailability: "", loadingDockAvailability: "",
    requestedDeliveryWindow: "", additionalDetails: "", contactConsent: false, privacyAcknowledged: false, website: "", quantity: 1,
  });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const product = products.find((p) => p.id === productId);
    const res = await fetch("/api/quote", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        products: [{ productId, sku: product?.sku ?? "", quantity: Number(form.quantity) }],
      }),
    });
    const data = await res.json();
    setStatus(res.ok ? `${data.message} Reference: ${data.reference}` : data.error);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-semibold">Request a furniture quote</h1>
      <p className="mt-3 text-soft-graphite">For multiple workstations, reception groups, meeting-room furniture, larger quantities or freight-review items. Trade pricing, discounts, installation, delivery timing and quote approval are not promised.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        {(["contactName","companyName","email","phone","shippingZip"] as const).map((k) => (
          <div key={k}>
            <label className="text-sm font-medium" htmlFor={k}>{k}</label>
            <input id={k} className="mt-1 h-11 w-full rounded-md border border-border-stone px-3" value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} required={!["companyName"].includes(k)} />
          </div>
        ))}
        <div>
          <label className="text-sm font-medium" htmlFor="product">Product</label>
          <select id="product" className="mt-1 h-11 w-full rounded-md border border-border-stone px-3" value={productId} onChange={(e) => setProductId(e.target.value)}>
            {products.map((p) => <option key={p.id} value={p.id}>{p.title} ({p.sku})</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="quantity">Quantity</label>
          <input id="quantity" type="number" min={1} className="mt-1 h-11 w-full rounded-md border border-border-stone px-3" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })} />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="additionalDetails">Additional details</label>
          <textarea id="additionalDetails" className="mt-1 min-h-28 w-full rounded-md border border-border-stone px-3 py-2" value={form.additionalDetails} onChange={(e) => setForm({ ...form, additionalDetails: e.target.value })} />
        </div>
        <label className="flex gap-2 text-sm"><input type="checkbox" checked={form.contactConsent} onChange={(e) => setForm({ ...form, contactConsent: e.target.checked })} required /> I consent to be contacted about this quote request.</label>
        <label className="flex gap-2 text-sm"><input type="checkbox" checked={form.privacyAcknowledged} onChange={(e) => setForm({ ...form, privacyAcknowledged: e.target.checked })} required /> I acknowledge the <Link href="/privacy-policy" className="underline">privacy policy</Link>.</label>
        <button type="submit" className="h-11 rounded-md bg-blueprint-ink px-5 text-sm font-medium text-paper-cream">Submit quote request</button>
        <p role="status" className="text-sm">{status}</p>
      </form>
    </div>
  );
}
