import type { Product } from "@/types/product";

/** Images you place under public/products/starlink/ — filename must match exactly. */
const img = (filename: string) => `/products/starlink/${filename}`;

export const starlinkProducts: Product[] = [
  {
    id: "starlink-mini-kit",
    slug: "starlink-mini-kit",
    sku: "SL-MINI",
    vendor: "Starlink",
    name: "Starlink Mini",
    category: "Portable terminal",
    formFactor: "Portable",
    description:
      "Backpack-sized portable kit for field teams and temporary sites. Lower power draw (~25–40 W) with built-in Wi‑Fi; Ethernet via optional USB-C adapter.",
    images: [
      {
        src: img("starlink-mini-kit.png"),
        alt: "Starlink Mini kit",
        ports: [
          { label: "DC in", x: 55, y: 72, detail: "100–240 V or 12 V DC" },
          { label: "Wi‑Fi", x: 48, y: 35, detail: "Integrated dual-band Wi‑Fi" },
        ],
      },
    ],
    deployment: { powerWattsMax: 40, rackUnits: 0, inputVoltage: "100–240 V / 12 V DC" },
    specs: {
      connectivity: {
        Service: "Starlink roam / mobile",
        "Wi‑Fi": "Built-in",
        Ethernet: "USB-C adapter (optional)",
      },
      power: {
        Consumption: "25–40 W typical",
        Input: "100–240 V or 12 V",
      },
      physical: {
        Weight: "~2.9 lb (kit dependent)",
        Dimensions: "See starlink.com specs",
      },
      compliance: {
        Warranty: "1-year hardware",
      },
    },
    compatibilityTags: ["portable", "mobile", "satellite-wan"],
    worksWellWith: ["peplink-max-br1-mini-5g", "peplink-b-one-plus"],
    links: { docs: "https://www.starlink.com/mini" },
  },
  {
    id: "starlink-standard-gen3",
    slug: "starlink-standard-gen3",
    sku: "SL-STD-G3",
    vendor: "Starlink",
    name: "Starlink Standard (Gen 3)",
    category: "Residential / prosumer terminal",
    formFactor: "Roof / ground mount",
    description:
      "Current Gen 3 Standard dish with kickstand base (non-actuated). Fixed residential or small-business sites; pair with Peplink/Fortinet for managed WAN.",
    images: [
      {
        src: img("starlink-standard-gen3.png"),
        fallbackSrc: "/products/starlink-standard.svg",
        alt: "Starlink Standard Gen 3",
      },
    ],
    specs: {
      connectivity: {
        Service: "Starlink residential / business",
        Ethernet: "Via Gen 3 router or Ethernet adapter",
        "Wi‑Fi": "Gen 3 router (kit dependent)",
        Latency: "25–60 ms typical",
      },
      power: {
        "Typical draw": "75–100 W",
        Input: "100–240 V via PSU",
      },
      physical: {
        "IP rating": "IP54 class (verify SKU)",
        Dimensions: "See starlink.com specs",
      },
      compliance: {
        Warranty: "1-year hardware",
        "Lead time": "Verify at order time",
      },
    },
    compatibilityTags: ["satellite-wan", "backup-link", "fixed-site"],
    worksWellWith: ["peplink-balance-1350-ec", "fortinet-fortigate-40f"],
    links: { docs: "https://www.starlink.com/specifications" },
  },
  {
    id: "starlink-standard-actuated",
    slug: "starlink-standard-actuated",
    sku: "SL-STD-ACT",
    vendor: "Starlink",
    name: "Starlink Standard Actuated",
    category: "Legacy residential terminal",
    formFactor: "Roof / ground mount",
    description:
      "Motorized self-orienting Standard dish (legacy SKU; new sales largely replaced by Gen 3 Standard). Still common in the field for MSP refreshes and support.",
    images: [
      {
        src: img("starlink-standard-actuated.png"),
        alt: "Starlink Standard Actuated",
      },
    ],
    specs: {
      connectivity: {
        Service: "Starlink residential / business",
        Ethernet: "Via bundled router",
        "Wi‑Fi": "Router included (generation varies)",
      },
      power: {
        "Typical draw": "75–100 W",
        Input: "100–240 V via PSU",
      },
      physical: {
        Mounting: "Motorized dish + base",
        "IP rating": "IP54 (verify revision)",
      },
      compliance: {
        Warranty: "Support per Starlink policy",
        Note: "Legacy — verify before new deploys",
      },
    },
    compatibilityTags: ["satellite-wan", "legacy", "fixed-site"],
    worksWellWith: ["peplink-b-one-plus", "fortinet-fortigate-40f"],
    links: { docs: "https://www.starlink.com/support" },
  },
  {
    id: "starlink-flat-high-performance",
    slug: "starlink-flat-high-performance",
    sku: "SL-FHP-G2",
    vendor: "Starlink",
    name: "Starlink Performance (Gen 2)",
    category: "Business / high-throughput terminal",
    formFactor: "Flat panel",
    description:
      'Formerly marketed as "Flat High Performance" — wedge-shaped panel for motion, marine, and enterprise edge. Superseded on starlink.com by Performance Gen 3 but still deployed widely.',
    images: [
      {
        src: img("starlink-flat-high-performance.png"),
        alt: "Starlink Flat High Performance (Performance Gen 2)",
      },
    ],
    specs: {
      connectivity: {
        Service: "Starlink business priority",
        Ethernet: "Performance router / adapter",
        Throughput: "Plan dependent",
      },
      power: {
        "Typical draw": "110–150 W",
      },
      physical: {
        "IP rating": "IP56 (Gen 2 — verify)",
        Dimensions: "See starlink.com specs",
      },
      compliance: {
        Warranty: "1-year hardware",
      },
    },
    compatibilityTags: ["satellite-wan", "high-availability", "marine", "harsh-env"],
    worksWellWith: ["peplink-balance-1350-ec", "fortinet-fortigate-71g"],
    links: { docs: "https://www.starlink.com/business" },
  },
  {
    id: "starlink-v3-high-performance",
    slug: "starlink-v3-high-performance",
    sku: "SL-PERF-G3",
    vendor: "Starlink",
    name: "Starlink Performance (Gen 3)",
    category: "Business / high-throughput terminal",
    formFactor: "Flat panel",
    description:
      "Current flagship Performance terminal — wider temperature range and IP69K-class durability vs Gen 2. Primary satellite WAN for harsh and high-availability MSP sites.",
    images: [
      {
        src: img("starlink-v3-high-performance.png"),
        alt: "Starlink Performance Gen 3",
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
        "IP rating": "IP69K (verify SKU)",
        "Operating temp": "Wider vs Standard",
      },
      compliance: {
        Warranty: "1-year hardware",
      },
    },
    compatibilityTags: ["satellite-wan", "high-availability", "harsh-env"],
    worksWellWith: ["peplink-balance-1350-ec", "fortinet-fortigate-71g"],
    links: { docs: "https://www.starlink.com/business" },
  },
  {
    id: "starlink-enterprise",
    slug: "starlink-enterprise",
    sku: "SL-ENT",
    vendor: "Starlink",
    name: "Starlink Enterprise",
    category: "Business fixed terminal",
    formFactor: "Pole / roof mount",
    description:
      "Business-grade Standard-class terminal with pole mount and long cable run; ships without bundled Wi‑Fi router — intended for third-party routers (Peplink, Fortinet, etc.).",
    images: [
      {
        src: img("starlink-enterprise.png"),
        alt: "Starlink Enterprise",
      },
    ],
    specs: {
      connectivity: {
        Service: "Starlink business",
        Ethernet: "Direct to customer router",
        "Wi‑Fi": "None (BYO router)",
      },
      power: {
        "Typical draw": "Similar to Standard class",
        Input: "100–240 V via PSU",
      },
      physical: {
        Mounting: "Pole mount included",
        Cable: "Up to 50 m (kit dependent)",
      },
      compliance: {
        Warranty: "1-year hardware",
      },
    },
    compatibilityTags: ["satellite-wan", "enterprise", "byo-router"],
    worksWellWith: ["peplink-balance-1350-ec", "fortinet-fortigate-71g"],
    links: { docs: "https://www.starlink.com/business" },
  },
];
