"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ThreePanelLayout } from "@/components/layout/ThreePanelLayout";
import { ProductLibrary } from "@/components/products/ProductLibrary";
import { ProductVisualWorkspace } from "@/components/products/ProductVisualWorkspace";
import { ProductDetailPanel } from "@/components/products/ProductDetailPanel";
import { useApp } from "@/context/AppContext";
import type { Product } from "@/types/product";

export function ProductDetailView({
  product,
}: {
  product: Product;
  allProducts: Product[];
}) {
  const { recordView } = useApp();
  const router = useRouter();

  useEffect(() => {
    recordView(product.slug);
  }, [product.slug, recordView]);

  return (
    <ThreePanelLayout
      library={
        <ProductLibrary
          selectedSlug={product.slug}
          onSelect={(slug) => router.push(`/products/${slug}`)}
        />
      }
      workspace={<ProductVisualWorkspace product={product} />}
      detail={<ProductDetailPanel product={product} />}
    />
  );
}
