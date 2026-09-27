import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ClaimSummary, ClaimFilterParams, Finding, InvestigationNote, EvidenceItem } from "@/types/claims";
import {
  DEMO_CLAIMS,
  DEMO_EVIDENCE,
  DEMO_FINDINGS,
  DEMO_ATTENTION_ITEMS,
  DEMO_REPORTS,
  DASHBOARD_METRICS,
  AttentionItem,
  ReportItem,
  DEMO_NOTES,
} from "@/data/mockData";
import {
  DEMO_ANALYSIS,
  DEMO_RISK,
  DEMO_INVESTIGATION_REPORT,
} from "@/data/mockInvestigationData";

/**
 * ClaimShield AI — API & Data Abstraction Layer
 * 
 * Provides an asynchronous boundary that sits between TanStack Query and
 * the future FastAPI backend. Any UI component querying this layer will not
 * require changes when transitioning to live HTTP/WebSocket endpoints.
 */

const USE_MOCK_DATA = process.env.NEXT_PUBLIC_USE_MOCK_API !== "false";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const api = {
  claims: {
    list: async (params?: ClaimFilterParams): Promise<ClaimSummary[]> => {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 80));
        let results = [...DEMO_CLAIMS];
        if (params?.status && params.status !== "All") {
          results = results.filter((c) => c.status === params.status);
        }
        if (params?.searchQuery) {
          const q = params.searchQuery.toLowerCase();
          results = results.filter(
            (c) =>
              c.claimNumber.toLowerCase().includes(q) ||
              c.policyHolderName.toLowerCase().includes(q) ||
              c.policyType.toLowerCase().includes(q)
          );
        }
        return results;
      }
      const search = new URLSearchParams(params as Record<string, string>).toString();
      const res = await fetch(`${API_BASE_URL}/claims?${search}`);
      if (!res.ok) throw new Error("Failed to fetch claims list");
      return res.json();
    },

    getById: async (id: string): Promise<ClaimSummary | null> => {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 80));
        const found = DEMO_CLAIMS.find((c) => c.id === id);
        if (found) return found;
        // Fallback demo claim for any ID
        return {
          ...DEMO_CLAIMS[0],
          id,
          claimNumber: id,
        };
      }
      const res = await fetch(`${API_BASE_URL}/claims/${id}`);
      if (!res.ok) throw new Error(`Failed to fetch claim ${id}`);
      return res.json();
    },
  },

  evidence: {
    listByClaimId: async (claimId: string): Promise<EvidenceItem[]> => {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 80));
        return DEMO_EVIDENCE[claimId] || DEMO_EVIDENCE["CLM-10291"] || [];
      }
      const res = await fetch(`${API_BASE_URL}/claims/${claimId}/evidence`);
      if (!res.ok) throw new Error("Failed to fetch evidence list");
      return res.json();
    },
  },

  findings: {
    listByClaimId: async (claimId: string): Promise<Finding[]> => {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 80));
        return DEMO_FINDINGS[claimId] || DEMO_FINDINGS["CLM-10291"] || [];
      }
      const res = await fetch(`${API_BASE_URL}/claims/${claimId}/findings`);
      if (!res.ok) throw new Error("Failed to fetch findings");
      return res.json();
    },
  },

  notes: {
    listByClaimId: async (claimId: string): Promise<InvestigationNote[]> => {
      if (USE_MOCK_DATA) {
        // Need to import DEMO_NOTES, let's just mock it here if not imported
        await new Promise((resolve) => setTimeout(resolve, 80));
        return DEMO_NOTES[claimId] || DEMO_NOTES["CLM-10291"] || [];
      }
      const res = await fetch(`${API_BASE_URL}/claims/${claimId}/notes`);
      if (!res.ok) throw new Error("Failed to fetch notes");
      return res.json();
    }
  },

  dashboard: {
    getMetrics: async () => {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 60));
        return DASHBOARD_METRICS;
      }
      const res = await fetch(`${API_BASE_URL}/dashboard/metrics`);
      if (!res.ok) throw new Error("Failed to fetch dashboard metrics");
      return res.json();
    },

    getAttentionItems: async (): Promise<AttentionItem[]> => {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 60));
        return DEMO_ATTENTION_ITEMS;
      }
      const res = await fetch(`${API_BASE_URL}/dashboard/attention`);
      if (!res.ok) throw new Error("Failed to fetch attention items");
      return res.json();
    },
  },

  reports: {
    list: async (): Promise<ReportItem[]> => {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 60));
        return DEMO_REPORTS;
      }
      const res = await fetch(`${API_BASE_URL}/reports`);
      if (!res.ok) throw new Error("Failed to fetch reports");
      return res.json();
    },
  },

  analysis: {
    getByClaimId: async (claimId: string) => {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 80));
        return DEMO_ANALYSIS;
      }
      const res = await fetch(`${API_BASE_URL}/claims/${claimId}/analysis`);
      if (!res.ok) throw new Error("Failed to fetch analysis");
      return res.json();
    }
  },

  risk: {
    getByClaimId: async (claimId: string) => {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 80));
        return DEMO_RISK;
      }
      const res = await fetch(`${API_BASE_URL}/claims/${claimId}/risk`);
      if (!res.ok) throw new Error("Failed to fetch risk assessment");
      return res.json();
    }
  },

  investigationReport: {
    getByClaimId: async (claimId: string) => {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 80));
        return DEMO_INVESTIGATION_REPORT;
      }
      const res = await fetch(`${API_BASE_URL}/claims/${claimId}/report`);
      if (!res.ok) throw new Error("Failed to fetch investigation report");
      return res.json();
    }
  },

  investigator: {
    recordDecision: async (decision: {
      claimId: string;
      decision: "Approved" | "Escalated" | "Denied" | "Request More Info";
      justificationNotes: string;
      investigatorId: string;
    }): Promise<{ success: boolean; recordedAt: string }> => {
      if (USE_MOCK_DATA) {
        await new Promise((resolve) => setTimeout(resolve, 150));
        return { success: true, recordedAt: new Date().toISOString() };
      }
      const res = await fetch(`${API_BASE_URL}/decisions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(decision),
      });
      if (!res.ok) throw new Error("Failed to record investigator decision");
      return res.json();
    },
  },
};

// ==========================================
// TanStack Query Hooks
// ==========================================

export function useClaims(params?: ClaimFilterParams) {
  return useQuery({
    queryKey: ["claims", params],
    queryFn: () => api.claims.list(params),
  });
}

export function useClaim(id: string) {
  return useQuery({
    queryKey: ["claim", id],
    queryFn: () => api.claims.getById(id),
    enabled: !!id,
  });
}

export function useEvidence(claimId: string) {
  return useQuery({
    queryKey: ["evidence", claimId],
    queryFn: () => api.evidence.listByClaimId(claimId),
    enabled: !!claimId,
  });
}

export function useFindings(claimId: string) {
  return useQuery({
    queryKey: ["findings", claimId],
    queryFn: () => api.findings.listByClaimId(claimId),
    enabled: !!claimId,
  });
}

export function useNotes(claimId: string) {
  return useQuery({
    queryKey: ["notes", claimId],
    queryFn: () => api.notes.listByClaimId(claimId),
    enabled: !!claimId,
  });
}

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ["dashboard", "metrics"],
    queryFn: () => api.dashboard.getMetrics(),
  });
}

export function useAttentionItems() {
  return useQuery({
    queryKey: ["dashboard", "attention"],
    queryFn: () => api.dashboard.getAttentionItems(),
  });
}

export function useReports() {
  return useQuery({
    queryKey: ["reports"],
    queryFn: () => api.reports.list(),
  });
}

export function useRecordDecision() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: api.investigator.recordDecision,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["claim", variables.claimId] });
      queryClient.invalidateQueries({ queryKey: ["claims"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useAnalysis(claimId: string) {
  return useQuery({
    queryKey: ["analysis", claimId],
    queryFn: () => api.analysis.getByClaimId(claimId),
    enabled: !!claimId,
  });
}

export function useRisk(claimId: string) {
  return useQuery({
    queryKey: ["risk", claimId],
    queryFn: () => api.risk.getByClaimId(claimId),
    enabled: !!claimId,
  });
}

export function useInvestigationReport(claimId: string) {
  return useQuery({
    queryKey: ["investigationReport", claimId],
    queryFn: () => api.investigationReport.getByClaimId(claimId),
    enabled: !!claimId,
  });
}
