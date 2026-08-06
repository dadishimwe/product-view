# Contributing to DeviceView

Thank you for helping improve the MSP hardware catalog. Most contributions are **catalog data** (specs, images, slugs) rather than application code.

## Before you open a PR

1. Install dependencies and verify the build:
   ```bash
   npm install
   npm run build
   ```
2. Keep changes focused — one vendor or one feature per PR when possible.
3. Do not commit secrets (`.env`, API keys).

## Catalog changes (required reading)

- Product entries: `src/data/catalog/peplink.ts`, `starlink.ts`, `fortinet.ts`
- Maintainer guide: [`src/data/CATALOG.md`](src/data/CATALOG.md)
- Shared **deployment** and **spec patches**: [`src/data/catalog/catalog-depth.ts`](src/data/catalog/catalog-depth.ts) (merged in `src/data/products.ts`)

### Spec and deployment rule (required)

When you **add or change** any of the following:

- `specs` in a vendor catalog file
- `deployment` on a product
- entries in `CATALOG_DEPLOYMENT` or `CATALOG_SPEC_PATCHES` in `catalog-depth.ts`

you **must** in the PR description:

1. **Link the official vendor source** used (product page or PDF datasheet URL).
2. **Quote or paraphrase** which field you updated (power, ports, throughput, dimensions, etc.).
3. Note the **date** you verified the source.

Example:

> Balance 310 — power max 30 W, 100–240 V AC  
> Source: https://www.peplink.com/products/balance-310/ (verified 2026-08-06)

If a value is estimated or SKU-dependent, say so explicitly (e.g. “SKU dependent — verified on order guide”).

**Do not** copy large blocks of copyrighted datasheet text; use short factual strings (numbers, port counts, units).

### Images

- Place cut-out photos under `public/products/{vendor}/`
- Document filename → slug mapping in `CATALOG.md` when adding files

### Slugs

- Slugs are **stable URLs** (`/products/[slug]`). Do not rename without a redirect in `next.config.ts`.

## Code changes

- Match existing TypeScript and UI patterns (neo-brutalist catalog components).
- Prefer extending `src/lib/product-links.ts` for datasheet URL rules rather than hardcoding in UI.

## Issues

- **Wrong spec** — open an issue with vendor link and the incorrect field; fix via PR is welcome.
- **New SKU** — issue or PR with slug proposal, category, and image.

## License

By contributing, you agree that your contributions are licensed under the project [MIT License](LICENSE).
