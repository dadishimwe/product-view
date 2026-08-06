"use client";

import Link from "next/link";
import Image from "next/image";
import { Fragment } from "react";
import type { Product } from "@/types/product";
import type { SpecGroup } from "@/types/product";
import { SPEC_GROUP_LABELS } from "@/types/product";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";

export function CompareTable({ products }: { products: Product[] }) {
  const { removeFromCompare, clearCompare } = useApp();

  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-neutral-300 p-8 text-center text-sm text-neutral-600">
        <p className="mb-4">No products in comparison yet.</p>
        <Link href="/products" className="font-medium text-accent hover:underline">
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
        <p className="text-sm text-neutral-600">
          Comparing {products.length} product{products.length === 1 ? "" : "s"}
          {products.length >= 4 ? " (maximum)" : ""}
        </p>
        <Button variant="ghost" onClick={clearCompare}>
          Clear comparison
        </Button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-neutral-200">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-neutral-200 bg-neutral-50">
              <th className="sticky left-0 bg-neutral-50 px-3 py-3 font-semibold">
                Spec
              </th>
              {products.map((p) => (
                <th key={p.slug} className="min-w-[160px] px-3 py-3 align-bottom">
                  <div className="flex flex-col gap-2">
                    <div className="relative mx-auto h-12 w-12">
                      <Image
                        src={p.images[0].src}
                        alt=""
                        fill
                        className="object-contain"
                        sizes="48px"
                      />
                    </div>
                    <Link
                      href={`/products/${p.slug}`}
                      className="font-semibold text-neutral-950 hover:underline"
                    >
                      {p.name}
                    </Link>
                    <button
                      type="button"
                      className="text-xs font-medium text-neutral-500 hover:text-red-600"
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
                <tr className="bg-neutral-100/80">
                  <td
                    colSpan={products.length + 1}
                    className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-neutral-600"
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
                    <tr
                      key={`${group}-${key}`}
                      className={differs ? "bg-amber-50/60" : undefined}
                    >
                      <td className="sticky left-0 border-t border-neutral-100 bg-white px-3 py-2 font-medium text-neutral-600">
                        {key}
                      </td>
                      {values.map((v, i) => (
                        <td
                          key={i}
                          className="border-t border-neutral-100 px-3 py-2"
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
