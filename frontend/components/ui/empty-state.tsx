import React from "react";
import { Icon, IconProps, Folder01Icon } from "./icon";
import { Button } from "./button";
import { cn } from "@/lib/utils";

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: IconProps["icon"];
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon = Folder01Icon,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white/60 p-8 sm:p-12 text-center transition-all duration-200",
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-200/80 text-slate-500 mb-4 shadow-sm">
        <Icon icon={icon} size="lg" className="text-slate-400" />
      </div>

      <h3 className="text-sm font-semibold text-slate-900 mb-1">{title}</h3>
      <p className="max-w-sm text-xs text-slate-500 leading-relaxed mb-5">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button variant="secondary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
