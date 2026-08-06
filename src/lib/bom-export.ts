import type { Product, SpecGroup } from "@/types/product";
import { SPEC_GROUP_LABELS } from "@/types/product";

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
  if (/[",\n]/.test(value)) return `"${value.replace(/"/g, '""')}"`;
  return value;
}

export function exportBomCsv(products: Product[], title = "DeviceView BOM") {
  const lines: string[] = [];
  lines.push(`# ${title}`);
  lines.push(
    ["Vendor", "Model", "SKU", "Category", "Form factor", "Power (max W)", "Rack (U)", "Input"].map(escapeCsv).join(","),
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
      ]
        .map(escapeCsv)
        .join(","),
    );
  }
  lines.push("");
  lines.push("Specs");
  const rows = buildSpecRows(products);
  for (const r of rows) {
    lines.push(
      [
        SPEC_GROUP_LABELS[r.group],
        r.key,
        ...r.values,
      ]
        .map(escapeCsv)
        .join(","),
    );
  }
  return lines.join("\n");
}

export function exportBomMarkdown(products: Product[], title = "DeviceView BOM") {
  const rows = buildSpecRows(products);
  let md = `# ${title}\n\n`;
  md += `Generated ${new Date().toISOString().slice(0, 10)}\n\n`;
  md += "## Hardware\n\n";
  md += "| Vendor | Model | SKU | Category | Power (max W) | Rack (U) |\n";
  md += "| --- | --- | --- | --- | --- | --- |\n";
  for (const p of products) {
    md += `| ${p.vendor} | ${p.name} | ${p.sku} | ${p.category} | ${p.deployment?.powerWattsMax ?? "—"} | ${p.deployment?.rackUnits ?? "—"} |\n`;
  }
  md += "\n## Specifications\n\n";
  let currentGroup: SpecGroup | null = null;
  for (const r of rows) {
    if (r.group !== currentGroup) {
      currentGroup = r.group;
      md += `\n### ${SPEC_GROUP_LABELS[r.group]}\n\n`;
      md += `| Spec | ${products.map((p) => p.name).join(" | ")} |\n`;
      md += `| --- | ${products.map(() => "---").join(" | ")} |\n`;
    }
    md += `| ${r.key} | ${r.values.join(" | ")} |\n`;
  }
  return md;
}

export function downloadTextFile(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
