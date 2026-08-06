"use client";

import { CompareTable } from "@/components/compare/CompareTable";
import { useApp } from "@/context/AppContext";
import { getProductsBySlugs } from "@/lib/products";

export default function ComparePage() {
  const { compare, hydrated } = useApp();
  const products = getProductsBySlugs(compare);

  return (
    <div className="mx-auto max-w-6xl flex-1 p-4 sm:p-8">
      <p className="field-label">Side-by-side</p>
      <h1 className="mb-2 font-display text-2xl font-bold">Compare</h1>
      <p className="mb-8 text-sm text-graphite">
        Add up to four products from any detail panel. Rows with differing values
        are highlighted.
      </p>
      {!hydrated ? (
        <p className="text-sm text-graphite">Loading comparison…</p>
      ) : (
        <CompareTable products={products} />
      )}
    </div>
  );
}
