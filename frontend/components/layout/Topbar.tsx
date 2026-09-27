"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Icon,
  Search01Icon,
  Notification01Icon,
  Menu01Icon,
  Shield01Icon,
  HelpCircleIcon,
} from "@/components/ui/icon";
import { IconButton } from "@/components/ui/icon-button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useNotifications } from "@/lib/useNotifications";

export interface TopbarProps {
  pageTitle?: string;
  onOpenMobileMenu?: () => void;
  onOpenHelp?: () => void;
  className?: string;
}

export function Topbar({ pageTitle, onOpenMobileMenu, onOpenHelp, className }: TopbarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const getAutoTitle = () => {
    if (pageTitle) return pageTitle;
    if (pathname === "/dashboard") return "Dashboard";
    if (pathname === "/claims/new") return "New Claim Investigation";
    if (pathname.startsWith("/claims/")) return "Claim Review";
    if (pathname === "/claims") return "Claims Queue";
    if (pathname === "/investigations") return "Active Investigations";
    if (pathname === "/reports") return "Audit Reports";
    if (pathname === "/settings") return "Settings";
    return "ClaimShield AI";
  };

  return (
    <header
      className={cn(
        "h-16 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 select-none z-20",
        className
      )}
    >
      {/* Left: Mobile trigger & Page title / Global search */}
      <div className="flex items-center gap-3 flex-1 max-w-lg">
        {onOpenMobileMenu && (
          <IconButton
            label="Open Navigation Menu"
            size="md"
            onClick={onOpenMobileMenu}
            className="lg:hidden"
          >
            <Icon icon={Menu01Icon} size="md" />
          </IconButton>
        )}

        <div className="hidden sm:block min-w-0 pr-3">
          <span className="text-sm font-semibold text-slate-900 truncate block">
            {getAutoTitle()}
          </span>
        </div>

        {/* Global Search Visual Foundation */}
        <div className="relative w-full max-w-xs">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
            <Icon icon={Search01Icon} size="sm" />
          </div>
          <input
            type="text"
            placeholder="Search claims, ID, claimant..."
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const target = e.target as HTMLInputElement;
                if (target.value.trim()) {
                  router.push(`/claims?q=${encodeURIComponent(target.value.trim())}`);
                }
              }
            }}
            className="w-full h-9 pl-9 pr-14 rounded-xl border border-slate-200/90 bg-slate-50/70 text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
          />
          <div className="absolute inset-y-0 right-0 pr-2 flex items-center pointer-events-none">
            <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white border border-slate-200 rounded">
              ⌘K
            </kbd>
          </div>
        </div>
      </div>

      {/* Center / Right: Human Authority Notice, Help, Notifications & User Profile */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {/* Core Principle Badge */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs">
          <Icon icon={Shield01Icon} size="xs" className="text-sky-600" />
          <span className="font-medium text-[11px]">Human Decision Authority</span>
        </div>

        {/* Help Modal Trigger */}
        {onOpenHelp && (
          <IconButton
            label="Help & Guide"
            variant="ghost"
            size="md"
            onClick={onOpenHelp}
          >
            <Icon icon={HelpCircleIcon} size="md" className="text-slate-600" />
          </IconButton>
        )}

        {/* Notifications Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="relative cursor-pointer">
              <IconButton label="Notifications" variant="ghost" size="md">
                <Icon icon={Notification01Icon} size="md" className="text-slate-600" />
                <NotificationBadge />
              </IconButton>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/50">
              <span className="font-semibold text-slate-900 text-sm">Notifications</span>
              <NotificationMarkAllRead />
            </div>
            <NotificationList />
            <div className="p-2 border-t border-slate-100">
              <DropdownMenuItem asChild className="justify-center text-sky-600 font-medium">
                <Link href="/notifications" className="w-full text-center">View All Notifications</Link>
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Investigator User Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex items-center gap-2 rounded-xl p-1.5 hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-sky-500"
              aria-label="Investigator Profile Menu"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-600 text-white font-semibold text-xs shadow-xs">
                SJ
              </div>
              <div className="hidden sm:flex flex-col text-left">
                <span className="text-xs font-semibold text-slate-900 leading-tight">
                  Sarah Jenkins
                </span>
                <span className="text-[10px] text-slate-500">
                  SIU Investigator
                </span>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-slate-900">Sarah Jenkins</span>
                <span className="text-[11px] text-slate-400 font-normal lowercase">s.jenkins@claimshield.internal</span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/profile" className="w-full cursor-pointer">
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings" className="w-full cursor-pointer">
                Investigator Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/claims" className="w-full cursor-pointer">
                Assigned Queue (8 active)
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/reports" className="w-full cursor-pointer">
                Audit Logs & Sign-offs
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/login" className="w-full cursor-pointer text-rose-600">
                Sign Out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

// Sub-components for Notifications to use hooks cleanly without making Topbar too messy
function NotificationBadge() {
  const { unreadCount } = useNotifications();
  if (unreadCount === 0) return null;
  return (
    <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white ring-2 ring-white">
      {unreadCount}
    </span>
  );
}

function NotificationMarkAllRead() {
  const { markAllAsRead, unreadCount } = useNotifications();
  if (unreadCount === 0) return null;
  return (
    <button 
      onClick={(e) => {
        e.preventDefault();
        markAllAsRead();
      }}
      className="text-xs text-sky-600 hover:text-sky-700 font-medium"
    >
      Mark all read
    </button>
  );
}

function NotificationList() {
  const { notifications, markAsRead } = useNotifications();
  const recent = notifications.slice(0, 4);

  if (recent.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-slate-500">
        No new notifications
      </div>
    );
  }

  return (
    <div className="max-h-[300px] overflow-y-auto">
      {recent.map(n => (
        <DropdownMenuItem 
          key={n.id} 
          asChild
          onClick={() => {
            if (!n.read) markAsRead(n.id);
          }}
          className={`flex flex-col items-start p-4 gap-1 cursor-pointer border-b border-slate-50 last:border-0 rounded-none focus:bg-slate-50 ${!n.read ? 'bg-sky-50/40' : ''}`}
        >
          <Link href={n.link || "#"} className="w-full">
            <div className="flex w-full items-start justify-between gap-2">
              <span className={`text-xs font-semibold ${!n.read ? 'text-slate-900' : 'text-slate-700'}`}>
                {n.title}
              </span>
              {!n.read && <span className="h-2 w-2 rounded-full bg-sky-500 shrink-0 mt-1" />}
            </div>
            <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 leading-snug">{n.message}</p>
          </Link>
        </DropdownMenuItem>
      ))}
    </div>
  );
}
