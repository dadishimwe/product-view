import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import { getProductBySlug } from "@/lib/products";
import { officialDatasheetUrl } from "@/lib/product-links";
import { ProductDetailView } from "@/components/products/ProductDetailView";
import { siteUrl } from "@/lib/site-url";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Product not found" };

  const title = `${product.name} (${product.sku})`;
  const description = `${product.vendor} ${product.name} — ${product.category}. ${product.description.slice(0, 140)}…`;

  return {
    title,
    description,
    keywords: [product.vendor, product.name, product.sku, product.category],
    alternates: {
      canonical: `/products/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${siteUrl()}/products/${slug}`,
    },
  };
}

export default async function ProductSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const datasheet = officialDatasheetUrl(product);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku,
    brand: { "@type": "Brand", name: product.vendor },
    category: product.category,
    description: product.description,
    image: `${siteUrl()}${product.images[0].src}`,
    ...(datasheet ? { url: datasheet } : {}),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductDetailView product={product} allProducts={products} />
    </>
  );
}
