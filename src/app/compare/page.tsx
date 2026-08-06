import type { Metadata } from "next";
import { Suspense } from "react";
import ComparePageClient from "./ComparePageClient";

export const metadata: Metadata = {
  title: "Compare hardware",
  description:
    "Side-by-side comparison of up to four Peplink, Starlink, and Fortinet devices with exportable CSV, Markdown, and print-ready BOM.",
  alternates: {
    canonical: "/compare",
  },
};

export default function ComparePage() {
  return (
    <Suspense fallback={<p className="p-8 text-sm text-graphite">Loading…</p>}>
      <ComparePageClient />
    </Suspense>
  );
}
