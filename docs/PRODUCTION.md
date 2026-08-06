# Production on Vercel

DeviceView is already set up for production SEO and social previews in code. On Vercel, your job is mostly **environment variables**, **deploy the latest `main`**, and **verify** with the test list at the bottom.

---

## What the repo already provides

| Feature | Where |
|--------|--------|
| Favicon / Apple touch icon | `src/app/icon.tsx`, `src/app/apple-icon.tsx` |
| Default share card (home, etc.) | `src/app/opengraph-image.tsx` |
| Product share card | `src/app/products/[slug]/opengraph-image.tsx` |
| Compare share card | `src/app/compare/page.tsx` metadata + `src/app/og/compare/route.tsx` |
| Sitemap & robots | `src/app/sitemap.ts`, `src/app/robots.ts` |
| Canonical / OG base URL | `src/lib/site-url.ts` + `metadataBase` in `src/app/layout.tsx` |
| CI build on PRs | `.github/workflows/ci.yml` |

No `vercel.json` is required for a standard Next.js deploy.

---

## What you need to do in Vercel

### 1. Set `NEXT_PUBLIC_SITE_URL` (recommended — do this)

**Project → Settings → Environment Variables**

| Name | Value | Environments |
|------|--------|--------------|
| `NEXT_PUBLIC_SITE_URL` | Your **canonical** public URL, **no trailing slash** | **Production** (required). **Preview** optional but useful. |

Examples:

- Custom domain: `https://deviceview.example.com`
- Vercel default: `https://your-project.vercel.app`

**Why:** `NEXT_PUBLIC_*` values are embedded at **build time**. They drive sitemap URLs, canonical links, and Open Graph image URLs. WhatsApp and other apps use those absolute URLs when unfurling links.

If you skip this, production may still use Vercel’s `VERCEL_PROJECT_PRODUCTION_URL` fallback (see `site-url.ts`), but you should set the explicit variable once you know your final domain — especially if you use a **custom domain**.

### 2. Redeploy after changing env vars

Changing environment variables does **not** update existing deployments until you ** redeploy**:

- **Deployments → … → Redeploy** on the latest production deployment, or  
- Push a commit to the branch Vercel builds for production (usually `main`).

### 3. Deploy current code

Ensure production includes the OG routes and icons (merge/push latest `main` and wait for the Vercel build to finish). In the build log, the route list should include `/icon`, `/opengraph-image`, `/og/compare`, and `/products/[slug]/opengraph-image`.

### 4. Custom domain (if you use one)

1. **Project → Settings → Domains** — add your domain and follow DNS instructions.  
2. Set `NEXT_PUBLIC_SITE_URL` to **`https://that-domain`** (same as users will share).  
3. Redeploy production.

### 5. Optional: `NEXT_PUBLIC_GITHUB_REPO`

Default in code is `dadishimwe/product-view`. Override only if the repo name changes:

`NEXT_PUBLIC_GITHUB_REPO=dadishimwe/product-view`

### 6. GitHub ↔ Vercel (if not already)

- Vercel project connected to `dadishimwe/product-view`  
- Production branch = `main`  
- Optional: require GitHub **CI** check before merge (see README maintainer checklist)

You do **not** need to configure OG or favicon in the Vercel dashboard; Next.js serves them from the app.

---

## Quick verification URLs (replace origin)

After deploy, open in a browser (production origin):

| Check | URL |
|-------|-----|
| Favicon | `/icon` (PNG) |
| Default OG image | `/opengraph-image` |
| Product OG | `/products/peplink-balance-310/opengraph-image` |
| Compare OG | `/og/compare?p=peplink-balance-310,starlink-standard-gen3` |
| Sitemap | `/sitemap.xml` |
| Robots | `/robots.txt` |

View page source on a product page and confirm `og:image` points to your **production** host, not `localhost`.

---

## What to test (manual checklist)

Run these on **production** (desktop + one phone if you can).

### Environment & SEO

- [ ] `NEXT_PUBLIC_SITE_URL` set to the URL you share with clients  
- [ ] `/sitemap.xml` lists product URLs with the same host  
- [ ] Browser tab shows the **DV** favicon  

### Social / chat previews

- [ ] [opengraph.xyz](https://www.opengraph.xyz/) — paste **home** URL → title + default card  
- [ ] Same tool — paste **one product** URL → product name + image card  
- [ ] Same tool — paste **compare** URL, e.g. `/compare?p=peplink-balance-310,fortinet-fortigate-60f` → compare card with two devices  
- [ ] WhatsApp (or Telegram): paste product + compare links in a **private chat**; confirm thumbnail and title (first fetch may be cached — wait or use debugger “refresh”)

### App flows

- [ ] Home → search / command palette (⌘K)  
- [ ] Products → catalog, vendor filters, open a device  
- [ ] Compare — add 2–4 devices, horizontal scroll on mobile  
- [ ] Export **CSV** and **Markdown**; open CSV in Excel  
- [ ] **Print** from compare; product/vendor images appear  
- [ ] **Site brief** — add a line, export compare MD/CSV, confirm brief section  
- [ ] **Share link** — product and compare, optional note; open in incognito → dismissible message banner  

### Footer / OSS

- [ ] **View source**, **Star**, **Issues**, **Contributing** open correct GitHub URLs  

---

## If previews look wrong

1. Confirm `NEXT_PUBLIC_SITE_URL` matches the URL in the address bar.  
2. **Redeploy** production after env changes.  
3. Use Meta [Sharing Debugger](https://developers.facebook.com/tools/debug/) → **Scrape Again** (clears Facebook/WhatsApp cache for that URL).  
4. Directly open `/products/[slug]/opengraph-image` and `/og/compare?p=…` — if these 404 or error, the deployment is missing recent code.

---

## Optional later

- Privacy-friendly analytics (Vercel Analytics, Plausible, etc.)  
- Staging project with its own `NEXT_PUBLIC_SITE_URL`  
- Replace generated **DV** icons with brand assets in `src/app/icon.tsx` / design files  

More context: [ROADMAP.md](./ROADMAP.md#4-production).
