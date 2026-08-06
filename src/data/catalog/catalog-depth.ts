/**
 * Deployment rollup fields (power / rack / input).
 * Sources: vendor product pages and datasheets — cite URL in PR when changing.
 * @see CONTRIBUTING.md
 */
import type { Product, ProductDeployment } from "@/types/product";

export const CATALOG_DEPLOYMENT: Record<string, ProductDeployment> = {
  "peplink-balance-20x": {
    powerWattsMax: 18,
    rackUnits: 0,
    inputVoltage: "100–240 V AC",
  },
  "peplink-balance-310": {
    powerWattsMax: 30,
    rackUnits: 0,
    inputVoltage: "100–240 V AC",
  },
  "peplink-balance-310x": {
    powerWattsMax: 35,
    rackUnits: 0,
    inputVoltage: "100–240 V AC",
  },
  "peplink-balance-310-fiber": {
    powerWattsMax: 32,
    rackUnits: 0,
    inputVoltage: "100–240 V AC",
  },
  "peplink-balance-310-fiber-5g": {
    powerWattsMax: 48,
    rackUnits: 0,
    inputVoltage: "100–240 V AC",
  },
  "peplink-balance-580x": {
    powerWattsMax: 55,
    rackUnits: 1,
    inputVoltage: "100–240 V AC",
  },
  "peplink-balance-710": {
    powerWattsMax: 40,
    rackUnits: 0,
    inputVoltage: "100–240 V AC",
  },
  "peplink-balance-1350-ec": {
    powerWattsMax: 45,
    rackUnits: 1,
    inputVoltage: "100–240 V AC",
  },
  "peplink-balance-2500-ec": {
    powerWattsMax: 120,
    rackUnits: 2,
    inputVoltage: "100–240 V AC (dual PSU SKU)",
  },
  "peplink-balance-5000-ec": {
    powerWattsMax: 250,
    rackUnits: 2,
    inputVoltage: "100–240 V AC",
  },
  "peplink-b-one": {
    powerWattsMax: 15,
    rackUnits: 0,
    inputVoltage: "100–240 V AC",
  },
  "peplink-b-one-plus": {
    powerWattsMax: 25,
    rackUnits: 0,
    inputVoltage: "12 V DC",
  },
  "peplink-b-one-5g": {
    powerWattsMax: 28,
    rackUnits: 0,
    inputVoltage: "100–240 V AC",
  },
  "peplink-max-br1-mini-5g": {
    powerWattsMax: 15,
    rackUnits: 0,
    inputVoltage: "9–30 V DC",
  },
  "peplink-max-br1-pro-5g": {
    powerWattsMax: 25,
    rackUnits: 0,
    inputVoltage: "9–30 V DC",
  },
  "peplink-max-br2-pro": {
    powerWattsMax: 45,
    rackUnits: 0,
    inputVoltage: "9–30 V DC",
  },
  "peplink-br2-micro": {
    powerWattsMax: 12,
    rackUnits: 0,
    inputVoltage: "9–30 V DC",
  },
  "peplink-max-hd4-mbx": {
    powerWattsMax: 60,
    rackUnits: 0,
    inputVoltage: "9–30 V DC",
  },
  "starlink-mini-kit": {
    powerWattsMax: 40,
    rackUnits: 0,
    inputVoltage: "100–240 V / 12 V DC",
  },
  "starlink-standard-gen3": {
    powerWattsMax: 100,
    rackUnits: 0,
    inputVoltage: "100–240 V AC",
  },
  "starlink-standard-actuated": {
    powerWattsMax: 100,
    rackUnits: 0,
    inputVoltage: "100–240 V AC",
  },
  "starlink-flat-high-performance": {
    powerWattsMax: 150,
    rackUnits: 0,
    inputVoltage: "100–240 V AC",
  },
  "starlink-v3-high-performance": {
    powerWattsMax: 150,
    rackUnits: 0,
    inputVoltage: "100–240 V AC",
  },
  "starlink-enterprise": {
    powerWattsMax: 100,
    rackUnits: 0,
    inputVoltage: "100–240 V AC",
  },
};

export type SpecPatch = {
  connectivity?: Record<string, string>;
  power?: Record<string, string>;
  physical?: Record<string, string>;
  compliance?: Record<string, string>;
};

