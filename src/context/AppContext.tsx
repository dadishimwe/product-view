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

export interface QuoteSession {
  id: string;
  name: string;
  productSlugs: string[];
  updatedAt: string;
}

interface PersistedState {
  recentlyViewed: string[];
  favorites: string[];
  compare: string[];
  sessions: QuoteSession[];
  activeSessionId: string | null;
}

const defaultState: PersistedState = {
  recentlyViewed: [],
  favorites: [],
  compare: [],
  sessions: [],
  activeSessionId: null,
};

function loadState(): PersistedState {
  if (typeof window === "undefined") return defaultState;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultState;
    return { ...defaultState, ...JSON.parse(raw) };
  } catch {
    return defaultState;
  }
}

function saveState(state: PersistedState) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function newSession(name: string): QuoteSession {
  return {
    id: crypto.randomUUID(),
    name,
    productSlugs: [],
    updatedAt: new Date().toISOString(),
  };
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
  addToQuote: (slug: string) => void;
  removeFromQuote: (slug: string, sessionId?: string) => void;
  createSession: (name: string) => string;
  renameSession: (id: string, name: string) => void;
  deleteSession: (id: string) => void;
  setActiveSession: (id: string | null) => void;
  ensureActiveSession: () => string;
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

  const ensureActiveSession = useCallback(() => {
    if (state.activeSessionId) {
      const exists = state.sessions.some((x) => x.id === state.activeSessionId);
      if (exists) return state.activeSessionId;
    }
    const session = newSession("Default quote");
    update((s) => ({
      ...s,
      sessions: [session, ...s.sessions],
      activeSessionId: session.id,
    }));
    return session.id;
  }, [state.activeSessionId, state.sessions, update]);

  const addToQuote = useCallback(
    (slug: string) => {
      update((s) => {
        let sessions = [...s.sessions];
        let activeId = s.activeSessionId;
        if (!activeId || !sessions.some((x) => x.id === activeId)) {
          const session = newSession("Default quote");
          sessions = [session, ...sessions];
          activeId = session.id;
        }
        sessions = sessions.map((sess) => {
          if (sess.id !== activeId) return sess;
          if (sess.productSlugs.includes(slug)) return sess;
          return {
            ...sess,
            productSlugs: [...sess.productSlugs, slug],
            updatedAt: new Date().toISOString(),
          };
        });
        return { ...s, sessions, activeSessionId: activeId };
      });
    },
    [update],
  );

  const removeFromQuote = useCallback(
    (slug: string, sessionId?: string) => {
      update((s) => {
        const id = sessionId ?? s.activeSessionId;
        if (!id) return s;
        return {
          ...s,
          sessions: s.sessions.map((sess) =>
            sess.id !== id
              ? sess
              : {
                  ...sess,
                  productSlugs: sess.productSlugs.filter((x) => x !== slug),
                  updatedAt: new Date().toISOString(),
                },
          ),
        };
      });
    },
    [update],
  );

  const createSession = useCallback(
    (name: string) => {
      const session = newSession(name.trim() || "Untitled session");
      update((s) => ({
        ...s,
        sessions: [session, ...s.sessions],
        activeSessionId: session.id,
      }));
      return session.id;
    },
    [update],
  );

  const renameSession = useCallback(
    (id: string, name: string) => {
      update((s) => ({
        ...s,
        sessions: s.sessions.map((sess) =>
          sess.id === id
            ? { ...sess, name: name.trim() || sess.name, updatedAt: new Date().toISOString() }
            : sess,
        ),
      }));
    },
    [update],
  );

  const deleteSession = useCallback(
    (id: string) => {
      update((s) => {
        const sessions = s.sessions.filter((x) => x.id !== id);
        const activeSessionId =
          s.activeSessionId === id ? (sessions[0]?.id ?? null) : s.activeSessionId;
        return { ...s, sessions, activeSessionId };
      });
    },
    [update],
  );

  const setActiveSession = useCallback(
    (id: string | null) => {
      update((s) => ({ ...s, activeSessionId: id }));
    },
    [update],
  );

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
      addToQuote,
      removeFromQuote,
      createSession,
      renameSession,
      deleteSession,
      setActiveSession,
      ensureActiveSession,
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
      addToQuote,
      removeFromQuote,
      createSession,
      renameSession,
      deleteSession,
      setActiveSession,
      ensureActiveSession,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
