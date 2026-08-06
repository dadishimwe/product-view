# Sharing URLs for teams

DeviceView supports stable share links for a single product and for a side-by-side comparison. The paths are safe to paste in Slack, WhatsApp, email, or a ticket because the app renders static product data and keeps user state in the browser.

## Product link

Use the product path:

```text
/products/<slug>
```

Real examples:

- `/products/peplink-balance-310`
- `/products/starlink-mini-kit`
- `/products/fortinet-fortigate-60f`

The slug is the stable URL for that device. Do not rename a slug without adding a redirect in `next.config.ts`, because existing share links and bookmarks depend on it.

## Comparison link

Compare up to four products with the `p` query parameter:

```text
/compare?p=slug1,slug2,slug3,slug4
```

Real example:

```text
/compare?p=peplink-balance-310,peplink-balance-310x,starlink-mini-kit,fortinet-fortigate-60f
```

Slugs are comma-separated. Extra slugs beyond the first four are ignored by the app.

## Optional share note

Add an optional client-side note with `m`:

```text
/products/peplink-balance-310?m=<base64url-note>
/compare?p=peplink-balance-310,peplink-balance-310x&m=<base64url-note>
```

The note is base64url-encoded, capped at 480 characters, and shown as an in-app banner to the recipient. It is client-only by design: link crawlers ignore it for Open Graph previews.

## Open Graph previews

Product links use the per-product Open Graph image, and comparison links use `/og/compare?p=...`. Both are generated from absolute URLs, so `NEXT_PUBLIC_SITE_URL` must point to the production origin with no trailing slash:

```bash
NEXT_PUBLIC_SITE_URL=https://deviceview.example.com
```

When pasting a share link, use the full deployed URL (`https://deviceview.example.com/products/...`) rather than a local path.