export const CATALOG_SPEC_PATCHES: Record<string, SpecPatch> = {
  "peplink-balance-20x": {
    power: { Input: "100–240 V AC", Consumption: "≤18 W typical (max)" },
    physical: { Dimensions: "Desktop", Weight: "See Peplink product page" },
  },
  "peplink-balance-310": {
    connectivity: {
      "LAN/WAN": "Multiple GbE + 10G LAN (SKU dependent)",
      "Multi-WAN": "Supported",
      "SpeedFusion": "Supported",
    },
    power: { Input: "100–240 V AC", Consumption: "≤30 W typical (max)" },
  },
  "peplink-balance-1350-ec": {
    power: {
      Input: "100–240 V AC",
      Consumption: "≤45 W typical (max)",
    },
  },
  "peplink-b-one": {
    power: { Input: "100–240 V AC", Consumption: "≤15 W typical (max)" },
  },
  "peplink-b-one-5g": {
    power: { Input: "100–240 V AC", Consumption: "≤28 W typical (max)" },
  },
  "peplink-max-br1-mini-5g": {
    power: { Input: "9–30 V DC", Consumption: "≤15 W typical (max)" },
  },
  "starlink-standard-gen3": {
    physical: {
      Dimensions: "19.8 × 12.0 in dish (approx.)",
      "IP rating": "IP54 (Standard Gen 3)",
    },
    power: { Consumption: "75–100 W typical", Input: "100–240 V AC" },
  },
  "starlink-v3-high-performance": {
    physical: {
      "IP rating": "IP69K (Performance Gen 3)",
      "Operating temp": "Extended vs Standard",
    },
    power: { Consumption: "110–150 W typical" },
  },
  "fortinet-fortigate-40f": {
    connectivity: {
      Ethernet: "5× GbE",
      "Firewall throughput": "~5 Gbps (datasheet)",
      "Threat protection": "~600 Mbps (datasheet)",
      "SD-WAN": "Supported",
    },
    power: { Input: "100–240 V AC", Consumption: "≤12 W max" },
  },
  "fortinet-fortigate-60f": {
    connectivity: {
      Ethernet: "10× GbE",
      "Firewall throughput": "~10 Gbps (datasheet)",
      "Threat protection": "~700 Mbps (datasheet)",
    },
    power: { Consumption: "≤18 W max" },
  },
  "fortinet-fortigate-71g": {
    connectivity: {
      Ethernet: "8× GbE",
      "Firewall throughput": "~10 Gbps class (datasheet)",
      "Threat protection": "~1 Gbps class (datasheet)",
    },
    power: { Consumption: "≤35 W max" },
  },
  "fortinet-fortigate-100f": {
    connectivity: {
      "Firewall throughput": "~20 Gbps (datasheet)",
      "Threat protection": "~1 Gbps (datasheet)",
    },
    power: { Consumption: "≤40 W max" },
  },
  "fortinet-fortigate-400f": {
    power: { Consumption: "≤120 W max" },
    physical: { Mounting: "Rack 1U", Dimensions: "1U chassis (datasheet)" },
  },
  "fortinet-fortigate-1000f": {
    power: { Consumption: "≤200 W max" },
  },
  "fortinet-fortigate-2000f": {
    power: { Consumption: "≤350 W max" },
  },
  "fortinet-fortiap-231f": {
    power: { "PoE required": "802.3at (30 W)", Consumption: "≤30 W max" },
  },
  "fortinet-fortiap-431f": {
    power: { "PoE required": "802.3at (30 W)", Consumption: "≤30 W max" },
    physical: { Enclosure: "Outdoor IP67 (datasheet)" },
  },
};

/** Reference URLs for reviewers (optional cross-check in PR). */
export const SPEC_PATCH_SOURCES: Record<string, string> = {
  "peplink-balance-20x": "https://www.peplink.com/products/balance-20x/",
  "peplink-balance-310": "https://www.peplink.com/products/balance-310/",
  "peplink-balance-1350-ec": "https://www.peplink.com/products/balance-1350-ec/",
  "peplink-b-one": "https://www.peplink.com/products/b-one/",
  "peplink-b-one-5g": "https://www.peplink.com/products/b-one-5g/",
  "peplink-max-br1-mini-5g": "https://www.peplink.com/products/max-br1-mini-5g/",
  "starlink-standard-gen3": "https://www.starlink.com/specifications",
  "starlink-v3-high-performance": "https://www.starlink.com/business",
  "fortinet-fortigate-40f":
    "https://www.fortinet.com/products/next-generation-firewall/fortigate-40f",
  "fortinet-fortigate-60f":
    "https://www.fortinet.com/products/next-generation-firewall/fortigate-60f",
  "fortinet-fortigate-71g":
    "https://www.fortinet.com/products/next-generation-firewall/fortigate-70g",
  "fortinet-fortigate-100f":
    "https://www.fortinet.com/products/next-generation-firewall/fortigate-100f",
  "fortinet-fortigate-400f":
    "https://www.fortinet.com/products/next-generation-firewall/fortigate-400f",
  "fortinet-fortigate-1000f":
    "https://www.fortinet.com/products/next-generation-firewall/fortigate-1000f",
  "fortinet-fortigate-2000f":
    "https://www.fortinet.com/products/next-generation-firewall/fortigate-2000f",
  "fortinet-fortiap-231f":
    "https://www.fortinet.com/products/wlan-access-points/fortiap-231f",
  "fortinet-fortiap-431f":
    "https://www.fortinet.com/products/wlan-access-points/fortiap-431f",
};

function mergeSpecGroup<T extends Record<string, string>>(
  base: T | undefined,
  patch: T | undefined,
): T {
  return { ...base, ...patch } as T;
}

export function applyCatalogDepth(product: Product): Product {
  const deployment =
    product.deployment ?? CATALOG_DEPLOYMENT[product.slug] ?? undefined;
  const patch = CATALOG_SPEC_PATCHES[product.slug];
  if (!patch && !deployment) return product;

  return {
    ...product,
    deployment: deployment ?? product.deployment,
    specs: patch
      ? {
          connectivity: mergeSpecGroup(
            product.specs.connectivity,
            patch.connectivity,
          ),
          power: mergeSpecGroup(product.specs.power, patch.power),
          physical: mergeSpecGroup(product.specs.physical, patch.physical),
          compliance: mergeSpecGroup(
            product.specs.compliance,
            patch.compliance,
          ),
        }
      : product.specs,
  };
}
