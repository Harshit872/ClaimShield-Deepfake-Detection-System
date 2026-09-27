export interface NavItemConfig {
  id: string;
  label: string;
  href: string;
  iconName: string;
  badge?: string | number;
  badgeVariant?: "default" | "alert" | "subtle";
  isSectionDivider?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isCurrent?: boolean;
}
