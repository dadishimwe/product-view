"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { filterProducts, getFilterOptions, groupByVendor } from "@/lib/products";

interface ProductLibraryProps {
  selectedSlug?: string;
  onSelect: (slug: string) => void;
  compact?: boolean;
}

export function ProductLibrary({
  selectedSlug,
  onSelect,
  compact = false,
}: ProductLibraryProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [formFactor, setFormFactor] = useState("");
  const [priceBand, setPriceBand] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const { categories, formFactors, priceBands } = getFilterOptions();

  const filtered = useMemo(
    () =>
      filterProducts({
        query,
        category: category || undefined,
        formFactor: formFactor || undefined,
        priceBand: priceBand || undefined,
      }),
    [query, category, formFactor, priceBand],
  );

  const grouped = useMemo(() => groupByVendor(filtered), [filtered]);
  const vendors = [...grouped.keys()].sort();

  const toggleVendor = (vendor: string) => {
    setExpanded((e) => ({ ...e, [vendor]: !(e[vendor] ?? true) }));
  };

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-display text-base font-bold text-ink">Product library</h2>
        <button
          type="button"
          className="rounded-full border-2 border-ink p-1.5 active:scale-[0.94]"
          aria-label={filtersOpen ? "Hide filters" : "Show filters"}
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen((o) => !o)}
        >
          <span aria-hidden className="text-sm">
            ⚙
          </span>
        </button>
      </div>

      <label className="sr-only" htmlFor="library-search">
        Search products
      </label>
      <input
        id="library-search"
        type="search"
        placeholder="Search name or SKU…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="field-input"
      />

      {filtersOpen ? (
        <div className="grid gap-2 text-sm">
          <select
            aria-label="Filter by category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="field-input"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <select
            aria-label="Filter by form factor"
            value={formFactor}
            onChange={(e) => setFormFactor(e.target.value)}
            className="field-input"
          >
            <option value="">All form factors</option>
            {formFactors.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <select
            aria-label="Filter by price band"
            value={priceBand}
            onChange={(e) => setPriceBand(e.target.value)}
            className="field-input"
          >
            <option value="">All price bands</option>
            {priceBands.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div className="min-h-0 flex-1 overflow-y-auto pr-0.5">
        {vendors.map((vendor) => {
          const items = grouped.get(vendor) ?? [];
          const isOpen = expanded[vendor] ?? true;
          const shown = compact ? items.slice(0, 3) : items;
          return (
            <div key={vendor} className="mb-5">
              <button
                type="button"
                className="vendor-band mb-2 flex w-full items-center justify-between text-left"
                onClick={() => toggleVendor(vendor)}
                aria-expanded={isOpen}
              >
                {vendor} devices
                <span aria-hidden className="text-ink">
                  {isOpen ? "−" : "+"}
                </span>
              </button>
              {isOpen ? (
                <ul className="space-y-1.5">
                  {shown.map((p) => (
                    <ProductRow
                      key={p.slug}
                      product={p}
                      selected={p.slug === selectedSlug}
                      onSelect={() => onSelect(p.slug)}
                    />
                  ))}
                  {compact && items.length > 3 ? (
                    <li>
                      <Link href="/products" className="text-link text-xs">
                        View more…
                      </Link>
                    </li>
                  ) : null}
                </ul>
              ) : null}
            </div>
          );
        })}
      </div>

      <Link href="/products" className="pill-btn mt-auto w-full text-center">
        View all products
      </Link>
    </div>
  );
}

function ProductRow({
  product,
  selected,
  onSelect,
}: {
  product: Product;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        className={`flex w-full items-center gap-2 rounded-[14px] border-2 px-2 py-1.5 text-left text-sm transition-[transform,background-color] active:scale-[0.99] ${
          selected
            ? "border-ink bg-mist shadow-[2px_3px_0_#14121f]"
            : "border-transparent hover:border-ink/30 hover:bg-mist/60"
        }`}
      >
        <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-md border-2 border-ink bg-panel">
          <Image
            src={product.images[0].src}
            alt=""
            fill
            className="object-contain p-0.5"
            sizes="36px"
          />
        </span>
        <span className="min-w-0 truncate font-display font-semibold">
          {product.name}
        </span>
      </button>
    </li>
  );
}
