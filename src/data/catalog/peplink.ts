import type { Product } from "@/types/product";
import { productImagePath } from "@/lib/product-images";

const balance1350Callouts = [
  { label: "Rugged metal chassis", x: 72, y: 18 },
  { label: "Dual WAN ports", x: 28, y: 55 },
  { label: "4× LAN ports", x: 38, y: 68 },
  { label: "USB WAN failover", x: 55, y: 78 },
];

export const peplinkProducts: Product[] = [
  {
    id: "peplink-balance-1350-ec",
    slug: "peplink-balance-1350-ec",
    sku: "BPL-1350-EC",
    vendor: "Peplink",
    name: "Balance 1350 EC",
    category: "Enterprise Routers — Balance EC",
    formFactor: "Desktop / rack ears",
    description:
      "Balance EC series: multi-WAN routing with onboard compute for VM/app hosting at the branch. SpeedFusion-capable SD-WAN edge for MSP-managed sites.",
    images: [
      {
        src: productImagePath("peplink-balance-1350-ec", "Peplink", "front"),
        fallbackSrc: "/products/peplink-1350.svg",
        alt: "Balance 1350 EC front view",
        callouts: balance1350Callouts,
      },
      {
        src: productImagePath("peplink-balance-1350-ec", "Peplink", "rear"),
        fallbackSrc: "/products/peplink-1350-rear.svg",
        alt: "Balance 1350 EC rear view",
        callouts: [
          { label: "Modular WAN slots", x: 35, y: 45 },
          { label: "Dual PSU option", x: 70, y: 60 },
        ],
      },
    ],
    specs: {
      connectivity: {
        "WAN ports": "2× GbE (modular)",
        "LAN ports": "4× GbE",
        "USB WAN": "1× USB 3.0",
        Cellular: "Optional MAX adapter",
        "Wi‑Fi": "Optional AP module",
        Throughput: "4 Gbps firewall",
      },
      power: {
        Input: "100–240 V AC",
        Consumption: "45 W typical",
        "PoE output": "None",
      },
      physical: {
        Dimensions: '1.73" × 17.3" × 11.8"',
        Weight: "8.2 lb",
        "Operating temp": "32–104 °F",
        Mounting: "Desktop / rack",
      },
      compliance: {
        Certifications: "FCC, CE, IC",
        Warranty: "2-year limited",
        "Support tier": "PrimeCare eligible",
      },
    },
    priceBand: "premium",
    priceUsd: 2899,
    leadTime: "5–7 business days",
    compatibilityTags: ["sd-wan", "speedfusion", "dual-wan", "enterprise-branch"],
    worksWellWith: ["starlink-v3-high-performance", "fortinet-fortigate-71g"],
    links: {
      datasheet: "https://www.peplink.com/products/balance-1350-ec/",
      docs: "https://www.peplink.com/support/",
      firmware: "https://www.peplink.com/support/firmware/",
    },
  },
  {
    id: "peplink-b-one-plus",
    slug: "peplink-b-one-plus",
    sku: "BPL-B1-PLUS",
    vendor: "Peplink",
    name: "B One Plus",
    category: "Enterprise Branch Routers — B One",
    formFactor: "Desktop",
    description:
      "Branch router with dual-WAN, Wi‑Fi 6, and embedded LTE Cat-4 for sites that need cellular without a full 5G modem.",
    images: [
      {
        src: productImagePath("peplink-b-one-plus", "Peplink"),
        fallbackSrc: "/products/peplink-b-one.svg",
        alt: "B One Plus",
        callouts: [
          { label: "LTE module", x: 50, y: 30 },
          { label: "2× GbE WAN/LAN", x: 40, y: 65 },
          { label: "Wi‑Fi 6", x: 65, y: 45 },
        ],
      },
    ],
    specs: {
      connectivity: {
        Cellular: "LTE Cat-4",
        Ethernet: "2× GbE",
        "Wi‑Fi": "Wi‑Fi 6 dual-band",
        Throughput: "1 Gbps firewall",
      },
      power: {
        Input: "12 V DC adapter",
        Consumption: "25 W typical",
      },
      physical: {
        Dimensions: '1.6" × 8.3" × 5.5"',
        Weight: "1.8 lb",
        Mounting: "Desktop / wall",
      },
      compliance: {
        Warranty: "1-year limited",
        Certifications: "FCC, PTCRB",
      },
    },
    priceBand: "mid",
    priceUsd: 899,
    leadTime: "3–5 business days",
    compatibilityTags: ["5g-fwa", "cellular-primary", "small-site"],
    worksWellWith: ["starlink-mini-kit", "fortinet-fortigate-40f"],
    links: {
      datasheet: "https://www.peplink.com/products/b-one-plus/",
      docs: "https://www.peplink.com/support/",
    },
  },
  {
    id: "peplink-max-br1-mini-5g",
    slug: "peplink-max-br1-mini-5g",
    sku: "MAX-BR1-MINI-5G",
    vendor: "Peplink",
    name: "MAX BR1 Mini 5G",
    category: "Mobile Routers — BR Series",
    formFactor: "Compact / vehicle",
    description:
      "Compact 5G router for fleet, retail, and mass-deployment mobile sites with GPS and ignition sensing.",
    images: [
      {
        src: productImagePath("peplink-max-br1-mini-5g", "Peplink"),
        fallbackSrc: "/products/peplink-br1.svg",
        alt: "MAX BR1 Mini 5G",
        callouts: [
          { label: "Ignition sense", x: 30, y: 40 },
          { label: "Dual SIM", x: 55, y: 55 },
        ],
      },
    ],
    specs: {
      connectivity: {
        Cellular: "5G / LTE",
        Ethernet: "1× GbE WAN/LAN",
        GPS: "Built-in",
      },
      power: {
        Input: "9–30 V DC",
        Consumption: "12 W typical",
      },
      physical: {
        Dimensions: '1.1" × 4.3" × 3.4"',
        Weight: "0.6 lb",
        "Operating temp": "-22–140 °F",
      },
      compliance: {
        Warranty: "1-year limited",
        Certifications: "FCC, E-mark",
      },
    },
    priceBand: "budget",
    priceUsd: 449,
    leadTime: "In stock",
    compatibilityTags: ["mobile", "vehicle", "iot", "gps"],
    worksWellWith: ["starlink-mini-kit"],
    links: {
      datasheet: "https://www.peplink.com/products/max-br1-mini-5g/",
    },
  },
];
