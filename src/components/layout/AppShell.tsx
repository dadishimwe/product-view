"use client";

import { TopNav } from "./TopNav";
import { SiteFooter } from "./SiteFooter";
import { ShareMessageBanner } from "@/components/share/ShareMessageBanner";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <ShareMessageBanner />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </>
  );
}
