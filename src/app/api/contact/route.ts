import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/rate-limit";
import { generateOrderReference } from "@/lib/order-reference";
import { storeConfig } from "@/data/store-config";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  if (!rateLimit(`contact:${ip}`, 8).ok) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }
  const json = await request.json();
  if (json.website) return NextResponse.json({ ok: true, reference: generateOrderReference() });
  const parsed = contactSchema.safeParse({
    ...json,
    privacyAcknowledged: json.privacyAcknowledged === true ? true : json.privacyAcknowledged,
  });
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }
  return NextResponse.json({
    ok: true,
    reference: generateOrderReference(),
    message: storeConfig.contactEmail
      ? "Message accepted for secure email delivery when the provider is configured."
      : "Message accepted. CONTACT_EMAIL is not configured yet, so outbound email is deferred.",
  });
}
