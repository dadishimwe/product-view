"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { getProductsBySlugs } from "@/lib/products";
import { Button } from "@/components/ui/Button";

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
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">Library</h1>
        <p className="mt-1 text-sm text-neutral-600">
          Saved products and quote sessions stay on this device.
        </p>
      </header>

      <section aria-labelledby="saved-heading">
        <h2 id="saved-heading" className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
          Saved products
        </h2>
        {saved.length === 0 ? (
          <p className="text-sm text-neutral-600">
            Star products from any detail panel to list them here.
          </p>
        ) : (
          <ul className="divide-y divide-neutral-200 rounded-xl border border-neutral-200">
            {saved.map((p) => (
              <li key={p.slug} className="flex items-center gap-3 px-3 py-2">
                <span className="relative h-10 w-10 shrink-0">
                  <Image
                    src={p.images[0].src}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="40px"
                  />
                </span>
                <Link
                  href={`/products/${p.slug}`}
                  className="flex-1 text-sm font-medium hover:underline"
                >
                  {p.name}
                </Link>
                <span className="text-xs text-neutral-500">{p.vendor}</span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section aria-labelledby="sessions-heading">
        <h2 id="sessions-heading" className="mb-3 text-sm font-semibold uppercase tracking-wide text-neutral-500">
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
            className="min-w-[200px] flex-1 rounded-lg border border-neutral-200 px-3 py-2 text-sm"
          />
          <Button type="submit" variant="primary">
            Create session
          </Button>
        </form>

        {sessions.length === 0 ? (
          <p className="text-sm text-neutral-600">
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
                  className={`rounded-xl border p-4 ${
                    isActive ? "border-accent ring-1 ring-accent/20" : "border-neutral-200"
                  }`}
                >
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <input
                      aria-label="Session name"
                      defaultValue={sess.name}
                      onBlur={(e) => renameSession(sess.id, e.target.value)}
                      className="min-w-0 flex-1 rounded-md border border-transparent bg-transparent px-1 py-0.5 text-base font-semibold hover:border-neutral-200 focus:border-neutral-300 focus:outline-none"
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
                      className="!py-1.5 !text-xs text-red-700"
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
                    <p className="text-sm text-neutral-500">
                      No products yet — use Add to quote on a product page.
                    </p>
                  ) : (
                    <ul className="space-y-1 text-sm">
                      {prods.map((p) => (
                        <li key={p.slug} className="flex justify-between gap-2">
                          <Link
                            href={`/products/${p.slug}`}
                            className="font-medium hover:underline"
                          >
                            {p.name}
                          </Link>
                          <button
                            type="button"
                            className="text-xs text-neutral-500 hover:text-red-600"
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
          <p className="mt-3 text-xs text-neutral-500">
            Active session: <strong>{active.name}</strong> — new items from Add to
            quote go here.
          </p>
        ) : null}
      </section>
    </div>
  );
}
