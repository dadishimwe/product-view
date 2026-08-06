import Link from "next/link";
import Image from "next/image";
import { supportedVendors } from "@/lib/vendor-branding";

export function ExploreSupportedVendors({ embedded }: { embedded?: boolean }) {
  const vendors = supportedVendors();

  return (
    <section
      aria-labelledby="vendors-heading"
      className={embedded ? "" : "mt-0"}
    >
      <h2 id="vendors-heading" className="field-label mb-3">
        Supported vendors
      </h2>
      <ul className="flex flex-wrap items-center gap-4">
        {vendors.map((v) => (
          <li key={v.id}>
            <Link
              href={v.website}
              target="_blank"
              rel="noopener noreferrer"
              className="catalog-panel flex items-center justify-center px-4 py-3 transition-transform active:scale-[0.98] hover:bg-mist/40"
              aria-label={`${v.name} (opens vendor site)`}
            >
              <span className="relative h-8 w-[7.5rem]">
                <Image
                  src={v.logoSrc}
                  alt={`${v.name} logo`}
                  fill
                  className="object-contain object-center"
                  sizes="120px"
                />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
