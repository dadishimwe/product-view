"use client";

import { Fragment, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { buildSpecRows } from "@/lib/bom-export";
import { projectRollup } from "@/lib/project-rollup";
import { getProductsBySlugs } from "@/lib/products";
import { parseCompareParam } from "@/lib/compare-url";
import { SPEC_GROUP_LABELS } from "@/types/product";
import type { SpecGroup } from "@/types/product";
import { VendorLogoPrint } from "@/components/brand/VendorLogo";

function PrintProductThumb({
  src,
  fallback,
  alt,
}: {
  src: string;
  fallback?: string;
  alt: string;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className="print-product-thumb"
      onError={(e) => {
        if (fallback && e.currentTarget.src !== fallback) {
          e.currentTarget.src = fallback;
        }
      }}
    />
  );
}

export default function ComparePrintClient() {
  const searchParams = useSearchParams();
  const slugs = parseCompareParam(searchParams.get("p"));
  const products = getProductsBySlugs(slugs);
  const rows = useMemo(() => buildSpecRows(products), [products]);
  const rollup = useMemo(() => projectRollup(products), [products]);

  useEffect(() => {
    const t = window.setTimeout(() => window.print(), 400);
    return () => window.clearTimeout(t);
  }, []);

  const groups = useMemo(() => {
    const set = new Set<SpecGroup>();
    for (const r of rows) set.add(r.group);
    return [...set];
  }, [rows]);

  if (products.length === 0) {
    return (
      <p className="p-8 text-sm text-graphite print:p-4">
        No products in this comparison link.
      </p>
    );
  }

  return (
    <div className="print-bom mx-auto max-w-5xl p-8 print:p-4">
      <header className="mb-6 border-b-2 border-ink pb-4">
        <p className="font-mono text-xs uppercase tracking-wider text-graphite">
          DeviceView
        </p>
        <h1 className="font-display text-2xl font-bold">Comparison & BOM</h1>
        <p className="mt-1 text-sm text-graphite">
          {products.length} device{products.length === 1 ? "" : "s"} ·{" "}
          {new Date().toLocaleDateString()}
        </p>
      </header>

      <section className="mb-6 grid gap-2 text-sm sm:grid-cols-3">
        <div className="border border-ink/30 p-3">
          <p className="font-mono text-[0.65rem] uppercase">Est. power (max)</p>
          <p className="font-display text-lg font-bold">
            {rollup.powerKnown > 0 ? `${rollup.powerWattsMax} W` : "—"}
          </p>
        </div>
        <div className="border border-ink/30 p-3">
          <p className="font-mono text-[0.65rem] uppercase">Rack units</p>
          <p className="font-display text-lg font-bold">
            {rollup.rackKnown > 0 ? `${rollup.rackUnits} U` : "—"}
          </p>
        </div>
        <div className="border border-ink/30 p-3">
          <p className="font-mono text-[0.65rem] uppercase">Line items</p>
          <p className="font-display text-lg font-bold">{rollup.deviceCount}</p>
        </div>
      </section>

      <table className="mb-8 w-full border-collapse text-left text-xs">
        <thead>
          <tr className="border-b-2 border-ink">
            <th className="py-2 pr-2 font-display">Device</th>
            <th className="py-2 pr-2 font-display">Model</th>
            <th className="py-2 pr-2 font-display">SKU</th>
            <th className="py-2 font-display">Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => (
            <tr key={p.slug} className="border-b border-ink/20">
              <td className="py-2 pr-2">
                <div className="print-bom-device-cell">
                  <PrintProductThumb
                    src={p.images[0].src}
                    fallback={p.images[0].fallbackSrc}
                    alt=""
                  />
                  <VendorLogoPrint vendor={p.vendor} height={12} />
                </div>
              </td>
              <td className="py-2 pr-2 font-medium">{p.name}</td>
              <td className="py-2 pr-2 font-mono">{p.sku}</td>
              <td className="py-2">{p.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="w-full border-collapse text-left text-xs">
        <thead>
          <tr className="border-b-2 border-ink">
            <th className="py-2 pr-2 font-display">Spec</th>
            {products.map((p) => (
              <th key={p.slug} className="min-w-[120px] py-2 pr-2 align-bottom font-display">
                <div className="print-compare-col-head">
                  <PrintProductThumb
                    src={p.images[0].src}
                    fallback={p.images[0].fallbackSrc}
                    alt=""
                  />
                  <span className="mt-1 block font-bold leading-tight">{p.name}</span>
                  <VendorLogoPrint vendor={p.vendor} height={11} className="mt-0.5" />
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <Fragment key={group}>
              <tr className="bg-mist/50">
                <td
                  colSpan={products.length + 1}
                  className="py-1.5 pl-1 font-mono text-[0.65rem] uppercase"
                >
                  {SPEC_GROUP_LABELS[group]}
                </td>
              </tr>
              {rows
                .filter((r) => r.group === group)
                .map((r) => (
                  <tr key={`${group}-${r.key}`} className="border-b border-ink/10">
                    <td className="py-1.5 pr-2 font-medium">{r.key}</td>
                    {r.values.map((v, i) => (
                      <td key={i} className="py-1.5 pr-2 text-graphite">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
