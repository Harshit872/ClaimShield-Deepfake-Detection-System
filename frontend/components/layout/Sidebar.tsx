"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MAIN_NAV_ITEMS, SECONDARY_NAV_ITEMS, NavItemDef } from "@/data/navigationItems";
import { Icon, Shield01Icon, ArrowRight01Icon, UserIcon } from "@/components/ui/icon";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface SidebarProps {
  activeId?: string;
  onSelect?: (id: string) => void;
  onOpenHelp?: () => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  className?: string;
}

export function Sidebar({
  onSelect,
  onOpenHelp,
  isCollapsed = false,
  onToggleCollapse,
  className,
}: SidebarProps) {
  const pathname = usePathname();

  const isItemActive = (item: NavItemDef) => {
    if (item.href === "/dashboard") {
      return pathname === "/dashboard";
    }
    if (item.href.startsWith("/claims")) {
      return pathname.startsWith("/claims");
    }
    if (item.href.startsWith("/investigations")) {
      return pathname.startsWith("/investigations");
    }
    if (item.href.startsWith("/reports")) {
      return pathname.startsWith("/reports");
    }
    if (item.href.startsWith("/settings")) {
      return pathname.startsWith("/settings");
    }
    return false;
  };

  const renderNavItem = (item: NavItemDef) => {
    const isActive = isItemActive(item);
    const isHelpItem = item.id === "help";

    const content = (
      <div
        className={cn(
          "group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500",
          isActive
            ? "bg-sky-50/90 text-sky-900 font-semibold shadow-xs border border-sky-200/70"
            : "text-slate-600 hover:bg-slate-100/70 hover:text-slate-900 border border-transparent",
          isCollapsed && "justify-center px-2"
        )}
      >
        <Icon
          icon={item.icon}
          size="md"
          className={cn(
            "transition-colors",
            isActive ? "text-sky-600" : "text-slate-400 group-hover:text-slate-700"
          )}
        />
        {!isCollapsed && (
          <span className="flex-1 text-left truncate">{item.label}</span>
        )}
        {!isCollapsed && item.badge !== undefined && (
          <span
            className={cn(
              "ml-auto text-[11px] font-semibold px-2 py-0.5 rounded-full",
              isActive
                ? "bg-sky-100 text-sky-800"
                : "bg-slate-100 text-slate-500"
            )}
          >
            {item.badge}
          </span>
        )}
      </div>
    );

    if (isHelpItem) {
      const buttonElem = (
        <button
          key={item.id}
          type="button"
          onClick={() => {
            onOpenHelp?.();
            onSelect?.(item.id);
          }}
          className="w-full text-left"
        >
          {content}
        </button>
      );

      if (isCollapsed) {
        return (
          <Tooltip key={item.id} delayDuration={150}>
            <TooltipTrigger asChild>{buttonElem}</TooltipTrigger>
            <TooltipContent side="right">
              <span>{item.label}</span>
            </TooltipContent>
          </Tooltip>
        );
      }
      return buttonElem;
    }

    const linkElem = (
      <Link
        key={item.id}
        href={item.href}
        onClick={() => onSelect?.(item.id)}
        aria-current={isActive ? "page" : undefined}
      >
        {content}
      </Link>
    );

    if (isCollapsed) {
      return (
        <Tooltip key={item.id} delayDuration={150}>
          <TooltipTrigger asChild>{linkElem}</TooltipTrigger>
          <TooltipContent side="right">
            <span>{item.label}</span>
            {item.badge !== undefined && (
              <span className="ml-1.5 opacity-70">({item.badge})</span>
            )}
          </TooltipContent>
        </Tooltip>
      );
    }

    return linkElem;
  };

  return (
    <TooltipProvider>
      <aside
        className={cn(
          "flex flex-col h-full bg-white/85 backdrop-blur-md border-r border-slate-200/80 transition-all duration-300 select-none z-30 overflow-x-hidden",
          isCollapsed ? "w-16" : "w-64",
          className
        )}
      >
        {/* Brand Header */}
        <div className={cn("flex items-center h-16 border-b border-slate-100", isCollapsed ? "justify-center" : "justify-between px-4")}>
          {!isCollapsed && (
            <Link
              href="/"
              className="flex items-center gap-3 overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-sm shrink-0 transition-transform group-hover:scale-105">
                <Icon icon={Shield01Icon} size="md" className="text-white" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-bold tracking-tight text-slate-900 truncate">
                  ClaimShield <span className="text-sky-600">AI</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                  Investigation Suite
                </span>
              </div>
            </Link>
          )}

          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className={cn(
                "hidden lg:flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0",
                isCollapsed && "rotate-180"
              )}
            >
              <Icon icon={ArrowRight01Icon} size="xs" />
            </button>
          )}
        </div>

        {/* Primary Navigation */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1" aria-label="Main Navigation">
          {!isCollapsed && (
            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              Investigation Workspace
            </div>
          )}
          {MAIN_NAV_ITEMS.map(renderNavItem)}

          {/* Section Divider */}
          <div className="my-4 border-t border-slate-100" />

          {!isCollapsed && (
            <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
              System & Reference
            </div>
          )}
          {SECONDARY_NAV_ITEMS.map(renderNavItem)}
        </nav>

        {/* Investigator Footer Profile */}
        <div className={cn("border-t border-slate-100 bg-slate-50/50", isCollapsed ? "p-2" : "p-3")}>
          <Link
            href="/settings"
            className={cn(
              "flex items-center gap-3 rounded-xl transition-colors hover:bg-slate-100/70",
              isCollapsed ? "justify-center p-2" : "p-2 bg-white border border-slate-200/80 shadow-xs"
            )}
          >
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-800 font-semibold text-xs shrink-0">
              <Icon icon={UserIcon} size="sm" className="text-sky-700" />
              <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
            </div>

            {!isCollapsed && (
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-semibold text-slate-900 truncate">
                  Sarah Jenkins
                </span>
                <span className="text-[10px] text-slate-500 truncate">
                  Senior Investigator
                </span>
              </div>
            )}
          </Link>
        </div>
      </aside>
    </TooltipProvider>
  );
}
