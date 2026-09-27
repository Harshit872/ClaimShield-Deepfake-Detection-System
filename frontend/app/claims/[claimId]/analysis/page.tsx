"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icon, Shield01Icon, ArrowLeft01Icon, ViewIcon, File01Icon, CheckmarkCircle01Icon, AlertCircleIcon, Search01Icon, UserIcon, Layers01Icon } from "@/components/ui/icon";
import { FadeIn } from "@/components/motion/FadeIn";
import { useClaim, useAnalysis, useEvidence } from "@/lib/api";
import { AnalysisFinding } from "@/types/investigation";

export default function AnalysisWorkspace() {
  const params = useParams();
  const rawId = (params?.claimId as string) || "CLM-10291";
  const claimId = decodeURIComponent(rawId);

  const { data: claim } = useClaim(claimId);
  const { data: analysis } = useAnalysis(claimId);
  const { data: evidence } = useEvidence(claimId);

  const [activeTab, setActiveTab] = useState("all");

  const progressSteps = [
    { label: "Evidence Received", status: "Complete" },
    { label: "Images Reviewed", status: "Complete" },
    { label: "Documents Reviewed", status: "Complete" },
    { label: "Information Compared", status: "Complete" },
    { label: "Findings Generated", status: "Complete" }
  ];

  return (
    <AppShell activeNavId="claims" pageTitle={`Analysis ${claimId}`}>
      <PageContainer maxWidth="xl">
        <FadeIn>
          <div className="mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/claims/${claimId}`} className="gap-1.5 text-xs text-slate-600 hover:text-slate-900">
                <Icon icon={ArrowLeft01Icon} size="xs" />
                <span>Back to Investigation Workspace</span>
              </Link>
            </Button>
          </div>
        </FadeIn>

        {/* Workspace Header */}
        <FadeIn delay={0.04}>
          <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 mb-1">Evidence Analysis</h1>
              <p className="text-sm text-slate-500">Review what ClaimShield AI found across the submitted evidence.</p>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 bg-slate-50 border border-slate-100 p-3 rounded-lg">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Claim</p>
                <p className="text-sm font-semibold text-slate-900">{claim?.claimNumber}</p>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden md:block"></div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Claimant</p>
                <p className="text-sm font-semibold text-slate-700">{claim?.policyHolderName}</p>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden md:block"></div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Evidence</p>
                <p className="text-sm font-semibold text-slate-700">{evidence?.length || 0} files</p>
              </div>
              <div className="w-px h-8 bg-slate-200 hidden md:block"></div>
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">Status</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                  <span className="text-sm font-medium text-slate-900">{analysis?.status || "Complete"}</span>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Progress Tracker */}
        <FadeIn delay={0.06}>
          <Card className="mb-6 overflow-hidden">
            <CardContent className="p-6">
               <div className="flex items-center justify-between relative">
                 <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-slate-100 -z-10 -translate-y-1/2"></div>
                 {progressSteps.map((step, idx) => (
                   <div key={idx} className="flex flex-col items-center gap-2 bg-white px-2">
                     <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${step.status === 'Complete' ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-slate-200 text-slate-400'}`}>
                       {step.status === 'Complete' ? <Icon icon={CheckmarkCircle01Icon} size="sm" /> : <span>{idx + 1}</span>}
                     </div>
                     <span className="text-[11px] font-medium text-slate-600">{step.label}</span>
                   </div>
                 ))}
               </div>
            </CardContent>
          </Card>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            
            {/* MODULE 1: Image Forensics */}
            <FadeIn delay={0.08}>
              <Card>
                <CardHeader className="pb-3 border-b flex flex-row items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center shrink-0">
                    <Icon icon={ViewIcon} size="md" />
                  </div>
                  <div>
                    <CardTitle className="text-base text-slate-900">Image Review</CardTitle>
                    <CardDescription className="text-xs">Identifies visual anomalies that may require closer inspection.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-0 divide-y divide-slate-100">
                  {analysis?.findings.filter((f: AnalysisFinding) => f.category === "IMAGE REVIEW").map((finding: AnalysisFinding) => (
                    <div key={finding.id} className="p-5 flex flex-col sm:flex-row gap-5 hover:bg-slate-50 transition-colors">
                      <div className="w-full sm:w-48 h-32 bg-slate-100 rounded-lg border border-slate-200 shrink-0 relative overflow-hidden flex items-center justify-center">
                        <img src="https://images.unsplash.com/photo-1627918451151-512c2a033620?q=80&w=600&auto=format&fit=crop" alt="Evidence" className="object-cover w-full h-full opacity-70" />
                        <div className="absolute inset-0 bg-blue-900/10 border border-blue-500/50 m-4 rounded"></div>
                        <span className="absolute top-2 left-2 bg-white/90 text-[10px] px-1.5 py-0.5 rounded shadow-sm font-medium">Vehicle Damage Photo 01.jpg</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Needs review</span>
                          <span className="text-[11px] text-slate-500">{finding.confidence}% confidence</span>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900 mb-1">{finding.title}</h4>
                        <p className="text-sm text-slate-600 mb-4">{finding.observation}</p>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-8 text-xs">Open Evidence</Button>
                          <Button variant="ghost" size="sm" className="h-8 text-xs text-slate-500">View Finding</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {analysis?.findings.filter((f: AnalysisFinding) => f.category === "IMAGE REVIEW").length === 0 && (
                    <div className="p-8 text-center text-sm text-slate-500">No anomalies detected in image evidence.</div>
                  )}
                </CardContent>
              </Card>
            </FadeIn>

            {/* MODULE 2: Document Forensics */}
            <FadeIn delay={0.1}>
              <Card>
                <CardHeader className="pb-3 border-b flex flex-row items-center gap-3">
                  <div className="w-10 h-10 bg-cyan-50 text-cyan-600 rounded-lg flex items-center justify-center shrink-0">
                    <Icon icon={Search01Icon} size="md" />
                  </div>
                  <div>
                    <CardTitle className="text-base text-slate-900">Document Review</CardTitle>
                    <CardDescription className="text-xs">Analyzes documents for chronological inconsistencies and structural issues.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-0 divide-y divide-slate-100">
                  {analysis?.findings.filter((f: AnalysisFinding) => f.category === "DOCUMENT REVIEW").map((finding: AnalysisFinding) => (
                    <div key={finding.id} className="p-5 flex flex-col sm:flex-row gap-5 hover:bg-slate-50 transition-colors">
                      <div className="w-full sm:w-40 h-48 bg-slate-100 rounded-lg border border-slate-200 shrink-0 flex flex-col items-center justify-center text-slate-400 p-4 text-center">
                        <Icon icon={File01Icon} size="xl" className="mb-2" />
                        <span className="text-[10px] font-medium">Repair Estimate.pdf</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">Needs review</span>
                          <span className="text-[11px] text-slate-500">{finding.confidence}% confidence</span>
                        </div>
                        <h4 className="text-sm font-semibold text-slate-900 mb-1">{finding.title}</h4>
                        <p className="text-sm text-slate-600 mb-4">{finding.observation}</p>
                        
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="h-8 text-xs">Open Document</Button>
                          <Button variant="ghost" size="sm" className="h-8 text-xs text-slate-500">View Finding</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </FadeIn>

            {/* MODULE 3: Information Consistency */}
            <FadeIn delay={0.12}>
              <Card>
                <CardHeader className="pb-3 border-b flex flex-row items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center shrink-0">
                    <Icon icon={Layers01Icon} size="md" />
                  </div>
                  <div>
                    <CardTitle className="text-base text-slate-900">Information Consistency</CardTitle>
                    <CardDescription className="text-xs">Cross-references extracted data points across all submitted evidence.</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-5">
                  <div className="rounded-xl border border-slate-200 overflow-hidden">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                        <tr>
                          <th className="px-4 py-3">Data Point</th>
                          <th className="px-4 py-3">Claim Record</th>
                          <th className="px-4 py-3">Evidence Extraction</th>
                          <th className="px-4 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        <tr>
                          <td className="px-4 py-3 font-medium text-slate-900">Incident Date</td>
                          <td className="px-4 py-3 text-slate-600">20 Sep 2026</td>
                          <td className="px-4 py-3 text-slate-600">17 Sep 2026 <span className="text-[10px] text-slate-400 block">(Repair Estimate)</span></td>
                          <td className="px-4 py-3"><span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">Mismatch</span></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-slate-900">Claimant Name</td>
                          <td className="px-4 py-3 text-slate-600">Rajesh Kumar</td>
                          <td className="px-4 py-3 text-slate-600">Rajesh Kumar <span className="text-[10px] text-slate-400 block">(Driving License)</span></td>
                          <td className="px-4 py-3"><span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Match</span></td>
                        </tr>
                        <tr>
                          <td className="px-4 py-3 font-medium text-slate-900">Vehicle Number</td>
                          <td className="px-4 py-3 text-slate-600">MH-02-AB-1234</td>
                          <td className="px-4 py-3 text-slate-600">MH-02-AB-1234 <span className="text-[10px] text-slate-400 block">(Repair Estimate)</span></td>
                          <td className="px-4 py-3"><span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">Match</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* MODULE 4 & 5: Identity and Metadata (Grid) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FadeIn delay={0.14}>
                <Card className="h-full">
                  <CardHeader className="pb-3 border-b flex flex-row items-center gap-3">
                    <div className="w-8 h-8 bg-purple-50 text-purple-600 rounded flex items-center justify-center shrink-0">
                      <Icon icon={UserIcon} size="sm" />
                    </div>
                    <div>
                      <CardTitle className="text-sm text-slate-900">Identity Review</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-xs font-medium text-slate-400">ID</div>
                      <div className="flex-1 h-px bg-slate-200 relative"><span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-[10px] font-bold text-slate-400">VS</span></div>
                      <div className="w-16 h-16 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-xs font-medium text-slate-400">Selfie</div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-amber-700 mb-1">Observation: 76% similarity</p>
                      <p className="text-xs text-slate-600 leading-relaxed">Identity information may require additional verification.</p>
                    </div>
                  </CardContent>
                </Card>
              </FadeIn>

              <FadeIn delay={0.16}>
                <Card className="h-full">
                  <CardHeader className="pb-3 border-b flex flex-row items-center gap-3">
                    <div className="w-8 h-8 bg-slate-100 text-slate-600 rounded flex items-center justify-center shrink-0">
                      <Icon icon={Search01Icon} size="sm" />
                    </div>
                    <div>
                      <CardTitle className="text-sm text-slate-900">File Information</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start gap-2">
                      <Icon icon={AlertCircleIcon} size="xs" className="text-amber-500 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-slate-900">Missing EXIF GPS data</p>
                        <p className="text-[11px] text-slate-500">Vehicle Damage Photo 01.jpg</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Icon icon={AlertCircleIcon} size="xs" className="text-amber-500 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-slate-900">Missing EXIF GPS data</p>
                        <p className="text-[11px] text-slate-500">Vehicle Damage Photo 02.jpg</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full text-xs mt-2">View file details</Button>
                  </CardContent>
                </Card>
              </FadeIn>
            </div>

          </div>

          {/* RIGHT SIDEBAR: Summary & centralized findings */}
          <div className="space-y-6">
            <FadeIn delay={0.1}>
              <Card className="bg-slate-50 border-slate-200">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Analysis Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Evidence Files Reviewed</span>
                    <span className="font-semibold text-slate-900">{evidence?.length || 4}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Items Need Review</span>
                    <span className="font-semibold text-amber-700">3</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">Information Checks</span>
                    <span className="font-semibold text-blue-700">1</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-600">No Noted Issues</span>
                    <span className="font-semibold text-emerald-700">2</span>
                  </div>
                  
                  <div className="pt-4 mt-2 border-t border-slate-200">
                    <Button variant="primary" className="w-full" asChild>
                      <Link href={`/claims/${claimId}/risk`}>
                        Proceed to Risk Assessment
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            <FadeIn delay={0.12}>
              <Card>
                <CardHeader className="pb-3 border-b">
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Icon icon={AlertCircleIcon} size="sm" className="text-amber-600" />
                    Centralized Findings
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
                    {analysis?.findings.map((finding: AnalysisFinding) => (
                      <div key={finding.id} className="p-4 hover:bg-slate-50">
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">{finding.category}</p>
                        <p className="text-xs font-medium text-slate-900 leading-tight mb-2">{finding.title}</p>
                        <div className="flex flex-wrap items-center gap-2 text-[10px]">
                          <span className="px-1.5 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded">{finding.status}</span>
                          <span className="text-slate-500 font-mono">{finding.confidence}% conf</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>
        </div>
      </PageContainer>
    </AppShell>
  );
}
