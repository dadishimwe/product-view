"use client";

import { AppProvider } from "@/context/AppContext";
import { SiteBriefProvider } from "@/context/SiteBriefContext";
import { AppShell } from "@/components/layout/AppShell";
import { CommandPalette } from "@/components/command/CommandPalette";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <SiteBriefProvider>
        <AppShell>{children}</AppShell>
        <CommandPalette />
      </SiteBriefProvider>
    </AppProvider>
  );
}
