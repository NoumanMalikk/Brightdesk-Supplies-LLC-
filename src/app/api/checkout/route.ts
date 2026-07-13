import { NextResponse } from "next/server";
import { validateCartLine } from "@/lib/product-validation";
import { generateOrderReference } from "@/lib/order-reference";
import { rateLimit } from "@/lib/rate-limit";
import { storeConfig } from "@/data/store-config";
import { isLiveMode, validateLiveEnv } from "@/lib/env";
import { legalConfig } from "@/data/legal-config";
import type { CartLine } from "@/types/product";
import { createOrder } from "@/lib/orders";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  const limited = rateLimit(`checkout:${ip}`, 20, 60_000);
  if (!limited.ok) {
    return NextResponse.json({ error: "Too many checkout attempts. Try again shortly." }, { status: 429 });
  }

  const body = await request.json();
  const lines = (body.lines ?? []) as CartLine[];
  if (!Array.isArray(lines) || lines.length === 0) {
    return NextResponse.json({ error: "Cart is empty." }, { status: 400 });
  }

  for (const line of lines) {
    const result = validateCartLine(line, storeConfig.storeMode);
    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }
  }

  if (isLiveMode()) {
    const env = validateLiveEnv();
    if (!env.ok || legalConfig.productionLaunchBlocked) {
      return NextResponse.json({
        error: "Live checkout is blocked until environment, legal policies and product verification are complete.",
        details: env.errors,
      }, { status: 503 });
    }
  }

  if (body.shipping?.type === "quote-required") {
    return NextResponse.json({ error: "Freight or specialty shipping requires a quote before payment." }, { status: 400 });
  }

  const orderReference = generateOrderReference();
  const order = createOrder({
    reference: orderReference,
    customer: body.customer,
    lines,
    shipping: body.shipping,
    status: "pending_payment",
    paymentStatus: "pending",
    fulfilmentStatus: "order_received",
  });

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  if (stripeKey && process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    try {
      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(stripeKey);
      const origin = storeConfig.siteUrl;
      const session = await stripe.checkout.sessions.create({
        mode: "payment",
        success_url: `${origin}/order/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/checkout`,
        customer_email: body.customer?.email,
        metadata: { orderReference },
        line_items: lines.map((line) => ({
          quantity: line.quantity,
          price_data: {
            currency: "usd",
            unit_amount: Math.round(line.unitPrice * 100),
            product_data: {
              name: line.title,
              metadata: { sku: line.sku, productId: line.productId },
            },
          },
        })),
      }, { idempotencyKey: orderReference });
      order.paymentProviderReference = session.id;
      return NextResponse.json({ url: session.url, orderReference });
    } catch (error) {
      return NextResponse.json({
        error: "Unable to create Stripe session. Check credentials or use demo success path.",
        details: error instanceof Error ? error.message : "unknown",
      }, { status: 500 });
    }
  }

  // Demo path without Stripe credentials
  order.paymentStatus = "demo_awaiting_confirmation";
  return NextResponse.json({
    orderReference,
    demoSuccessUrl: `/order/success?demo_ref=${encodeURIComponent(orderReference)}`,
    message: "Stripe credentials not configured. Demonstration success path returned.",
  });
}
