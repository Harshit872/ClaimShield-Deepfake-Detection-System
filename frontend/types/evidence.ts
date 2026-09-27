export type EvidenceType =
  | "Damage Photo"
  | "Repair Estimate"
  | "Police Incident Report"
  | "Identity Document"
  | "Medical Invoice"
  | "Witness Statement";

export type VerificationState =
  | "Unverified"
  | "Checking Metadata"
  | "Cross-Referencing"
  | "Verified Clean"
  | "Discrepancy Noted";

export interface EvidenceItem {
  id: string;
  claimId: string;
  fileName: string;
  fileSizeBytes: number;
  uploadedAt: string;
  evidenceType: EvidenceType;
  verificationState: VerificationState;
  hasInconsistencies: boolean;
  notes?: string;
}
