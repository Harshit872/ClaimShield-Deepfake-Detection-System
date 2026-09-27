"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Icon, File01Icon, CheckmarkCircle01Icon, ArrowLeft01Icon } from "@/components/ui/icon";
import { FadeIn } from "@/components/motion/FadeIn";
import { useReports } from "@/lib/api";
import { ReportItem } from "@/data/mockData";

export default function ReportsPage() {
  const { data: reports } = useReports();
  const [selectedReport, setSelectedReport] = useState<ReportItem | null>(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [downloadMsg, setDownloadMsg] = useState(false);

  return (
    <AppShell activeNavId="reports" pageTitle="Reports">
      <PageContainer maxWidth="xl">
        {/* Report Preview Modal */}
        {selectedReport && (
          <Dialog open={!!selectedReport} onOpenChange={() => {
            setSelectedReport(null);
            setDownloadMsg(false);
          }}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                    <Icon icon={File01Icon} size="sm" />
                  </div>
                  <DialogTitle>{selectedReport.reportNumber}</DialogTitle>
                </div>
                <DialogDescription>
                  Investigation sign-off audit report for Claim {selectedReport.claimId}.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-3 py-2 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Claimant:</span>
                    <span className="font-semibold text-slate-800">{selectedReport.claimant}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Generated:</span>
                    <span className="font-medium text-slate-700">{selectedReport.createdDate}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Audit Status:</span>
                    <Badge variant="success" className="text-[10px]">
                      {selectedReport.status}
                    </Badge>
                  </div>
                </div>

                <div className="rounded-lg border border-sky-100 bg-sky-50/50 p-3 text-sky-900 leading-relaxed text-[11px]">
                  This report certifies that digital evidence was evaluated for metadata integrity and signed off by the Special Investigation Unit.
                </div>
                
                {downloadMsg && (
                  <div className="text-amber-600 bg-amber-50 rounded p-2 text-center text-[11px] font-medium animate-in fade-in">
                    Report export requires backend integration.
                  </div>
                )}
              </div>

              <DialogFooter>
                <Button variant="secondary" size="sm" onClick={() => setSelectedReport(null)}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setDownloadMsg(true)}
                  disabled={downloadMsg}
                >
                  Download Summary
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}

        <FadeIn>
          <PageHeader
            title="Reports"
            description="Review investigation reports and audit sign-off summaries."
            actions={
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsCompiling(true);
                  setTimeout(() => setIsCompiling(false), 1500);
                }}
                disabled={isCompiling}
              >
                {isCompiling ? "Compiling..." : "Compile New Report"}
              </Button>
            }
          />
        </FadeIn>

        {/* Info Banner */}
        <FadeIn delay={0.05}>
          <div className="mb-6 rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2.5">
              <Icon icon={CheckmarkCircle01Icon} size="sm" className="text-emerald-600" />
              <span>
                Immutable SIU audit logs are maintained for all completed claim reviews.
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono hidden sm:inline">
              ISO-27001 Verified
            </span>
          </div>
        </FadeIn>

        {/* Reports Table */}
        <FadeIn delay={0.1}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Investigation Report Library</CardTitle>
              <CardDescription className="text-xs">
                Historical documentation of investigator findings and finalized decisions.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Report</TableHead>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Claimant</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports?.map((rep) => (
                    <TableRow key={rep.id}>
                      <TableCell className="font-mono font-semibold text-slate-900 text-xs flex items-center gap-2">
                        <Icon icon={File01Icon} size="xs" className="text-slate-400" />
                        <span>{rep.reportNumber}</span>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        <Link
                          href={`/claims/${rep.claimId}`}
                          className="text-sky-600 hover:underline"
                        >
                          {rep.claimId}
                        </Link>
                      </TableCell>
                      <TableCell className="font-medium text-slate-800 text-xs">
                        {rep.claimant}
                      </TableCell>
                      <TableCell className="text-xs text-slate-500">
                        {rep.createdDate}
                      </TableCell>
                      <TableCell>
                        <Badge variant="success" className="text-[10px]">
                          {rep.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-7 text-xs px-2.5"
                          onClick={() => setSelectedReport(rep)}
                        >
                          View Report
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </FadeIn>
      </PageContainer>
    </AppShell>
  );
}
