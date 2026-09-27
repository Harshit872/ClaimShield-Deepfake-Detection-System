/**
 * ClaimShield AI — Unified Design Tokens
 * 
 * Centralized specifications for colors, typography, elevations, spacing,
 * transitions, and motion durations. Follows a clean, light, restrained
 * visual aesthetic inspired by Antigravity's precision and clarity.
 */

export const colors = {
  // Base Canvas & Surfaces (Clean Light Environment)
  canvas: {
    base: "#FAFBFD",
    surface: "#FFFFFF",
    surfaceMuted: "#F8FAFC",
    surfaceSubtle: "#F1F5F9",
    surfaceElevated: "rgba(255, 255, 255, 0.9)",
    glass: "rgba(255, 255, 255, 0.78)",
  },

  // Primary Accent (Restrained Electric Cyan / Sky Blue)
  accent: {
    primary: "#0284C7", // Sky 600
    hover: "#0369A1",   // Sky 700
    subtle: "#F0F9FF",  // Sky 50
    border: "#BAE6FD",  // Sky 200
    glow: "rgba(2, 132, 199, 0.08)",
  },

  // Typography & Text
  text: {
    primary: "#0F172A",   // Slate 900
    secondary: "#475569", // Slate 600
    muted: "#94A3B8",     // Slate 400
    inverse: "#FFFFFF",
  },

  // Borders & Dividers
  border: {
    subtle: "#F1F5F9", // Slate 100
    default: "#E2E8F0", // Slate 200
    strong: "#CBD5E1", // Slate 300
    glass: "rgba(226, 232, 240, 0.85)",
  },

  // Status System (Investigator Lifecycle)
  status: {
    new: {
      bg: "#F1F5F9",
      text: "#475569",
      border: "#E2E8F0",
      dot: "#94A3B8",
    },
    inReview: {
      bg: "#F0F9FF",
      text: "#0369A1",
      border: "#BAE6FD",
      dot: "#0284C7",
    },
    analyzing: {
      bg: "#EFF6FF",
      text: "#1D4ED8",
      border: "#BFDBFE",
      dot: "#2563EB",
    },
    analysisComplete: {
      bg: "#ECFDF5",
      text: "#047857",
      border: "#A7F3D0",
      dot: "#059669",
    },
    needsReview: {
      bg: "#FFFBEB",
      text: "#B45309",
      border: "#FDE68A",
      dot: "#D97706",
    },
    decisionPending: {
      bg: "#EEF2FF",
      text: "#4338CA",
      border: "#C7D2FE",
      dot: "#4F46E5",
    },
    approved: {
      bg: "#ECFDF5",
      text: "#047857",
      border: "#A7F3D0",
      dot: "#10B981",
    },
    escalated: {
      bg: "#FFF1F2",
      text: "#BE123C",
      border: "#FECDD3",
      dot: "#E11D48",
    },
    closed: {
      bg: "#F8FAFC",
      text: "#64748B",
      border: "#CBD5E1",
      dot: "#94A3B8",
    },
  },
} as const;

export const spacing = {
  container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
  section: "py-6 sm:py-8",
  card: "p-5 sm:p-6",
  gap: {
    sm: "gap-3",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  },
} as const;

export const radius = {
  sm: "rounded-md",    // 6px
  md: "rounded-lg",    // 8px
  lg: "rounded-xl",    // 12px
  xl: "rounded-2xl",   // 16px
  full: "rounded-full",
} as const;

export const shadows = {
  sm: "0 1px 2px 0 rgba(15, 23, 42, 0.03)",
  card: "0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.03)",
  cardHover: "0 4px 12px -2px rgba(15, 23, 42, 0.06), 0 2px 6px -1px rgba(15, 23, 42, 0.03)",
  elevated: "0 10px 25px -5px rgba(15, 23, 42, 0.05), 0 8px 10px -6px rgba(15, 23, 42, 0.03)",
  dropdown: "0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)",
} as const;

export const typography = {
  display: "text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900",
  pageHeader: "text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900",
  sectionHeader: "text-lg sm:text-xl font-medium tracking-tight text-slate-900",
  cardHeader: "text-base font-semibold text-slate-900",
  body: "text-sm text-slate-600 leading-relaxed",
  bodyStrong: "text-sm font-medium text-slate-900",
  secondary: "text-xs text-slate-500",
  caption: "text-[11px] font-medium uppercase tracking-wider text-slate-400",
} as const;

export const motionTokens = {
  durations: {
    instant: 0.1,
    fast: 0.2,
    base: 0.3,
    slow: 0.5,
    ambient: 12,
  },
  easing: {
    apple: [0.16, 1, 0.3, 1], // Standard clean Apple-style deceleration curve
    linear: [0, 0, 1, 1],
    easeOut: [0, 0, 0.2, 1],
  },
} as const;
