import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { getOrderByPaymentRef, updateOrder } from "@/lib/orders";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secret || !signature || !process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  try {
    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const event = stripe.webhooks.constructEvent(body, signature, secret);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as { id: string; metadata?: { orderReference?: string }; payment_status?: string };
      const order = getOrderByPaymentRef(session.id);
      const reference = session.metadata?.orderReference ?? order?.reference;
      if (reference && session.payment_status === "paid") {
        updateOrder(reference, {
          paymentStatus: "paid",
          fulfilmentStatus: "payment_confirmed",
          webhookConfirmed: true,
          paymentProviderReference: session.id,
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    return NextResponse.json({
      error: "Webhook verification failed",
      details: error instanceof Error ? error.message : "unknown",
    }, { status: 400 });
  }
}
