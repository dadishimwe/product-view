"use client";

import { Fragment, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { buildSpecRows } from "@/lib/bom-export";
import { projectRollup } from "@/lib/project-rollup";
import { getProductsBySlugs } from "@/lib/products";
import { parseCompareParam } from "@/lib/compare-url";
import {
  officialDatasheetUrl,
  productImageFallbackUrl,
  productImageUrl,
} from "@/lib/product-links";
import { SPEC_GROUP_LABELS } from "@/types/product";
import type { SpecGroup } from "@/types/product";
import type { Product } from "@/types/product";
import { VendorLogoPrint } from "@/components/brand/VendorLogo";
import { vendorLogoSrc } from "@/lib/vendor-branding";
import { useSiteBrief } from "@/context/SiteBriefContext";
import { getProductBySlug } from "@/lib/products";

function PrintProductThumb({
  product,
  origin,
}: {
  product: Product;
  origin: string;
}) {
  const src = productImageUrl(product, origin);
  const fallback = productImageFallbackUrl(product, origin);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={product.name}
      className="print-product-thumb"
      onError={(e) => {
        if (fallback && e.currentTarget.src !== fallback) {
          e.currentTarget.src = fallback;
        }
      }}
    />
  );
}

function PrintVendorLogo({ vendor, origin }: { vendor: string; origin: string }) {
  const src = vendorLogoSrc(vendor);
  if (!src) return null;
  const abs = `${origin}${src}`;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={abs}
      alt=""
      className="print-vendor-logo"
      style={{ height: 12, width: "auto", maxWidth: 72 }}
    />
  );
}

function waitForImages(timeoutMs = 8000) {
  const imgs = Array.from(document.images);
  if (imgs.length === 0) return Promise.resolve();
  return Promise.race([
    Promise.all(
      imgs.map(
        (img) =>
          new Promise<void>((resolve) => {
            if (img.complete) resolve();
            else {
              img.onload = () => resolve();
              img.onerror = () => resolve();
            }
          }),
      ),
    ),
    new Promise<void>((resolve) => window.setTimeout(resolve, timeoutMs)),
  ]);
}

export default function ComparePrintClient() {
  const searchParams = useSearchParams();
  const slugs = parseCompareParam(searchParams.get("p"));
  const products = getProductsBySlugs(slugs);
  const rows = useMemo(() => buildSpecRows(products), [products]);
  const rollup = useMemo(() => projectRollup(products), [products]);
  const [origin, setOrigin] = useState("");
  const { items: briefItems, scratch: briefScratch } = useSiteBrief();
  const hasBrief = briefItems.length > 0 || briefScratch.trim().length > 0;

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    if (!origin || products.length === 0) return;
    let cancelled = false;
    (async () => {
      await waitForImages();
      if (!cancelled) window.setTimeout(() => window.print(), 200);
    })();
    return () => {
      cancelled = true;
    };
  }, [origin, products]);

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
            <th className="py-2 font-display">Datasheet</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const ds = officialDatasheetUrl(p);
            return (
              <tr key={p.slug} className="border-b border-ink/20">
                <td className="py-2 pr-2">
                  <div className="print-bom-device-cell">
                    {origin ? (
                      <>
                        <PrintProductThumb product={p} origin={origin} />
                        <PrintVendorLogo vendor={p.vendor} origin={origin} />
                      </>
                    ) : null}
                  </div>
                </td>
                <td className="py-2 pr-2 font-medium">{p.name}</td>
                <td className="py-2 pr-2 font-mono">{p.sku}</td>
                <td className="py-2 break-all text-[0.65rem]">
                  {ds ?? "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <table className="w-full border-collapse text-left text-xs">
        <thead>
          <tr className="border-b-2 border-ink">
            <th className="py-2 pr-2 font-display">Spec</th>
            {products.map((p) => (
              <th
                key={p.slug}
                className="min-w-[100px] py-2 pr-2 align-bottom font-display"
              >
                <div className="print-compare-col-head">
                  {origin ? (
                    <>
                      <PrintProductThumb product={p} origin={origin} />
                      <PrintVendorLogo vendor={p.vendor} origin={origin} />
                    </>
                  ) : null}
                  <span className="mt-1 block font-bold leading-tight">
                    {p.name}
                  </span>
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

      {hasBrief ? (
        <section className="mt-8 border-t-2 border-ink pt-4">
          <h2 className="font-display text-lg font-bold">Site brief</h2>
          {briefItems.length > 0 ? (
            <table className="mt-3 w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-ink/30">
                  <th className="py-1 pr-2">Done</th>
                  <th className="py-1 pr-2">Requirement</th>
                  <th className="py-1">Linked devices</th>
                </tr>
              </thead>
              <tbody>
                {briefItems.map((item) => (
                  <tr key={item.id} className="border-b border-ink/10">
                    <td className="py-1 pr-2">{item.done ? "Yes" : "No"}</td>
                    <td className="py-1 pr-2">{item.text}</td>
                    <td className="py-1 text-graphite">
                      {item.linkedSlugs
                        .map((s) => getProductBySlug(s)?.name ?? s)
                        .join("; ") || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : null}
          {briefScratch.trim() ? (
            <div className="mt-3">
              <p className="font-mono text-[0.65rem] uppercase text-graphite">
                Project context
              </p>
              <p className="mt-1 whitespace-pre-wrap text-xs">{briefScratch}</p>
            </div>
          ) : null}
        </section>
      ) : null}
    </div>
  );
}
