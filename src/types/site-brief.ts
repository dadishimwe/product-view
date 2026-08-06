export interface SiteBriefItem {
  id: string;
  text: string;
  done: boolean;
  /** Catalog product slugs tied to this requirement */
  linkedSlugs: string[];
  createdAt: number;
}

export interface SiteBriefData {
  items: SiteBriefItem[];
  /** Freeform scratch space (optional context for the project) */
  scratch: string;
}

/** @deprecated migrated from v1 single slug */
export type SiteBriefItemLegacy = SiteBriefItem & { linkedSlug?: string };
