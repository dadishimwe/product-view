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
        <h2 className="text-sm font-semibold text-neutral-950">Product library</h2>
        <button
          type="button"
          className="rounded-md p-1.5 text-neutral-500 hover:bg-neutral-100 active:scale-[0.97]"
          aria-label={filtersOpen ? "Hide filters" : "Show filters"}
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen((o) => !o)}
        >
          <span aria-hidden>⚙</span>
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
        className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm outline-none ring-accent focus:ring-2"
      />

      {filtersOpen ? (
        <div className="grid gap-2 text-sm">
          <select
            aria-label="Filter by category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="rounded-lg border border-neutral-200 px-2 py-1.5"
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
            className="rounded-lg border border-neutral-200 px-2 py-1.5"
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
            className="rounded-lg border border-neutral-200 px-2 py-1.5"
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

      <div className="min-h-0 flex-1 overflow-y-auto pr-1">
        {vendors.map((vendor) => {
          const items = grouped.get(vendor) ?? [];
          const isOpen = expanded[vendor] ?? true;
          const shown = compact ? items.slice(0, 3) : items;
          return (
            <div key={vendor} className="mb-4">
              <button
                type="button"
                className="mb-2 flex w-full items-center justify-between text-left text-xs font-semibold uppercase tracking-wide text-neutral-500"
                onClick={() => toggleVendor(vendor)}
                aria-expanded={isOpen}
              >
                {vendor}
                <span aria-hidden>{isOpen ? "−" : "+"}</span>
              </button>
              {isOpen ? (
                <ul className="space-y-1">
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
                      <Link
                        href="/products"
                        className="block py-1 text-xs font-medium text-accent hover:underline"
                      >
                        View all {vendor}…
                      </Link>
                    </li>
                  ) : null}
                </ul>
              ) : null}
            </div>
          );
        })}
      </div>

      <Link
        href="/products"
        className="mt-auto block rounded-full border border-neutral-300 py-2.5 text-center text-sm font-medium hover:bg-neutral-50 active:scale-[0.98] transition-transform"
      >
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
        className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors active:scale-[0.99] ${
          selected
            ? "bg-accent/10 text-neutral-950 ring-1 ring-accent/30"
            : "hover:bg-neutral-100"
        }`}
      >
        <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded border border-neutral-200 bg-white">
          <Image
            src={product.images[0].src}
            alt=""
            fill
            className="object-contain p-0.5"
            sizes="36px"
          />
        </span>
        <span className="min-w-0 truncate font-medium">{product.name}</span>
      </button>
    </li>
  );
}
