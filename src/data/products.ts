import type { Product } from "@/types/product";
import { fortinetProducts } from "./catalog/fortinet";
import { peplinkProducts } from "./catalog/peplink";
import { starlinkProducts } from "./catalog/starlink";
import { enrichProductLinks } from "@/lib/product-links";

const rawProducts: Product[] = [
  ...peplinkProducts,
  ...starlinkProducts,
  ...fortinetProducts,
];

export const products: Product[] = rawProducts.map(enrichProductLinks);

export const vendors = [...new Set(products.map((p) => p.vendor))].sort();
