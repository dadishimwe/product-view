"use client";

import Link from "next/link";
import type { Product } from "@/types/product";
import { SpecTable } from "./SpecTable";
import { Button } from "@/components/ui/Button";
import { ProductMedia } from "./ProductMedia";
import { useApp } from "@/context/AppContext";
import { useSiteBrief } from "@/context/SiteBriefContext";
import {
  checkCompatibility,
  getProductsBySlugs,
} from "@/lib/products";
import { officialDatasheetUrl } from "@/lib/product-links";
import { useMemo, useState } from "react";
import { VendorLogo } from "@/components/brand/VendorLogo";

export function ProductDetailPanel({ product }: { product: Product }) {
  const { addToCompare, removeFromCompare, isInCompare, compare } = useApp();
  const { addLinkedDevice } = useSiteBrief();
  const [compatOpen, setCompatOpen] = useState(false);

  const compareProducts = useMemo(
    () =>
      getProductsBySlugs(compare.filter((s) => s !== product.slug)),
    [compare, product.slug],
  );

  const compat = checkCompatibility(product, compareProducts);
  const inCompare = isInCompare(product.slug);
  const paired = getProductsBySlugs(product.worksWellWith);

  return (
    <div className="flex h-full flex-col gap-5">
      <div className="flex gap-3 border-b-2 border-ink/10 pb-4">
        <div className="min-w-0 flex-1">
          <div className="mb-1">
            <VendorLogo vendor={product.vendor} height={20} />
          </div>
          <h2 className="font-display text-xl font-bold leading-tight text-ink">
            {product.name}
          </h2>
          <p className="category-pill mt-2">{product.category}</p>
        </div>
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-[14px] border-2 border-ink bg-mist">
          <ProductMedia
            src={product.images[0].src}
            fallbackSrc={product.images[0].fallbackSrc}
            alt=""
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
            if (inCompare) removeFromCompare(product.slug);
            else if (!addToCompare(product.slug)) {
              window.alert("Comparison is limited to four products.");
            }
          }}
        >
          {inCompare ? "Remove from compare" : "Add to compare"}
        </Button>
        <a
          href={officialDatasheetUrl(product) ?? product.links.docs ?? "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="pill-btn col-span-2 text-center text-sm sm:col-span-1"
        >
          Official datasheet
        </a>
        <Button
          variant="secondary"
          className="col-span-2 sm:col-span-1"
          onClick={() => addLinkedDevice(product.name, product.slug)}
        >
          Add to site brief
        </Button>
        <Button
          variant="secondary"
          className="col-span-2 sm:col-span-1"
          onClick={() => setCompatOpen((o) => !o)}
          aria-expanded={compatOpen}
        >
          Check compatibility
        </Button>
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
