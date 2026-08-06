import type { Product } from "@/types/product";
import { productImagePath } from "@/lib/product-images";

export const fortinetProducts: Product[] = [
  {
    id: "fortinet-fortigate-71g",
    slug: "fortinet-fortigate-71g",
    sku: "FG-71G",
    vendor: "Fortinet",
    name: "FortiGate 71G",
    category: "Firewalls — FortiGate (branch)",
    formFactor: "Desktop",
    description:
      "Branch NGFW with SD-WAN, SSL inspection, and FortiGuard services for MSP-managed security stacks.",
    images: [
      {
        src: productImagePath("fortinet-fortigate-71g", "Fortinet"),
        fallbackSrc: "/products/fortigate-71g.svg",
        alt: "FortiGate 71G",
        ports: [
          { label: "WAN", x: 30, y: 60, detail: "GbE WAN / DMZ (verify port map)" },
          { label: "LAN", x: 45, y: 62, detail: "GbE LAN switch ports" },
        ],
      },
    ],
    deployment: { powerWattsMax: 35, rackUnits: 1, inputVoltage: "100–240 V AC" },
    specs: {
      connectivity: {
        Ethernet: "8× GbE",
        Throughput: "Verify FG-71G datasheet",
        "SSL inspection": "Verify FG-71G datasheet",
        "SD-WAN": "Supported",
      },
      power: {
        Input: "100–240 V AC",
        Consumption: "Verify datasheet",
      },
      physical: {
        Dimensions: '1.5" × 8.5" × 6.1" (approx.)',
        Weight: "Verify datasheet",
      },
      compliance: {
        Certifications: "FCC, ICSA (verify)",
        Warranty: "Limited lifetime hardware",
      },
    },
    compatibilityTags: ["ngfw", "utm", "sd-wan", "enterprise-branch"],
    worksWellWith: ["peplink-balance-1350-ec", "starlink-v3-high-performance"],
    links: {
      datasheet: "https://www.fortinet.com/products/next-generation-firewall",
      docs: "https://docs.fortinet.com/",
      firmware: "https://support.fortinet.com/Download/FirmwareImages.aspx",
    },
  },
  {
    id: "fortinet-fortigate-40f",
    slug: "fortinet-fortigate-40f",
    sku: "FG-40F",
    vendor: "Fortinet",
    name: "FortiGate 40F",
    category: "Firewalls — FortiGate (branch)",
    formFactor: "Desktop",
    description:
      "Entry NGFW for small branch and retail with FortiGuard services and simplified MSP licensing.",
    images: [
      {
        src: productImagePath("fortinet-fortigate-40f", "Fortinet"),
        fallbackSrc: "/products/fortigate-40f.svg",
        alt: "FortiGate 40F",
      },
    ],
    specs: {
      connectivity: {
        Ethernet: "5× GbE",
        Throughput: "Verify FG-40F datasheet",
        "Wi‑Fi": "Optional FortiWiFi SKU",
      },
      power: {
        Input: "100–240 V AC",
        Consumption: "Verify datasheet",
      },
      physical: {
        Dimensions: '1.5" × 7.5" × 5.3" (approx.)',
        Weight: "Verify datasheet",
      },
      compliance: {
        Warranty: "Limited lifetime hardware",
      },
    },
    compatibilityTags: ["ngfw", "small-branch", "retail"],
    worksWellWith: ["starlink-standard-gen3", "peplink-b-one-plus"],
    links: {
      datasheet:
        "https://www.fortinet.com/products/next-generation-firewall/fortigate-40f",
      docs: "https://docs.fortinet.com/",
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
      "Wi‑Fi 6 indoor AP with integrated BLE for FortiGate-managed wireless at branch sites.",
    images: [
      {
        src: productImagePath("fortinet-fortiap-231f", "Fortinet"),
        fallbackSrc: "/products/fortiap-231f.svg",
        alt: "FortiAP 231F",
      },
    ],
    specs: {
      connectivity: {
        "Wi‑Fi": "802.11ax dual-band 2×2",
        Ethernet: "1× 2.5 GbE uplink",
        "Client capacity": "Verify datasheet",
      },
      power: {
        "PoE required": "802.3at (30 W)",
      },
      physical: {
        Dimensions: "8.27 in diameter (approx.)",
        Mounting: "Ceiling / wall",
      },
      compliance: {
        Warranty: "Limited lifetime",
        Certifications: "Wi‑Fi 6 certified (verify)",
      },
    },
    compatibilityTags: ["wifi6", "fortigate-managed", "branch-wifi"],
    worksWellWith: ["fortinet-fortigate-71g", "fortinet-fortigate-40f"],
    links: {
      datasheet: "https://www.fortinet.com/products/wlan-access-points",
      docs: "https://docs.fortinet.com/",
    },
  },
];
