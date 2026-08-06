import { products } from "@/data/products";
import { ProductsCatalog } from "@/components/products/ProductsCatalog";

export default function ProductsPage() {
  return <ProductsCatalog allProducts={products} />;
}
