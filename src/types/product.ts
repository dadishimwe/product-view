export type VendorFolder = "peplink" | "starlink" | "fortinet";

export type SpecGroup =
  | "connectivity"
  | "power"
  | "physical"
  | "compliance";

export const SPEC_GROUP_LABELS: Record<SpecGroup, string> = {
  connectivity: "Connectivity",
  power: "Power",
  physical: "Physical",
  compliance: "Compliance & Warranty",
};

export interface ProductCallout {
  label: string;
  x: number;
  y: number;
}

export interface ProductPort {
  label: string;
  x: number;
  y: number;
  detail: string;
}

export interface ProductImage {
  /** PNG/WebP with alpha — see src/data/CATALOG.md */
  src: string;
  /** Shown if src is missing (legacy SVG, etc.) */
  fallbackSrc?: string;
  alt: string;
  callouts?: ProductCallout[];
  ports?: ProductPort[];
}

export interface ProductDeployment {
  powerWattsMax?: number;
  rackUnits?: number;
  inputVoltage?: string;
}

export interface Product {
  id: string;
  /** URL segment: /products/[slug] — stable once published; lowercase, hyphenated */
  slug: string;
  /** Vendor part number or your internal SKU for search/pricing */
  sku: string;
  vendor: string;
  /** Display title — use vendor’s official model name (e.g. Balance 1350 EC) */
  name: string;
  /** Left-nav / filter grouping — match how the vendor organizes the line */
  category: string;
  formFactor: string;
  description: string;
  images: ProductImage[];
  /** Datasheet-style specs — four fixed groups; keys are row labels, values are plain text */
  specs: Record<SpecGroup, Record<string, string>>;
  /** Optional sizing fields for BOM / rollup (fill from datasheet) */
  deployment?: ProductDeployment;
  compatibilityTags: string[];
  worksWellWith: string[];
  links: ProductLinks;
}

export interface ProductLinks {
  datasheet?: string;
  docs?: string;
  firmware?: string;
}

export interface ProductStack {
  id: string;
  name: string;
  description: string;
  productSlugs: string[];
}
