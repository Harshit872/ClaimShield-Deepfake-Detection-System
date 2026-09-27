import React from "react";

export type ClaimStatus =
  | "New"
  | "In Review"
  | "Analyzing"
  | "Analysis Complete"
  | "Needs Review"
  | "Decision Pending"
  | "Approved"
  | "Escalated"
  | "Closed";

export type RiskLevel = "Low" | "Moderate" | "Elevated" | "High";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "destructive"
  | "accent";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export interface ComponentBaseProps {
  className?: string;
  children?: React.ReactNode;
}
