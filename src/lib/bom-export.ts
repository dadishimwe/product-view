import type { Product, SpecGroup } from "@/types/product";
import { SPEC_GROUP_LABELS } from "@/types/product";
import { officialDatasheetUrl } from "@/lib/product-links";

export function buildSpecRows(products: Product[]) {
  const groups = (Object.keys(SPEC_GROUP_LABELS) as SpecGroup[]).filter((g) =>
    products.some((p) => Object.keys(p.specs[g] ?? {}).length > 0),
  );
  const rows: {
    group: SpecGroup;
    key: string;
    values: string[];
    differs: boolean;
  }[] = [];

  for (const group of groups) {
    const keys = new Set<string>();
    for (const p of products) {
      Object.keys(p.specs[group] ?? {}).forEach((k) => keys.add(k));
    }
    for (const key of keys) {
      const values = products.map((p) => p.specs[group]?.[key] ?? "—");
      const differs = new Set(values).size > 1;
      rows.push({ group, key, values, differs });
    }
  }
  return rows;
}

function escapeCsv(value: string) {
  const v = value.replace(/\r\n/g, "\n");
  if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

function escapeMdCell(value: string) {
  return value.replace(/\|/g, "\\|").replace(/\n/g, " ");
}

export function exportBomCsv(products: Product[], title = "DeviceView comparison") {
  const rows = buildSpecRows(products);
  const lines: string[] = [];

  lines.push(
    [
      "Vendor",
      "Model",
      "SKU",
      "Category",
      "Form factor",
      "Power (max W)",
      "Rack (U)",
      "Input voltage",
      "Official datasheet URL",
    ]
      .map(escapeCsv)
      .join(","),
  );

  for (const p of products) {
    lines.push(
      [
        p.vendor,
        p.name,
        p.sku,
        p.category,
        p.formFactor,
        p.deployment?.powerWattsMax?.toString() ?? "",
        p.deployment?.rackUnits?.toString() ?? "",
        p.deployment?.inputVoltage ?? "",
        officialDatasheetUrl(p) ?? "",
      ]
        .map(escapeCsv)
        .join(","),
    );
  }

  lines.push("");
  lines.push(
    ["Spec group", "Spec", ...products.map((p) => p.name)]
      .map(escapeCsv)
      .join(","),
  );

  for (const r of rows) {
    lines.push(
      [SPEC_GROUP_LABELS[r.group], r.key, ...r.values]
        .map(escapeCsv)
        .join(","),
    );
  }

  return `\uFEFF${lines.join("\r\n")}`;
}

export function exportBomMarkdown(
  products: Product[],
  title = "DeviceView comparison",
) {
  const rows = buildSpecRows(products);
  const date = new Date().toISOString().slice(0, 10);

  let md = `# ${title}\n\n`;
  md += `Generated ${date}\n\n`;
  md += "## Hardware line items\n\n";
  md += "| Vendor | Model | SKU | Category | Power (max W) | Rack (U) | Datasheet |\n";
  md += "| --- | --- | --- | --- | --- | --- | --- |\n";

  for (const p of products) {
    const ds = officialDatasheetUrl(p);
    const dsCell = ds ? `[Official specs](${ds})` : "—";
    md += `| ${escapeMdCell(p.vendor)} | ${escapeMdCell(p.name)} | ${escapeMdCell(p.sku)} | ${escapeMdCell(p.category)} | ${p.deployment?.powerWattsMax ?? "—"} | ${p.deployment?.rackUnits ?? "—"} | ${dsCell} |\n`;
  }

  md += "\n## Side-by-side specifications\n\n";

  let currentGroup: SpecGroup | null = null;
  for (const r of rows) {
    if (r.group !== currentGroup) {
      currentGroup = r.group;
      md += `\n### ${SPEC_GROUP_LABELS[r.group]}\n\n`;
      md += `| Spec | ${products.map((p) => escapeMdCell(p.name)).join(" | ")} |\n`;
      md += `| --- | ${products.map(() => "---").join(" | ")} |\n`;
    }
    md += `| ${escapeMdCell(r.key)} | ${r.values.map(escapeMdCell).join(" | ")} |\n`;
  }

  md += "\n---\n\n*Verify critical values against vendor datasheets before quoting or deploying.*\n";

  return md;
}

export function downloadTextFile(
  content: string,
  filename: string,
  mime: string,
) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.setTimeout(() => URL.revokeObjectURL(url), 500);
}

export function comparisonExportBasename(products: Product[]) {
  const slugPart = products.map((p) => p.sku.replace(/[^\w-]+/g, "-")).join("_");
  const stamp = new Date().toISOString().slice(0, 10);
  return `deviceview-compare-${slugPart.slice(0, 80)}-${stamp}`;
}
