import { NextResponse } from "next/server";
import { trackOrderSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/rate-limit";
import { findOrderByEmail } from "@/lib/orders";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  if (!rateLimit(`track:${ip}`, 10).ok) {
    return NextResponse.json({ error: "Too many tracking attempts." }, { status: 429 });
  }
  const json = await request.json();
  const parsed = trackOrderSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed" }, { status: 400 });
  }
  const order = findOrderByEmail(parsed.data.orderReference, parsed.data.email);
  if (!order) {
    return NextResponse.json({ error: "Order not found for that reference and email." }, { status: 404 });
  }
  return NextResponse.json({
    reference: order.reference,
    paymentStatus: order.paymentStatus,
    fulfilmentStatus: order.fulfilmentStatus,
    createdAt: order.createdAt,
    lines: order.lines.map((l) => ({
      title: l.title,
      sku: l.sku,
      quantity: l.quantity,
    })),
  });
}
