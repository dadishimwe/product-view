"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { searchProducts } from "@/lib/products";

export function GlobalSearch({ large }: { large?: boolean }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const results = query.trim().length >= 2 ? searchProducts(query).slice(0, 6) : [];

  return (
    <div className={`relative ${large ? "w-full" : "w-full"}`}>
      <label className="sr-only" htmlFor="global-search">
        Search products by name or SKU
      </label>
      <input
        id="global-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && results[0]) {
            router.push(`/products/${results[0].slug}`);
            setQuery("");
          }
        }}
        placeholder="Search by product name or SKU…"
        className={`field-input ${large ? "py-3 text-base" : ""}`}
      />
      {results.length > 0 ? (
        <ul className="catalog-panel absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden shadow-[4px_6px_0_#14121f]">
          {results.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/products/${p.slug}`}
                className="block border-b-2 border-ink/10 px-4 py-2.5 text-sm last:border-b-0 hover:bg-mist"
                onClick={() => setQuery("")}
              >
                <span className="font-display font-semibold">{p.name}</span>
                <span className="font-mono text-graphite"> · {p.sku}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
