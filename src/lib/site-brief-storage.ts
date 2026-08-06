import type { SiteBriefData, SiteBriefItem } from "@/types/site-brief";

const STORAGE_KEY = "deviceview-site-brief-v1";
const LEGACY_NOTES_KEY = "deviceview-site-notes";

const empty: SiteBriefData = { items: [], scratch: "" };

function toSlugList(linked?: string | string[]): string[] {
  if (!linked) return [];
  if (Array.isArray(linked)) return linked.filter(Boolean);
  return linked ? [linked] : [];
}

export function newBriefItem(
  text: string,
  linked?: string | string[],
): SiteBriefItem {
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    done: false,
    linkedSlugs: toSlugList(linked),
    createdAt: Date.now(),
  };
}

function normalizeItem(raw: Record<string, unknown>): SiteBriefItem {
  const linkedSlugs = Array.isArray(raw.linkedSlugs)
    ? (raw.linkedSlugs as string[]).filter(Boolean)
    : typeof raw.linkedSlug === "string" && raw.linkedSlug
      ? [raw.linkedSlug]
      : [];

  return {
    id: String(raw.id ?? crypto.randomUUID()),
    text: String(raw.text ?? ""),
    done: Boolean(raw.done),
    linkedSlugs,
    createdAt: typeof raw.createdAt === "number" ? raw.createdAt : Date.now(),
  };
}

function migrateLegacyNotes(): SiteBriefData | null {
  try {
    const legacy = localStorage.getItem(LEGACY_NOTES_KEY);
    if (!legacy?.trim()) return null;
    const isDefault =
      legacy.trim() === "Site constraints · Power · Cable paths · Mounting";
    if (isDefault) return { items: [], scratch: "" };
    return {
      items: [],
      scratch: legacy.trim(),
    };
  } catch {
    return null;
  }
}

export function loadSiteBrief(): SiteBriefData {
  if (typeof window === "undefined") return empty;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as {
        items?: unknown[];
        scratch?: string;
      };
      return {
        items: Array.isArray(parsed.items)
          ? parsed.items.map((i) =>
              normalizeItem(i as Record<string, unknown>),
            )
          : [],
        scratch: typeof parsed.scratch === "string" ? parsed.scratch : "",
      };
    }
    return migrateLegacyNotes() ?? empty;
  } catch {
    return empty;
  }
}

export function saveSiteBrief(data: SiteBriefData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
