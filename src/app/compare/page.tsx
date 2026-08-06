import { Suspense } from "react";
import ComparePageClient from "./ComparePageClient";

export default function ComparePage() {
  return (
    <Suspense fallback={<p className="p-8 text-sm text-graphite">Loading…</p>}>
      <ComparePageClient />
    </Suspense>
  );
}
