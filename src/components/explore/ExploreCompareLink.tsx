"use client";

import Link from "next/link";
import { useApp } from "@/context/AppContext";

export function ExploreCompareLink() {
  const { compare, hydrated } = useApp();
  if (!hydrated || compare.length === 0) return null;
  return (
    <section className="rounded-xl border border-accent/20 bg-accent/5 px-4 py-3 text-sm">
      <span className="font-medium">{compare.length} product(s)</span> in your
      comparison.{" "}
      <Link href="/compare" className="font-semibold text-accent hover:underline">
        Continue comparing →
      </Link>
    </section>
  );
}
