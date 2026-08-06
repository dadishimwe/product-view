"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { searchProducts, getProductsBySlugs } from "@/lib/products";
import { useApp } from "@/context/AppContext";
import { VendorLogo } from "@/components/brand/VendorLogo";
import { ProductMedia } from "@/components/products/ProductMedia";

type Item =
  | { type: "nav"; label: string; href: string }
  | {
      type: "product";
      label: string;
      sub: string;
      href: string;
      vendor: string;
      imageSrc: string;
      imageFallback?: string;
    }
  | { type: "search"; label: string; href: string };

function pushProduct(
  list: Item[],
  p: ReturnType<typeof getProductsBySlugs>[number],
  sub?: string,
) {
  list.push({
    type: "product",
    label: p.name,
    sub: sub ?? p.sku,
    href: `/products/${p.slug}`,
    vendor: p.vendor,
    imageSrc: p.images[0].src,
    imageFallback: p.images[0].fallbackSrc,
  });
}

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const { recentSearches, recentlyViewed, recordSearch, hydrated } = useApp();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const items = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list: Item[] = [];

    if (!q) {
      list.push(
        { type: "nav", label: "Explore", href: "/" },
        { type: "nav", label: "Products", href: "/products" },
        { type: "nav", label: "Compare", href: "/compare" },
        { type: "nav", label: "Library", href: "/library" },
      );
      for (const s of recentSearches) {
        list.push({
          type: "search",
          label: s,
          href: `/products?q=${encodeURIComponent(s)}`,
        });
      }
      const recent = getProductsBySlugs(recentlyViewed).slice(0, 6);
      for (const p of recent) {
        pushProduct(list, p);
      }
      return list;
    }

    const products = searchProducts(query).slice(0, 12);
    for (const p of products) {
      pushProduct(list, p, `${p.vendor} · ${p.sku}`);
    }
    return list;
  }, [query, recentSearches, recentlyViewed]);

  if (!open || !hydrated) return null;

  const go = (href: string, searchTerm?: string) => {
    if (searchTerm) recordSearch(searchTerm);
    setOpen(false);
    setQuery("");
    router.push(href);
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-ink/40 p-4 pt-[12vh]"
      role="dialog"
      aria-label="Command palette"
      onClick={() => setOpen(false)}
    >
      <div
        className="catalog-frame w-full max-w-lg overflow-hidden bg-panel shadow-[6px_8px_0_#14121f]"
        onClick={(e) => e.stopPropagation()}
      >
        <label className="sr-only" htmlFor="command-input">
          Search products and commands
        </label>
        <input
          id="command-input"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && items[0]) {
              const first = items[0];
              go(
                first.href,
                first.type === "search" ? first.label : query.trim() || undefined,
              );
            }
          }}
          placeholder="Search SKU, model, vendor…"
          className="w-full border-b-2 border-ink px-4 py-3 font-sans text-base outline-none"
        />
        <ul className="max-h-[min(50vh,360px)] overflow-y-auto py-1" role="listbox">
          {items.length === 0 ? (
            <li className="px-4 py-3 text-sm text-graphite">No matches</li>
          ) : (
            items.map((item, i) => (
              <li key={`${item.type}-${item.label}-${i}`}>
                <button
                  type="button"
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-mist active:scale-[0.99]"
                  onClick={() =>
                    go(
                      item.href,
                      item.type === "search"
                        ? item.label
                        : query.trim().length >= 2
                          ? query.trim()
                          : undefined,
                    )
                  }
                >
                  {item.type === "product" ? (
                    <span className="relative h-9 w-9 shrink-0 overflow-hidden border-2 border-ink bg-mist">
                      <ProductMedia
                        src={item.imageSrc}
                        fallbackSrc={item.imageFallback}
                        alt=""
                        className="object-contain p-0.5"
                        sizes="36px"
                      />
                    </span>
                  ) : (
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-ink/30 bg-mist font-mono text-xs text-graphite">
                      {item.type === "nav" ? "→" : "⌕"}
                    </span>
                  )}
                  <span className="min-w-0 flex-1">
                    <span className="block font-display text-sm font-semibold text-ink">
                      {item.type === "nav" ? `Go to ${item.label}` : item.label}
                    </span>
                    {"sub" in item && item.sub ? (
                      <span className="block font-mono text-xs text-graphite">
                        {item.sub}
                      </span>
                    ) : null}
                  </span>
                  {item.type === "product" ? (
                    <VendorLogo vendor={item.vendor} height={18} className="opacity-90" />
                  ) : null}
                </button>
              </li>
            ))
          )}
        </ul>
        <p className="border-t-2 border-ink/10 px-4 py-2 font-mono text-[0.65rem] text-graphite">
          ↑↓ Enter · Esc close · ⌘K / Ctrl+K
        </p>
      </div>
    </div>
  );
}
