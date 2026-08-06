import type { NextConfig } from "next";

const slugRedirects = [
  ["peplink-1350-ec", "peplink-balance-1350-ec"],
  ["peplink-br1-mini", "peplink-max-br1-mini-5g"],
  ["starlink-standard", "starlink-standard-gen3"],
  ["starlink-high-performance", "starlink-performance-gen3"],
  ["starlink-mini-kit", "starlink-mini"],
  ["fortigate-71g", "fortinet-fortigate-71g"],
  ["fortigate-40f", "fortinet-fortigate-40f"],
  ["fortiap-231f", "fortinet-fortiap-231f"],
] as const;

const nextConfig: NextConfig = {
  async redirects() {
    return slugRedirects.map(([from, to]) => ({
      source: `/products/${from}`,
      destination: `/products/${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
