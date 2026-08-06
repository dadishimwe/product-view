import type { VendorFolder } from "@/types/product";

const VENDOR_FOLDER: Record<string, VendorFolder> = {
  peplink: "peplink",
  pepwave: "peplink",
  starlink: "starlink",
  fortinet: "fortinet",
};

export function vendorFolder(vendor: string): VendorFolder {
  const key = vendor.trim().toLowerCase();
  return VENDOR_FOLDER[key] ?? "peplink";
}

/** Public URL for a cut-out product photo (PNG or WebP with alpha). */
export function productImagePath(
  slug: string,
  vendor: string,
  view: "front" | "rear" | string = "front",
): string {
  const folder = vendorFolder(vendor);
  const suffix = view === "front" ? "" : `-${view}`;
  return `/products/${folder}/${slug}${suffix}.png`;
}
