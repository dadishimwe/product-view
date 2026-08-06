import { compareSlugsToParam, parseCompareParam } from "@/lib/compare-url";
import { SHARE_NOTE_PARAM } from "@/lib/share-url";

/** Compare route path + query; preserves share note token when provided. */
export function buildCompareRoutePath(
  compareSlugs: string[],
  noteToken: string | null,
): string {
  const params = new URLSearchParams();
  const p = compareSlugsToParam(compareSlugs);
  if (p) params.set("p", p);
  if (noteToken) params.set(SHARE_NOTE_PARAM, noteToken);
  const q = params.toString();
  return q ? `/compare?${q}` : "/compare";
}

export function parseCompareSearchParams(searchParams: URLSearchParams) {
  return {
    slugs: parseCompareParam(searchParams.get("p")),
    noteToken: searchParams.get(SHARE_NOTE_PARAM),
  };
}
