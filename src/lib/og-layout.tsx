/** Shared layout tokens for `next/og` ImageResponse cards. */
import type { ReactNode } from "react";

export const OG_SIZE = { width: 1200, height: 630 } as const;

export const OG_COLORS = {
  paper: "#fcfbf7",
  ink: "#14121f",
  mist: "#e8e4dc",
  signal: "#e85d04",
  graphite: "#5c5670",
  panel: "#fffef9",
} as const;

export function ogFontFamily() {
  return "ui-sans-serif, system-ui, -apple-system, Segoe UI, sans-serif";
}

type OgShellProps = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  footer?: string;
  rightSlot?: ReactNode;
};

export function OgShell({
  eyebrow,
  title,
  subtitle,
  footer,
  rightSlot,
}: OgShellProps) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: OG_COLORS.paper,
        color: OG_COLORS.ink,
        fontFamily: ogFontFamily(),
        border: `8px solid ${OG_COLORS.ink}`,
        padding: 48,
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          gap: 40,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
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
            {eyebrow}
          </p>
          <h1
            style={{
              margin: "12px 0 0",
              fontSize: title.length > 48 ? 52 : 64,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              style={{
                margin: "20px 0 0",
                fontSize: 28,
                lineHeight: 1.35,
                color: OG_COLORS.graphite,
                maxWidth: 640,
              }}
            >
              {subtitle}
            </p>
          ) : null}
        </div>
        {rightSlot ? (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 420,
            }}
          >
            {rightSlot}
          </div>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `3px solid ${OG_COLORS.ink}`,
          paddingTop: 20,
          marginTop: 24,
        }}
      >
        <span
          style={{
            fontSize: 24,
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          DeviceView
        </span>
        {footer ? (
          <span style={{ fontSize: 20, color: OG_COLORS.graphite }}>{footer}</span>
        ) : null}
      </div>
    </div>
  );
}
