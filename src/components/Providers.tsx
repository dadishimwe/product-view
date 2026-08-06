"use client";

import { AppProvider } from "@/context/AppContext";
import { AppShell } from "@/components/layout/AppShell";
import { CommandPalette } from "@/components/command/CommandPalette";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider>
      <AppShell>{children}</AppShell>
      <CommandPalette />
    </AppProvider>
  );
}
