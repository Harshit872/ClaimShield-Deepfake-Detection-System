import { Analysis, RiskAssessment, InvestigationReport } from "../types/investigation";

export const DEMO_ANALYSIS: Analysis = {
  id: "ANA-901",
  claimId: "CLM-10291",
  status: "Complete",
  completedAt: "2026-09-24T10:15:00Z",
  modules: [
    { id: "MOD-1", name: "Image Forensics", status: "Complete", findingsCount: 1 },
    { id: "MOD-2", name: "Document Forensics", status: "Complete", findingsCount: 1 },
    { id: "MOD-3", name: "Information Consistency", status: "Complete", findingsCount: 1 },
    { id: "MOD-4", name: "Identity Comparison", status: "Complete", findingsCount: 1 },
    { id: "MOD-5", name: "Metadata Analysis", status: "Complete", findingsCount: 1 }
  ],
  findings: [
    {
      id: "FND-1",
      category: "IMAGE REVIEW",
      title: "Possible image editing detected",
      observation: "Visual patterns in the submitted image may indicate editing.",
      explanation: "Similar visual patterns were detected in multiple areas of the image.",
      confidence: 87,
      status: "Needs Review",
      relatedEvidenceIds: ["ev-01", "ev-04"]
    },
    {
      id: "FND-2",
      category: "DOCUMENT REVIEW",
      title: "Document date may require verification",
      observation: "The document date appears earlier than the reported incident date.",
      explanation: "Repair Estimate date (17 Sep) precedes the Incident Date (20 Sep).",
      confidence: 91,
      status: "Needs Review",
      relatedEvidenceIds: ["ev-02"]
    },
    {
      id: "FND-3",
      category: "IDENTITY REVIEW",
      title: "Identity information may require additional verification",
      observation: "Identity images show lower visual similarity than expected.",
      explanation: "Facial matching between the submitted DL and the claimant photo returned 76% similarity.",
      confidence: 76,
      status: "Needs Review",
      relatedEvidenceIds: ["ev-03"]
    },
    {
      id: "FND-4",
      category: "FILE INFORMATION",
      title: "Metadata anomaly",
      observation: "File information contains an observation requiring review.",
      explanation: "Missing EXIF GPS data on vehicle photographs.",
      confidence: 65,
      status: "Reviewed",
      relatedEvidenceIds: ["ev-01", "ev-04"]
    }
  ],
  observations: []
};

export const DEMO_RISK: RiskAssessment = {
  id: "RSK-801",
  claimId: "CLM-10291",
  score: 78,
  label: "High Risk — Requires Review",
  factors: [
    { id: "RF-1", category: "Image Evidence", level: "High concern", description: "Possible image editing detected" },
    { id: "RF-2", category: "Document Consistency", level: "High concern", description: "Date mismatch on repair estimate" },
    { id: "RF-3", category: "Identity Comparison", level: "Review needed", description: "Lower-than-expected similarity" },
    { id: "RF-4", category: "Metadata", level: "Low concern", description: "Standard metadata profile with minor anomalies" }
  ],
  explanations: [
    {
      id: "EXP-1",
      findingId: "FND-2",
      plainText: "Repair document date differs from the reported incident date.",
      evidenceSourceIds: ["ev-02"],
      observation: "Document date precedes incident date.",
      confidence: 91
    },
    {
      id: "EXP-2",
      findingId: "FND-1",
      plainText: "Vehicle image contains visual patterns that may indicate editing.",
      evidenceSourceIds: ["ev-01"],
      observation: "Possible cloned region detected.",
      confidence: 87
    },
    {
      id: "EXP-3",
      findingId: "FND-3",
      plainText: "Identity images show lower visual similarity than expected.",
      evidenceSourceIds: ["ev-03"],
      observation: "Facial geometry comparison requires manual check.",
      confidence: 76
    }
  ],
  suggestedReview: [
    "Review the repair document date and compare it with the original incident record.",
    "Review the vehicle photograph for the highlighted region.",
    "Perform a manual visual check of the claimant's Driving License against their submitted selfie."
  ]
};

export const DEMO_INVESTIGATION_REPORT: InvestigationReport = {
  id: "REP-101",
  claimId: "CLM-10291",
  generatedAt: "2026-09-24T12:00:00Z",
  claimSummary: {
    claimant: "Rajesh Kumar",
    claimType: "Vehicle Damage",
    evidenceReviewedCount: 4
  },
  keyFindings: [
    "Possible image editing detected on vehicle damage photos.",
    "Repair estimate is dated before the reported incident date.",
    "Identity visual similarity requires manual verification."
  ],
  riskAssessment: DEMO_RISK,
  decision: {
    decision: "Pending",
    justification: "",
    investigatorId: "Sarah Jenkins"
  }
};
