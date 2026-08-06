"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product, ProductImage } from "@/types/product";
import { Tooltip } from "@/components/ui/Tooltip";
import { Button } from "@/components/ui/Button";
import { useApp } from "@/context/AppContext";

function CalloutOverlay({ image }: { image: ProductImage }) {
  if (!image.callouts?.length) return null;
  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {image.callouts.map((c, i) => (
        <g key={i}>
          <line
            x1={c.x}
            y1={c.y}
            x2={c.x + (c.x > 50 ? -8 : 8)}
            y2={c.y - 6}
            stroke="currentColor"
            strokeWidth="0.3"
            className="text-neutral-400"
          />
          <circle cx={c.x} cy={c.y} r="1.2" className="fill-accent" />
        </g>
      ))}
    </svg>
  );
}

export function ProductVisualWorkspace({
  product,
  projectTitle,
}: {
  product: Product;
  projectTitle?: string;
}) {
  const [index, setIndex] = useState(0);
  const { toggleFavorite, isFavorite } = useApp();
  const image = product.images[index] ?? product.images[0];
  const fav = isFavorite(product.slug);

  return (
    <div className="flex h-full min-h-[360px] flex-col">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          {projectTitle ? (
            <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
              Workspace
            </p>
          ) : null}
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-950">
            {projectTitle ?? product.name}
          </h1>
        </div>
        <div className="flex gap-1">
          <Tooltip label={fav ? "Remove from saved" : "Save product"}>
            <Button
              variant="ghost"
              className="!px-2.5"
              aria-label={fav ? "Remove from saved" : "Save product"}
              aria-pressed={fav}
              onClick={() => toggleFavorite(product.slug)}
            >
              {fav ? "★" : "☆"}
            </Button>
          </Tooltip>
          {product.images.length > 1 ? (
            <Tooltip label="Next product angle">
              <Button
                variant="ghost"
                className="!px-2.5"
                aria-label="Next product angle"
                onClick={() =>
                  setIndex((i) => (i + 1) % product.images.length)
                }
              >
                ↻
              </Button>
            </Tooltip>
          ) : null}
        </div>
      </div>
      <div className="relative flex flex-1 items-center justify-center rounded-2xl border border-neutral-200 bg-neutral-50/80 p-6">
        <div className="relative aspect-[4/3] w-full max-w-lg">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 512px"
            priority
          />
          <CalloutOverlay image={image} />
        </div>
        {image.callouts?.length ? (
          <ul className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2 text-xs text-neutral-600">
            {image.callouts.map((c) => (
              <li
                key={c.label}
                className="rounded-full border border-neutral-200 bg-white/90 px-2.5 py-1 backdrop-blur-sm"
              >
                {c.label}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
}
