import { NextResponse } from "next/server";
import { quoteSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/rate-limit";
import { generateOrderReference } from "@/lib/order-reference";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  if (!rateLimit(`quote:${ip}`, 6).ok) {
    return NextResponse.json({ error: "Too many quote requests." }, { status: 429 });
  }
  const json = await request.json();
  if (json.website) return NextResponse.json({ ok: true, reference: generateOrderReference() });
  const parsed = quoteSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }
  return NextResponse.json({
    ok: true,
    reference: generateOrderReference(),
    message: "Quote request received for review. Trade pricing, discounts, installation and delivery timing are not promised.",
  });
}
