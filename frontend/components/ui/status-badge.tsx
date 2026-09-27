import * as React from "react";
import { ClaimStatus } from "@/types/ui";
import { cn } from "@/lib/utils";

interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  status: ClaimStatus;
  showDot?: boolean;
  size?: "sm" | "md";
}

const statusConfig: Record<
  ClaimStatus,
  { bg: string; text: string; border: string; dot: string; pulse?: boolean }
> = {
  New: {
    bg: "bg-slate-50",
    text: "text-slate-700",
    border: "border-slate-200",
    dot: "bg-slate-400",
  },
  "In Review": {
    bg: "bg-sky-50/80",
    text: "text-sky-700",
    border: "border-sky-200",
    dot: "bg-sky-500",
  },
  Analyzing: {
    bg: "bg-blue-50/80",
    text: "text-blue-700",
    border: "border-blue-200",
    dot: "bg-blue-500",
    pulse: true,
  },
  "Analysis Complete": {
    bg: "bg-emerald-50/80",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  "Needs Review": {
    bg: "bg-amber-50/90",
    text: "text-amber-800",
    border: "border-amber-200",
    dot: "bg-amber-500",
  },
  "Decision Pending": {
    bg: "bg-indigo-50/80",
    text: "text-indigo-700",
    border: "border-indigo-200",
    dot: "bg-indigo-500",
  },
  Approved: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    dot: "bg-emerald-500",
  },
  Escalated: {
    bg: "bg-rose-50/80",
    text: "text-rose-700",
    border: "border-rose-200",
    dot: "bg-rose-500",
  },
  Closed: {
    bg: "bg-slate-100/80",
    text: "text-slate-600",
    border: "border-slate-200",
    dot: "bg-slate-400",
  },
};

export function StatusBadge({
  status,
  showDot = true,
  size = "md",
  className,
  ...props
}: StatusBadgeProps) {
  const config = statusConfig[status] || statusConfig["New"];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-medium select-none tracking-tight",
        config.bg,
        config.text,
        config.border,
        size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-0.5 text-xs",
        className
      )}
      role="status"
      {...props}
    >
      {showDot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full shrink-0",
            config.dot,
            config.pulse && "animate-pulse"
          )}
          aria-hidden="true"
        />
      )}
      {status}
    </span>
  );
}
