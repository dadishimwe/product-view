export interface SiteBriefItem {
  id: string;
  text: string;
  done: boolean;
  /** Product slug when this line is tied to a catalog device */
  linkedSlug?: string;
  createdAt: number;
}

export interface SiteBriefData {
  items: SiteBriefItem[];
  /** Freeform scratch space (optional context for the project) */
  scratch: string;
}
