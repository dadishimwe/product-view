import type { Product } from "@/types/product";

const peplinkCallouts = [
  { label: "Rugged metal chassis", x: 72, y: 18 },
  { label: "Dual WAN ports", x: 28, y: 55 },
  { label: "4× LAN ports", x: 38, y: 68 },
  { label: "USB WAN failover", x: 55, y: 78 },
];

export const products: Product[] = [
  {
    id: "peplink-1350-ec",
    slug: "peplink-1350-ec",
    sku: "PL-1350-EC",
    vendor: "Peplink",
    name: "Peplink 1350 EC",
    category: "SD-WAN Router",
    formFactor: "Desktop / rack ears",
    description:
      "Enterprise-class SD-WAN edge router with SpeedFusion bonding, dual modular WAN, and 4 Gbps firewall throughput for multi-site MSP deployments.",
    images: [
      {
        src: "/products/peplink-1350.svg",
        alt: "Peplink 1350 EC front view",
        callouts: peplinkCallouts,
      },
      {
        src: "/products/peplink-1350-rear.svg",
        alt: "Peplink 1350 EC rear view",
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
        "Cellular": "Optional MAX adapter",
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
    worksWellWith: ["starlink-high-performance", "fortigate-71g"],
    links: {
      datasheet:
        "https://www.peplink.com/products/peplink-1350-ec/",
      docs: "https://www.peplink.com/support/",
      firmware: "https://www.peplink.com/support/firmware/",
    },
  },
  {
    id: "peplink-b-one-plus",
    slug: "peplink-b-one-plus",
    sku: "PL-B1-PLUS",
    vendor: "Peplink",
    name: "Peplink B One Plus",
    category: "5G Router",
    formFactor: "Desktop",
    description:
      "Compact 5G FWA router with embedded cellular, Wi‑Fi 6, and SpeedFusion Connect for fixed and temporary MSP sites.",
    images: [
      {
        src: "/products/peplink-b-one.svg",
        alt: "Peplink B One Plus",
        callouts: [
          { label: "5G / LTE module", x: 50, y: 30 },
          { label: "2× GbE WAN/LAN", x: 40, y: 65 },
          { label: "Wi‑Fi 6 radios", x: 65, y: 45 },
        ],
      },
    ],
    specs: {
      connectivity: {
        Cellular: "5G / LTE Cat-20",
        "Ethernet": "2× GbE",
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
    worksWellWith: ["starlink-mini-kit", "fortigate-40f"],
    links: {
      datasheet: "https://www.peplink.com/products/b-one-plus/",
      docs: "https://www.peplink.com/support/",
    },
  },
  {
    id: "peplink-br1-mini",
    slug: "peplink-br1-mini",
    sku: "PL-BR1-MINI",
    vendor: "Peplink",
    name: "Peplink BR1 Mini",
    category: "Mobile Router",
    formFactor: "Compact",
    description:
      "Ultra-compact cellular router for vehicles, IoT, and remote monitoring with GPS and ignition sensing.",
    images: [
      {
        src: "/products/peplink-br1.svg",
        alt: "Peplink BR1 Mini",
        callouts: [
          { label: "Ignition sense", x: 30, y: 40 },
          { label: "Dual SIM", x: 55, y: 55 },
        ],
      },
    ],
    specs: {
      connectivity: {
        Cellular: "LTE Cat-6",
        "Ethernet": "1× GbE WAN/LAN",
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
      datasheet: "https://www.peplink.com/products/br1-mini/",
    },
  },
  {
    id: "starlink-standard",
    slug: "starlink-standard",
    sku: "SL-STD-ACTUATED",
    vendor: "Starlink",
    name: "Starlink Standard (actuated)",
    category: "Satellite Terminal",
    formFactor: "Roof / pole mount",
    description:
      "Standard Starlink kit with motorized actuated dish for fixed residential and small-business backup WAN.",
    images: [
      {
        src: "/products/starlink-standard.svg",
        alt: "Starlink Standard dish",
        callouts: [
          { label: "Motorized azimuth", x: 50, y: 25 },
          { label: "PoE to router", x: 35, y: 75 },
        ],
      },
    ],
    specs: {
      connectivity: {
        Service: "Starlink residential / business",
        "Ethernet": "Router: 2× GbE",
        "Wi‑Fi": "Wi‑Fi 6 router included",
        Latency: "25–60 ms typical",
      },
      power: {
        "Dish draw": "75–100 W",
        Input: "100–240 V via PSU",
      },
      physical: {
        "Dish dimensions": "23.4 × 15.07 in",
        Weight: "9.2 lb (dish)",
        "IP rating": "IP54",
      },
      compliance: {
        Warranty: "1-year hardware",
        "Lead time": "Ships in 1–2 weeks",
      },
    },
    priceBand: "mid",
    priceUsd: 599,
    leadTime: "1–2 weeks",
    compatibilityTags: ["satellite-wan", "backup-link", "fixed-site"],
    worksWellWith: ["peplink-1350-ec", "fortigate-40f"],
    links: {
      datasheet: "https://www.starlink.com/specifications",
      docs: "https://www.starlink.com/support",
    },
  },
  {
    id: "starlink-high-performance",
    slug: "starlink-high-performance",
    sku: "SL-HP-KIT",
    vendor: "Starlink",
    name: "Starlink High Performance",
    category: "Satellite Terminal",
    formFactor: "Flat high-performance",
    description:
      "High-performance flat-panel terminal for harsh environments and higher throughput MSP edge sites.",
    images: [
      {
        src: "/products/starlink-hp.svg",
        alt: "Starlink High Performance",
        callouts: [
          { label: "Flat panel array", x: 50, y: 40 },
          { label: "Extended temp range", x: 70, y: 65 },
        ],
      },
    ],
    specs: {
      connectivity: {
        Service: "Starlink business priority",
        "Ethernet": "High-performance router",
        Throughput: "Up to 220 Mbps down",
      },
      power: {
        "Typical draw": "110–150 W",
      },
      physical: {
        Dimensions: "20.2 × 22.6 in flat",
        "IP rating": "IP56",
        "Operating temp": "-22–122 °F",
      },
      compliance: {
        Warranty: "1-year hardware",
      },
    },
    priceBand: "premium",
    priceUsd: 2499,
    leadTime: "2–4 weeks",
    compatibilityTags: ["satellite-wan", "high-availability", "harsh-env"],
    worksWellWith: ["peplink-1350-ec", "fortigate-71g"],
    links: {
      docs: "https://www.starlink.com/business",
    },
  },
  {
    id: "starlink-mini-kit",
    slug: "starlink-mini-kit",
    sku: "SL-MINI",
    vendor: "Starlink",
    name: "Starlink Mini kit",
    category: "Portable Terminal",
    formFactor: "Portable",
    description:
      "Portable Starlink terminal for field teams, temporary sites, and failover testing with lower power draw.",
    images: [
      {
        src: "/products/starlink-mini.svg",
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
        "Ethernet": "USB-C adapter optional",
      },
      power: {
        Consumption: "25–40 W",
        Input: "100–240 V or 12 V",
      },
      physical: {
        Weight: "2.9 lb",
        Dimensions: "11.75 × 10.2 in",
      },
      compliance: {
        Warranty: "1-year hardware",
      },
    },
    priceBand: "mid",
    priceUsd: 599,
    leadTime: "1–2 weeks",
    compatibilityTags: ["portable", "mobile", "satellite-wan"],
    worksWellWith: ["peplink-br1-mini", "peplink-b-one-plus"],
    links: {
      docs: "https://www.starlink.com/mini",
    },
  },
  {
    id: "fortigate-71g",
    slug: "fortigate-71g",
    sku: "FG-71G",
    vendor: "Fortinet",
    name: "FortiGate 71G",
    category: "NGFW",
    formFactor: "Desktop",
    description:
      "Next-gen firewall with integrated storage and SD-WAN for branch offices requiring UTM and SSL inspection.",
    images: [
      {
        src: "/products/fortigate-71g.svg",
        alt: "FortiGate 71G",
        callouts: [
          { label: "NGFW ASIC", x: 55, y: 35 },
          { label: "8× GbE ports", x: 35, y: 62 },
        ],
      },
    ],
    specs: {
      connectivity: {
        "Ethernet": "8× GbE",
        Throughput: "10 Gbps firewall",
        "SSL inspection": "1.5 Gbps",
        "SD-WAN": "Supported",
      },
      power: {
        Input: "100–240 V AC",
        Consumption: "35 W",
      },
      physical: {
        Dimensions: '1.5" × 8.5" × 6.1"',
        Weight: "2.4 lb",
      },
      compliance: {
        Certifications: "FCC, ICSA",
        Warranty: "Limited lifetime hardware",
      },
    },
    priceBand: "premium",
    priceUsd: 1899,
    leadTime: "7–10 business days",
    compatibilityTags: ["ngfw", "utm", "sd-wan", "enterprise-branch"],
    worksWellWith: ["peplink-1350-ec", "starlink-high-performance"],
    links: {
      datasheet: "https://www.fortinet.com/products/next-generation-firewall",
      docs: "https://docs.fortinet.com/",
      firmware: "https://support.fortinet.com/Download/FirmwareImages.aspx",
    },
  },
  {
    id: "fortigate-40f",
    slug: "fortigate-40f",
    sku: "FG-40F",
    vendor: "Fortinet",
    name: "FortiGate 40F",
    category: "NGFW",
    formFactor: "Desktop",
    description:
      "Entry NGFW for small branch and retail with FortiGuard services and simplified MSP licensing.",
    images: [
      {
        src: "/products/fortigate-40f.svg",
        alt: "FortiGate 40F",
        callouts: [
          { label: "5× GbE ports", x: 42, y: 58 },
        ],
      },
    ],
    specs: {
      connectivity: {
        "Ethernet": "5× GbE",
        Throughput: "5 Gbps firewall",
        "Wi‑Fi": "Optional FWF model",
      },
      power: {
        Input: "100–240 V AC",
        Consumption: "18 W",
      },
      physical: {
        Dimensions: '1.5" × 7.5" × 5.3"',
        Weight: "1.9 lb",
      },
      compliance: {
        Warranty: "Limited lifetime hardware",
      },
    },
    priceBand: "mid",
    priceUsd: 649,
    leadTime: "5–7 business days",
    compatibilityTags: ["ngfw", "small-branch", "retail"],
    worksWellWith: ["starlink-standard", "peplink-b-one-plus"],
    links: {
      datasheet: "https://www.fortinet.com/products/next-generation-firewall/fortigate-40f",
      docs: "https://docs.fortinet.com/",
    },
  },
  {
    id: "fortiap-231f",
    slug: "fortiap-231f",
    sku: "FAP-231F",
    vendor: "Fortinet",
    name: "FortiAP 231F",
    category: "Access Point",
    formFactor: "Ceiling mount",
    description:
      "Wi‑Fi 6 indoor AP with integrated BLE for FortiGate-managed wireless at branch sites.",
    images: [
      {
        src: "/products/fortiap-231f.svg",
        alt: "FortiAP 231F",
        callouts: [
          { label: "Wi‑Fi 6 4×4", x: 50, y: 45 },
          { label: "BLE radio", x: 65, y: 55 },
        ],
      },
    ],
    specs: {
      connectivity: {
        "Wi‑Fi": "802.11ax dual-band",
        "Ethernet": "1× 2.5 GbE uplink",
        "Client capacity": "512 clients",
      },
      power: {
        "PoE required": "802.3at (30 W)",
      },
      physical: {
        Dimensions: "8.27 in diameter",
        Mounting: "Ceiling / wall",
      },
      compliance: {
        Warranty: "Limited lifetime",
        Certifications: "FCC, Wi‑Fi 6 certified",
      },
    },
    priceBand: "mid",
    priceUsd: 495,
    leadTime: "In stock",
    compatibilityTags: ["wifi6", "fortigate-managed", "branch-wifi"],
    worksWellWith: ["fortigate-71g", "fortigate-40f"],
    links: {
      datasheet: "https://www.fortinet.com/products/wlan-access-points",
      docs: "https://docs.fortinet.com/",
    },
  },
];

export const vendors = [...new Set(products.map((p) => p.vendor))].sort();
