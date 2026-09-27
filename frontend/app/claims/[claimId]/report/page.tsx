"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon, ArrowLeft01Icon, ArrowDown01Icon, CheckmarkCircle01Icon, Shield01Icon } from "@/components/ui/icon";
import { FadeIn } from "@/components/motion/FadeIn";
import { useInvestigationReport, useRecordDecision } from "@/lib/api";
import { RiskFactor } from "@/types/investigation";

export default function InvestigationReportWorkspace() {
  const params = useParams();
  const router = useRouter();
  const rawId = (params?.claimId as string) || "CLM-10291";
  const claimId = decodeURIComponent(rawId);

  const { data: report } = useInvestigationReport(claimId);
  const { mutate: recordDecision, isPending } = useRecordDecision();

  const [notes, setNotes] = useState("");
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null);

  const handleSaveDecision = () => {
    if (!selectedDecision) return;
    
    recordDecision({
      claimId,
      decision: selectedDecision as "Approved" | "Escalated" | "Denied" | "Request More Info",
      justificationNotes: notes,
      investigatorId: "Sarah Jenkins" // from current user context ideally
    }, {
      onSuccess: () => {
        router.push("/dashboard");
      }
    });
  };

  return (
    <AppShell activeNavId="claims" pageTitle={`Investigation Report ${claimId}`}>
      <PageContainer maxWidth="2xl">
        <FadeIn>
          <div className="mb-4 flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/claims/${claimId}/risk`} className="gap-1.5 text-xs text-slate-600 hover:text-slate-900">
                <Icon icon={ArrowLeft01Icon} size="xs" />
                <span>Back to Risk Assessment</span>
              </Link>
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                <Icon icon={CheckmarkCircle01Icon} size="xs" />
                Save Draft
              </Button>
              <Button variant="outline" size="sm" className="h-8 text-xs gap-1.5">
                <Icon icon={ArrowDown01Icon} size="xs" />
                Export Report
              </Button>
            </div>
          </div>
        </FadeIn>

        {/* Header */}
        <FadeIn delay={0.04}>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-2">Investigation Report</h1>
            <p className="text-sm text-slate-500 font-mono">{report?.id || "REP-101"} • Generated {report ? new Date(report.generatedAt).toLocaleDateString() : "Today"}</p>
          </div>
        </FadeIn>

        <div className="space-y-8">
          
          {/* CLAIM SUMMARY */}
          <FadeIn delay={0.06}>
            <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Claim Summary</h2>
              </div>
              <div className="p-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
                <div>
                  <p className="text-[10px] uppercase font-semibold text-slate-400 mb-1">Claim ID</p>
                  <p className="text-sm font-semibold text-slate-900">{claimId}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-semibold text-slate-400 mb-1">Claimant</p>
                  <p className="text-sm font-semibold text-slate-900">{report?.claimSummary.claimant || "Rajesh Kumar"}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-semibold text-slate-400 mb-1">Claim Type</p>
                  <p className="text-sm font-semibold text-slate-900">{report?.claimSummary.claimType || "Vehicle Damage"}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase font-semibold text-slate-400 mb-1">Evidence Reviewed</p>
                  <p className="text-sm font-semibold text-slate-900">{report?.claimSummary.evidenceReviewedCount || 4} Files</p>
                </div>
              </div>
            </section>
          </FadeIn>

          {/* KEY FINDINGS */}
          <FadeIn delay={0.08}>
            <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Key Findings</h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {report?.keyFindings.map((finding: string, idx: number) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-700">
                      <div className="w-5 h-5 rounded bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{idx + 1}</div>
                      <span>{finding}</span>
                    </li>
                  )) || (
                    <li className="text-sm text-slate-500 italic">No key findings reported.</li>
                  )}
                </ul>
              </div>
            </section>
          </FadeIn>

          {/* RISK ASSESSMENT SUMMARY */}
          <FadeIn delay={0.1}>
            <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col sm:flex-row">
              <div className="bg-slate-50 border-b sm:border-b-0 sm:border-r border-slate-200 p-6 flex flex-col items-center justify-center min-w-[200px]">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">Risk Assessment</h2>
                <div className="w-16 h-16 rounded-full border-4 border-amber-400 flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-amber-600">{report?.riskAssessment.score || 78}</span>
                </div>
                <p className="text-xs font-semibold text-amber-900 text-center">{report?.riskAssessment.label || "High Risk"}</p>
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Evidence Review Modules</h3>
                <div className="grid grid-cols-2 gap-y-3 gap-x-6">
                  {report?.riskAssessment.factors.map((factor: RiskFactor) => (
                    <div key={factor.id} className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                      <span className="text-slate-600">{factor.category}</span>
                      <span className={`font-semibold text-xs ${factor.level === 'High concern' ? 'text-rose-600' : factor.level === 'Review needed' ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {factor.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </FadeIn>

          {/* INVESTIGATOR NOTES */}
          <FadeIn delay={0.12}>
            <section className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-slate-50 px-6 py-3 border-b border-slate-200">
                <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">Investigator Notes</h2>
              </div>
              <div className="p-6">
                <textarea
                  className="w-full min-h-[120px] rounded-lg border border-slate-300 p-4 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-y"
                  placeholder="Enter your final analysis, rationale, and notes regarding this claim investigation..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                />
              </div>
            </section>
          </FadeIn>

          {/* HUMAN DECISION */}
          <FadeIn delay={0.14}>
            <section className="bg-white border-2 border-sky-100 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-sky-50 px-6 py-4 border-b border-sky-100 flex items-center gap-2">
                <Icon icon={Shield01Icon} size="sm" className="text-sky-600" />
                <h2 className="text-sm font-bold text-sky-900 uppercase tracking-widest">Investigator Decision</h2>
              </div>
              <div className="p-6">
                <p className="text-sm text-slate-600 mb-6 text-center font-medium">Human investigator decision required. Select the final outcome for this claim.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                  {[
                    { id: "Approve", label: "Approve Claim", activeClasses: "border-emerald-500 bg-emerald-50 text-emerald-700 shadow-sm ring-2 ring-emerald-500/20" },
                    { id: "Request More Information", label: "Request More Info", activeClasses: "border-blue-500 bg-blue-50 text-blue-700 shadow-sm ring-2 ring-blue-500/20" },
                    { id: "Escalate", label: "Escalate to SIU", activeClasses: "border-amber-500 bg-amber-50 text-amber-700 shadow-sm ring-2 ring-amber-500/20" },
                    { id: "Reject", label: "Reject Claim", activeClasses: "border-rose-500 bg-rose-50 text-rose-700 shadow-sm ring-2 ring-rose-500/20" }
                  ].map(decision => (
                    <button
                      key={decision.id}
                      onClick={() => setSelectedDecision(decision.id)}
                      className={`
                        p-4 rounded-xl border-2 text-sm font-semibold transition-all duration-200 flex flex-col items-center justify-center gap-2 text-center h-24
                        ${selectedDecision === decision.id 
                          ? decision.activeClasses
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                        }
                      `}
                    >
                      {decision.label}
                    </button>
                  ))}
                </div>

                <div className="flex justify-end pt-4 border-t border-slate-100">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    disabled={!selectedDecision || isPending}
                    onClick={handleSaveDecision}
                    className="min-w-[200px]"
                  >
                    {isPending ? "Saving..." : "Submit Final Decision"}
                  </Button>
                </div>
              </div>
            </section>
          </FadeIn>
          
        </div>
      </PageContainer>
    </AppShell>
  );
}
