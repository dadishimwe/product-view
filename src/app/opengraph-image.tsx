import { ImageResponse } from "next/og";
import { OG_SIZE, OgShell } from "@/lib/og-layout";

export const alt = "DeviceView — MSP hardware catalog";
export const size = OG_SIZE;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <OgShell
        eyebrow="MSP hardware catalog"
        title="Spec the edge before you rack it."
        subtitle="Peplink · Starlink · Fortinet — compare, export BOMs, site brief."
        footer="deviceview.app"
      />
    ),
    { ...size },
  );
}
