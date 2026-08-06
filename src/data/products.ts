import type { Product } from "@/types/product";
import { fortinetProducts } from "./catalog/fortinet";
import { peplinkProducts } from "./catalog/peplink";
import { starlinkProducts } from "./catalog/starlink";
import { enrichProductLinks } from "@/lib/product-links";
import { applyCatalogDepth } from "./catalog/catalog-depth";

const rawProducts: Product[] = [
  ...peplinkProducts,
  ...starlinkProducts,
  ...fortinetProducts,
];

export const products: Product[] = rawProducts
  .map(enrichProductLinks)
  .map(applyCatalogDepth);

export const vendors = [...new Set(products.map((p) => p.vendor))].sort();
