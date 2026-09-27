"use client";

import React from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon, ArrowLeft01Icon, AlertCircleIcon, Shield01Icon, File01Icon, ViewIcon, Search01Icon, UserIcon } from "@/components/ui/icon";
import { FadeIn } from "@/components/motion/FadeIn";
import { useClaim, useRisk } from "@/lib/api";
import { Explanation, RiskFactor } from "@/types/investigation";

export default function RiskAssessmentWorkspace() {
  const params = useParams();
  const rawId = (params?.claimId as string) || "CLM-10291";
  const claimId = decodeURIComponent(rawId);

  const { data: claim } = useClaim(claimId);
  const { data: risk } = useRisk(claimId);

  return (
    <AppShell activeNavId="claims" pageTitle={`Risk Assessment ${claimId}`}>
      <PageContainer maxWidth="xl">
        <FadeIn>
          <div className="mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/claims/${claimId}/analysis`} className="gap-1.5 text-xs text-slate-600 hover:text-slate-900">
                <Icon icon={ArrowLeft01Icon} size="xs" />
                <span>Back to Analysis</span>
              </Link>
            </Button>
          </div>
        </FadeIn>

        {/* Header */}
        <FadeIn delay={0.04}>
          <div className="mb-8">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Risk Assessment & Explainability</h1>
            <p className="text-sm text-slate-500">Structured evidence fusion and risk scoring for claim {claim?.claimNumber}</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT: Explainability & Structured Evidence */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Explainability Engine */}
            <FadeIn delay={0.06}>
              <Card>
                <CardHeader className="pb-3 border-b bg-slate-50/50">
                  <CardTitle className="text-base flex items-center gap-2">
                    <Icon icon={Search01Icon} size="sm" className="text-blue-600" />
                    Why did ClaimShield AI flag this claim?
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-100">
                    {risk?.explanations.map((exp: Explanation, idx: number) => (
                      <div key={exp.id} className="p-5">
                        <div className="flex gap-4">
                          <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                            {idx + 1}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 mb-2 leading-relaxed">{exp.plainText}</p>
                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs">
                              <div className="flex items-center gap-4 mb-2">
                                <span className="font-semibold text-slate-700">Observation:</span>
                                <span className="text-slate-600">{exp.observation}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-slate-700">Confidence:</span>
                                  <span className="font-mono text-slate-600 bg-white px-1.5 py-0.5 border border-slate-200 rounded">{exp.confidence}%</span>
                                </div>
                                <Button variant="ghost" size="sm" className="h-6 text-[10px]">View supporting evidence</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Investigator Guidance */}
            <FadeIn delay={0.08}>
              <Card>
                <CardHeader className="pb-3 border-b bg-amber-50/30">
                  <CardTitle className="text-sm text-amber-900 flex items-center gap-2">
                    <Icon icon={Shield01Icon} size="sm" className="text-amber-600" />
                    Suggested Review
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-5 space-y-3">
                  {risk?.suggestedReview.map((suggestion: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 text-sm text-slate-700 bg-white border border-slate-200 rounded-lg p-3 shadow-xs">
                      <Icon icon={ArrowLeft01Icon} size="xs" className="rotate-180 mt-0.5 text-amber-500 shrink-0" />
                      <span>{suggestion}</span>
                    </div>
                  ))}
                  <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-wider font-semibold text-center">
                    Guidance only. Final decision belongs to human investigator.
                  </p>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Structured Evidence (Fusion) */}
            <FadeIn delay={0.1}>
              <Card>
                <CardHeader className="pb-3 border-b">
                  <CardTitle className="text-sm">Evidence Assessment (Fusion Engine)</CardTitle>
                </CardHeader>
                <CardContent className="p-5">
                  <p className="text-xs text-slate-500 mb-4">3 observations require review based on normalized evidence signals.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2 text-indigo-700">
                        <Icon icon={ViewIcon} size="sm" />
                        <span className="text-xs font-semibold">Image</span>
                      </div>
                      <p className="text-xs text-slate-700">Possible editing detected</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2 text-cyan-700">
                        <Icon icon={File01Icon} size="sm" />
                        <span className="text-xs font-semibold">Document</span>
                      </div>
                      <p className="text-xs text-slate-700">Date discrepancy</p>
                    </div>
                    <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2 text-purple-700">
                        <Icon icon={UserIcon} size="sm" />
                        <span className="text-xs font-semibold">Identity</span>
                      </div>
                      <p className="text-xs text-slate-700">Lower-than-expected similarity</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          {/* RIGHT: Risk Scoring */}
          <div className="space-y-6">
            <FadeIn delay={0.12}>
              <Card className="border-amber-200/60 overflow-hidden">
                <div className="bg-amber-50 p-6 text-center border-b border-amber-100">
                  <h3 className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2">Investigation Support Score</h3>
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-white border-4 border-amber-400 shadow-sm mb-3">
                    <span className="text-4xl font-extrabold text-amber-600">{risk?.score || 78}</span>
                  </div>
                  <p className="text-sm font-semibold text-amber-900">{risk?.label || "High Risk — Requires Review"}</p>
                  <p className="text-xs text-amber-700/80 mt-1">Multiple evidence observations require investigator review.</p>
                </div>
                
                <CardContent className="p-5 bg-white">
                  <h4 className="text-xs font-semibold text-slate-900 mb-4 uppercase tracking-wider">Risk Breakdown</h4>
                  <div className="space-y-4">
                    {risk?.factors.map((factor: RiskFactor) => (
                      <div key={factor.id}>
                        <div className="flex justify-between items-end mb-1">
                          <span className="text-xs font-medium text-slate-700">{factor.category}</span>
                          <span className={`text-[10px] font-bold ${factor.level === 'High concern' ? 'text-rose-600' : factor.level === 'Review needed' ? 'text-amber-600' : 'text-emerald-600'}`}>
                            {factor.level}
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full ${factor.level === 'High concern' ? 'bg-rose-500 w-[85%]' : factor.level === 'Review needed' ? 'bg-amber-400 w-[60%]' : 'bg-emerald-400 w-[20%]'}`}></div>
                        </div>
                        <p className="text-[10px] text-slate-500 mt-1">{factor.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.14}>
              <Button variant="primary" size="lg" className="w-full" asChild>
                <Link href={`/claims/${claimId}/report`}>
                  Proceed to Final Report
                </Link>
              </Button>
            </FadeIn>
          </div>
        </div>
      </PageContainer>
    </AppShell>
  );
}
