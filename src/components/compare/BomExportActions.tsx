"use client";

import type { Product } from "@/types/product";
import {
  comparisonExportBasename,
  downloadTextFile,
  exportBomCsv,
  exportBomMarkdown,
} from "@/lib/bom-export";
import { Button } from "@/components/ui/Button";
import { compareSlugsToParam } from "@/lib/compare-url";
import { useSiteBrief } from "@/context/SiteBriefContext";
import { ShareLinkHandoff } from "@/components/share/ShareLinkHandoff";

export function BomExportActions({ products }: { products: Product[] }) {
  const { items, scratch } = useSiteBrief();
  const siteBrief = { items, scratch };

  if (products.length === 0) return null;

  const base = comparisonExportBasename(products);
  const slugs = products.map((p) => p.slug);

  const print = () => {
    const param = compareSlugsToParam(slugs);
    window.open(`/compare/print?p=${encodeURIComponent(param)}`, "_blank");
  };

  return (
    <div className="flex flex-col gap-2 sm:items-end">
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          className="!text-xs"
          onClick={() =>
            downloadTextFile(
              exportBomCsv(products, "DeviceView comparison", siteBrief),
              `${base}.csv`,
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
              exportBomMarkdown(products, "DeviceView comparison", siteBrief),
              `${base}.md`,
              "text/markdown;charset=utf-8",
            )
          }
        >
          Export Markdown
        </Button>
        <Button variant="secondary" className="!text-xs" onClick={print}>
          Print / PDF
        </Button>
        <ShareLinkHandoff kind="compare" productSlugs={slugs} />
      </div>
      {items.length > 0 || scratch.trim() ? (
        <p className="text-[0.65rem] text-graphite">
          Exports include your site brief from this browser.
        </p>
      ) : null}
    </div>
  );
}
