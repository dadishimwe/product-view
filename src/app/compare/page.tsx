import type { Metadata } from "next";
import { Suspense } from "react";
import { compareSlugsToParam, parseCompareParam } from "@/lib/compare-url";
import { getProductsBySlugs } from "@/lib/products";
import { siteUrl } from "@/lib/site-url";
import ComparePageClient from "./ComparePageClient";

const defaultDescription =
  "Side-by-side comparison of up to four Peplink, Starlink, and Fortinet devices with exportable CSV, Markdown, and print-ready BOM.";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ p?: string; m?: string }>;
}): Promise<Metadata> {
  const { p } = await searchParams;
  const slugs = parseCompareParam(p ?? null);
  const products = getProductsBySlugs(slugs);

  if (products.length === 0) {
    return {
      title: "Compare hardware",
      description: defaultDescription,
      alternates: { canonical: "/compare" },
    };
  }

  const param = compareSlugsToParam(slugs);
  const names = products.map((x) => x.name).join(" vs ");
  const title =
    names.length > 55 ? `Compare ${products.length} devices` : `Compare: ${names}`;
  const description = `Side-by-side specs: ${products
    .map((x) => `${x.vendor} ${x.name} (${x.sku})`)
    .join(" · ")}.`;
  const pageUrl = `${siteUrl()}/compare?p=${encodeURIComponent(param)}`;
  const ogImage = `/og/compare?p=${encodeURIComponent(param)}`;

  return {
    title,
    description,
    alternates: { canonical: `/compare?p=${param}` },
    openGraph: {
      title,
      description,
      type: "website",
      url: pageUrl,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function ComparePage() {
  return (
    <Suspense fallback={<p className="p-8 text-sm text-graphite">Loading…</p>}>
      <ComparePageClient />
    </Suspense>
  );
}
