import { ImageResponse } from "next/og";
import { getProductBySlug } from "@/lib/products";
import { siteUrl } from "@/lib/site-url";
import { OG_COLORS, OG_SIZE, OgShell } from "@/lib/og-layout";

export const alt = "DeviceView product";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function ProductOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return new ImageResponse(
      (
        <OgShell
          eyebrow="DeviceView"
          title="Product not found"
          footer={slug}
        />
      ),
      { ...size },
    );
  }

  let thumbSrc: string | null = null;
  try {
    const res = await fetch(`${siteUrl()}${product.images[0].src}`);
    if (res.ok) {
      const buf = await res.arrayBuffer();
      const b64 = Buffer.from(buf).toString("base64");
      const type = res.headers.get("content-type") ?? "image/png";
      thumbSrc = `data:${type};base64,${b64}`;
    }
  } catch {
    /* preview works without photo */
  }

  const subtitle = `${product.vendor} · ${product.category} · SKU ${product.sku}`;

  return new ImageResponse(
    (
      <OgShell
        eyebrow="Product spec sheet"
        title={product.name}
        subtitle={subtitle}
        footer="Open in DeviceView"
        rightSlot={
          thumbSrc ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 360,
                height: 360,
                background: OG_COLORS.mist,
                border: `4px solid ${OG_COLORS.ink}`,
                padding: 24,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- OG runtime */}
              <img
                src={thumbSrc}
                alt=""
                width={300}
                height={300}
                style={{ objectFit: "contain" }}
              />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 360,
                height: 360,
                background: OG_COLORS.panel,
                border: `4px dashed ${OG_COLORS.graphite}`,
                fontSize: 22,
                color: OG_COLORS.graphite,
                textAlign: "center",
                padding: 24,
              }}
            >
              {product.vendor}
            </div>
          )
        }
      />
    ),
    { ...size },
  );
}
