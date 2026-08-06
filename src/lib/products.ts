import { products } from "@/data/products";
import type { Product } from "@/types/product";

export function getAllProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsBySlugs(slugs: string[]): Product[] {
  const set = new Set(slugs);
  return products.filter((p) => set.has(p.slug));
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.slug.includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.vendor.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q),
  );
}

export type ProductFilters = {
  category?: string;
  formFactor?: string;
  priceBand?: string;
  vendor?: string;
  query?: string;
};

export function filterProducts(filters: ProductFilters): Product[] {
  let list = filters.query ? searchProducts(filters.query) : products;
  if (filters.category) {
    list = list.filter((p) => p.category === filters.category);
  }
  if (filters.formFactor) {
    list = list.filter((p) => p.formFactor === filters.formFactor);
  }
  if (filters.priceBand) {
    list = list.filter((p) => p.priceBand === filters.priceBand);
  }
  if (filters.vendor) {
    list = list.filter((p) => p.vendor === filters.vendor);
  }
  return list;
}

export function getFilterOptions() {
  const categories = [...new Set(products.map((p) => p.category))].sort();
  const formFactors = [...new Set(products.map((p) => p.formFactor))].sort();
  const priceBands = [...new Set(products.map((p) => p.priceBand))].sort();
  return { categories, formFactors, priceBands };
}

export function groupByVendor(list: Product[]): Map<string, Product[]> {
  const map = new Map<string, Product[]>();
  for (const p of list) {
    const arr = map.get(p.vendor) ?? [];
    arr.push(p);
    map.set(p.vendor, arr);
  }
  return map;
}

export function checkCompatibility(
  product: Product,
  others: Product[],
): { compatible: boolean; message: string } {
  if (others.length === 0) {
    return {
      compatible: true,
      message: "No other products in your active quote session yet.",
    };
  }
  const shared = others.some((o) =>
    o.compatibilityTags.some((t) => product.compatibilityTags.includes(t)),
  );
  const paired = others.some((o) => product.worksWellWith.includes(o.slug));
  if (shared || paired) {
    return {
      compatible: true,
      message:
        "Shared deployment tags or documented pairings with items in your quote session.",
    };
  }
  return {
    compatible: false,
    message:
      "No known compatibility tags overlap with your quote session — verify WAN handoff and licensing before bundling.",
  };
}
