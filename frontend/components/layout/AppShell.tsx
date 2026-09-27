"use client";

import React, { useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { ClaimShieldBackground } from "@/components/background/ClaimShieldBackground";
import { HelpModal } from "@/components/help/HelpModal";
import { cn } from "@/lib/utils";

export interface AppShellProps {
  children: React.ReactNode;
  pageTitle?: string;
  activeNavId?: string;
  onSelectNav?: (id: string) => void;
  className?: string;
}

export function AppShell({
  children,
  pageTitle,
  activeNavId,
  onSelectNav,
  className,
}: AppShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  const handleSelect = (id: string) => {
    onSelectNav?.(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-transparent text-slate-900">
      {/* Clean Light Spatial Background System */}
      <ClaimShieldBackground />

      {/* Help Modal */}
      <HelpModal open={isHelpOpen} onOpenChange={setIsHelpOpen} />

      <div className="flex flex-1 min-h-screen">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block shrink-0">
          <Sidebar
            activeId={activeNavId}
            onSelect={handleSelect}
            onOpenHelp={() => setIsHelpOpen(true)}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed((prev) => !prev)}
            className="sticky top-0 h-screen"
          />
        </div>

        {/* Mobile Navigation Drawer Sheet */}
        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetContent side="left" className="p-0 w-72 max-w-xs">
            <SheetTitle className="sr-only">ClaimShield Navigation</SheetTitle>
            <Sidebar
              activeId={activeNavId}
              onSelect={handleSelect}
              onOpenHelp={() => {
                setIsMobileMenuOpen(false);
                setIsHelpOpen(true);
              }}
              isCollapsed={false}
              className="h-full border-none w-full"
            />
          </SheetContent>
        </Sheet>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Topbar
            pageTitle={pageTitle}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
            onOpenHelp={() => setIsHelpOpen(true)}
          />

          <main className={cn("flex-1 overflow-y-auto", className)}>
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
