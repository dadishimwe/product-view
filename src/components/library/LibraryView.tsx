"use client";

import Link from "next/link";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { getProductsBySlugs } from "@/lib/products";
import { Button } from "@/components/ui/Button";
import { ProductMedia } from "@/components/products/ProductMedia";

export function LibraryView() {
  const {
    favorites,
    sessions,
    activeSessionId,
    createSession,
    renameSession,
    deleteSession,
    setActiveSession,
    removeFromQuote,
  } = useApp();
  const [newName, setNewName] = useState("");

  const saved = getProductsBySlugs(favorites);
  const active = sessions.find((s) => s.id === activeSessionId);

  return (
    <div className="mx-auto max-w-3xl flex-1 space-y-10 p-4 sm:p-8">
      <header className="catalog-frame p-6">
        <p className="field-label">Project files</p>
        <h1 className="font-display text-2xl font-bold">Library</h1>
        <p className="mt-2 text-sm text-graphite">
          Saved products and quote sessions stay on this device.
        </p>
      </header>

      <section aria-labelledby="saved-heading">
        <h2 id="saved-heading" className="field-label mb-3">
          Saved products
        </h2>
        {saved.length === 0 ? (
          <p className="text-sm text-graphite">
            Star products from the workspace toolbar to list them here.
          </p>
        ) : (
          <ul className="catalog-panel divide-y-2 divide-ink/10">
            {saved.map((p) => (
              <li key={p.slug} className="flex items-center gap-3 px-3 py-2">
                <span className="relative block h-10 w-10 shrink-0 border-2 border-ink bg-mist">
                  <ProductMedia
                    src={p.images[0].src}
                    fallbackSrc={p.images[0].fallbackSrc}
                    alt=""
                    className="object-contain"
                    sizes="40px"
                  />
                </span>
                <Link
                  href={`/products/${p.slug}`}
                  className="flex-1 font-display text-sm font-semibold hover:underline"
                >
                  {p.name}
                </Link>
                <span className="vendor-band text-[0.65rem]">{p.vendor}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="sessions-heading">
        <h2 id="sessions-heading" className="field-label mb-3">
          Quote sessions
        </h2>
        <form
          className="mb-4 flex flex-wrap gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            if (!newName.trim()) return;
            createSession(newName.trim());
            setNewName("");
          }}
        >
          <label className="sr-only" htmlFor="session-name">
            New session name
          </label>
          <input
            id="session-name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder='e.g. Client X — Site survey'
            className="field-input min-w-[200px] flex-1"
          />
          <Button type="submit" variant="primary">
            Create session
          </Button>
        </form>

        {sessions.length === 0 ? (
          <p className="text-sm text-graphite">
            Create a session to group products for a deployment quote.
          </p>
        ) : (
          <ul className="space-y-4">
            {sessions.map((sess) => {
              const prods = getProductsBySlugs(sess.productSlugs);
              const isActive = sess.id === activeSessionId;
              return (
                <li
                  key={sess.id}
                  className={`catalog-panel p-4 ${
                    isActive ? "shadow-[3px_4px_0_#14121f]" : ""
                  }`}
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <input
                      aria-label="Session name"
                      defaultValue={sess.name}
                      onBlur={(e) => renameSession(sess.id, e.target.value)}
                      className="min-w-0 flex-1 border-2 border-transparent bg-transparent px-1 py-0.5 font-display text-base font-bold hover:border-ink/20 focus:border-ink focus:outline-none"
                    />
                    <Button
                      variant={isActive ? "primary" : "secondary"}
                      className="!py-1.5 !text-xs"
                      onClick={() => setActiveSession(sess.id)}
                    >
                      {isActive ? "Active" : "Set active"}
                    </Button>
                    <Button
                      variant="ghost"
                      className="!py-1.5 !text-xs !text-signal-deep"
                      onClick={() => {
                        if (
                          confirm(
                            `Delete session "${sess.name}"? This cannot be undone.`,
                          )
                        ) {
                          deleteSession(sess.id);
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                  {prods.length === 0 ? (
                    <p className="text-sm text-graphite">
                      No products yet — use Add to quote on a product page.
                    </p>
                  ) : (
                    <ul className="space-y-1 text-sm">
                      {prods.map((p) => (
                        <li key={p.slug} className="flex justify-between gap-2">
                          <Link
                            href={`/products/${p.slug}`}
                            className="font-display font-semibold hover:underline"
                          >
                            {p.name}
                          </Link>
                          <button
                            type="button"
                            className="text-xs font-semibold text-graphite hover:text-signal-deep"
                            onClick={() => removeFromQuote(p.slug, sess.id)}
                          >
                            Remove
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>
        )}

        {active ? (
          <p className="mt-3 font-mono text-xs text-graphite">
            Active session: {active.name} — new quote items go here.
          </p>
        ) : null}
      </section>
    </div>
  );
}
