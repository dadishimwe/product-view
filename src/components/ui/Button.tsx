import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  children: ReactNode;
}

const variants: Record<Variant, string> = {
  primary: "pill-btn pill-btn-primary hover:!bg-[#2a2838]",
  secondary: "pill-btn",
  ghost:
    "inline-flex items-center justify-center rounded-full px-3 py-2 font-display text-sm font-semibold text-ink hover:bg-mist border-2 border-transparent",
};

export function Button({
  variant = "secondary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      className={`${variants[variant]} disabled:pointer-events-none disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
