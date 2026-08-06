import type { ProductStack } from "@/types/product";

export const popularStacks: ProductStack[] = [
  {
    id: "branch-wan-resilience",
    name: "Branch WAN resilience",
    description:
      "Dual-path SD-WAN with satellite backup for regional offices.",
    productSlugs: ["peplink-1350-ec", "starlink-high-performance", "fortigate-71g"],
  },
  {
    id: "retail-edge",
    name: "Retail edge security",
    description: "Compact firewall plus fixed wireless for storefronts.",
    productSlugs: ["fortigate-40f", "starlink-standard", "peplink-b-one-plus"],
  },
  {
    id: "mobile-field",
    name: "Mobile & field kit",
    description: "Vehicle router with portable satellite for roaming teams.",
    productSlugs: ["peplink-br1-mini", "starlink-mini-kit"],
  },
];
