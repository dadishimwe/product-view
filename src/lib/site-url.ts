/** Public site URL for SEO (set NEXT_PUBLIC_SITE_URL in production). */
export function siteUrl() {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (explicit) return explicit;

  const vercelProduction = process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(
    /\/$/,
    "",
  );
  if (vercelProduction) {
    return vercelProduction.startsWith("http")
      ? vercelProduction
      : `https://${vercelProduction}`;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}
