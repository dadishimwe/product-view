"use client";

import type { Product } from "@/types/product";
import { projectRollup } from "@/lib/project-rollup";

export function ProjectRollup({ products }: { products: Product[] }) {
  if (products.length === 0) return null;
  const r = projectRollup(products);

  return (
    <div className="catalog-panel grid gap-3 p-4 sm:grid-cols-3">
      <div>
        <p className="field-label">Devices</p>
        <p className="font-display text-2xl font-bold tabular-nums">{r.deviceCount}</p>
      </div>
      <div>
        <p className="field-label">Power (max W)</p>
        <p className="font-display text-2xl font-bold tabular-nums">
          {r.powerKnown > 0 ? r.powerWattsMax : "—"}
        </p>
        {r.powerKnown > 0 && r.powerKnown < r.deviceCount ? (
          <p className="font-mono text-xs text-graphite">
            {r.powerKnown} of {r.deviceCount} with data
          </p>
        ) : null}
      </div>
      <div>
        <p className="field-label">Rack space</p>
        <p className="font-display text-2xl font-bold tabular-nums">
          {r.rackKnown > 0 ? `${r.rackUnits} U` : "—"}
        </p>
        {r.rackKnown > 0 && r.rackKnown < r.deviceCount ? (
          <p className="font-mono text-xs text-graphite">
            {r.rackKnown} of {r.deviceCount} with data
          </p>
        ) : null}
      </div>
    </div>
  );
}
