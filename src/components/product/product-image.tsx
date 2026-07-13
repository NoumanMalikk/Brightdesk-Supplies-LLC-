"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { ProductImagePlaceholder } from "@/components/product/product-image-placeholder";

export function ProductImage({
  src,
  alt,
  title,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 33vw",
}: {
  src?: string | null;
  alt: string;
  title?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  if (!src) {
    return <ProductImagePlaceholder title={title ?? alt} className={className} />;
  }

  return (
    <div className={cn("relative aspect-square w-full overflow-hidden bg-gallery-white", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-contain p-2 transition-transform duration-300 group-hover:scale-[1.02]"
      />
    </div>
  );
}
