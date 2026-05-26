"use client";

import { type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "ghost";
  size?: "sm" | "md";
}

export function Button({
  variant = "default",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  const base = "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] disabled:opacity-50 disabled:cursor-not-allowed";
  const variants = {
    default: "border border-[var(--color-border)] hover:bg-[var(--color-surface)] text-[var(--color-text)] bg-white",
    primary: "bg-[var(--color-accent)] text-white border-transparent hover:bg-blue-700",
    ghost: "border-none hover:bg-[var(--color-surface)] text-[var(--color-muted)]",
  };
  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
