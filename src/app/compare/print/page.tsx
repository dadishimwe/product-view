import { Suspense } from "react";
import ComparePrintClient from "./ComparePrintClient";

export default function ComparePrintPage() {
  return (
    <Suspense fallback={null}>
      <ComparePrintClient />
    </Suspense>
  );
}
