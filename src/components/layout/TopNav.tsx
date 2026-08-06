"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";

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
    <header className="sticky top-0 z-40 border-b border-neutral-200/80 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/70">
      <div className="mx-auto flex h-14 max-w-[1600px] items-center justify-between gap-6 px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight text-neutral-950 active:scale-[0.98] transition-transform duration-100"
        >
          <span
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-xs font-bold text-white"
            aria-hidden
          >
            DV
          </span>
          <span className="hidden sm:inline">DeviceView</span>
        </Link>
        <nav className="flex items-center gap-1" aria-label="Main">
          {links.map(({ href, label }) => {
            const active =
              href === "/"
                ? pathname === "/"
                : pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={`rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-150 active:scale-[0.97] ${
                  active
                    ? "bg-accent text-white"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950"
                }`}
                aria-current={active ? "page" : undefined}
              >
                {label}
                {href === "/compare" && compare.length > 0 ? (
                  <span className="ml-1.5 tabular-nums opacity-90">
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
