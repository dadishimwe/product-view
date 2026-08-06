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
    <div className="mx-auto w-full max-w-[1600px] flex-1 p-3 sm:p-4 lg:p-5">
      <div className="catalog-frame flex min-h-[calc(100vh-5.5rem)] flex-col overflow-hidden lg:grid lg:grid-cols-[minmax(250px,290px)_1fr_minmax(290px,360px)]">
        <aside className="flex min-h-0 flex-col border-b-2 border-ink p-4 lg:max-h-[calc(100vh-6.5rem)] lg:border-b-0 lg:border-r-2 lg:overflow-hidden">
          {library}
        </aside>
        <section className="min-h-[360px] flex-1 border-b-2 border-ink p-4 sm:p-5 lg:max-h-[calc(100vh-6.5rem)] lg:overflow-auto lg:border-b-0 lg:border-r-2">
          {workspace}
        </section>
        <aside className="flex min-h-0 flex-col p-4 lg:max-h-[calc(100vh-6.5rem)] lg:overflow-auto">
          {detail}
        </aside>
      </div>
    </div>
  );
}
