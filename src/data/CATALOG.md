# Catalog data guide

This app reads **typed TypeScript**, not a database. Everything you see in the UI comes from `src/data/catalog/`.

## Where things live

| What | Location |
| --- | --- |
| All products (combined) | `src/data/products.ts` → re-exports `catalog/` |
| Peplink entries | `src/data/catalog/peplink.ts` |
| Starlink entries | `src/data/catalog/starlink.ts` |
| Fortinet entries | `src/data/catalog/fortinet.ts` |
| Popular stacks (Explore) | `src/data/stacks.ts` |
| Type definition | `src/types/product.ts` |
| Image path helper | `src/lib/product-images.ts` |

Open the vendor file that matches the hardware you are reviewing. Each product is one object in the `products` array.

## Product images (transparent background)

1. Export a **PNG or WebP with alpha** (no background), roughly 1600px on the long edge.
2. Save under:

   ```text
   public/products/peplink/{slug}.png
   public/products/starlink/{filename}.png
   public/products/fortinet/{filename}
   ```

   **Fortinet files (current):**

| File on disk | Product page |
| --- | --- |
| `fortinet-40f.jpg` | `/products/fortinet-fortigate-40f` |
| `fortinet-60f.png` | `/products/fortinet-fortigate-60f` |
| `fortinet-70G.webp` | `/products/fortinet-fortigate-71g` |
| `fortinet-100f.jpg` | `/products/fortinet-fortigate-100f` |
| `fortinet-400f.jpg` | `/products/fortinet-fortigate-400f` |
| `fortinet-1000f.webp` | `/products/fortinet-fortigate-1000f` |
| `fortinet-2000f.png` | `/products/fortinet-fortigate-2000f` |
| `fortiap-231f.jpg` | `/products/fortinet-fortiap-231f` |
| `fortiap-431f.jpg` | `/products/fortinet-fortiap-431f` |

**Vendor logos** (`public/products/logos/`): used in UI by vendor name — Peplink, Starlink, Fortinet. Mapped in `src/lib/vendor-branding.ts`.

   Use `const img = (f) => \`/products/fortinet/${f}\`` in `fortinet.ts` when filenames do not match `{slug}.png`.

   **Starlink files (current):**

| File on disk | Product page |
| --- | --- |
| `starlink-mini-kit.png` | `/products/starlink-mini-kit` |
| `starlink-standard-actuated.png` | `/products/starlink-standard-actuated` |
| `starlink-flat-high-performance.png` | `/products/starlink-flat-high-performance` |
| `starlink-v3-high-performance.png` | `/products/starlink-v3-high-performance` |
| `starlink-enterprise.png` | `/products/starlink-enterprise` |
| `starlink-standard-gen3.png` | `/products/starlink-standard-gen3` |

3. Optional extra angles:

   ```ts
   import { productImagePath } from "@/lib/product-images";

   {
     src: productImagePath("peplink-balance-1350-ec", "Peplink", "front"),
     fallbackSrc: "/products/peplink-1350.svg",
     alt: "Balance 1350 EC front view",
   }
   ```

**Naming rule:** `{slug}.png` must match the product’s `slug` field exactly.

## How specs are stored

Specs are **not** a free-form blob. Each product has four groups (keys in `src/types/product.ts`):

- `connectivity` — ports, WAN/LAN, cellular, Wi‑Fi, throughput
- `power` — input, draw, PoE
- `physical` — size, weight, mounting, temperature
- `compliance` — warranty, certifications

Each group is a flat object: **label → value** (both strings). Example:

```ts
specs: {
  connectivity: {
    "WAN ports": "2× GbE (modular)",
    "LAN ports": "4× GbE",
  },
  power: { Input: "100–240 V AC", Consumption: "45 W typical" },
  physical: { Dimensions: '1.73" × 17.3" × 11.8"', Weight: "8.2 lb" },
  compliance: { Warranty: "2-year limited", Certifications: "FCC, CE" },
},
```

The right panel and Compare page render these groups in order. Compare highlights rows when values differ.

Source specs from the vendor datasheet; keep units and wording consistent within a vendor file.

### Deployment & shared spec patches

Rollup power/rack values and some normalized spec fields live in [`catalog-depth.ts`](catalog/catalog-depth.ts) and are merged in `products.ts`. When editing those entries, follow [`CONTRIBUTING.md`](../../CONTRIBUTING.md) (cite official datasheet URL in the PR).

## Naming devices (recommended)

| Field | Purpose | Convention |
| --- | --- | --- |
| `name` | UI title | **Official model name** as the vendor prints it: `Balance 1350 EC`, `FortiGate 71G`, `Starlink Mini`. Do not prefix with vendor if the panel already shows vendor. |
| `slug` | URL `/products/[slug]` | Lowercase, hyphenated, **stable**: `{vendor}-{model}` → `peplink-balance-1350-ec`, `starlink-mini`, `fortinet-fortigate-71g`. Never change after launch without a redirect. |
| `sku` | Search | Vendor or distributor SKU: `FG-71G`, `SL-MINI`, Peplink order code when you have it. |
| `id` | Internal | Usually same as `slug`. |
| `category` | Library grouping | Mirror **vendor taxonomy**, not a generic label. Peplink: `Enterprise Routers — Balance EC`. Fortinet: `Firewalls — FortiGate (branch)`. Starlink: use terminal type, e.g. `Business terminal` or `Portable terminal` — keep Starlink **flat**, avoid fake router/switch categories. |
| `formFactor` | Filter | Short physical role: `Desktop`, `Rack 1U`, `Ceiling mount`, `Portable`. |

### Starlink naming note

Starlink renames kits often (Actuated → Standard, Flat High Performance → Performance Gen 2/3). In `name`, use **current consumer-facing name**; put legacy names in `description` if needed. Re-check starlink.com before publish.

### Adding a new product

1. Copy the template object at the bottom of the relevant `catalog/*.ts` file.
2. Assign `slug` / `sku` / `category` using the table above.
3. Fill `specs` from the datasheet (four groups).
4. Add `public/products/{vendor}/{slug}.png`.
5. Add the slug to `worksWellWith` / stacks only when pairing is real.

## Site brief (workspace pin)

The green **Site brief** card on the product workspace is persisted in `localStorage` (`deviceview-site-brief-v1`). Users add requirements, check them off, link lines to product slugs, and optional scratch notes. Legacy freeform notes from `deviceview-site-notes` migrate into scratch on first load.

