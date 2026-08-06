"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
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

  return (
    <header className="sticky top-0 z-40 border-b-2 border-ink bg-paper">
      <div className="mx-auto flex max-w-[1600px] flex-col items-center gap-3 px-4 py-3 sm:flex-row sm:justify-between sm:px-6">
        <BrandMark />
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
      </div>
    </header>
  );
}
