"use client";

import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/types/product";
import { SpecTable } from "./SpecTable";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";
import {
  checkCompatibility,
  getProductsBySlugs,
} from "@/lib/products";
import { useMemo, useState } from "react";

export function ProductDetailPanel({ product }: { product: Product }) {
  const {
    addToQuote,
    addToCompare,
    removeFromCompare,
    isInCompare,
    sessions,
    activeSessionId,
  } = useApp();
  const [compatOpen, setCompatOpen] = useState(false);
  const [quoteFlash, setQuoteFlash] = useState(false);

  const session = sessions.find((s) => s.id === activeSessionId);
  const sessionProducts = useMemo(
    () =>
      getProductsBySlugs(
        session?.productSlugs.filter((s) => s !== product.slug) ?? [],
      ),
    [session, product.slug],
  );

  const compat = checkCompatibility(product, sessionProducts);
  const inCompare = isInCompare(product.slug);
  const paired = getProductsBySlugs(product.worksWellWith);

  const pricingMailto = `mailto:sales@example.com?subject=${encodeURIComponent(
    `Pricing request: ${product.name} (${product.sku})`,
  )}&body=${encodeURIComponent(
    `Product: ${product.name}\nSKU: ${product.sku}\nVendor: ${product.vendor}\n\nProject / client:\n`,
  )}`;

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-neutral-500">{product.vendor}</p>
          <h2 className="text-xl font-semibold tracking-tight text-neutral-950">
            {product.name}
          </h2>
          <p className="mt-1 inline-flex rounded-full bg-neutral-100 px-2.5 py-0.5 text-xs font-medium text-neutral-700">
            {product.category}
          </p>
        </div>
        <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border border-neutral-200 bg-neutral-50">
          <Image
            src={product.images[0].src}
            alt=""
            fill
            className="object-contain p-1"
            sizes="56px"
          />
        </div>
      </div>

      <p className="text-sm leading-relaxed text-neutral-700">
        {product.description}
      </p>

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="primary"
          onClick={() => {
            addToQuote(product.slug);
            setQuoteFlash(true);
            window.setTimeout(() => setQuoteFlash(false), 1200);
          }}
        >
          {quoteFlash ? "Added" : "Add to quote"}
        </Button>
        <Button
          variant="secondary"
          onClick={() => {
            if (inCompare) removeFromCompare(product.slug);
            else if (!addToCompare(product.slug)) {
              window.alert("Comparison is limited to four products.");
            }
          }}
        >
          {inCompare ? "Remove from compare" : "Add to compare"}
        </Button>
        <a
          href={product.links.datasheet ?? product.links.docs ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50 active:scale-[0.97] transition-transform text-center"
        >
          Download datasheet
        </a>
        <Button
          variant="secondary"
          onClick={() => setCompatOpen((o) => !o)}
          aria-expanded={compatOpen}
        >
          Check compatibility
        </Button>
        <a
          href={pricingMailto}
          className="col-span-2 inline-flex items-center justify-center rounded-full border border-neutral-300 bg-white px-4 py-2 text-sm font-medium hover:bg-neutral-50 active:scale-[0.97] transition-transform"
        >
          Request pricing
        </a>
      </div>

      {compatOpen ? (
        <p
          className={`rounded-lg border px-3 py-2 text-sm ${
            compat.compatible
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-amber-200 bg-amber-50 text-amber-950"
          }`}
        >
          {compat.message}
        </p>
      ) : null}

      <div className="text-sm text-neutral-600">
        <span className="font-medium text-neutral-900">
          ${product.priceUsd.toLocaleString()}
        </span>
        <span className="text-neutral-400"> · </span>
        {product.leadTime}
      </div>

      <SpecTable specs={product.specs} />

      {paired.length > 0 ? (
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Works well with
          </h3>
          <ul className="space-y-2">
            {paired.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/products/${p.slug}`}
                  className="text-sm font-medium text-accent hover:underline"
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {(product.links.docs || product.links.firmware) && (
        <div>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
            Vendor links
          </h3>
          <ul className="space-y-1 text-sm">
            {product.links.docs ? (
              <li>
                <a
                  href={product.links.docs}
                  className="text-accent hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Documentation
                </a>
              </li>
            ) : null}
            {product.links.firmware ? (
              <li>
                <a
                  href={product.links.firmware}
                  className="text-accent hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Firmware downloads
                </a>
              </li>
            ) : null}
          </ul>
        </div>
      )}
    </div>
  );
}
