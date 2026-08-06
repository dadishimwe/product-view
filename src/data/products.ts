import type { Product } from "@/types/product";
import { fortinetProducts } from "./catalog/fortinet";
import { peplinkProducts } from "./catalog/peplink";
import { starlinkProducts } from "./catalog/starlink";

export const products: Product[] = [
  ...peplinkProducts,
  ...starlinkProducts,
  ...fortinetProducts,
];

export const vendors = [...new Set(products.map((p) => p.vendor))].sort();
