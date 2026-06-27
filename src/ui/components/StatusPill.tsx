import type { HTMLAttributes } from "react";

type StatusPillProps = {
  label: string;
  tone?: "neutral" | "good" | "warn" | "bad";
} & HTMLAttributes<HTMLSpanElement>;

export function StatusPill({ label, tone = "neutral", className = "", ...props }: StatusPillProps) {
  return (
    <span className={`status-pill status-pill--${tone} ${className}`.trim()} {...props}>
      {label}
    </span>
  );
}
