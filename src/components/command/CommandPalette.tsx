"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { searchProducts, getProductsBySlugs } from "@/lib/products";
import { useApp } from "@/context/AppContext";

type Item =
  | { type: "nav"; label: string; href: string }
  | { type: "product"; label: string; sub: string; href: string }
  | { type: "search"; label: string; href: string };

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  const {
    recentSearches,
    recentlyViewed,
    favorites,
    recordSearch,
    hydrated,
  } = useApp();

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
        list.push({
          type: "product",
          label: p.name,
          sub: p.sku,
          href: `/products/${p.slug}`,
        });
      }
      return list;
    }

    const products = searchProducts(query).slice(0, 12);
    for (const p of products) {
      list.push({
        type: "product",
        label: p.name,
        sub: `${p.vendor} · ${p.sku}`,
        href: `/products/${p.slug}`,
      });
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
                  className="flex w-full flex-col items-start px-4 py-2.5 text-left hover:bg-mist active:scale-[0.99]"
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
                  <span className="font-display text-sm font-semibold text-ink">
                    {item.type === "nav" ? `Go to ${item.label}` : item.label}
                  </span>
                  {"sub" in item && item.sub ? (
                    <span className="font-mono text-xs text-graphite">{item.sub}</span>
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
