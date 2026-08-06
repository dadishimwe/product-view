# Roadmap notes

High-level phases for DeviceView after core catalog and OSS hygiene. See also [README](../README.md) deploy section.

---

## 4. Production

**Goal:** Run a reliable public instance that search engines and chat apps (WhatsApp, Slack, iMessage, LinkedIn) can understand — not just “it works on localhost.”

### Hosting & environment

| Step | Why it matters |
|------|----------------|
| Deploy to **Vercel** (or Node host) from `main` | CI already runs `npm run build` on PRs |
| Set **`NEXT_PUBLIC_SITE_URL`** to your live origin (no trailing slash) | Canonical URLs, `sitemap.xml`, `robots.txt`, and **Open Graph image URLs** must be absolute in production |
| Optional: **`NEXT_PUBLIC_GITHUB_REPO`** | Footer / docs links if the repo name changes |
| Enable **HTTPS** on your custom domain | Required for secure sharing and SEO |

Without `NEXT_PUBLIC_SITE_URL`, previews may fall back to `localhost` or `*.vercel.app`, and link unfurling will look wrong off-production.

### Browser tab icon (favicon)

- Implemented as **`src/app/icon.tsx`** (32×32) and **`src/app/apple-icon.tsx`** (180×180 for “Add to Home Screen”).
- Next.js serves these automatically; no manual `<link rel="icon">` needed.
- Replace the generated **“DV”** mark with a designed asset later by swapping these files or adding static files under `app/`.

### Default link preview (home, catalog, library)

- **`src/app/opengraph-image.tsx`** — 1200×630 card for the site default (used when a page does not define its own).
- Root **`layout.tsx`** sets `metadataBase`, title template, description, and Twitter `summary_large_image`.

**How unfurling works:** WhatsApp/Telegram/Slack fetch the shared URL, read `<meta property="og:image">` (and title/description), and show a thumbnail. They do **not** run your React app.

### Product link previews

- **`src/app/products/[slug]/opengraph-image.tsx`** — per-product card: name, SKU, vendor, product photo when available.
- Sharing `https://yoursite.com/products/peplink-balance-310` uses that product’s image and title.
- Optional share note (`?m=…`) is **client-only** for the in-app banner; crawlers ignore it for OG (by design).

### Comparison link previews

- Compare URLs look like **`/compare?p=slug1,slug2`** (up to four slugs).
- **`generateMetadata`** on **`src/app/compare/page.tsx`** sets `og:title`, `og:description`, and points `og:image` at **`/og/compare?p=…`**.
- **`src/app/og/compare/route.tsx`** renders a **custom 1200×630 PNG** listing each device in the stack.

**Test previews:**

1. Deploy with `NEXT_PUBLIC_SITE_URL` set.
2. Open [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/) or [opengraph.xyz](https://www.opengraph.xyz/) with a product URL and a compare URL.
3. WhatsApp: paste the link in a chat (you may need to wait for cache refresh after first deploy).

Crawlers cache aggressively; after changing OG art, use the debugger “Scrape again” or change the URL slightly during testing.

### Smoke tests before calling production “done”

- [ ] Home, product, compare, and print routes load on mobile
- [ ] CSV / Markdown download and print (images load in print)
- [ ] Share link copy + optional note banner
- [ ] Sitemap reachable at `/sitemap.xml`
- [ ] Favicon visible in browser tab
- [ ] Product + compare URLs show **correct** preview cards on at least one debugger tool

### Optional next production items

- Custom domain email / status page (only if you operate a SLA)
- **`og:compare` cache** — CDN cache headers on `/og/compare` (short TTL is fine)
- Analytics (privacy-friendly) if you need usage metrics
- Staging environment with its own `NEXT_PUBLIC_SITE_URL` so previews never point at localhost

---

## 5. UX polish (when data is solid)

**Do this after catalog specs and deployment fields are trustworthy.** Polishing UI before data is accurate creates a catalog people trust visually but quote incorrectly in client BOMs.

### Site brief

- **Templates** — one-click briefs (“Retail edge”, “Vehicle”, “Fixed wireless backup”) with prefilled requirement lines.
- **Keyword hints** — typing “PoE” or “rack” highlights related spec rows on the open product or compare view.
- **Handoff** — already partially done: brief in CSV/Markdown/print; optional export to PDF bundle.

### Catalog & compare

- **Category / form factor filters** on the grid (same pattern as vendor checkbox chips).
- **Compare from URL** — document `?p=` in README for teams (already supported).
- **Empty states** — clearer copy when no vendor selected or compare slot empty.
- **Accessibility pass** — focus order in three-panel layout, command palette ARIA.

### Performance & feel

- Image `sizes` tuning on large grids
- Reduce layout shift when selecting a product in the three-panel view
- Optional **PWA** manifest (only if you need install-to-homescreen for field techs)

### What to defer

- Heavy animation, dark mode, or theme switching unless users ask
- User accounts / cloud-synced briefs (conflicts with “no database” simplicity unless you add a backend deliberately)

---

## 6. Cursor / “built with”

Credit belongs in **GitHub docs**, not in the public site `<title>` or meta description (no SEO benefit for an MSP catalog).

- **Author:** [Dadi Ishimwe (@dadishimwe)](https://github.com/dadishimwe)
- **Tooling:** Built with [Cursor](https://cursor.com) — noted in README and CONTRIBUTING only.

The live app footer stays focused on **View source**, **Contributing**, and issues — not IDE branding.
