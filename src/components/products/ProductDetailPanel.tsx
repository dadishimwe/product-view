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
      <div className="flex gap-3 border-b-2 border-ink/10 pb-4">
        <div className="min-w-0 flex-1">
          <p className="vendor-band">{product.vendor}</p>
          <h2 className="font-display text-xl font-bold leading-tight text-ink">
            {product.name}
          </h2>
          <p className="mt-2 inline-flex border-2 border-ink px-2 py-0.5 font-mono text-[0.6875rem] uppercase">
            {product.category}
          </p>
        </div>
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[14px] border-2 border-ink bg-mist">
          <Image
            src={product.images[0].src}
            alt=""
            fill
            className="object-contain p-1"
            sizes="64px"
          />
        </div>
      </div>

      <div>
        <p className="field-label mb-1">Product info</p>
        <p className="text-sm leading-relaxed text-graphite">
          {product.description}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="primary"
          className="col-span-2 sm:col-span-1"
          onClick={() => {
            addToQuote(product.slug);
            setQuoteFlash(true);
            window.setTimeout(() => setQuoteFlash(false), 1200);
          }}
        >
          {quoteFlash ? "Added to quote" : "Add to quote"}
        </Button>
        <Button
          variant="secondary"
          className="col-span-2 sm:col-span-1"
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
          className="pill-btn text-center text-sm"
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
        <a href={pricingMailto} className="pill-btn col-span-2 text-center text-sm">
          Request pricing
        </a>
      </div>

      {compatOpen ? (
        <p
          className={`catalog-panel px-3 py-2 text-sm ${
            compat.compatible ? "bg-[#e8f5e9]" : "bg-[#fff8e6]"
          }`}
        >
          {compat.message}
        </p>
      ) : null}

      <div className="font-mono text-sm text-graphite">
        <span className="font-semibold text-ink">
          ${product.priceUsd.toLocaleString()}
        </span>
        <span className="mx-1.5 text-ink/30">|</span>
        {product.leadTime}
      </div>

      <SpecTable specs={product.specs} />

      {paired.length > 0 ? (
        <div>
          <h3 className="field-label mb-2">Works well with</h3>
          <ul className="space-y-2">
            {paired.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`} className="text-link text-sm">
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {(product.links.docs || product.links.firmware) && (
        <div>
          <h3 className="field-label mb-2">Vendor links</h3>
          <ul className="space-y-1 text-sm">
            {product.links.docs ? (
              <li>
                <a
                  href={product.links.docs}
                  className="text-link"
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
                  className="text-link"
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
