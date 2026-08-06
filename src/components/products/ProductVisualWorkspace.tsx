"use client";

import Link from "next/link";
import { useState } from "react";
import type { Product } from "@/types/product";
import { Tooltip } from "@/components/ui/Tooltip";
import { useApp } from "@/context/AppContext";
import { SiteNotes } from "./SiteNotes";
import { ProductMedia } from "./ProductMedia";
import { PortHotspots } from "./PortHotspots";

export function ProductVisualWorkspace({ product }: { product: Product }) {
  const [index, setIndex] = useState(0);
  const { toggleFavorite, isFavorite } = useApp();
  const image = product.images[index] ?? product.images[0];
  const fav = isFavorite(product.slug);
  const isStarlink = product.vendor === "Starlink";
  const isPeplink = product.vendor === "Peplink";
  const isFortinet = product.vendor === "Fortinet";
  const heroImage = isStarlink || isPeplink || isFortinet;
  const workspaceLabel = `${product.vendor} · ${product.formFactor}`;

  return (
    <div className="flex h-full min-h-[380px] flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="field-label">{workspaceLabel}</p>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-[1.65rem]">
            {product.name}
          </h1>
          <p className="mt-1 font-mono text-xs text-graphite">{product.sku}</p>
        </div>
      </div>

      <div className="relative flex min-h-0 flex-1 gap-3">
        <div className="tool-rail shrink-0 self-center">
          {product.images.length > 1 ? (
            <Tooltip label="Next angle">
              <button
                type="button"
                className="tool-rail-btn"
                aria-label="Next angle"
                onClick={() =>
                  setIndex((i) => (i + 1) % product.images.length)
                }
              >
                ↻
              </button>
            </Tooltip>
          ) : null}
          <Tooltip label="Search catalog">
            <Link
              href="/products"
              className="tool-rail-btn"
              aria-label="Search catalog"
            >
              ⌕
            </Link>
          </Tooltip>
          <Tooltip label={fav ? "Remove from saved" : "Save product"}>
            <button
              type="button"
              className="tool-rail-btn"
              aria-label={fav ? "Remove from saved" : "Save product"}
              aria-pressed={fav}
              onClick={() => toggleFavorite(product.slug)}
            >
              {fav ? "★" : "☆"}
            </button>
          </Tooltip>
        </div>

        <div
          className={`schematic-stage flex flex-1 items-center justify-center ${
            heroImage ? "p-3 sm:p-4" : "p-6 sm:p-8"
          }`}
        >
          <SiteNotes />
          <div
            className={
              heroImage
                ? "relative h-full w-full min-h-[min(72vh,640px)] max-h-[min(78vh,720px)]"
                : "relative aspect-[4/3] w-full max-w-md"
            }
          >
            <ProductMedia
              src={image.src}
              fallbackSrc={image.fallbackSrc}
              alt={image.alt}
              className={
                heroImage
                  ? "object-contain object-center p-1 sm:p-2"
                  : "object-contain drop-shadow-[4px_8px_0_rgba(20,18,31,0.08)]"
              }
              sizes={
                heroImage
                  ? "(max-width: 1024px) 90vw, 720px"
                  : "(max-width: 768px) 100vw, 480px"
              }
              priority
            />
            {image.ports?.length ? (
              <PortHotspots ports={image.ports} />
            ) : null}
          </div>
        </div>
      </div>

      <p className="text-sm text-graphite">{product.category}</p>
    </div>
  );
}
