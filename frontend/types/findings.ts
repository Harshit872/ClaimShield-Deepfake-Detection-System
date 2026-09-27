export type FindingSeverity = "Info" | "Low" | "Moderate" | "Critical";

export interface ForensicFinding {
  id: string;
  claimId: string;
  category: "Image Integrity" | "Document Text" | "Timeline Consistency" | "Identity Match";
  title: string;
  plainLanguageExplanation: string; // Written for human investigator without ML jargon
  severity: FindingSeverity;
  affectedEvidenceIds: string[];
  investigatorConfirmed?: boolean;
  investigatorDismissed?: boolean;
  dismissalReason?: string;
  discoveredAt: string;
}
