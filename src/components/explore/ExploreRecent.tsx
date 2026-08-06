"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { getProductsBySlugs } from "@/lib/products";
import { ProductMedia } from "@/components/products/ProductMedia";

export function ExploreRecent() {
  const { recentlyViewed, hydrated } = useApp();
  const products = getProductsBySlugs(recentlyViewed);

  if (!hydrated) {
    return (
      <section aria-labelledby="recent-heading">
        <h2 id="recent-heading" className="field-label mb-3">
          Recently viewed
        </h2>
        <p className="text-sm text-graphite">Loading…</p>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section aria-labelledby="recent-heading">
        <h2 id="recent-heading" className="field-label mb-3">
          Recently viewed
        </h2>
        <p className="text-sm text-graphite">
          Open a product detail page to track recent items here.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="recent-heading">
      <h2 id="recent-heading" className="field-label mb-3">
        Recently viewed
      </h2>
      <ul className="flex gap-3 overflow-x-auto pb-1">
        {products.map((p) => (
          <li key={p.slug} className="shrink-0">
            <Link
              href={`/products/${p.slug}`}
              className="catalog-panel flex w-36 flex-col overflow-hidden active:scale-[0.98] transition-transform"
            >
              <div className="relative aspect-square border-b-2 border-ink bg-mist">
                <ProductMedia
                  src={p.images[0].src}
                  fallbackSrc={p.images[0].fallbackSrc}
                  alt=""
                  className="object-contain p-2"
                  sizes="144px"
                />
              </div>
              <span className="truncate px-2 py-2 font-display text-xs font-semibold">
                {p.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
