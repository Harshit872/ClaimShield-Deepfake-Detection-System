export interface AnalysisModule {
  id: string;
  name: "Image Forensics" | "Document Forensics" | "Information Consistency" | "Identity Comparison" | "Metadata Analysis";
  status: "Pending" | "Analyzing" | "Complete" | "Failed";
  findingsCount: number;
}

export interface EvidenceObservation {
  id: string;
  evidenceId: string;
  moduleId: string;
  observation: string;
  details?: string;
  severity: "Low" | "Medium" | "High" | "Critical";
  confidence: number;
}

export interface AnalysisFinding {
  id: string;
  category: string;
  title: string;
  observation: string;
  explanation: string;
  confidence: number;
  status: "Needs Review" | "Reviewed" | "Dismissed";
  relatedEvidenceIds: string[];
}

export interface Analysis {
  id: string;
  claimId: string;
  status: "Not Started" | "Analyzing" | "Complete";
  modules: AnalysisModule[];
  findings: AnalysisFinding[];
  observations: EvidenceObservation[];
  completedAt?: string;
}

export interface RiskFactor {
  id: string;
  category: "Image Evidence" | "Document Consistency" | "Identity Comparison" | "Metadata";
  level: "Low concern" | "Review needed" | "High concern";
  description: string;
}

export interface Explanation {
  id: string;
  findingId: string;
  plainText: string;
  evidenceSourceIds: string[];
  observation: string;
  confidence: number;
}

export interface RiskAssessment {
  id: string;
  claimId: string;
  score: number; // 0-100
  label: string;
  factors: RiskFactor[];
  explanations: Explanation[];
  suggestedReview: string[];
}

export interface InvestigatorDecision {
  decision: "Approve" | "Request More Information" | "Escalate" | "Reject" | "Pending";
  justification: string;
  investigatorId: string;
  timestamp?: string;
}

export interface InvestigationReport {
  id: string;
  claimId: string;
  generatedAt: string;
  claimSummary: {
    claimant: string;
    claimType: string;
    evidenceReviewedCount: number;
  };
  keyFindings: string[];
  riskAssessment: RiskAssessment;
  decision: InvestigatorDecision;
}
