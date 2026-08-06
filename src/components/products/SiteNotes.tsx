"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "deviceview-site-notes";

export function SiteNotes() {
  const [notes, setNotes] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      setNotes(
        saved ?? "Site constraints · Power · Cable paths · Mounting",
      );
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, notes);
  }, [notes, hydrated]);

  return (
    <div className="site-note">
      <span className="site-note-tape" aria-hidden />
      <p className="field-label mb-1.5">System notes</p>
      <label className="sr-only" htmlFor="site-notes">
        System notes for this project
      </label>
      <textarea
        id="site-notes"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        rows={4}
        className="w-full resize-none border-0 bg-transparent p-0 text-[0.75rem] leading-snug text-ink outline-none"
      />
    </div>
  );
}
