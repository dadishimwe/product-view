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

const STORAGE_KEY = "deviceview-app-v1";

interface PersistedState {
  recentlyViewed: string[];
  favorites: string[];
  compare: string[];
}

const defaultState: PersistedState = {
  recentlyViewed: [],
  favorites: [],
  compare: [],
};

function loadState(): PersistedState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    const parsed = JSON.parse(raw);
    return {
      recentlyViewed: parsed.recentlyViewed ?? [],
      favorites: parsed.favorites ?? [],
      compare: parsed.compare ?? [],
    };
  } catch {
    return defaultState;
  }
}

function saveState(state: PersistedState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

interface AppContextValue extends PersistedState {
  hydrated: boolean;
  recordView: (slug: string) => void;
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  addToCompare: (slug: string) => boolean;
  removeFromCompare: (slug: string) => void;
  isInCompare: (slug: string) => boolean;
  clearCompare: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PersistedState>(defaultState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setState(loadState());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    saveState(state);
  }, [state, hydrated]);

  const update = useCallback((fn: (s: PersistedState) => PersistedState) => {
    setState(fn);
  }, []);

  const recordView = useCallback(
    (slug: string) => {
      update((s) => {
        const rest = s.recentlyViewed.filter((x) => x !== slug);
        return { ...s, recentlyViewed: [slug, ...rest].slice(0, 12) };
      });
    },
    [update],
  );

  const toggleFavorite = useCallback(
    (slug: string) => {
      update((s) => {
        const has = s.favorites.includes(slug);
        return {
          ...s,
          favorites: has
            ? s.favorites.filter((x) => x !== slug)
            : [...s.favorites, slug],
        };
      });
    },
    [update],
  );

  const isFavorite = useCallback(
    (slug: string) => state.favorites.includes(slug),
    [state.favorites],
  );

  const addToCompare = useCallback(
    (slug: string) => {
      if (state.compare.includes(slug)) return true;
      if (state.compare.length >= 4) return false;
      update((s) => ({ ...s, compare: [...s.compare, slug] }));
      return true;
    },
    [state.compare, update],
  );

  const removeFromCompare = useCallback(
    (slug: string) => {
      update((s) => ({
        ...s,
        compare: s.compare.filter((x) => x !== slug),
      }));
    },
    [update],
  );

  const isInCompare = useCallback(
    (slug: string) => state.compare.includes(slug),
    [state.compare],
  );

  const clearCompare = useCallback(() => {
    update((s) => ({ ...s, compare: [] }));
  }, [update]);

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      hydrated,
      recordView,
      toggleFavorite,
      isFavorite,
      addToCompare,
      removeFromCompare,
      isInCompare,
      clearCompare,
    }),
    [
      state,
      hydrated,
      recordView,
      toggleFavorite,
      isFavorite,
      addToCompare,
      removeFromCompare,
      isInCompare,
      clearCompare,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
