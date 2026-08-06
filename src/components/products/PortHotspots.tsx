"use client";

import { useState } from "react";
import type { ProductPort } from "@/types/product";

export function PortHotspots({ ports }: { ports: ProductPort[] }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className="pointer-events-none absolute inset-0">
      {ports.map((port) => (
        <button
          key={port.label}
          type="button"
          style={{ left: `${port.x}%`, top: `${port.y}%` }}
          className="pointer-events-auto absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-signal/90 shadow-sm transition-transform hover:scale-125 focus:scale-125 focus:outline-none focus:ring-2 focus:ring-trace"
          aria-label={`${port.label}: ${port.detail}`}
          onMouseEnter={() => setActive(port.label)}
          onMouseLeave={() => setActive(null)}
          onFocus={() => setActive(port.label)}
          onBlur={() => setActive(null)}
        />
      ))}
      {active ? (
        <div
          className="pointer-events-none absolute bottom-2 left-2 right-2 rounded-md border-2 border-ink bg-paper/95 px-3 py-2 text-left shadow-[3px_4px_0_#14121f]"
          role="status"
        >
          {(() => {
            const p = ports.find((x) => x.label === active);
            if (!p) return null;
            return (
              <>
                <p className="font-display text-xs font-bold">{p.label}</p>
                <p className="font-mono text-[0.65rem] leading-snug text-graphite">
                  {p.detail}
                </p>
              </>
            );
          })()}
        </div>
      ) : null}
    </div>
  );
}
