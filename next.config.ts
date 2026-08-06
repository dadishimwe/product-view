import type { NextConfig } from "next";

const slugRedirects = [
  ["peplink-1350-ec", "peplink-balance-1350-ec"],
  ["peplink-br1-mini", "peplink-max-br1-mini-5g"],
  ["starlink-standard", "starlink-standard-gen3"],
  ["starlink-high-performance", "starlink-v3-high-performance"],
  ["starlink-performance-gen3", "starlink-v3-high-performance"],
  ["starlink-mini", "starlink-mini-kit"],
  ["fortigate-71g", "fortinet-fortigate-71g"],
  ["fortigate-40f", "fortinet-fortigate-40f"],
  ["fortigate-60f", "fortinet-fortigate-60f"],
  ["fortigate-100f", "fortinet-fortigate-100f"],
  ["fortigate-400f", "fortinet-fortigate-400f"],
  ["fortigate-1000f", "fortinet-fortigate-1000f"],
  ["fortigate-2000f", "fortinet-fortigate-2000f"],
  ["fortiap-231f", "fortinet-fortiap-231f"],
  ["fortiap-431f", "fortinet-fortiap-431f"],
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
