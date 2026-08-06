import Image from "next/image";
import { getVendorBrand } from "@/lib/vendor-branding";

export function VendorLogo({
  vendor,
  height = 22,
  className = "",
  priority,
}: {
  vendor: string;
  height?: number;
  className?: string;
  priority?: boolean;
}) {
  const brand = getVendorBrand(vendor);
  if (!brand) {
    return (
      <span className={`font-display text-xs font-bold uppercase ${className}`}>
        {vendor}
      </span>
    );
  }

  const width = Math.round(height * 2.75);

  return (
    <span
      className={`relative inline-block shrink-0 ${className}`}
      style={{ width, height }}
    >
      <Image
        src={brand.logoSrc}
        alt={`${brand.name} logo`}
        width={width}
        height={height}
        className="h-full w-full object-contain object-left"
        priority={priority}
      />
    </span>
  );
}

/** Static img for print layouts (no Next Image lifecycle). */
export function VendorLogoPrint({
  vendor,
  height = 14,
  className = "",
}: {
  vendor: string;
  height?: number;
  className?: string;
}) {
  const brand = getVendorBrand(vendor);
  if (!brand) return <span>{vendor}</span>;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={brand.logoSrc}
      alt=""
      className={className}
      style={{ height, width: "auto", maxWidth: height * 3 }}
    />
  );
}
