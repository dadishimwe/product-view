"use client";

import type { Product } from "@/types/product";
import {
  downloadTextFile,
  exportBomCsv,
  exportBomMarkdown,
} from "@/lib/bom-export";
import { Button } from "@/components/ui/Button";
import { compareSlugsToParam } from "@/lib/compare-url";

export function BomExportActions({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  const print = () => {
    const param = compareSlugsToParam(products.map((p) => p.slug));
    window.open(`/compare/print?p=${encodeURIComponent(param)}`, "_blank");
  };

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        variant="secondary"
        className="!text-xs"
        onClick={() =>
          downloadTextFile(
            exportBomCsv(products),
            `deviceview-bom-${Date.now()}.csv`,
            "text/csv;charset=utf-8",
          )
        }
      >
        Export CSV
      </Button>
      <Button
        variant="secondary"
        className="!text-xs"
        onClick={() =>
          downloadTextFile(
            exportBomMarkdown(products),
            `deviceview-bom-${Date.now()}.md`,
            "text/markdown;charset=utf-8",
          )
        }
      >
        Export Markdown
      </Button>
      <Button variant="secondary" className="!text-xs" onClick={print}>
        Print / PDF
      </Button>
    </div>
  );
}
