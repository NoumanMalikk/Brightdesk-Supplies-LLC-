import { getOrder, getOrderByPaymentRef, updateOrder } from "@/lib/orders";
import { storeConfig } from "@/data/store-config";

export const metadata = {
  title: "Order Success",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ session_id?: string; demo_ref?: string }> };

export default async function OrderSuccessPage({ searchParams }: Props) {
  const { session_id, demo_ref } = await searchParams;

  let order = demo_ref ? getOrder(demo_ref) : undefined;
  let verified = false;
  let message = "";

  if (session_id && process.env.STRIPE_SECRET_KEY) {
    try {
      const Stripe = (await import("stripe")).default;
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const session = await stripe.checkout.sessions.retrieve(session_id);
      if (session.payment_status === "paid") {
        const ref = session.metadata?.orderReference;
        order = (ref ? getOrder(ref) : undefined) ?? getOrderByPaymentRef(session_id);
        if (order) {
          updateOrder(order.reference, {
            paymentStatus: "paid",
            fulfilmentStatus: "payment_confirmed",
            webhookConfirmed: order.webhookConfirmed ?? false,
            paymentProviderReference: session_id,
          });
          order = getOrder(order.reference);
          verified = true;
        }
      } else {
        message = "Payment is not confirmed for this session.";
      }
    } catch {
      message = "Unable to verify Stripe session.";
    }
  } else if (demo_ref && order) {
    verified = storeConfig.storeMode === "demo";
    message = "Demonstration order reference. Not a live paid order.";
  } else {
    message = "Missing or invalid order verification parameters.";
  }

  if (!order || !verified) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16">
        <h1 className="font-display text-3xl font-semibold">Order not verified</h1>
        <p className="mt-4 text-soft-graphite">{message || "Success is only shown after server-side payment verification."}</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="font-display text-4xl font-semibold">Order received</h1>
      <p className="mt-3 text-soft-graphite">{message || "Payment verified server-side."}</p>
      <p className="mt-6 font-measure text-lg">Reference: {order.reference}</p>
      <p className="mt-2 text-sm">Payment status: {order.paymentStatus}</p>
      <p className="text-sm">Fulfilment status: {order.fulfilmentStatus}</p>
      <ul className="mt-6 space-y-2 text-sm">
        {order.lines.map((l) => (
          <li key={l.productId + l.sku}>{l.quantity} × {l.title} ({l.sku})</li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-soft-graphite">
        Track your order with the reference and checkout email. Review assembly information before delivery. Measure doorway and access routes.
      </p>
      <p className="mt-4 text-sm">
        Support phone: {storeConfig.phoneDisplay}
      </p>
    </div>
  );
}
