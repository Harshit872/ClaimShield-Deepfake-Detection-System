import { ClaimSummary, Finding, InvestigationNote, EvidenceItem } from "@/types/claims";

/**
 * Consistent demo dataset for ClaimShield AI.
 * Primary claim: CLM-10291 (Rajesh Kumar, Vehicle Damage, ₹2,40,000, 20 September 2026, Needs Review)
 */

export const DEMO_CLAIMS: ClaimSummary[] = [
  {
    id: "CLM-10291",
    claimNumber: "CLM-10291",
    policyHolderName: "Rajesh Kumar",
    policyType: "Vehicle Damage",
    policyNumber: "POL-MH-849201",
    incidentDescription:
      "Reported collision with stationary barrier on Western Express Highway during rain. Front bumper and radiator assembly damaged.",
    lossDate: "20 September 2026",
    submittedDate: "21 September 2026",
    claimedAmount: 240000,
    currency: "₹",
    status: "Needs Review",
    riskAssessment: "Elevated",
    assignedInvestigator: "Sarah Jenkins",
    evidenceItemsCount: 4,
    flaggedItemsCount: 2,
    lastUpdated: "24 September 2026",
  },
  {
    id: "CLM-10284",
    claimNumber: "CLM-10284",
    policyHolderName: "Priya Sharma",
    policyType: "Property Damage",
    policyNumber: "POL-DL-419203",
    incidentDescription:
      "Water leakage from master bathroom pipe causing ceiling and hardwood floor buckling on lower level.",
    lossDate: "18 September 2026",
    submittedDate: "19 September 2026",
    claimedAmount: 580000,
    currency: "₹",
    status: "In Review",
    riskAssessment: "Moderate",
    assignedInvestigator: "Sarah Jenkins",
    evidenceItemsCount: 5,
    flaggedItemsCount: 1,
    lastUpdated: "23 September 2026",
  },
  {
    id: "CLM-10279",
    claimNumber: "CLM-10279",
    policyHolderName: "Amit Patel",
    policyType: "Commercial Fire",
    policyNumber: "POL-GJ-771829",
    incidentDescription:
      "Electrical short-circuit in storage warehouse packaging bay during overnight operations.",
    lossDate: "15 September 2026",
    submittedDate: "16 September 2026",
    claimedAmount: 1450000,
    currency: "₹",
    status: "Decision Pending",
    riskAssessment: "Low",
    assignedInvestigator: "Sarah Jenkins",
    evidenceItemsCount: 8,
    flaggedItemsCount: 0,
    lastUpdated: "22 September 2026",
  },
  {
    id: "CLM-10265",
    claimNumber: "CLM-10265",
    policyHolderName: "Sunita Rao",
    policyType: "Health & Hospitalization",
    policyNumber: "POL-KA-552910",
    incidentDescription:
      "Emergency laparoscopic appendectomy and 4-day inpatient recovery following acute abdominal pain.",
    lossDate: "12 September 2026",
    submittedDate: "14 September 2026",
    claimedAmount: 120000,
    currency: "₹",
    status: "Analyzing",
    riskAssessment: "Low",
    assignedInvestigator: "Sarah Jenkins",
    evidenceItemsCount: 3,
    flaggedItemsCount: 0,
    lastUpdated: "21 September 2026",
  },
  {
    id: "CLM-10250",
    claimNumber: "CLM-10250",
    policyHolderName: "Vikram Malhotra",
    policyType: "Vehicle Damage",
    policyNumber: "POL-TN-339102",
    incidentDescription:
      "Rear-end shunt at signal junction; tail lamp and boot panel replacement.",
    lossDate: "10 September 2026",
    submittedDate: "11 September 2026",
    claimedAmount: 310000,
    currency: "₹",
    status: "Approved",
    riskAssessment: "Low",
    assignedInvestigator: "Sarah Jenkins",
    evidenceItemsCount: 6,
    flaggedItemsCount: 0,
    lastUpdated: "19 September 2026",
  },
];

