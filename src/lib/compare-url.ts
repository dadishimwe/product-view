export function compareSlugsToParam(slugs: string[]) {
  return slugs.filter(Boolean).join(",");
}

export function parseCompareParam(param: string | null): string[] {
  if (!param?.trim()) return [];
  return param
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);
}
