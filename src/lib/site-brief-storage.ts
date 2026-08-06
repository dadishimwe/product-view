import type { SiteBriefData, SiteBriefItem } from "@/types/site-brief";

const STORAGE_KEY = "deviceview-site-brief-v1";
const LEGACY_NOTES_KEY = "deviceview-site-notes";

const empty: SiteBriefData = { items: [], scratch: "" };

export function newBriefItem(
  text: string,
  linkedSlug?: string,
): SiteBriefItem {
  return {
    id: crypto.randomUUID(),
    text: text.trim(),
    done: false,
    linkedSlug,
    createdAt: Date.now(),
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
      const parsed = JSON.parse(raw) as SiteBriefData;
      return {
        items: Array.isArray(parsed.items) ? parsed.items : [],
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
