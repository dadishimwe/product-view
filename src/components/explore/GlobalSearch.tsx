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
    <div className={`relative ${large ? "w-full max-w-xl" : "w-full"}`}>
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
        className={`w-full rounded-full border border-neutral-300 bg-white px-4 text-neutral-950 outline-none ring-accent focus:ring-2 ${
          large ? "py-3 text-base" : "py-2 text-sm"
        }`}
      />
      {results.length > 0 ? (
        <ul
          className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-lg"
          role="listbox"
        >
          {results.map((p) => (
            <li key={p.slug} role="option">
              <Link
                href={`/products/${p.slug}`}
                className="block px-4 py-2.5 text-sm hover:bg-neutral-50"
                onClick={() => setQuery("")}
              >
                <span className="font-medium">{p.name}</span>
                <span className="text-neutral-500"> · {p.sku}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
