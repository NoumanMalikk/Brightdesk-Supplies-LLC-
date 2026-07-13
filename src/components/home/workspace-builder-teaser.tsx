import { ButtonLink } from "@/components/ui/button";

export function WorkspaceBuilderTeaser() {
  return (
    <section className="border-y border-border-stone bg-blueprint-ink text-paper-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-16 md:grid-cols-2 md:px-6">
        <div>
          <h2 className="font-display text-3xl font-semibold md:text-4xl">Workspace builder</h2>
          <p className="mt-4 text-birch-light">
            Combine a desk, primary chair, storage, guest seat and soft-seating piece. See dimensions, finishes, prices and an approximate combined footprint. Each product adds to the cart separately — no fake bundles or savings.
          </p>
          <p className="mt-3 text-sm text-birch-light/80">Confirm room, doorway and circulation dimensions before ordering.</p>
        </div>
        <div className="flex items-end">
          <ButtonLink href="/workspace-builder" className="bg-drafting-yellow text-blueprint-ink hover:bg-birch-light">
            Open workspace builder
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
