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
      <p className="text-sm text-neutral-500">No products match your filters.</p>
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
              className="flex w-full flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white text-left transition-shadow hover:shadow-sm active:scale-[0.99]"
            >
              <ProductCardInner product={p} />
            </button>
          ) : (
            <Link
              href={`/products/${p.slug}`}
              className="flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white transition-shadow hover:shadow-sm active:scale-[0.99]"
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
      <div className="relative aspect-[4/3] bg-neutral-50">
        <Image
          src={product.images[0].src}
          alt={product.name}
          fill
          className="object-contain p-4"
          sizes="240px"
        />
      </div>
      <div className="border-t border-neutral-100 p-3">
        <p className="text-xs font-medium text-neutral-500">{product.vendor}</p>
        <p className="font-semibold text-neutral-950">{product.name}</p>
        <p className="mt-1 text-xs text-neutral-600">{product.category}</p>
      </div>
    </>
  );
}