export const DEMO_EVIDENCE: Record<string, EvidenceItem[]> = {
  "CLM-10291": [
    {
      id: "ev-01",
      filename: "Vehicle Damage Photo 01.jpg",
      size: 2450000,
      type: "image",
      url: "https://images.unsplash.com/photo-1627918451151-512c2a033620?q=80&w=600&auto=format&fit=crop",
      category: "Vehicle / Property Photos",
      status: "Ready",
    },
    {
      id: "ev-04",
      filename: "Vehicle Damage Photo 02.jpg",
      size: 3400000,
      type: "image",
      url: "https://images.unsplash.com/photo-1623869675781-80aa31041849?q=80&w=600&auto=format&fit=crop",
      category: "Vehicle / Property Photos",
      status: "Ready",
    },
    {
      id: "ev-02",
      filename: "Repair Estimate.pdf",
      size: 1120000,
      type: "pdf",
      url: "#",
      category: "Repair Document",
      status: "Needs Review",
    },
    {
      id: "ev-03",
      filename: "Driving License.pdf",
      size: 890000,
      type: "pdf",
      url: "#",
      category: "Identity Document",
      status: "Ready",
    },
  ],
};

export const DEMO_FINDINGS: Record<string, Finding[]> = {
  "CLM-10291": [
    {
      id: "find-01",
      type: "Document Review",
      explanation: "Document date may not match the reported incident.",
      confidence: 85,
      relatedEvidenceIds: ["ev-02"],
      status: "Needs Review",
    },
    {
      id: "find-02",
      type: "Image Review",
      explanation: "Vehicle image may contain signs of editing.",
      confidence: 78,
      relatedEvidenceIds: ["ev-01", "ev-04"],
      status: "Needs Review",
    },
    {
      id: "find-03",
      type: "Identity Review",
      explanation: "Identity information may require additional verification.",
      confidence: 65,
      relatedEvidenceIds: ["ev-03"],
      status: "Needs Review",
    },
  ],
};

export const DEMO_NOTES: Record<string, InvestigationNote[]> = {
  "CLM-10291": [
    {
      id: "note-01",
      author: "Sarah Jenkins",
      timestamp: "21 Sep 2026, 09:30 AM",
      content: "Initial review started. Waiting for claimant to provide clearer photos of the bumper.",
    }
  ]
};

export interface AttentionItem {
  id: string;
  claimId: string;
  claimant: string;
  type: "evidence_review" | "finding_verification" | "decision_pending";
  title: string;
  description: string;
  actionLabel: string;
  actionHref: string;
}

export const DEMO_ATTENTION_ITEMS: AttentionItem[] = [
  {
    id: "att-01",
    claimId: "CLM-10291",
    claimant: "Rajesh Kumar",
    type: "finding_verification",
    title: "Invoice date anomaly detected",
    description: "Repair estimate date (Sep 17) precedes reported collision date (Sep 20) by 3 days.",
    actionLabel: "Review Claim",
    actionHref: "/claims/CLM-10291",
  },
  {
    id: "att-02",
    claimId: "CLM-10284",
    claimant: "Priya Sharma",
    type: "evidence_review",
    title: "Plumbing receipt metadata modified",
    description: "PDF creation timestamp differs from printed invoice date. Needs human cross-check.",
    actionLabel: "Review Claim",
    actionHref: "/claims/CLM-10284",
  },
  {
    id: "att-03",
    claimId: "CLM-10279",
    claimant: "Amit Patel",
    type: "decision_pending",
    title: "Investigation complete — sign-off needed",
    description: "All evidence verified clean against fire brigade report. Awaiting human adjudication.",
    actionLabel: "Make Decision",
    actionHref: "/claims/CLM-10279",
  },
];

export interface ReportItem {
  id: string;
  reportNumber: string;
  claimId: string;
  claimant: string;
  createdDate: string;
  status: "Completed" | "Draft" | "Archived";
  downloadUrl?: string;
}

export const DEMO_REPORTS: ReportItem[] = [
  {
    id: "rep-01",
    reportNumber: "REP-2026-091",
    claimId: "CLM-10250",
    claimant: "Vikram Malhotra",
    createdDate: "19 September 2026",
    status: "Completed",
  },
  {
    id: "rep-02",
    reportNumber: "REP-2026-088",
    claimId: "CLM-10242",
    claimant: "Kavita Reddy",
    createdDate: "14 September 2026",
    status: "Completed",
  },
  {
    id: "rep-03",
    reportNumber: "REP-2026-085",
    claimId: "CLM-10231",
    claimant: "Arun Mehra",
    createdDate: "08 September 2026",
    status: "Completed",
  },
];

export const CURRENT_INVESTIGATOR = {
  id: "inv-9042",
  name: "Sarah Jenkins",
  title: "Senior Claims Investigator",
  unit: "Special Investigation Unit (SIU)",
  badgeNumber: "SIU-8421",
  email: "s.jenkins@claimshield.internal",
  activeCaseCount: 8,
};

export const DASHBOARD_METRICS = {
  claimsToReview: 8,
  inProgress: 5,
  needsAttention: 3,
  decisionsPending: 2,
};
