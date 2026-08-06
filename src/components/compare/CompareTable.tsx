"use client";

import Link from "next/link";
import { Fragment } from "react";
import type { Product } from "@/types/product";
import type { SpecGroup } from "@/types/product";
import { SPEC_GROUP_LABELS } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { ProductMedia } from "@/components/products/ProductMedia";
import { useApp } from "@/context/AppContext";

export function CompareTable({ products }: { products: Product[] }) {
  const { removeFromCompare, clearCompare } = useApp();

  if (products.length === 0) {
    return (
      <div className="catalog-panel border-dashed p-8 text-center text-sm text-graphite">
        <p className="mb-4">No products in comparison yet.</p>
        <Link href="/products" className="text-link">
          Browse products
        </Link>
      </div>
    );
  }

  const groups = (Object.keys(SPEC_GROUP_LABELS) as SpecGroup[]).filter((g) =>
    products.some((p) => Object.keys(p.specs[g] ?? {}).length > 0),
  );

  const allKeys = new Map<SpecGroup, string[]>();
  for (const g of groups) {
    const keys = new Set<string>();
    for (const p of products) {
      Object.keys(p.specs[g] ?? {}).forEach((k) => keys.add(k));
    }
    allKeys.set(g, [...keys]);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-graphite">
          Comparing {products.length} product{products.length === 1 ? "" : "s"}
          {products.length >= 4 ? " (maximum)" : ""}
        </p>
        <Button variant="ghost" onClick={clearCompare}>
          Clear comparison
        </Button>
      </div>

      <div className="catalog-frame overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b-2 border-ink bg-mist">
              <th className="sticky left-0 bg-mist px-3 py-3 font-display font-bold">
                Spec
              </th>
              {products.map((p) => (
                <th key={p.slug} className="min-w-[160px] px-3 py-3 align-bottom">
                  <div className="flex flex-col gap-2">
                    <div className="relative mx-auto h-12 w-12 border-2 border-ink bg-panel">
                      <ProductMedia
                        src={p.images[0].src}
                        fallbackSrc={p.images[0].fallbackSrc}
                        alt=""
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                    <Link
                      href={`/products/${p.slug}`}
                      className="font-display font-bold text-ink hover:underline"
                    >
                      {p.name}
                    </Link>
                    <button
                      type="button"
                      className="text-xs font-semibold text-graphite hover:text-signal-deep"
                      onClick={() => removeFromCompare(p.slug)}
                    >
                      Remove
                    </button>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {groups.map((group) => (
              <Fragment key={group}>
                <tr className="bg-mist/80">
                  <td
                    colSpan={products.length + 1}
                    className="field-label px-3 py-2"
                  >
                    {SPEC_GROUP_LABELS[group]}
                  </td>
                </tr>
                {(allKeys.get(group) ?? []).map((key) => {
                  const values = products.map(
                    (p) => p.specs[group]?.[key] ?? "—",
                  );
                  const differs = new Set(values).size > 1;
                  return (
                    <tr key={`${group}-${key}`} className={differs ? "bg-[#fff8e6]" : ""}>
                      <td className="sticky left-0 border-t-2 border-ink/10 bg-panel px-3 py-2 font-medium text-graphite">
                        {key}
                      </td>
                      {values.map((v, i) => (
                        <td
                          key={i}
                          className="border-t-2 border-ink/10 px-3 py-2 font-mono text-xs"
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
