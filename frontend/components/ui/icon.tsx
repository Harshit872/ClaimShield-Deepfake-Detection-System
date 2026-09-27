"use client";

import React from "react";
import { HugeiconsIcon, type IconSvgElement } from "@hugeicons/react";
import {
  Shield01Icon,
  ShieldAlertIcon,
  Search01Icon,
  Notification01Icon,
  UserIcon,
  DashboardCircleIcon,
  Folder01Icon,
  File01Icon,
  Settings01Icon,
  HelpCircleIcon,
  CheckmarkCircle01Icon,
  AlertCircleIcon,
  Clock01Icon,
  InformationCircleIcon,
  Menu01Icon,
  Cancel01Icon,
  ArrowRight01Icon,
  ArrowLeft01Icon,
  ArrowDown01Icon,
  FilterIcon,
  Upload01Icon,
  ViewIcon,
  Layers01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";
import { cn } from "@/lib/utils";

export type IconSize = "xs" | "sm" | "md" | "lg" | "xl" | number;

const sizeMap: Record<"xs" | "sm" | "md" | "lg" | "xl", number> = {
  xs: 14,
  sm: 16,
  md: 18,
  lg: 20,
  xl: 24,
};

export interface IconProps {
  icon: IconSvgElement;
  size?: IconSize;
  className?: string;
  strokeWidth?: number;
  alt?: string;
}

export function Icon({
  icon,
  size = "md",
  className,
  strokeWidth = 1.5,
  alt,
}: IconProps) {
  const pixelSize = typeof size === "number" ? size : sizeMap[size];

  return (
    <span
      className={cn("inline-flex items-center justify-center shrink-0", className)}
      role={alt ? "img" : "presentation"}
      aria-label={alt}
      aria-hidden={!alt}
    >
      <HugeiconsIcon
        icon={icon}
        size={pixelSize}
        strokeWidth={strokeWidth}
      />
    </span>
  );
}

// Named Icon exports for quick, consistent usage
export {
  Shield01Icon,
  ShieldAlertIcon,
  Search01Icon,
  Notification01Icon,
  UserIcon,
  DashboardCircleIcon,
  Folder01Icon,
  File01Icon,
  Settings01Icon,
  HelpCircleIcon,
  CheckmarkCircle01Icon,
  AlertCircleIcon,
  Clock01Icon,
  InformationCircleIcon,
  Menu01Icon,
  Cancel01Icon,
  ArrowRight01Icon,
  ArrowLeft01Icon,
  ArrowDown01Icon,
  FilterIcon,
  Upload01Icon,
  ViewIcon,
  Layers01Icon,
  SparklesIcon,
};
