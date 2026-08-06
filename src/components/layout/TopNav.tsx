"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { paletteShortcutLabel } from "@/lib/shortcut-label";
import { BrandMark } from "./BrandMark";

const links = [
  { href: "/", label: "Explore" },
  { href: "/products", label: "Products" },
  { href: "/library", label: "Library" },
  { href: "/compare", label: "Compare" },
] as const;

export function TopNav() {
  const pathname = usePathname();
  const { compare } = useApp();
  const [shortcut, setShortcut] = useState("⌘K");

  useEffect(() => {
    setShortcut(paletteShortcutLabel());
  }, []);

  const openPalette = () => {
    window.dispatchEvent(
      new KeyboardEvent("keydown", {
        key: "k",
        metaKey: shortcut.startsWith("⌘"),
        ctrlKey: shortcut.startsWith("Ctrl"),
        bubbles: true,
      }),
    );
  };

  return (
    <header className="app-chrome sticky top-0 z-40 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:justify-between sm:px-6">
        <BrandMark />
        <div className="flex flex-wrap items-center justify-center gap-2">
          <nav className="flex flex-wrap justify-center gap-2" aria-label="Main">
            {links.map(({ href, label }) => {
              const active =
                href === "/" ? pathname === "/" : pathname.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className="nav-pill"
                  data-active={active ? "true" : "false"}
                  aria-current={active ? "page" : undefined}
                >
                  {label}
                  {href === "/compare" && compare.length > 0 ? (
                    <span className="ml-1 font-mono text-xs tabular-nums">
                      ({compare.length})
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </nav>
          <button
            type="button"
            className="nav-kbd"
            onClick={openPalette}
            aria-label={`Quick find (${shortcut})`}
          >
            {shortcut}
          </button>
        </div>
      </div>
    </header>
  );
}
