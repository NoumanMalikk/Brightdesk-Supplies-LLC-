"use client";

import { useState } from "react";

export default function TrackOrderPage() {
  const [orderReference, setOrderReference] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/track-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderReference, email }),
    });
    const data = await res.json();
    if (!res.ok) {
      setResult(data.error);
      return;
    }
    setResult(`Status: ${data.fulfilmentStatus} · Payment: ${data.paymentStatus}`);
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-semibold">Track order</h1>
      <p className="mt-3 text-soft-graphite">Use your order reference and checkout email. Only stored statuses are shown. Carrier tracking numbers are never fabricated.</p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label className="text-sm font-medium" htmlFor="ref">Order reference</label>
          <input id="ref" className="mt-1 h-11 w-full rounded-md border border-border-stone px-3" value={orderReference} onChange={(e) => setOrderReference(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="email">Email</label>
          <input id="email" type="email" className="mt-1 h-11 w-full rounded-md border border-border-stone px-3" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button type="submit" className="h-11 rounded-md bg-blueprint-ink px-5 text-sm font-medium text-paper-cream">Track</button>
        <p role="status" className="text-sm">{result}</p>
      </form>
    </div>
  );
}
