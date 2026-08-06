"use client";

import { TopNav } from "./TopNav";
import { SiteFooter } from "./SiteFooter";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </>
  );
}
