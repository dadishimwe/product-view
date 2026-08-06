"use client";

import { CompareTable } from "@/components/compare/CompareTable";
import { useApp } from "@/context/AppContext";
import { getProductsBySlugs } from "@/lib/products";

export default function ComparePage() {
  const { compare, hydrated } = useApp();
  const products = getProductsBySlugs(compare);

  return (
    <div className="mx-auto max-w-6xl flex-1 p-4 sm:p-8">
      <h1 className="mb-2 text-2xl font-semibold tracking-tight">Compare</h1>
      <p className="mb-8 text-sm text-neutral-600">
        Add up to four products from any detail panel. Rows with differing values
        are highlighted.
      </p>
      {!hydrated ? (
        <p className="text-sm text-neutral-500">Loading comparison…</p>
      ) : (
        <CompareTable products={products} />
      )}
    </div>
  );
}
