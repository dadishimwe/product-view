import type { Metadata } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans, Outfit } from "next/font/google";
import { Providers } from "@/components/Providers";
import { siteUrl } from "@/lib/site-url";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600"],
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"],
});

const titleDefault = "DeviceView — MSP hardware catalog";
const description =
  "Browse, compare, and spec Peplink, Starlink, and Fortinet edge hardware for MSP client deployments. SKU search, side-by-side specs, and exportable BOMs.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: titleDefault,
    template: "%s · DeviceView",
  },
  description,
  keywords: [
    "MSP hardware catalog",
    "Peplink router specs",
    "Starlink business terminal",
    "FortiGate comparison",
    "SD-WAN hardware",
    "edge deployment specs",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "DeviceView",
    title: titleDefault,
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${plexSans.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
