import Link from "next/link";

export function BrandMark() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 active:scale-[0.98] transition-transform duration-100"
    >
      <span
        className="flex h-9 w-9 items-center justify-center rounded-[10px] border-2 border-ink bg-signal font-display text-lg font-extrabold text-paper"
        aria-hidden
      >
        Z
      </span>
      <span className="font-display text-lg font-extrabold uppercase tracking-[0.06em] text-signal">
        DeviceView
      </span>
    </Link>
  );
}
