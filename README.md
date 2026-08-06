# DeviceView

[![GitHub stars](https://img.shields.io/github/stars/dadishimwe/product-view?style=social)](https://github.com/dadishimwe/product-view/stargazers)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

Open-source catalog for MSP edge hardware — **Peplink**, **Starlink**, and **Fortinet**. Search by SKU, compare specs side-by-side, export BOMs, and keep a per-browser **site brief** while you explore stacks.

**Source:** [github.com/dadishimwe/product-view](https://github.com/dadishimwe/product-view)

## Features

- Typed product catalog (`src/data/catalog/`) — no database
- Compare up to four devices · CSV / Markdown / print PDF
- **Share links** — product or compare URL with an optional note for recipients (`?m=…` on the link)
- Command palette (⌘K) · favorites & recent views in `localStorage`
- Site brief — requirements checklist with multi-device links
- SEO: sitemap, product metadata, JSON-LD

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment (production)

```bash
# .env.local
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_GITHUB_REPO=dadishimwe/product-view
```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) — **spec changes require an official vendor source link in the PR.**

- [Code of Conduct](CODE_OF_CONDUCT.md) · [Security](SECURITY.md)
- Use **Report / request** in the site footer or [open an issue](https://github.com/dadishimwe/product-view/issues/new/choose) (bug, wrong spec, new SKU templates)
- Pull requests use the [PR checklist](.github/pull_request_template.md) for catalog changes

1. Fork the repo and create a branch.
2. Edit catalog data in `src/data/catalog/` — see [`src/data/CATALOG.md`](src/data/CATALOG.md).
3. Run `npm run build` before opening a PR.
4. Use [GitHub Issues](https://github.com/dadishimwe/product-view/issues) for bugs and spec corrections.

## Catalog maintenance

Product images, slugs, and specs are documented in [`src/data/CATALOG.md`](src/data/CATALOG.md). Prefer official vendor datasheets for spec values; the app resolves datasheet URLs via `src/lib/product-links.ts`.

## License

MIT — see [LICENSE](LICENSE).

## Deploy

Works on [Vercel](https://vercel.com) and any Node host that supports Next.js 16. Set `NEXT_PUBLIC_SITE_URL` to your production URL for canonical links and sitemap.

## Maintainer checklist (GitHub)

After publishing the repo, optional but recommended:

- **Topics:** `msp`, `peplink`, `starlink`, `fortinet`, `nextjs`, `hardware-catalog`
- **Labels:** `bug`, `catalog`, `good first issue` (used by issue templates)
- **Branch protection:** require CI (`CI` workflow) on `main`
- **Discussions:** enable if you want Q&A separate from issues
