"use client";

import { useState } from "react";
import Link from "next/link";
import { storeConfig } from "@/data/store-config";

const topics = [
  "Product question","Dimensions question","Materials or finish","Upholstery","Assembly","Furniture safety","Existing order","Shipping","Returns","Quote request","Website support","Other"
];

export default function ContactPage() {
  const [status, setStatus] = useState("");
  const [form, setForm] = useState({ name: "", email: "", phone: "", topic: topics[0], message: "", privacyAcknowledged: false, website: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const data = await res.json();
    setStatus(res.ok ? `${data.message} Reference: ${data.reference}` : data.error);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <h1 className="font-display text-4xl font-semibold">Contact</h1>
      <p className="mt-3 text-soft-graphite">{storeConfig.legalName} · {storeConfig.publicLocationLabel}</p>
      <p className="mt-1"><a href={`tel:${storeConfig.phoneE164}`} className="underline">{storeConfig.phoneDisplay}</a></p>
      {storeConfig.showFullBusinessAddress && (
        <p className="mt-1 text-sm text-soft-graphite">{storeConfig.registeredAddress.line1}, {storeConfig.registeredAddress.city}, {storeConfig.registeredAddress.state} {storeConfig.registeredAddress.postalCode}</p>
      )}
      {storeConfig.contactEmail ? <p className="mt-1"><a href={`mailto:${storeConfig.contactEmail}`} className="underline">{storeConfig.contactEmail}</a></p> : <p className="mt-1 text-sm text-soft-graphite">Email display awaits CONTACT_EMAIL configuration.</p>}
      <p className="mt-3 text-sm text-soft-graphite">No store hours are published. The registered address is not presented as a public showroom, warehouse or factory.</p>
      <p className="mt-2"><Link href="/request-a-quote" className="underline">Request a furniture quote</Link></p>
      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        {(["name","email","phone"] as const).map((k) => (
          <div key={k}>
            <label className="text-sm font-medium capitalize" htmlFor={k}>{k}</label>
            <input id={k} className="mt-1 h-11 w-full rounded-md border border-border-stone px-3" value={form[k]} onChange={(e) => setForm({ ...form, [k]: e.target.value })} required={k !== "phone"} />
          </div>
        ))}
        <div>
          <label className="text-sm font-medium" htmlFor="topic">Topic</label>
          <select id="topic" className="mt-1 h-11 w-full rounded-md border border-border-stone px-3" value={form.topic} onChange={(e) => setForm({ ...form, topic: e.target.value })}>
            {topics.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium" htmlFor="message">Message</label>
          <textarea id="message" className="mt-1 min-h-32 w-full rounded-md border border-border-stone px-3 py-2" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
        </div>
        <label className="flex gap-2 text-sm"><input type="checkbox" checked={form.privacyAcknowledged} onChange={(e) => setForm({ ...form, privacyAcknowledged: e.target.checked })} required /> I acknowledge the <Link href="/privacy-policy" className="underline">privacy policy</Link>.</label>
        <input type="text" className="hidden" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} aria-hidden />
        <button type="submit" className="h-11 rounded-md bg-blueprint-ink px-5 text-sm font-medium text-paper-cream">Send message</button>
        <p role="status" className="text-sm">{status}</p>
      </form>
    </div>
  );
}
