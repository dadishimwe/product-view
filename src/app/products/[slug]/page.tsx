import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { getProductBySlug } from "@/lib/products";
import { ProductDetailView } from "@/components/products/ProductDetailView";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();
  return <ProductDetailView product={product} allProducts={products} />;
}
