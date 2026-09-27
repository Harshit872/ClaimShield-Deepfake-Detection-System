import { type IconSvgElement } from "@hugeicons/react";
import {
  DashboardCircleIcon,
  Folder01Icon,
  Search01Icon,
  File01Icon,
  Settings01Icon,
  HelpCircleIcon,
} from "@/components/ui/icon";

export interface NavItemDef {
  id: string;
  label: string;
  href: string;
  icon: IconSvgElement;
  badge?: string | number;
  badgeVariant?: "default" | "alert" | "subtle";
  isSectionDivider?: boolean;
}

export const MAIN_NAV_ITEMS: NavItemDef[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    href: "/dashboard",
    icon: DashboardCircleIcon,
  },
  {
    id: "claims",
    label: "Claims",
    href: "/claims",
    icon: Folder01Icon,
    badge: "8",
  },
  {
    id: "investigations",
    label: "Investigations",
    href: "/investigations",
    icon: Search01Icon,
    badge: "5",
  },
  {
    id: "reports",
    label: "Reports",
    href: "/reports",
    icon: File01Icon,
  },
];

export const SECONDARY_NAV_ITEMS: NavItemDef[] = [
  {
    id: "settings",
    label: "Settings",
    href: "/settings",
    icon: Settings01Icon,
  },
  {
    id: "help",
    label: "Help",
    href: "#help",
    icon: HelpCircleIcon,
  },
];
