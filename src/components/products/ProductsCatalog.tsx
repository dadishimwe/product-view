"use client";

import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { ThreePanelLayout } from "@/components/layout/ThreePanelLayout";
import { ProductLibrary } from "@/components/products/ProductLibrary";
import { ProductGrid } from "@/components/products/ProductGrid";
import { CatalogVendorFilters } from "@/components/products/CatalogVendorFilters";
import { ProductVisualWorkspace } from "@/components/products/ProductVisualWorkspace";
import { ProductDetailPanel } from "@/components/products/ProductDetailPanel";
import { filterProducts, getFilterOptions } from "@/lib/products";
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
  const { vendors: vendorList } = getFilterOptions();
  const [catalogVendors, setCatalogVendors] = useState<string[]>(vendorList);

  const selected = useMemo(
    () => allProducts.find((p) => p.slug === selectedSlug),
    [allProducts, selectedSlug],
  );

  const catalogProducts = useMemo(() => {
    if (catalogVendors.length === 0) return [];
    return filterProducts({ vendors: catalogVendors });
  }, [catalogVendors]);

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
            <p className="mb-4 text-sm text-graphite">
              Select a product from the library or choose a card below.
            </p>
            <CatalogVendorFilters
              vendors={vendorList}
              selected={catalogVendors}
              onChange={setCatalogVendors}
            />
            <ProductGrid products={catalogProducts} onSelect={onSelect} />
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
