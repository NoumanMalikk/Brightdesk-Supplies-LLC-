import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="font-display text-4xl font-semibold">Page not found</h1>
      <p className="mt-4 text-soft-graphite">The page you requested is not available.</p>
      <div className="mt-8 flex justify-center gap-3">
        <ButtonLink href="/">Home</ButtonLink>
        <ButtonLink href="/shop" variant="outline">Shop</ButtonLink>
      </div>
      <p className="mt-6 text-sm"><Link href="/contact" className="underline">Contact</Link></p>
    </div>
  );
}
