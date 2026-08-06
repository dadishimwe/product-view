"use client";

import Link from "next/link";
import { Fragment, useMemo, useState } from "react";
import type { Product } from "@/types/product";
import type { SpecGroup } from "@/types/product";
import { SPEC_GROUP_LABELS } from "@/types/product";
import { buildSpecRows } from "@/lib/bom-export";
import { Button } from "@/components/ui/Button";
import { ProductMedia } from "@/components/products/ProductMedia";
import { VendorLogo } from "@/components/brand/VendorLogo";
import { useApp } from "@/context/AppContext";
import { ProjectRollup } from "./ProjectRollup";
import { BomExportActions } from "./BomExportActions";

export function CompareTable({ products }: { products: Product[] }) {
  const { removeFromCompare, clearCompare } = useApp();
  const [hideIdentical, setHideIdentical] = useState(false);

  const rows = useMemo(() => buildSpecRows(products), [products]);

  const groups = useMemo(() => {
    const set = new Set<SpecGroup>();
    for (const r of rows) set.add(r.group);
    return [...set];
  }, [rows]);

  const visibleRows = hideIdentical
    ? rows.filter((r) => r.differs)
    : rows;

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

  return (
    <div className="space-y-4">
      <ProjectRollup products={products} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-graphite">
          Comparing {products.length} product{products.length === 1 ? "" : "s"}
          {products.length >= 4 ? " (maximum)" : ""}
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <BomExportActions products={products} />
          <Button variant="ghost" className="!text-xs" onClick={clearCompare}>
            Clear comparison
          </Button>
        </div>
      </div>

      <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
        <input
          type="checkbox"
          checked={hideIdentical}
          onChange={(e) => setHideIdentical(e.target.checked)}
          className="h-4 w-4 accent-ink"
        />
        Hide identical specs
      </label>

      <div className="-mx-1 overflow-x-auto overscroll-x-contain px-1 sm:mx-0 sm:px-0">
      <div className="catalog-frame compare-table-frame max-h-[min(70vh,720px)] overflow-auto">
        <table className="compare-table min-w-full border-collapse text-left text-sm">
          <thead className="sticky top-0 z-20">
            <tr className="border-b-2 border-ink bg-mist shadow-[0_1px_0_#14121f]">
              <th className="compare-sticky-spec sticky left-0 z-30 min-w-[7.5rem] bg-mist px-2 py-3 font-display text-xs font-bold sm:min-w-[9rem] sm:px-3 sm:text-sm">
                Spec
              </th>
              {products.map((p) => (
                <th
                  key={p.slug}
                  className="min-w-[7.5rem] max-w-[10rem] bg-mist px-2 py-3 align-bottom sm:min-w-[10rem] sm:max-w-none sm:px-3"
                >
                  <div className="flex flex-col gap-1.5 sm:gap-2">
                    <div className="relative mx-auto h-10 w-10 border-2 border-ink bg-panel sm:h-12 sm:w-12">
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
                      className="line-clamp-3 text-center font-display text-xs font-bold leading-tight text-ink hover:underline sm:text-sm"
                    >
                      {p.name}
                    </Link>
                    <VendorLogo vendor={p.vendor} height={14} className="mx-auto sm:!h-4" />
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
            {groups.map((group) => {
              const groupRows = visibleRows.filter((r) => r.group === group);
              if (groupRows.length === 0) return null;
              return (
                <Fragment key={group}>
                  <tr className="bg-mist/80">
                    <td
                      colSpan={products.length + 1}
                      className="field-label sticky left-0 px-3 py-2"
                    >
                      {SPEC_GROUP_LABELS[group]}
                    </td>
                  </tr>
                  {groupRows.map((row) => (
                    <tr
                      key={`${row.group}-${row.key}`}
                      className={row.differs ? "bg-[#fff8e6]" : ""}
                    >
                      <td className="compare-sticky-spec sticky left-0 z-10 min-w-[7.5rem] border-t-2 border-ink/10 bg-panel px-2 py-2 text-xs font-medium text-graphite sm:min-w-[9rem] sm:px-3 sm:text-sm">
                        {row.key}
                      </td>
                      {row.values.map((v, i) => (
                        <td
                          key={i}
                          className="max-w-[10rem] border-t-2 border-ink/10 px-2 py-2 font-mono text-[0.6875rem] sm:max-w-none sm:px-3 sm:text-xs"
                        >
                          {v}
                        </td>
                      ))}
                    </tr>
                  ))}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
