"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { Icon, Shield01Icon, File01Icon, CheckmarkCircle01Icon, AlertCircleIcon, ArrowLeft01Icon, Cancel01Icon, InformationCircleIcon } from "@/components/ui/icon";
import { FadeIn } from "@/components/motion/FadeIn";
import { useClaim, useEvidence, useFindings, useNotes } from "@/lib/api";
import { EvidenceItem } from "@/types/claims";

export default function InvestigationWorkspace() {
  const params = useParams();
  const rawId = (params?.claimId as string) || "CLM-10291";
  const claimId = decodeURIComponent(rawId);

  const { data: claim } = useClaim(claimId);
  const { data: evidence } = useEvidence(claimId);
  const { data: findings } = useFindings(claimId);
  const { data: notes } = useNotes(claimId);

  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);
  const [highlightedEvidenceId, setHighlightedEvidenceId] = useState<string | null>(null);
  const [highlightedFindingId, setHighlightedFindingId] = useState<string | null>(null);

  const [newNote, setNewNote] = useState("");
  const [localNotes, setLocalNotes] = useState(notes || []);

  // Update local notes when API finishes
  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (notes) setLocalNotes(notes);
  }, [notes]);

  const handleEvidenceClick = (item: EvidenceItem) => {
    setSelectedEvidence(item);
    setHighlightedEvidenceId(item.id);
    
    // Find related finding
    const relatedFinding = findings?.find(f => f.relatedEvidenceIds.includes(item.id));
    if (relatedFinding) {
      setHighlightedFindingId(relatedFinding.id);
    } else {
      setHighlightedFindingId(null);
    }
  };

  const handleFindingClick = (findingId: string) => {
    setHighlightedFindingId(findingId);
    
    // Find related evidence
    const finding = findings?.find(f => f.id === findingId);
    if (finding && finding.relatedEvidenceIds.length > 0) {
      setHighlightedEvidenceId(finding.relatedEvidenceIds[0]);
    } else {
      setHighlightedEvidenceId(null);
    }
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    const note = {
      id: Math.random().toString(),
      author: "Sarah Jenkins",
      timestamp: new Date().toLocaleString(),
      content: newNote
    };
    setLocalNotes([note, ...localNotes]);
    setNewNote("");
  };

  const formattedCurrency = (val?: number, cur = "₹") => {
    if (!val) return "₹0";
    return `${cur}${val.toLocaleString("en-IN")}`;
  };

  const statusSteps = [
    { label: "Claim Received", active: true },
    { label: "Evidence Added", active: true },
    { label: "Analysis", active: true },
    { label: "Findings", active: true },
    { label: "Investigator Review", active: true, current: true },
    { label: "Decision", active: false }
  ];

  return (
    <AppShell activeNavId="claims" pageTitle={`Workspace ${claimId}`}>
      <PageContainer maxWidth="2xl">
        {/* Back Link */}
        <FadeIn>
          <div className="mb-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/claims" className="gap-1.5 text-xs text-slate-600 hover:text-slate-900">
                <Icon icon={ArrowLeft01Icon} size="xs" />
                <span>Back to Claims</span>
              </Link>
            </Button>
          </div>
        </FadeIn>

        {/* Workspace Header */}
        <FadeIn delay={0.04}>
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm mb-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <Icon icon={Shield01Icon} size="lg" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-slate-900">{claim?.claimNumber || claimId}</h1>
                  <p className="text-sm text-slate-500">
                    <span className="font-medium text-slate-700">{claim?.policyHolderName || "Rajesh Kumar"}</span> • {claim?.policyType || "Vehicle Damage"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-medium">Claim Amount</p>
                  <p className="text-lg font-bold text-slate-900">{formattedCurrency(claim?.claimedAmount, claim?.currency)}</p>
                </div>
                <div className="h-10 w-px bg-slate-200 hidden md:block"></div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wide font-medium mb-1">Status</p>
                  <StatusBadge status={claim?.status || "Needs Review"} size="sm" />
                </div>
              </div>
            </div>

            {/* Status Progression */}
            <div className="mt-6 pt-6 border-t border-slate-100 overflow-x-auto">
              <div className="flex items-center min-w-[600px]">
                {statusSteps.map((step, idx) => (
                  <React.Fragment key={step.label}>
                    <div className="flex flex-col items-center gap-2 w-32 shrink-0 relative">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold z-10 
                        ${step.current ? 'bg-blue-600 text-white ring-4 ring-blue-50' : step.active ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'}`}>
                        {step.active && !step.current ? <Icon icon={CheckmarkCircle01Icon} size="sm" /> : idx + 1}
                      </div>
                      <span className={`text-[11px] font-medium text-center ${step.current ? 'text-blue-700' : step.active ? 'text-slate-600' : 'text-slate-400'}`}>
                        {step.label}
                      </span>
                    </div>
                    {idx < statusSteps.length - 1 && (
                      <div className={`flex-1 h-0.5 -mt-6 ${statusSteps[idx + 1].active ? 'bg-blue-200' : 'bg-slate-100'}`} />
                    )}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT AREA: Evidence & Findings */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* EVIDENCE PANEL */}
            <FadeIn delay={0.06}>
              <Card>
                <CardHeader className="pb-3 border-b">
                  <CardTitle>Evidence Files</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-slate-100">
                    {evidence?.map((item) => (
                      <div 
                        key={item.id} 
                        onClick={() => handleEvidenceClick(item)}
                        className={`p-4 bg-white cursor-pointer transition-colors border-b sm:border-b-0 ${highlightedEvidenceId === item.id ? 'ring-2 ring-inset ring-blue-500 bg-blue-50/50' : 'hover:bg-slate-50'}`}
                      >
                        <div className="flex items-start gap-3">
                          {item.type === 'image' ? (
                            <img src={item.url} alt={item.filename} className="w-12 h-12 object-cover rounded shadow-sm border border-slate-200" />
                          ) : (
                            <div className="w-12 h-12 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-slate-400">
                              <Icon icon={File01Icon} size="md" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">{item.filename}</p>
                            <p className="text-[11px] text-slate-500 mt-0.5">{item.category}</p>
                            <div className="mt-2 inline-flex">
                              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-sm ${item.status === 'Needs Review' ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-600'}`}>
                                {item.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* LARGE EVIDENCE VIEWER (Conditional) */}
            {selectedEvidence && (
              <FadeIn>
                <Card className="border-blue-200 shadow-md overflow-hidden relative">
                  <div className="absolute top-2 right-2 z-10">
                    <Button variant="outline" size="sm" className="h-8 w-8 p-0 rounded-full bg-white/80 backdrop-blur" onClick={() => setSelectedEvidence(null)}>
                      <Icon icon={Cancel01Icon} size="sm" />
                    </Button>
                  </div>
                  {selectedEvidence.type === 'image' ? (
                     <div className="bg-slate-100 p-4 flex justify-center items-center h-64 md:h-96">
                       <img src={selectedEvidence.url} alt={selectedEvidence.filename} className="max-h-full max-w-full rounded shadow-sm" />
                     </div>
                  ) : (
                    <div className="bg-slate-100 p-4 flex flex-col justify-center items-center h-64 md:h-96 text-slate-400">
                       <Icon icon={File01Icon} size="xl" className="mb-4" />
                       <p className="text-sm font-medium">PDF Document Preview</p>
                       <p className="text-xs">{selectedEvidence.filename}</p>
                    </div>
                  )}
                  <div className="p-4 bg-white border-t border-slate-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-semibold text-slate-900 text-sm">{selectedEvidence.filename}</h4>
                        <p className="text-xs text-slate-500">{selectedEvidence.category}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeIn>
            )}

            {/* FINDINGS PANEL */}
            <FadeIn delay={0.08}>
              <Card>
                <CardHeader className="pb-3 border-b bg-amber-50/30">
                  <CardTitle className="text-amber-900 flex items-center gap-2">
                    <Icon icon={AlertCircleIcon} size="sm" className="text-amber-600" />
                    What needs your attention?
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-slate-100">
                    {findings?.map((finding) => (
                      <div 
                        key={finding.id} 
                        onClick={() => handleFindingClick(finding.id)}
                        className={`p-4 cursor-pointer transition-colors ${highlightedFindingId === finding.id ? 'bg-blue-50/50 ring-1 ring-inset ring-blue-200' : 'hover:bg-slate-50'}`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${finding.status === 'Needs Review' ? 'bg-amber-500' : 'bg-slate-300'}`} />
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded uppercase tracking-wider">{finding.type}</span>
                              <span className="text-[11px] text-slate-400">{finding.confidence}% confidence</span>
                            </div>
                            <p className="text-sm text-slate-800 leading-snug font-medium mb-3">
                              {finding.explanation}
                            </p>
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm" className="h-7 text-xs px-2">Review Evidence</Button>
                              <Button variant="ghost" size="sm" className="h-7 text-xs px-2 text-slate-500">Mark Reviewed</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          {/* RIGHT AREA: Summary & Actions */}
          <div className="space-y-6">
            
            {/* INVESTIGATION SUMMARY */}
            <FadeIn delay={0.1}>
              <Card>
                <CardHeader className="pb-3 border-b">
                  <CardTitle className="text-sm text-slate-800">Investigation Summary</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-center">
                       <p className="text-2xl font-bold text-slate-700">{evidence?.length || 0}</p>
                       <p className="text-xs text-slate-500 font-medium">Evidence Files</p>
                    </div>
                    <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-center">
                       <p className="text-2xl font-bold text-amber-700">{findings?.length || 0}</p>
                       <p className="text-xs text-amber-700/80 font-medium">Findings</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-2">
                    <h4 className="text-xs font-semibold text-slate-900 uppercase tracking-wide">Analysis Progress</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Icon icon={CheckmarkCircle01Icon} size="sm" className="text-emerald-500" />
                        <span>Evidence received</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Icon icon={CheckmarkCircle01Icon} size="sm" className="text-emerald-500" />
                        <span>Documents reviewed</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Icon icon={CheckmarkCircle01Icon} size="sm" className="text-emerald-500" />
                        <span>Images reviewed</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <Icon icon={CheckmarkCircle01Icon} size="sm" className="text-emerald-500" />
                        <span>Information compared</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-medium text-blue-700 bg-blue-50 p-1.5 rounded">
                        <Icon icon={InformationCircleIcon} size="sm" className="text-blue-600" />
                        <span>Investigator review (Current)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* ACTIONS */}
            <FadeIn delay={0.12}>
              <Card>
                <CardHeader className="pb-3 border-b">
                  <CardTitle className="text-sm text-slate-800">Actions</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2 flex flex-col">
                  <Button className="w-full justify-start text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800 border border-blue-200" variant="outline" asChild>
                    <Link href={`/claims/${claimId}/analysis`}>
                      1. Open Multimodal Analysis
                    </Link>
                  </Button>
                  <Button className="w-full justify-start text-sm bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800 border border-amber-200" variant="outline" asChild>
                    <Link href={`/claims/${claimId}/risk`}>
                      2. View Risk Assessment
                    </Link>
                  </Button>
                  <Button className="w-full justify-start text-sm" variant="primary" asChild>
                    <Link href={`/claims/${claimId}/report`}>
                      3. Investigation Report & Decision
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </FadeIn>

            {/* NOTES */}
            <FadeIn delay={0.14}>
              <Card>
                <CardHeader className="pb-3 border-b">
                  <CardTitle className="text-sm text-slate-800">Investigation Notes</CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3 mb-4">
                    <textarea 
                      className="w-full text-sm border border-slate-200 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                      rows={3}
                      placeholder="Add a note about your review..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end">
                      <Button size="sm" className="text-xs h-7" onClick={addNote} disabled={!newNote.trim()}>Add Note</Button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {localNotes?.map((note) => (
                      <div key={note.id} className="text-sm border-l-2 border-slate-200 pl-3 py-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-semibold text-slate-900 text-xs">{note.author}</span>
                          <span className="text-[10px] text-slate-400">{note.timestamp}</span>
                        </div>
                        <p className="text-slate-600 text-xs">{note.content}</p>
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
