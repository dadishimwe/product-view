"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  loadSiteBrief,
  newBriefItem,
  saveSiteBrief,
} from "@/lib/site-brief-storage";
import type { SiteBriefData, SiteBriefItem } from "@/types/site-brief";

interface SiteBriefContextValue {
  hydrated: boolean;
  items: SiteBriefItem[];
  scratch: string;
  setScratch: (value: string) => void;
  addItem: (text: string, linkedSlug?: string) => void;
  addLinkedDevice: (deviceName: string, slug: string) => void;
  toggleItem: (id: string) => void;
  updateItemText: (id: string, text: string) => void;
  linkItemToDevice: (id: string, slug: string, deviceName: string) => void;
  removeItem: (id: string) => void;
  clearDone: () => void;
}

const SiteBriefContext = createContext<SiteBriefContextValue | null>(null);

export function SiteBriefProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteBriefData>({ items: [], scratch: "" });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setData(loadSiteBrief());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveSiteBrief(data);
  }, [data, hydrated]);

  const patch = useCallback((fn: (d: SiteBriefData) => SiteBriefData) => {
    setData(fn);
  }, []);

  const addItem = useCallback(
    (text: string, linkedSlug?: string) => {
      const t = text.trim();
      if (!t) return;
      patch((d) => ({
        ...d,
        items: [...d.items, newBriefItem(t, linkedSlug)],
      }));
    },
    [patch],
  );

  const addLinkedDevice = useCallback(
    (deviceName: string, slug: string) => {
      patch((d) => ({
        ...d,
        items: [
          ...d.items,
          newBriefItem(`Candidate: ${deviceName}`, slug),
        ],
      }));
    },
    [patch],
  );

  const toggleItem = useCallback(
    (id: string) => {
      patch((d) => ({
        ...d,
        items: d.items.map((i) =>
          i.id === id ? { ...i, done: !i.done } : i,
        ),
      }));
    },
    [patch],
  );

  const updateItemText = useCallback(
    (id: string, text: string) => {
      patch((d) => ({
        ...d,
        items: d.items.map((i) => (i.id === id ? { ...i, text } : i)),
      }));
    },
    [patch],
  );

  const linkItemToDevice = useCallback(
    (id: string, slug: string, deviceName: string) => {
      patch((d) => ({
        ...d,
        items: d.items.map((i) =>
          i.id === id
            ? {
                ...i,
                linkedSlug: slug,
                text: i.text || `Candidate: ${deviceName}`,
              }
            : i,
        ),
      }));
    },
    [patch],
  );

  const removeItem = useCallback(
    (id: string) => {
      patch((d) => ({ ...d, items: d.items.filter((i) => i.id !== id) }));
    },
    [patch],
  );

  const clearDone = useCallback(() => {
    patch((d) => ({ ...d, items: d.items.filter((i) => !i.done) }));
  }, [patch]);

  const setScratch = useCallback(
    (value: string) => {
      patch((d) => ({ ...d, scratch: value }));
    },
    [patch],
  );

  const value = useMemo<SiteBriefContextValue>(
    () => ({
      hydrated,
      items: data.items,
      scratch: data.scratch,
      setScratch,
      addItem,
      addLinkedDevice,
      toggleItem,
      updateItemText,
      linkItemToDevice,
      removeItem,
      clearDone,
    }),
    [
      hydrated,
      data,
      setScratch,
      addItem,
      addLinkedDevice,
      toggleItem,
      updateItemText,
      linkItemToDevice,
      removeItem,
      clearDone,
    ],
  );

  return (
    <SiteBriefContext.Provider value={value}>
      {children}
    </SiteBriefContext.Provider>
  );
}

export function useSiteBrief() {
  const ctx = useContext(SiteBriefContext);
  if (!ctx) throw new Error("useSiteBrief must be used within SiteBriefProvider");
  return ctx;
}
