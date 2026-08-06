"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";

export function SiteNotes() {
  const { activeSessionId, sessions, hydrated } = useApp();
  const session = sessions.find((s) => s.id === activeSessionId);
  const storageKey = `deviceview-site-notes-${activeSessionId ?? "default"}`;
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!hydrated) return;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setNotes(saved);
      else
        setNotes(
          session
            ? `Session: ${session.name}\nLead time checks · PoE budget · Mounting`
            : "Site constraints · Power · Cable paths",
        );
    } catch {
      /* ignore */
    }
  }, [storageKey, session, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(storageKey, notes);
  }, [notes, storageKey, hydrated]);

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
