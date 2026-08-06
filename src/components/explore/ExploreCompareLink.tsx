"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";

export function ExploreCompareLink() {
  const { compare, hydrated } = useApp();
  if (!hydrated || compare.length === 0) return null;
  return (
    <section className="catalog-panel border-signal bg-[#fff4eb] px-4 py-3 text-sm">
      <span className="font-display font-bold">{compare.length} product(s)</span> in
      your comparison.{" "}
      <Link href="/compare" className="text-link">
        Continue comparing →
      </Link>
    </section>
  );
}
