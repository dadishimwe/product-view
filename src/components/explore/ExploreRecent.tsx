"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { getProductsBySlugs } from "@/lib/products";
import { ProductMedia } from "@/components/products/ProductMedia";
import { VendorLogo } from "@/components/brand/VendorLogo";
import { ExploreSupportedVendors } from "./ExploreSupportedVendors";

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

  return (
    <section aria-labelledby="recent-heading" className="space-y-8">
      <div>
        <h2 id="recent-heading" className="field-label mb-3">
          Recently viewed
        </h2>
        {products.length === 0 ? (
          <p className="text-sm text-graphite">
            Open a product detail page to track recent items here.
          </p>
        ) : (
          <ul className="flex gap-3 overflow-x-auto pb-1">
            {products.map((p) => (
              <li key={p.slug} className="shrink-0">
                <Link
                  href={`/products/${p.slug}`}
                  className="catalog-panel flex w-36 flex-col overflow-hidden transition-transform active:scale-[0.98]"
                >
                  <div className="relative aspect-square border-b-2 border-ink bg-mist">
                    <ProductMedia
                      src={p.images[0].src}
                      fallbackSrc={p.images[0].fallbackSrc}
                      alt=""
                      className="object-contain p-2"
                      sizes="144px"
                    />
                    <div className="absolute bottom-1 right-1 rounded border border-ink/20 bg-paper/90 px-1 py-0.5">
                      <VendorLogo vendor={p.vendor} height={12} />
                    </div>
                  </div>
                  <span className="truncate px-2 py-2 font-display text-xs font-semibold">
                    {p.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ExploreSupportedVendors embedded />
    </section>
  );
}
