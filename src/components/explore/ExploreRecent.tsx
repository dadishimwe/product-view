"use client";

import Link from "next/link";
import Image from "next/image";
import { useApp } from "@/context/AppContext";
import { getProductsBySlugs } from "@/lib/products";

export function ExploreRecent() {
  const { recentlyViewed, hydrated } = useApp();
  const products = getProductsBySlugs(recentlyViewed);

  if (!hydrated) {
    return (
      <section aria-labelledby="recent-heading">
        <h2
          id="recent-heading"
          className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500"
        >
          Recently viewed
        </h2>
        <p className="text-sm text-neutral-500">Loading…</p>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section aria-labelledby="recent-heading">
        <h2
          id="recent-heading"
          className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500"
        >
          Recently viewed
        </h2>
        <p className="text-sm text-neutral-600">
          Open a product detail page to track recent items here.
        </p>
      </section>
    );
  }

  return (
    <section aria-labelledby="recent-heading">
      <h2
        id="recent-heading"
        className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500"
      >
        Recently viewed
      </h2>
      <ul className="flex gap-3 overflow-x-auto pb-1">
        {products.map((p) => (
          <li key={p.slug} className="shrink-0">
            <Link
              href={`/products/${p.slug}`}
              className="flex w-36 flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white active:scale-[0.98] transition-transform"
            >
              <div className="relative aspect-square bg-neutral-50">
                <Image
                  src={p.images[0].src}
                  alt=""
                  fill
                  className="object-contain p-2"
                  sizes="144px"
                />
              </div>
              <span className="truncate px-2 py-2 text-xs font-medium">
                {p.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
