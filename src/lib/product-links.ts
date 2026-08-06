import type { Product } from "@/types/product";

const STARLINK_DATASHEET: Record<string, string> = {
  "starlink-mini-kit": "https://www.starlink.com/mini",
  "starlink-standard-gen3": "https://www.starlink.com/specifications",
  "starlink-standard-actuated": "https://www.starlink.com/specifications",
  "starlink-flat-high-performance": "https://www.starlink.com/business",
  "starlink-v3-high-performance": "https://www.starlink.com/business",
  "starlink-enterprise": "https://www.starlink.com/business",
};

const FORTINET_DATASHEET: Record<string, string> = {
  "fortinet-fortigate-40f":
    "https://www.fortinet.com/products/next-generation-firewall/fortigate-40f",
  "fortinet-fortigate-60f":
    "https://www.fortinet.com/products/next-generation-firewall/fortigate-60f",
  "fortinet-fortigate-71g":
    "https://www.fortinet.com/products/next-generation-firewall/fortigate-70g",
  "fortinet-fortigate-100f":
    "https://www.fortinet.com/products/next-generation-firewall/fortigate-100f",
  "fortinet-fortigate-400f":
    "https://www.fortinet.com/products/next-generation-firewall/fortigate-400f",
  "fortinet-fortigate-1000f":
    "https://www.fortinet.com/products/next-generation-firewall/fortigate-1000f",
  "fortinet-fortigate-2000f":
    "https://www.fortinet.com/products/next-generation-firewall/fortigate-2000f",
  "fortinet-fortiap-231f":
    "https://www.fortinet.com/products/wlan-access-points/fortiap-231f",
  "fortinet-fortiap-431f":
    "https://www.fortinet.com/products/wlan-access-points/fortiap-431f",
};

function peplinkProductUrl(slug: string) {
  const path = slug.replace(/^peplink-/, "");
  return `https://www.peplink.com/products/${path}/`;
}

function resolveDatasheet(product: Product): string | undefined {
  switch (product.vendor) {
    case "Peplink":
      return peplinkProductUrl(product.slug);
    case "Starlink":
      return STARLINK_DATASHEET[product.slug];
    case "Fortinet":
      return FORTINET_DATASHEET[product.slug];
    default:
      return undefined;
  }
}

/** Official vendor product / datasheet page for UI and exports. */
export function officialDatasheetUrl(product: Product): string | undefined {
  const explicit = product.links.datasheet?.trim();
  if (explicit) return explicit;
  return resolveDatasheet(product);
}

export function enrichProductLinks(product: Product): Product {
  if (product.links.datasheet?.trim()) return product;
  const datasheet = resolveDatasheet(product);
  if (!datasheet) return product;
  return {
    ...product,
    links: { ...product.links, datasheet },
  };
}

/** Absolute URL for static assets (print/PDF). */
export function absolutePublicUrl(path: string, origin?: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base =
    origin ??
    (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function productImageUrl(product: Product, origin?: string): string {
  const img = product.images[0];
  return absolutePublicUrl(img.src, origin);
}

export function productImageFallbackUrl(
  product: Product,
  origin?: string,
): string | undefined {
  const fb = product.images[0]?.fallbackSrc;
  return fb ? absolutePublicUrl(fb, origin) : undefined;
}
