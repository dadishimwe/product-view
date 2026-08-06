import type { ProductStack } from "@/types/product";

export const popularStacks: ProductStack[] = [
  {
    id: "branch-wan-resilience",
    name: "Branch WAN resilience",
    description:
      "Dual-path SD-WAN with satellite backup for regional offices.",
    productSlugs: [
      "peplink-balance-1350-ec",
      "starlink-v3-high-performance",
      "fortinet-fortigate-71g",
    ],
  },
  {
    id: "retail-edge",
    name: "Retail edge security",
    description: "Compact firewall plus fixed wireless for storefronts.",
    productSlugs: [
      "fortinet-fortigate-40f",
      "starlink-standard-gen3",
      "peplink-b-one-plus",
    ],
  },
  {
    id: "enterprise-edge",
    name: "Enterprise edge security",
    description: "High-throughput NGFW with satellite and SD-WAN head-end.",
    productSlugs: [
      "fortinet-fortigate-1000f",
      "peplink-balance-2500-ec",
      "starlink-enterprise",
    ],
  },
  {
    id: "branch-wifi",
    name: "Branch Wi‑Fi + firewall",
    description: "FortiGate-managed indoor wireless for regional offices.",
    productSlugs: [
      "fortinet-fortigate-60f",
      "fortinet-fortiap-231f",
      "peplink-balance-310",
    ],
  },
  {
    id: "mobile-field",
    name: "Mobile & field kit",
    description: "Vehicle router with portable satellite for roaming teams.",
    productSlugs: ["peplink-max-br1-mini-5g", "starlink-mini-kit"],
  },
];
