"use client";

import type { ReactNode } from "react";

interface ThreePanelLayoutProps {
  library: ReactNode;
  workspace: ReactNode;
  detail: ReactNode;
}

export function ThreePanelLayout({
  library,
  workspace,
  detail,
}: ThreePanelLayoutProps) {
  return (
    <div className="mx-auto flex max-w-[1600px] flex-1 flex-col gap-4 p-4 sm:p-6 lg:grid lg:grid-cols-[minmax(240px,280px)_1fr_minmax(280px,340px)] lg:items-stretch lg:gap-0 lg:divide-x lg:divide-neutral-200 lg:p-0">
      <aside className="flex min-h-0 flex-col lg:max-h-[calc(100vh-3.5rem)] lg:overflow-hidden lg:p-4">
        {library}
      </aside>
      <section className="min-h-[320px] flex-1 lg:max-h-[calc(100vh-3.5rem)] lg:overflow-auto lg:p-6">
        {workspace}
      </section>
      <aside className="flex min-h-0 flex-col border-t border-neutral-200 pt-4 lg:max-h-[calc(100vh-3.5rem)] lg:overflow-auto lg:border-t-0 lg:p-4">
        {detail}
      </aside>
    </div>
  );
}
