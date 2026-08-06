"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Product, ProductImage } from "@/types/product";
import { Tooltip } from "@/components/ui/Tooltip";
import { useApp } from "@/context/AppContext";
import { SiteNotes } from "./SiteNotes";
import { ProductMedia } from "./ProductMedia";

function CalloutOverlay({
  image,
  visible,
}: {
  image: ProductImage;
  visible: boolean;
}) {
  if (!visible || !image.callouts?.length) return null;
  return (
    <>
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full text-ink"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {image.callouts.map((c, i) => (
          <g key={i}>
            <line
              x1={c.x}
              y1={c.y}
              x2={c.x + (c.x > 50 ? -10 : 10)}
              y2={c.y - 8}
              stroke="currentColor"
              strokeWidth="0.35"
            />
            <circle cx={c.x} cy={c.y} r="1.4" className="fill-signal" />
          </g>
        ))}
      </svg>
      <ul className="pointer-events-none absolute inset-x-4 bottom-4 flex flex-wrap gap-2">
        {image.callouts.map((c) => (
          <li
            key={c.label}
            className="rounded-full border-2 border-ink bg-paper/95 px-2.5 py-1 font-display text-[0.6875rem] font-semibold uppercase tracking-wide"
          >
            {c.label}
          </li>
        ))}
      </ul>
    </>
  );
}

export function ProductVisualWorkspace({
  product,
}: {
  product: Product;
  projectTitle?: string;
}) {
  const [index, setIndex] = useState(0);
  const [calloutsOn, setCalloutsOn] = useState(true);
  const { toggleFavorite, isFavorite, sessions, activeSessionId } = useApp();
  const image = product.images[index] ?? product.images[0];
  const fav = isFavorite(product.slug);
  const session = sessions.find((s) => s.id === activeSessionId);
  const workspaceTitle = session?.name ?? "Site survey workspace";

  return (
    <div className="flex h-full min-h-[380px] flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="field-label">Project workspace</p>
          <h1 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-[1.65rem]">
            {workspaceTitle}
          </h1>
          <p className="mt-1 font-mono text-xs text-graphite">{product.sku}</p>
        </div>
      </div>

      <div className="relative flex flex-1 gap-3">
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
            <Link href="/products" className="tool-rail-btn" aria-label="Search catalog">
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
          <Tooltip label="Toggle callout labels">
            <button
              type="button"
              className="tool-rail-btn"
              aria-label="Toggle callout labels"
              aria-pressed={calloutsOn}
              onClick={() => setCalloutsOn((v) => !v)}
            >
              ⊞
            </button>
          </Tooltip>
        </div>

        <div className="schematic-stage flex flex-1 items-center justify-center p-6 sm:p-8">
          <SiteNotes />
          <div className="relative aspect-[4/3] w-full max-w-md">
            <ProductMedia
              src={image.src}
              fallbackSrc={image.fallbackSrc}
              alt={image.alt}
              className="object-contain drop-shadow-[4px_8px_0_rgba(20,18,31,0.08)]"
              sizes="(max-width: 768px) 100vw, 480px"
              priority
            />
            <CalloutOverlay image={image} visible={calloutsOn} />
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={calloutsOn}
            aria-label="Show hardware callouts"
            onClick={() => setCalloutsOn((v) => !v)}
            className="absolute bottom-4 right-4 flex h-9 w-[4.25rem] items-center rounded-full border-2 border-ink bg-panel p-0.5 transition-[background-color] duration-150"
          >
            <span
              className={`h-7 w-7 rounded-full border-2 border-ink bg-trace transition-transform duration-200 ${
                calloutsOn ? "translate-x-[calc(100%-2px)]" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      <p className="font-display text-sm font-semibold text-ink">{product.name}</p>
    </div>
  );
}
