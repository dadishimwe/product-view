"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { ThreePanelLayout } from "@/components/layout/ThreePanelLayout";
import { ProductLibrary } from "@/components/products/ProductLibrary";
import { ProductGrid } from "@/components/products/ProductGrid";
import { ProductVisualWorkspace } from "@/components/products/ProductVisualWorkspace";
import { ProductDetailPanel } from "@/components/products/ProductDetailPanel";
import { filterProducts } from "@/lib/products";
import type { Product } from "@/types/product";

export function ProductsCatalog({
  allProducts,
  initialSlug,
}: {
  allProducts: Product[];
  initialSlug?: string;
}) {
  const router = useRouter();
  const [selectedSlug, setSelectedSlug] = useState<string | undefined>(
    initialSlug,
  );

  const selected = useMemo(
    () => allProducts.find((p) => p.slug === selectedSlug),
    [allProducts, selectedSlug],
  );

  const onSelect = useCallback(
    (slug: string) => {
      setSelectedSlug(slug);
      router.replace(`/products/${slug}`, { scroll: false });
    },
    [router],
  );

  return (
    <ThreePanelLayout
      library={
        <ProductLibrary selectedSlug={selectedSlug} onSelect={onSelect} />
      }
      workspace={
        selected ? (
          <ProductVisualWorkspace product={selected} />
        ) : (
          <div>
            <h1 className="mb-2 font-display text-2xl font-bold">Catalog</h1>
            <p className="mb-6 text-sm text-graphite">
              Select a product from the library or choose a card below.
            </p>
            <ProductGrid
              products={filterProducts({})}
              onSelect={onSelect}
            />
          </div>
        )
      }
      detail={
        selected ? (
          <ProductDetailPanel product={selected} />
        ) : (
          <div className="flex h-full items-center justify-center px-4 text-center text-sm text-graphite">
            Select a product to view specifications and actions.
          </div>
        )
      }
    />
  );
}
