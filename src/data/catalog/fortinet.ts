import type { Product } from "@/types/product";

const img = (filename: string) => `/products/fortinet/${filename}`;

const fortinetDocs = {
  docs: "https://docs.fortinet.com/",
  firmware: "https://support.fortinet.com/Download/FirmwareImages.aspx",
} as const;

export const fortinetProducts: Product[] = [
  {
    id: "fortinet-fortigate-40f",
    slug: "fortinet-fortigate-40f",
    sku: "FG-40F",
    vendor: "Fortinet",
    name: "FortiGate 40F",
    category: "Firewalls — FortiGate (branch)",
    formFactor: "Desktop",
    description:
      "Entry NGFW for small branch, retail, and home-office backhaul. FortiGuard UTM, SD-WAN, and optional FortiWiFi SKU for integrated wireless.",
    images: [{ src: img("fortinet-40f.jpg"), alt: "FortiGate 40F" }],
    deployment: { powerWattsMax: 15, rackUnits: 0, inputVoltage: "100–240 V AC" },
    specs: {
      connectivity: {
        Ethernet: "5× GbE (WAN/LAN)",
        Throughput: "See FG-40F datasheet (NGFW / threat)",
        "SD-WAN": "Supported",
        "Wi‑Fi": "Optional FortiWiFi-40F",
      },
      power: { Input: "100–240 V AC", Consumption: "See datasheet" },
      physical: {
        Dimensions: '1.5" × 7.5" × 5.3" (approx.)',
        Mounting: "Desktop",
      },
      compliance: { Warranty: "Limited lifetime hardware" },
    },
    compatibilityTags: ["ngfw", "small-branch", "retail", "sd-wan"],
    worksWellWith: ["starlink-standard-gen3", "peplink-b-one-plus", "fortinet-fortiap-231f"],
    links: {
      datasheet:
        "https://www.fortinet.com/products/next-generation-firewall/fortigate-40f",
      ...fortinetDocs,
    },
  },
  {
    id: "fortinet-fortigate-60f",
    slug: "fortinet-fortigate-60f",
    sku: "FG-60F",
    vendor: "Fortinet",
    name: "FortiGate 60F",
    category: "Firewalls — FortiGate (branch)",
    formFactor: "Desktop",
    description:
      "Mid-size branch NGFW with higher throughput than the 40F series. Common MSP choice for sites with more users and SSL inspection headroom.",
    images: [{ src: img("fortinet-60f.png"), alt: "FortiGate 60F" }],
    deployment: { powerWattsMax: 20, rackUnits: 0, inputVoltage: "100–240 V AC" },
    specs: {
      connectivity: {
        Ethernet: "10× GbE (incl. WAN/LAN)",
        Throughput: "See FG-60F datasheet",
        "SD-WAN": "Supported",
      },
      power: { Input: "100–240 V AC", Consumption: "See datasheet" },
      physical: { Mounting: "Desktop / wall" },
      compliance: { Warranty: "Limited lifetime hardware" },
    },
    compatibilityTags: ["ngfw", "branch", "sd-wan"],
    worksWellWith: ["starlink-standard-gen3", "peplink-balance-310", "fortinet-fortiap-231f"],
    links: {
      datasheet:
        "https://www.fortinet.com/products/next-generation-firewall/fortigate-60f",
      ...fortinetDocs,
    },
  },
  {
    id: "fortinet-fortigate-71g",
    slug: "fortinet-fortigate-71g",
    sku: "FG-71G",
    vendor: "Fortinet",
    name: "FortiGate 71G",
    category: "Firewalls — FortiGate (branch)",
    formFactor: "Desktop",
    description:
      "Branch NGFW with SD-WAN, SSL inspection, and FortiGuard services. Fits regional offices and MSP-managed security stacks with dual-WAN upstream.",
    images: [
      {
        src: img("fortinet-70G.webp"),
        alt: "FortiGate 71G",
        ports: [
          { label: "WAN", x: 28, y: 58, detail: "GbE WAN (verify port map)" },
          { label: "LAN", x: 48, y: 62, detail: "GbE LAN switch ports" },
        ],
      },
    ],
    deployment: { powerWattsMax: 35, rackUnits: 0, inputVoltage: "100–240 V AC" },
    specs: {
      connectivity: {
        Ethernet: "8× GbE",
        Throughput: "See FG-71G datasheet",
        "SSL inspection": "See FG-71G datasheet",
        "SD-WAN": "Supported",
      },
      power: { Input: "100–240 V AC", Consumption: "See datasheet" },
      physical: {
        Dimensions: '1.5" × 8.5" × 6.1" (approx.)',
        Mounting: "Desktop",
      },
      compliance: { Warranty: "Limited lifetime hardware" },
    },
    compatibilityTags: ["ngfw", "utm", "sd-wan", "enterprise-branch"],
    worksWellWith: ["peplink-balance-1350-ec", "starlink-v3-high-performance", "fortinet-fortiap-231f"],
    links: {
      datasheet:
        "https://www.fortinet.com/products/next-generation-firewall/fortigate-70g",
      ...fortinetDocs,
    },
  },
  {
    id: "fortinet-fortigate-100f",
    slug: "fortinet-fortigate-100f",
    sku: "FG-100F",
    vendor: "Fortinet",
    name: "FortiGate 100F",
    category: "Firewalls — FortiGate (branch)",
    formFactor: "Desktop",
    description:
      "Higher-capacity branch firewall for sites needing more NGFW throughput, VPN tunnels, and session scale than 60F-class models.",
    images: [{ src: img("fortinet-100f.jpg"), alt: "FortiGate 100F" }],
    deployment: { powerWattsMax: 40, rackUnits: 0, inputVoltage: "100–240 V AC" },
    specs: {
      connectivity: {
        Ethernet: "18× GbE (model variant)",
        Throughput: "See FG-100F datasheet",
        "SD-WAN": "Supported",
      },
      power: { Input: "100–240 V AC", Consumption: "See datasheet" },
      physical: { Mounting: "Desktop / rack ears optional" },
      compliance: { Warranty: "Limited lifetime hardware" },
    },
    compatibilityTags: ["ngfw", "branch", "sd-wan", "vpn"],
    worksWellWith: ["peplink-balance-1350-ec", "starlink-v3-high-performance"],
    links: {
      datasheet:
        "https://www.fortinet.com/products/next-generation-firewall/fortigate-100f",
      ...fortinetDocs,
    },
  },
  {
    id: "fortinet-fortigate-400f",
    slug: "fortinet-fortigate-400f",
    sku: "FG-400F",
    vendor: "Fortinet",
    name: "FortiGate 400F",
    category: "Firewalls — FortiGate (mid-range)",
    formFactor: "Rack 1U",
    description:
      "1U mid-range NGFW for larger branches and edge datacenter use. Higher throughput and port density for consolidated security stacks.",
    images: [{ src: img("fortinet-400f.jpg"), alt: "FortiGate 400F" }],
    deployment: { powerWattsMax: 120, rackUnits: 1, inputVoltage: "100–240 V AC" },
    specs: {
      connectivity: {
        Ethernet: "Multiple GbE / SFP+ (variant)",
        Throughput: "See FG-400F datasheet",
        "SD-WAN": "Supported",
      },
      power: { Input: "100–240 V AC", Consumption: "See datasheet" },
      physical: { Mounting: "Rack 1U" },
      compliance: { Warranty: "Limited lifetime hardware" },
    },
    compatibilityTags: ["ngfw", "mid-range", "sd-wan", "datacenter-edge"],
    worksWellWith: ["peplink-balance-2500-ec", "starlink-enterprise"],
    links: {
      datasheet:
        "https://www.fortinet.com/products/next-generation-firewall/fortigate-400f",
      ...fortinetDocs,
    },
  },
  {
    id: "fortinet-fortigate-1000f",
    slug: "fortinet-fortigate-1000f",
    sku: "FG-1000F",
    vendor: "Fortinet",
    name: "FortiGate 1000F",
    category: "Firewalls — FortiGate (high-end)",
    formFactor: "Rack 1U",
    description:
      "High-performance 1U NGFW for enterprise edge and MSP-hosted security services requiring strong SSL inspection and session capacity.",
    images: [{ src: img("fortinet-1000f.webp"), alt: "FortiGate 1000F" }],
    deployment: { powerWattsMax: 200, rackUnits: 1, inputVoltage: "100–240 V AC" },
    specs: {
      connectivity: {
        Ethernet: "High-density GbE / 10G (variant)",
        Throughput: "See FG-1000F datasheet",
        "SD-WAN": "Supported",
      },
      power: { Input: "100–240 V AC", Consumption: "See datasheet" },
      physical: { Mounting: "Rack 1U" },
      compliance: { Warranty: "Limited lifetime hardware" },
    },
    compatibilityTags: ["ngfw", "enterprise", "sd-wan", "high-throughput"],
    worksWellWith: ["peplink-balance-5000-ec", "starlink-enterprise"],
    links: {
      datasheet:
        "https://www.fortinet.com/products/next-generation-firewall/fortigate-1000f",
      ...fortinetDocs,
    },
  },
  {
    id: "fortinet-fortigate-2000f",
    slug: "fortinet-fortigate-2000f",
    sku: "FG-2000F",
    vendor: "Fortinet",
    name: "FortiGate 2000F",
    category: "Firewalls — FortiGate (high-end)",
    formFactor: "Rack 2U",
    description:
      "2U datacenter-class NGFW for high-throughput campuses and service-provider edge. Pair with SD-WAN routers for resilient WAN.",
    images: [{ src: img("fortinet-2000f.png"), alt: "FortiGate 2000F" }],
    deployment: { powerWattsMax: 350, rackUnits: 2, inputVoltage: "100–240 V AC" },
    specs: {
      connectivity: {
        Ethernet: "Multiple 10G / GbE (variant)",
        Throughput: "See FG-2000F datasheet",
        "SD-WAN": "Supported",
      },
      power: { Input: "100–240 V AC", Consumption: "See datasheet" },
      physical: { Mounting: "Rack 2U" },
      compliance: { Warranty: "Limited lifetime hardware" },
    },
    compatibilityTags: ["ngfw", "datacenter", "high-throughput", "sd-wan"],
    worksWellWith: ["peplink-balance-5000-ec"],
    links: {
      datasheet:
        "https://www.fortinet.com/products/next-generation-firewall/fortigate-2000f",
      ...fortinetDocs,
    },
  },
  {
    id: "fortinet-fortiap-231f",
    slug: "fortinet-fortiap-231f",
    sku: "FAP-231F",
    vendor: "Fortinet",
    name: "FortiAP 231F",
    category: "Access Points — FortiAP (Wi‑Fi 6)",
    formFactor: "Ceiling mount",
    description:
      "Indoor Wi‑Fi 6 access point with integrated BLE. Managed by FortiGate or FortiLAN Cloud for branch wireless.",
    images: [{ src: img("fortiap-231f.jpg"), alt: "FortiAP 231F" }],
    deployment: { powerWattsMax: 30, rackUnits: 0, inputVoltage: "802.3at PoE" },
    specs: {
      connectivity: {
        "Wi‑Fi": "802.11ax dual-band 2×2",
        Ethernet: "1× 2.5 GbE uplink",
        Management: "FortiGate / FortiLAN Cloud",
      },
      power: { "PoE required": "802.3at (30 W)" },
      physical: {
        Dimensions: "8.27 in diameter (approx.)",
        Mounting: "Ceiling / wall",
      },
      compliance: { Warranty: "Limited lifetime" },
    },
    compatibilityTags: ["wifi6", "fortigate-managed", "branch-wifi"],
    worksWellWith: ["fortinet-fortigate-71g", "fortinet-fortigate-60f", "fortinet-fortigate-40f"],
    links: {
      datasheet:
        "https://www.fortinet.com/products/wlan-access-points/fortiap-231f",
      ...fortinetDocs,
    },
  },
  {
    id: "fortinet-fortiap-431f",
    slug: "fortinet-fortiap-431f",
    sku: "FAP-431F",
    vendor: "Fortinet",
    name: "FortiAP 431F",
    category: "Access Points — FortiAP (Wi‑Fi 6 outdoor)",
    formFactor: "Outdoor",
    description:
      "Outdoor-rated Wi‑Fi 6 access point for patio, warehouse, and campus coverage. FortiGate-managed with rugged enclosure.",
    images: [{ src: img("fortiap-431f.jpg"), alt: "FortiAP 431F" }],
    deployment: { powerWattsMax: 30, rackUnits: 0, inputVoltage: "802.3at PoE" },
    specs: {
      connectivity: {
        "Wi‑Fi": "802.11ax dual-band (outdoor)",
        Ethernet: "1× 2.5 GbE uplink",
        Management: "FortiGate / FortiLAN Cloud",
      },
      power: { "PoE required": "802.3at (30 W)" },
      physical: { Mounting: "Wall / pole (outdoor)", Enclosure: "IP67-rated (verify)" },
      compliance: { Warranty: "Limited lifetime" },
    },
    compatibilityTags: ["wifi6", "outdoor", "fortigate-managed"],
    worksWellWith: ["fortinet-fortigate-100f", "fortinet-fortigate-400f"],
    links: {
      datasheet:
        "https://www.fortinet.com/products/wlan-access-points/fortiap-431f",
      ...fortinetDocs,
    },
  },
];
