import { storeConfig } from "@/data/store-config";
import { isDemoMode } from "@/lib/env";

export function DemoModeBanner() {
  if (!isDemoMode()) return null;
  return (
    <div className="bg-drafting-yellow/90 text-blueprint-ink">
      <p className="mx-auto max-w-7xl px-4 py-2 text-center text-sm font-medium md:px-6">
        {storeConfig.demoNotice}
      </p>
    </div>
  );
}
