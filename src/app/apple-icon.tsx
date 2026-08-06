import { ImageResponse } from "next/og";
import { OG_COLORS, ogFontFamily } from "@/lib/og-layout";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: OG_COLORS.paper,
          border: `6px solid ${OG_COLORS.ink}`,
          fontFamily: ogFontFamily(),
          color: OG_COLORS.ink,
        }}
      >
        <span style={{ fontSize: 72, fontWeight: 800, letterSpacing: "-0.04em" }}>
          DV
        </span>
        <span
          style={{
            marginTop: 8,
            fontSize: 14,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: OG_COLORS.graphite,
          }}
        >
          DeviceView
        </span>
      </div>
    ),
    { ...size },
  );
}
