"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { getProductsBySlugs } from "@/lib/products";
import { ProductMedia } from "@/components/products/ProductMedia";

export function LibraryView() {
  const { favorites } = useApp();
  const saved = getProductsBySlugs(favorites);

  return (
    <div className="mx-auto max-w-3xl flex-1 space-y-10 p-4 sm:p-8">
      <header className="catalog-frame p-6">
        <p className="field-label">Saved hardware</p>
        <h1 className="font-display text-2xl font-bold">Library</h1>
        <p className="mt-2 text-sm text-graphite">
          Products you star in the workspace appear here on this device.
        </p>
      </header>

      <section aria-labelledby="saved-heading">
        <h2 id="saved-heading" className="field-label mb-3">
          Saved products
        </h2>
        {saved.length === 0 ? (
          <p className="text-sm text-graphite">
            Star products from the workspace toolbar to list them here.
          </p>
        ) : (
          <ul className="catalog-panel divide-y-2 divide-ink/10">
            {saved.map((p) => (
              <li key={p.slug} className="flex items-center gap-3 px-3 py-2">
                <span className="relative block h-10 w-10 shrink-0 border-2 border-ink bg-mist">
                  <ProductMedia
                    src={p.images[0].src}
                    fallbackSrc={p.images[0].fallbackSrc}
                    alt=""
                    className="object-contain"
                    sizes="40px"
                  />
                </span>
                <Link
                  href={`/products/${p.slug}`}
                  className="flex-1 font-display text-sm font-semibold hover:underline"
                >
                  {p.name}
                </Link>
                <span className="vendor-band text-[0.65rem]">{p.vendor}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
