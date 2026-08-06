"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";

export function ProductGrid({
  products,
  onSelect,
}: {
  products: Product[];
  onSelect?: (slug: string) => void;
}) {
  if (products.length === 0) {
    return (
      <p className="text-sm text-graphite">No products match your filters.</p>
    );
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {products.map((p) => (
        <li key={p.slug}>
          {onSelect ? (
            <button
              type="button"
              onClick={() => onSelect(p.slug)}
              className="catalog-panel flex w-full flex-col overflow-hidden text-left active:scale-[0.99] transition-transform"
            >
              <ProductCardInner product={p} />
            </button>
          ) : (
            <Link
              href={`/products/${p.slug}`}
              className="catalog-panel flex flex-col overflow-hidden active:scale-[0.99] transition-transform"
            >
              <ProductCardInner product={p} />
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}

function ProductCardInner({ product }: { product: Product }) {
  return (
    <>
      <div className="relative aspect-[4/3] border-b-2 border-ink bg-mist">
        <Image
          src={product.images[0].src}
          alt={product.name}
          fill
          className="object-contain p-4"
          sizes="240px"
        />
      </div>
      <div className="p-3">
        <p className="vendor-band text-[0.65rem]">{product.vendor}</p>
        <p className="font-display font-bold text-ink">{product.name}</p>
        <p className="mt-1 font-mono text-xs text-graphite">{product.category}</p>
      </div>
    </>
  );
}
