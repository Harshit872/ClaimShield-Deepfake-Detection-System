import { ClaimStatus, RiskLevel } from "./ui";

export interface ClaimSummary {
  id: string;
  claimNumber: string;
  policyHolderName: string;
  policyType: string;
  policyNumber?: string;
  incidentDescription?: string;
  lossDate: string;
  submittedDate: string;
  claimedAmount: number;
  currency?: string;
  status: ClaimStatus;
  riskAssessment: RiskLevel;
  assignedInvestigator: string;
  evidenceItemsCount: number;
  flaggedItemsCount: number;
  lastUpdated: string;
}

export type EvidenceCategory = 
  | "Vehicle / Property Photos"
  | "Identity Document"
  | "Invoice / Receipt"
  | "Repair Document"
  | "Other";

export type EvidenceStatus = "Ready" | "Uploading" | "Failed" | "Needs Review" | "Reviewed";

export interface EvidenceItem {
  id: string;
  filename: string;
  type: string; // 'image' or 'pdf'
  url: string; // url to thumbnail or mock preview
  size: number; // in bytes
  category: EvidenceCategory;
  status: EvidenceStatus;
}

export type FindingType = "Document Review" | "Image Review" | "Identity Review" | "Information Consistency";

export interface Finding {
  id: string;
  type: FindingType;
  explanation: string;
  confidence: number; // 0-100
  relatedEvidenceIds: string[]; // ids of related evidence
  status: "Needs Review" | "Reviewed";
}

export interface InvestigationNote {
  id: string;
  author: string;
  timestamp: string;
  content: string;
}

export interface ClaimFilterParams {
  status?: ClaimStatus | "All";
  riskAssessment?: RiskLevel;
  searchQuery?: string;
  sortBy?: "lossDate" | "claimedAmount" | "status" | "lastUpdated";
  sortOrder?: "asc" | "desc";
  page?: number;
  pageSize?: number;
}
