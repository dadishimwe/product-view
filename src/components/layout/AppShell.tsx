"use client";

import { TopNav } from "./TopNav";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopNav />
      <main className="flex flex-1 flex-col">{children}</main>
    </>
  );
}
