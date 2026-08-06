"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/types/product";
import { filterProducts, getFilterOptions, groupByVendor } from "@/lib/products";
import { paletteShortcutLabel } from "@/lib/shortcut-label";
import { ProductMedia } from "./ProductMedia";
import { VendorLogo } from "@/components/brand/VendorLogo";

const VENDOR_PREVIEW_COUNT = 3;

interface ProductLibraryProps {
  selectedSlug?: string;
  onSelect: (slug: string) => void;
}

function FilterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M4 6h16M7 12h10M10 18h4"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      <circle cx="6" cy="6" r="2" fill="var(--panel)" stroke="currentColor" strokeWidth="2" />
      <circle cx="14" cy="12" r="2" fill="var(--panel)" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="18" r="2" fill="var(--panel)" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function ProductLibrary({
  selectedSlug,
  onSelect,
}: ProductLibraryProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [formFactor, setFormFactor] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [vendorSectionsOpen, setVendorSectionsOpen] = useState<
    Record<string, boolean>
  >({});
  const [vendorListExpanded, setVendorListExpanded] = useState<
    Record<string, boolean>
  >({});
  const [searchPlaceholder, setSearchPlaceholder] = useState(
    "Search name or SKU… · ⌘K",
  );

  useEffect(() => {
    const shortcut = paletteShortcutLabel();
    setSearchPlaceholder(`Search name or SKU… · ${shortcut}`);
  }, []);

  const { categories, formFactors } = getFilterOptions();

  const filtered = useMemo(
    () =>
      filterProducts({
        query,
        category: category || undefined,
        formFactor: formFactor || undefined,
      }),
    [query, category, formFactor],
  );

  const grouped = useMemo(() => groupByVendor(filtered), [filtered]);
  const vendors = [...grouped.keys()].sort();

  const toggleVendorSection = (vendor: string) => {
    setVendorSectionsOpen((e) => ({ ...e, [vendor]: !(e[vendor] ?? true) }));
  };

  const toggleVendorList = (vendor: string) => {
    setVendorListExpanded((e) => ({ ...e, [vendor]: !e[vendor] }));
  };

  const filtersActive = Boolean(category || formFactor);

  return (
    <div className="flex h-full flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-display text-base font-bold text-ink">Product library</h2>
        <button
          type="button"
          className="filter-toggle-btn"
          data-active={filtersOpen || filtersActive ? "true" : "false"}
          aria-label={filtersOpen ? "Hide filters" : "Show filters"}
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen((o) => !o)}
        >
          <FilterIcon />
          <span className="hidden font-display text-xs font-semibold sm:inline">
            Filters
          </span>
        </button>
      </div>

      <label className="sr-only" htmlFor="library-search">
        Search products
      </label>
      <input
        id="library-search"
        type="search"
        placeholder={searchPlaceholder}
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
        </div>
      ) : null}

      <div className="min-h-0 flex-1 overflow-y-auto pr-0.5">
        {vendors.map((vendor) => {
          const items = grouped.get(vendor) ?? [];
          const sectionOpen = vendorSectionsOpen[vendor] ?? true;
          const listExpanded = vendorListExpanded[vendor] ?? false;
          const hasMore = items.length > VENDOR_PREVIEW_COUNT;
          let shown =
            listExpanded || !hasMore
              ? items
              : items.slice(0, VENDOR_PREVIEW_COUNT);
          if (
            !listExpanded &&
            hasMore &&
            selectedSlug &&
            items.some((p) => p.slug === selectedSlug) &&
            !shown.some((p) => p.slug === selectedSlug)
          ) {
            const selected = items.find((p) => p.slug === selectedSlug)!;
            shown = [...shown.slice(0, VENDOR_PREVIEW_COUNT - 1), selected];
          }
          return (
            <div key={vendor} className="mb-5">
              <button
                type="button"
                className="vendor-band mb-2 flex w-full items-center justify-between gap-2 text-left"
                onClick={() => toggleVendorSection(vendor)}
                aria-expanded={sectionOpen}
              >
                <span className="flex min-w-0 items-center gap-2">
                  <VendorLogo vendor={vendor} height={16} />
                  <span className="truncate">{vendor} devices</span>
                </span>
                <span aria-hidden className="shrink-0 text-ink">
                  {sectionOpen ? "−" : "+"}
                </span>
              </button>
              {sectionOpen ? (
                <ul className="space-y-1.5">
                  {shown.map((p) => (
                    <ProductRow
                      key={p.slug}
                      product={p}
                      selected={p.slug === selectedSlug}
                      onSelect={() => onSelect(p.slug)}
                    />
                  ))}
                  {hasMore ? (
                    <li>
                      <button
                        type="button"
                        className="text-link px-2 text-xs font-semibold"
                        onClick={() => toggleVendorList(vendor)}
                      >
                        {listExpanded
                          ? "View less"
                          : `View more (${items.length - VENDOR_PREVIEW_COUNT})`}
                      </button>
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
          <ProductMedia
            src={product.images[0].src}
            fallbackSrc={product.images[0].fallbackSrc}
            alt=""
            className="object-contain p-0.5"
            sizes="36px"
          />
        </span>
        <span className="min-w-0 flex-1 truncate font-display font-semibold">
          {product.name}
        </span>
        <VendorLogo vendor={product.vendor} height={14} className="opacity-80" />
      </button>
    </li>
  );
}
