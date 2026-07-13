import { NextResponse } from "next/server";
import { newsletterSchema } from "@/lib/schemas";
import { rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for") ?? "local";
  if (!rateLimit(`newsletter:${ip}`, 6).ok) {
    return NextResponse.json({ error: "Too many subscription attempts." }, { status: 429 });
  }
  const json = await request.json();
  if (json.website) return NextResponse.json({ ok: true });
  const parsed = newsletterSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", issues: parsed.error.flatten() }, { status: 400 });
  }
  return NextResponse.json({
    ok: true,
    message: "Subscription recorded. Double opt-in confirmation will be sent when email is configured.",
  });
}
