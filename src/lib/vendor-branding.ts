export interface VendorBrand {
  id: string;
  name: string;
  logoSrc: string;
  website: string;
}

const VENDORS: VendorBrand[] = [
  {
    id: "peplink",
    name: "Peplink",
    logoSrc: "/products/logos/peplink-logo.jpg",
    website: "https://www.peplink.com/",
  },
  {
    id: "starlink",
    name: "Starlink",
    logoSrc: "/products/logos/starlink-logo.svg",
    website: "https://www.starlink.com/",
  },
  {
    id: "fortinet",
    name: "Fortinet",
    logoSrc: "/products/logos/fortinet-logo.png",
    website: "https://www.fortinet.com/",
  },
];

const byName = new Map(VENDORS.map((v) => [v.name.toLowerCase(), v]));

export function getVendorBrand(vendor: string): VendorBrand | undefined {
  return byName.get(vendor.trim().toLowerCase());
}

export function supportedVendors(): VendorBrand[] {
  return VENDORS;
}

export function vendorLogoSrc(vendor: string): string | undefined {
  return getVendorBrand(vendor)?.logoSrc;
}

export function vendorWebsite(vendor: string): string | undefined {
  return getVendorBrand(vendor)?.website;
}
