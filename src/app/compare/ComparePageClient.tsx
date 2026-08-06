"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CompareTable } from "@/components/compare/CompareTable";
import { useApp } from "@/context/AppContext";
import { getProductsBySlugs } from "@/lib/products";
import {
  compareSlugsToParam,
  parseCompareParam,
} from "@/lib/compare-url";

export default function ComparePageClient() {
  const { compare, hydrated, setCompareSlugs } = useApp();
  const products = getProductsBySlugs(compare);
  const searchParams = useSearchParams();
  const router = useRouter();
  const ready = useRef(false);

  useEffect(() => {
    if (!hydrated || ready.current) return;
    ready.current = true;
    const fromUrl = parseCompareParam(searchParams.get("p"));
    if (fromUrl.length > 0) {
      setCompareSlugs(fromUrl);
    }
  }, [hydrated, searchParams, setCompareSlugs]);

  useEffect(() => {
    if (!hydrated || !ready.current) return;
    const param = compareSlugsToParam(compare);
    const next = param ? `/compare?p=${encodeURIComponent(param)}` : "/compare";
    router.replace(next, { scroll: false });
  }, [compare, hydrated, router]);

  return (
    <div className="mx-auto max-w-6xl flex-1 overflow-x-hidden px-4 py-4 sm:p-8">
      <p className="field-label">Side-by-side</p>
      <h1 className="mb-2 font-display text-2xl font-bold">Compare</h1>
      <p className="mb-6 text-sm text-graphite">
        Add up to four products from any detail panel. Share this page URL to pass
        the same stack to a colleague.
      </p>
      {!hydrated ? (
        <p className="text-sm text-graphite">Loading comparison…</p>
      ) : (
        <CompareTable products={products} />
      )}
    </div>
  );
}
