import type { Product } from "@/types/product";
import { productImagePath } from "@/lib/product-images";

export const starlinkProducts: Product[] = [
  {
    id: "starlink-standard-gen3",
    slug: "starlink-standard-gen3",
    sku: "SL-STD-G3",
    vendor: "Starlink",
    name: "Starlink Standard (Gen 3)",
    category: "Residential / prosumer terminal",
    formFactor: "Roof / ground mount",
    description:
      "Current Gen 3 Standard dish with kickstand base (non-actuated). Common fixed-site backup or primary WAN when paired with a third-party router.",
    images: [
      {
        src: productImagePath("starlink-standard-gen3", "Starlink"),
        fallbackSrc: "/products/starlink-standard.svg",
        alt: "Starlink Standard Gen 3",
        callouts: [
          { label: "Phase array panel", x: 50, y: 35 },
          { label: "Router / PoE", x: 35, y: 75 },
        ],
      },
    ],
    specs: {
      connectivity: {
        Service: "Starlink residential / business",
        Ethernet: "Via router or Ethernet adapter",
        "Wi‑Fi": "Gen 3 router (kit dependent)",
        Latency: "25–60 ms typical",
      },
      power: {
        "Typical draw": "75–100 W",
        Input: "100–240 V via PSU",
      },
      physical: {
        "Dish dimensions": "See starlink.com specs",
        Weight: "See starlink.com specs",
        "IP rating": "IP54 class (verify SKU)",
      },
      compliance: {
        Warranty: "1-year hardware",
        "Lead time": "Verify at order time",
      },
    },
    priceBand: "mid",
    priceUsd: 349,
    leadTime: "1–2 weeks",
    compatibilityTags: ["satellite-wan", "backup-link", "fixed-site"],
    worksWellWith: ["peplink-balance-1350-ec", "fortinet-fortigate-40f"],
    links: {
      docs: "https://www.starlink.com/specifications",
    },
  },
  {
    id: "starlink-performance-gen3",
    slug: "starlink-performance-gen3",
    sku: "SL-PERF-G3",
    vendor: "Starlink",
    name: "Starlink Performance (Gen 3)",
    category: "Business / high-throughput terminal",
    formFactor: "Flat panel",
    description:
      "Flagship flat high-throughput terminal for motion, marine, and harsh environments. Replaces Performance Gen 2 naming on starlink.com.",
    images: [
      {
        src: productImagePath("starlink-performance-gen3", "Starlink"),
        fallbackSrc: "/products/starlink-hp.svg",
        alt: "Starlink Performance Gen 3",
        callouts: [
          { label: "Flat panel array", x: 50, y: 40 },
          { label: "Extended temp / IP69K", x: 70, y: 65 },
        ],
      },
    ],
    specs: {
      connectivity: {
        Service: "Starlink business priority",
        Ethernet: "Performance router / adapter",
        Throughput: "Verify current plan caps",
      },
      power: {
        "Typical draw": "110–150 W",
      },
      physical: {
        Dimensions: "See starlink.com specs",
        "IP rating": "IP69K (Gen 3 — verify SKU)",
        "Operating temp": "Wider range vs Standard",
      },
      compliance: {
        Warranty: "1-year hardware",
      },
    },
    priceBand: "premium",
    priceUsd: 1999,
    leadTime: "2–4 weeks",
    compatibilityTags: ["satellite-wan", "high-availability", "harsh-env"],
    worksWellWith: ["peplink-balance-1350-ec", "fortinet-fortigate-71g"],
    links: {
      docs: "https://www.starlink.com/business",
    },
  },
  {
    id: "starlink-mini",
    slug: "starlink-mini",
    sku: "SL-MINI",
    vendor: "Starlink",
    name: "Starlink Mini",
    category: "Portable terminal",
    formFactor: "Portable",
    description:
      "Backpack-sized portable terminal for field teams, temporary sites, and lower-power deployments (~25–40 W).",
    images: [
      {
        src: productImagePath("starlink-mini", "Starlink"),
        fallbackSrc: "/products/starlink-mini.svg",
        alt: "Starlink Mini",
        callouts: [
          { label: "Integrated Wi‑Fi", x: 45, y: 35 },
          { label: "12 V DC input", x: 60, y: 70 },
        ],
      },
    ],
    specs: {
      connectivity: {
        Service: "Starlink roam / mobile",
        "Wi‑Fi": "Built-in",
        Ethernet: "USB-C adapter optional",
      },
      power: {
        Consumption: "25–40 W",
        Input: "100–240 V or 12 V",
      },
      physical: {
        Weight: "~2.9 lb (verify kit)",
        Dimensions: "See starlink.com specs",
      },
      compliance: {
        Warranty: "1-year hardware",
      },
    },
    priceBand: "mid",
    priceUsd: 199,
    leadTime: "1–2 weeks",
    compatibilityTags: ["portable", "mobile", "satellite-wan"],
    worksWellWith: ["peplink-max-br1-mini-5g", "peplink-b-one-plus"],
    links: {
      docs: "https://www.starlink.com/mini",
    },
  },
];
