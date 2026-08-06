import type { SiteBriefItem } from "@/types/site-brief";
import { getProductBySlug } from "@/lib/products";

function linkedDeviceNames(item: SiteBriefItem): string {
  return item.linkedSlugs
    .map((s) => getProductBySlug(s)?.name ?? s)
    .join("; ");
}

export function appendSiteBriefMarkdown(
  md: string,
  items: SiteBriefItem[],
  scratch: string,
): string {
  if (items.length === 0 && !scratch.trim()) return md;

  let section = "\n## Site brief\n\n";
  if (items.length > 0) {
    section += "| Done | Requirement | Linked devices |\n";
    section += "| --- | --- | --- |\n";
    for (const item of items) {
      const done = item.done ? "Yes" : "No";
      const linked = linkedDeviceNames(item) || "—";
      const text = item.text.replace(/\|/g, "\\|").replace(/\n/g, " ");
      section += `| ${done} | ${text} | ${linked} |\n`;
    }
    section += "\n";
  }
  if (scratch.trim()) {
    section += "### Project context\n\n";
    section += `${scratch.trim()}\n\n`;
  }
  return md + section;
}

export function appendSiteBriefCsv(
  csv: string,
  items: SiteBriefItem[],
  scratch: string,
): string {
  if (items.length === 0 && !scratch.trim()) return csv;

  const escapeCsv = (value: string) => {
    const v = value.replace(/\r\n/g, "\n");
    if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
    return v;
  };

  const lines: string[] = [];
  lines.push("");
  lines.push("Site brief");
  lines.push(["Done", "Requirement", "Linked devices"].map(escapeCsv).join(","));
  for (const item of items) {
    lines.push(
      [
        item.done ? "Yes" : "No",
        item.text,
        linkedDeviceNames(item),
      ]
        .map(escapeCsv)
        .join(","),
    );
  }
  if (scratch.trim()) {
    lines.push("");
    lines.push("Project context");
    lines.push(escapeCsv(scratch.trim()));
  }
  return `${csv}\r\n${lines.join("\r\n")}`;
}
