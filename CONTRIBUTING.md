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
4. CI runs `npm run build` on pull requests (see [`.github/workflows/ci.yml`](.github/workflows/ci.yml)).

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

Use [New issue](https://github.com/dadishimwe/product-view/issues/new/choose) and pick a template:

- **Bug report** — UI, export, routing, search
- **Wrong or missing spec** — include vendor URL and verification date
- **New SKU request** — proposed slug and official source

General questions: open a bug-labeled issue or enable GitHub Discussions on the repo.

## Code of conduct

This project follows the [Contributor Covenant](CODE_OF_CONDUCT.md). Please be respectful in issues and PRs.

## License

By contributing, you agree that your contributions are licensed under the project [MIT License](LICENSE).
