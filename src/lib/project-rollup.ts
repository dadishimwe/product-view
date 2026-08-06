import type { Product } from "@/types/product";

export function projectRollup(products: Product[]) {
  let powerWattsMax = 0;
  let rackUnits = 0;
  let powerKnown = 0;
  let rackKnown = 0;

  for (const p of products) {
    if (p.deployment?.powerWattsMax != null) {
      powerWattsMax += p.deployment.powerWattsMax;
      powerKnown += 1;
    }
    if (p.deployment?.rackUnits != null) {
      rackUnits += p.deployment.rackUnits;
      rackKnown += 1;
    }
  }

  return {
    deviceCount: products.length,
    powerWattsMax,
    powerKnown,
    rackUnits,
    rackKnown,
  };
}
