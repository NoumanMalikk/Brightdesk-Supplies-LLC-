"use client";

import { useState } from "react";
import Link from "next/link";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          privacyAcknowledged: privacy,
          marketingConsent: consent,
          website: "",
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unable to subscribe");
      setStatus("success");
      setMessage(data.message ?? "Check your inbox to confirm subscription when email is configured.");
      setEmail("");
      setPrivacy(false);
      setConsent(false);
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="newsletter-email" className="mb-1 block text-sm font-medium">Email</label>
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 w-full rounded-md border border-border-stone bg-gallery-white px-3"
        />
      </div>
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} className="mt-1" required />
        <span>
          I have read the{" "}
          <Link href="/privacy-policy" className="underline">privacy policy</Link>.
        </span>
      </label>
      <label className="flex items-start gap-2 text-sm">
        <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1" required />
        <span>I consent to receive furniture and planning-guide updates. Consent is never prechecked.</span>
      </label>
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden value="" readOnly />
      <button
        type="submit"
        disabled={status === "loading" || !privacy || !consent}
        className="inline-flex h-11 items-center justify-center rounded-md bg-blueprint-ink px-5 text-sm font-medium text-paper-cream disabled:opacity-50"
      >
        {status === "loading" ? "Submitting…" : "Subscribe"}
      </button>
      <div role="status" aria-live="polite" className="text-sm">
        {status === "success" && <p className="text-soft-moss">{message}</p>}
        {status === "error" && <p className="text-upholstery-rust">{message}</p>}
      </div>
    </form>
  );
}
