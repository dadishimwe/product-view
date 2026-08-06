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

export interface ProductImage {
  src: string;
  alt: string;
  callouts?: ProductCallout[];
}

export interface ProductLinks {
  datasheet?: string;
  docs?: string;
  firmware?: string;
}

export interface Product {
  id: string;
  slug: string;
  sku: string;
  vendor: string;
  name: string;
  category: string;
  formFactor: string;
  description: string;
  images: ProductImage[];
  specs: Record<SpecGroup, Record<string, string>>;
  priceBand: "budget" | "mid" | "premium";
  priceUsd: number;
  leadTime: string;
  compatibilityTags: string[];
  worksWellWith: string[];
  links: ProductLinks;
}

export interface ProductStack {
  id: string;
  name: string;
  description: string;
  productSlugs: string[];
}
