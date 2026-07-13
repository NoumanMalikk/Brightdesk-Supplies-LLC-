import { cn } from "@/lib/utils";

export function ProductImagePlaceholder({
  title,
  className,
}: {
  title: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex aspect-square w-full flex-col items-center justify-center gap-2 bg-gallery-white p-4 text-center draft-grid",
        className,
      )}
      role="img"
      aria-label={`Exact product image required for ${title}`}
    >
      <div className="h-16 w-24 border border-dashed border-border-stone bg-paper-cream/80" />
      <p className="max-w-[14rem] text-xs font-medium text-soft-graphite">Exact product image required</p>
      <p className="sr-only">{title}</p>
    </div>
  );
}
