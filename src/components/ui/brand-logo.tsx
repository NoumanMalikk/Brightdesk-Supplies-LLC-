import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function BrandLogo({
  className,
  stacked = false,
  priority = false,
}: {
  className?: string;
  stacked?: boolean;
  priority?: boolean;
}) {
  return (
    <Link href="/" className={cn("inline-flex items-center text-blueprint-ink", className)} aria-label="Brightdesk Supplies home">
      <Image
        src={stacked ? "/brand/logo-stacked.svg" : "/brand/logo-horizontal.svg"}
        alt="Brightdesk Supplies LLC"
        width={stacked ? 160 : 220}
        height={stacked ? 88 : 40}
        priority={priority}
        className={cn(stacked ? "h-14 w-auto" : "h-9 w-auto md:h-10")}
      />
    </Link>
  );
}
