"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { useNotifications, NotificationType } from "@/lib/useNotifications";
import { Button } from "@/components/ui/button";
import { Icon, CheckmarkCircle01Icon, Notification01Icon, Folder01Icon, AlertCircleIcon, File01Icon, Search01Icon } from "@/components/ui/icon";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TYPE_ICONS: Record<NotificationType, any> = {
  INVESTIGATION: Search01Icon,
  CLAIM: Folder01Icon,
  EVIDENCE: File01Icon,
  RISK: AlertCircleIcon,
  SYSTEM: Notification01Icon,
};

const TYPE_COLORS: Record<NotificationType, string> = {
  INVESTIGATION: "text-indigo-600 bg-indigo-100",
  CLAIM: "text-sky-600 bg-sky-100",
  EVIDENCE: "text-emerald-600 bg-emerald-100",
  RISK: "text-amber-600 bg-amber-100",
  SYSTEM: "text-slate-600 bg-slate-100",
};

export default function NotificationsPage() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification, unreadCount } = useNotifications();
  const [filter, setFilter] = useState<"ALL" | "UNREAD" | NotificationType>("ALL");

  const filteredNotifs = notifications.filter(n => {
    if (filter === "UNREAD") return !n.read;
    if (filter === "ALL") return true;
    return n.type === filter;
  });

  return (
    <AppShell activeNavId="dashboard" pageTitle="Notifications">
      <PageContainer maxWidth="md">
        <FadeIn>
          <PageHeader
            title="Notifications"
            description="Stay updated on your claims, evidence uploads, and system alerts."
            actions={
              <div className="flex gap-2">
                {unreadCount > 0 && (
                  <Button variant="secondary" size="sm" onClick={markAllAsRead} className="text-sky-600 hover:text-sky-700">
                    <Icon icon={CheckmarkCircle01Icon} size="sm" className="mr-1.5" />
                    Mark all as read
                  </Button>
                )}
              </div>
            }
          />
        </FadeIn>

        <FadeIn delay={0.05}>
          {/* Filters */}
          <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
            <FilterChip label="All" active={filter === "ALL"} onClick={() => setFilter("ALL")} count={notifications.length} />
            <FilterChip label="Unread" active={filter === "UNREAD"} onClick={() => setFilter("UNREAD")} count={unreadCount} />
            <div className="w-px h-4 bg-slate-200 mx-1" />
            <FilterChip label="Claims" active={filter === "CLAIM"} onClick={() => setFilter("CLAIM")} />
            <FilterChip label="Evidence" active={filter === "EVIDENCE"} onClick={() => setFilter("EVIDENCE")} />
            <FilterChip label="Risk" active={filter === "RISK"} onClick={() => setFilter("RISK")} />
            <FilterChip label="Investigations" active={filter === "INVESTIGATION"} onClick={() => setFilter("INVESTIGATION")} />
            <FilterChip label="System" active={filter === "SYSTEM"} onClick={() => setFilter("SYSTEM")} />
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          {filteredNotifs.length === 0 ? (
            <Card className="border-dashed shadow-none border-slate-200">
              <CardContent className="pt-6">
                <EmptyState
                  title="No notifications found"
                  description="You're all caught up. There are no notifications matching your current filters."
                  icon={Notification01Icon}
                  actionLabel={filter !== "ALL" ? "Clear Filters" : undefined}
                  onAction={() => setFilter("ALL")}
                />
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {filteredNotifs.map(n => {
                const TypeIcon = TYPE_ICONS[n.type] || Notification01Icon;
                const typeColorClass = TYPE_COLORS[n.type] || "text-slate-600 bg-slate-100";

                return (
                  <div 
                    key={n.id}
                    className={`flex items-start gap-4 p-4 rounded-xl border transition-colors ${
                      !n.read ? "bg-sky-50/50 border-sky-100 shadow-sm" : "bg-white border-slate-200/60"
                    }`}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${typeColorClass}`}>
                      <Icon icon={TypeIcon} size="sm" />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        {!n.read && <span className="h-2 w-2 shrink-0 rounded-full bg-sky-500" />}
                        <h4 className={`text-sm font-semibold truncate ${!n.read ? "text-slate-900" : "text-slate-700"}`}>
                          {n.title}
                        </h4>
                        <span className="text-[10px] text-slate-400 font-medium ml-auto whitespace-nowrap">
                          {new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: 'numeric', month: 'short', day: 'numeric' }).format(new Date(n.timestamp))}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 mb-3 leading-relaxed">
                        {n.message}
                      </p>
                      
                      <div className="flex items-center gap-3">
                        {n.link && (
                          <Button 
                            variant={!n.read ? "primary" : "secondary"} 
                            size="sm" 
                            className="h-7 text-xs px-3" 
                            asChild
                            onClick={() => { if (!n.read) markAsRead(n.id); }}
                          >
                            <Link href={n.link}>View Details</Link>
                          </Button>
                        )}
                        {!n.read && (
                          <button 
                            onClick={() => markAsRead(n.id)}
                            className="text-xs font-medium text-slate-500 hover:text-slate-700 transition-colors"
                          >
                            Mark as read
                          </button>
                        )}
                        <button 
                          onClick={() => deleteNotification(n.id)}
                          className="text-xs font-medium text-slate-400 hover:text-rose-600 transition-colors ml-auto"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </FadeIn>
      </PageContainer>
    </AppShell>
  );
}

function FilterChip({ label, active, onClick, count }: { label: string; active: boolean; onClick: () => void; count?: number }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
        active 
          ? "bg-slate-900 text-white shadow-sm" 
          : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
      }`}
    >
      {label}
      {count !== undefined && (
        <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${active ? "bg-slate-700 text-white" : "bg-slate-100 text-slate-500"}`}>
          {count}
        </span>
      )}
    </button>
  );
}
