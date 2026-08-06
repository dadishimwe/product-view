import { ImageResponse } from "next/og";
import { compareSlugsToParam, parseCompareParam } from "@/lib/compare-url";
import { getProductsBySlugs } from "@/lib/products";
import { OG_COLORS, OG_SIZE, OgShell } from "@/lib/og-layout";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slugs = parseCompareParam(searchParams.get("p"));
  const products = getProductsBySlugs(slugs);

  if (products.length === 0) {
    return new ImageResponse(
      (
        <OgShell
          eyebrow="Compare"
          title="Side-by-side hardware specs"
          subtitle="Add devices with ?p=slug1,slug2 on the compare URL."
          footer="DeviceView"
        />
      ),
      { ...OG_SIZE },
    );
  }

  const title =
    products.length === 1
      ? products[0].name
      : `${products.length} devices compared`;

  const lines = products.map(
    (p) => `${p.vendor} · ${p.name} (${p.sku})`,
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: OG_COLORS.paper,
          color: OG_COLORS.ink,
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
          border: `8px solid ${OG_COLORS.ink}`,
          padding: 48,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 22,
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: OG_COLORS.graphite,
          }}
        >
          Comparison
        </p>
        <h1
          style={{
            margin: "12px 0 24px",
            fontSize: 56,
            fontWeight: 800,
            lineHeight: 1.05,
          }}
        >
          {title}
        </h1>
        <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1 }}>
          {lines.map((line, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 16,
                padding: "16px 20px",
                background: OG_COLORS.panel,
                border: `3px solid ${OG_COLORS.ink}`,
                fontSize: 26,
                fontWeight: 600,
              }}
            >
              <span
                style={{
                  display: "flex",
                  width: 36,
                  height: 36,
                  alignItems: "center",
                  justifyContent: "center",
                  background: OG_COLORS.signal,
                  color: OG_COLORS.paper,
                  fontWeight: 800,
                  fontSize: 20,
                }}
              >
                {i + 1}
              </span>
              <span style={{ flex: 1, lineHeight: 1.25 }}>{line}</span>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: `3px solid ${OG_COLORS.ink}`,
            paddingTop: 20,
            marginTop: 24,
            fontSize: 22,
          }}
        >
          <span style={{ fontWeight: 800 }}>DeviceView</span>
          <span style={{ color: OG_COLORS.graphite }}>
            {compareSlugsToParam(slugs)}
          </span>
        </div>
      </div>
    ),
    { ...OG_SIZE },
  );
}
