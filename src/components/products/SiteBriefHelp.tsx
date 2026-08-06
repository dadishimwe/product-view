"use client";

import { useEffect, useId, useRef, useState } from "react";

export function SiteBriefHelp() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        className="site-brief-help-btn"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label="How to use the site brief"
        title="How to use the site brief"
        onClick={() => setOpen((o) => !o)}
      >
        i
      </button>
      {open ? (
        <div
          id={panelId}
          role="region"
          aria-label="Site brief help"
          className="site-brief-help-panel"
        >
          <p className="font-display text-xs font-bold text-ink">Site brief</p>
          <ul className="mt-2 space-y-1.5 text-[0.6875rem] leading-snug text-graphite">
            <li>
              <strong className="text-ink">Requirements</strong> — add what the
              deployment must satisfy (power, ports, mounting). They stay pinned
              while you browse.
            </li>
            <li>
              <strong className="text-ink">Check off</strong> when a requirement
              is met or you&apos;ve verified it on a device.
            </li>
            <li>
              <strong className="text-ink">Link devices</strong> — pin products
              to a line; use the small <strong className="text-ink">+</strong>{" "}
              after a link to attach more candidates to the same requirement.
            </li>
            <li>
              <strong className="text-ink">Scratch</strong> — optional notes for
              site context (address, constraints, client name).
            </li>
          </ul>
          <p className="mt-2 border-t border-ink/15 pt-2 text-[0.65rem] text-graphite">
            Saved on this browser only.
          </p>
        </div>
      ) : null}
    </div>
  );
}
