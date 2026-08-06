"use client";

import { VendorLogo } from "@/components/brand/VendorLogo";
import { supportedVendors } from "@/lib/vendor-branding";

export function CatalogVendorFilters({
  vendors,
  selected,
  onChange,
}: {
  vendors: string[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  const brands = supportedVendors().filter((b) => vendors.includes(b.name));

  const toggle = (name: string) => {
    if (selected.includes(name)) {
      onChange(selected.filter((v) => v !== name));
    } else {
      onChange([...selected, name]);
    }
  };

  return (
    <fieldset className="catalog-vendor-filters flex flex-col gap-2">
      <legend className="field-label mb-0">Vendors</legend>
      <ul className="flex flex-wrap gap-2">
        {brands.map((b) => {
          const checked = selected.includes(b.name);
          return (
            <li key={b.id}>
              <label
                className={`catalog-vendor-filter-chip ${checked ? "catalog-vendor-filter-chip--on" : ""}`}
              >
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={checked}
                  onChange={() => toggle(b.name)}
                />
                <VendorLogo vendor={b.name} height={14} />
                <span className="font-display text-xs font-semibold">{b.name}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </fieldset>
  );
}
