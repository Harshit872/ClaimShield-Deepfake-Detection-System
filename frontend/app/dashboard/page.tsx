"use client";

import React from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Section } from "@/components/layout/Section";
import { SectionHeader } from "@/components/layout/SectionHeader";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Icon,
  Folder01Icon,
  Search01Icon,
  CheckmarkCircle01Icon,
  AlertCircleIcon,
  Clock01Icon,
  ArrowRight01Icon,
  File01Icon,
} from "@/components/ui/icon";
import { FadeIn } from "@/components/motion/FadeIn";
import {
  useDashboardMetrics,
  useAttentionItems,
  useClaims,
} from "@/lib/api";

export default function DashboardPage() {
  const { data: metrics } = useDashboardMetrics();
  const { data: attentionItems } = useAttentionItems();
  const { data: claims } = useClaims();

  const formattedCurrency = (val: number, cur = "₹") => {
    return `${cur}${val.toLocaleString("en-IN")}`;
  };

  return (
    <AppShell activeNavId="dashboard" pageTitle="Dashboard">
      <PageContainer maxWidth="xl">
        {/* Page Header */}
        <FadeIn>
          <PageHeader
            title="Good morning, Sarah"
            description="Here's what needs your attention today across active claims and investigations."
            actions={
              <div className="flex items-center gap-2">
                <Button variant="primary" size="sm" asChild>
                  <Link href="/claims/new" className="gap-1.5">
                    <span>+ New Claim</span>
                  </Link>
                </Button>
                <Button variant="secondary" size="sm" asChild>
                  <Link href="/claims">View Claims</Link>
                </Button>
              </div>
            }
          />
        </FadeIn>

        {/* 4 Summary Cards */}
        <FadeIn delay={0.05}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 mb-8">
            {/* Card 1: Claims to Review */}
            <Link href="/claims" className="block group">
              <Card hoverable className="h-full border-slate-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Claims to Review
                    </span>
                    <Icon icon={Folder01Icon} size="sm" className="text-slate-400 group-hover:text-sky-600 transition-colors" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                    {metrics?.claimsToReview ?? 8}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-[11px] text-slate-500">
                    Assigned to your queue
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Card 2: In Progress */}
            <Link href="/investigations" className="block group">
              <Card hoverable className="h-full border-slate-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      In Progress
                    </span>
                    <Icon icon={Clock01Icon} size="sm" className="text-slate-400 group-hover:text-sky-600 transition-colors" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-sky-700 mt-2">
                    {metrics?.inProgress ?? 5}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-[11px] text-slate-500">
                    Under active forensic analysis
                  </p>
                </CardContent>
              </Card>
            </Link>

            {/* Card 3: Needs Attention */}
            <a href="#attention-section" className="block group">
              <Card hoverable className="h-full border-amber-200/80 bg-amber-50/20">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between text-amber-700">
                    <span className="text-xs font-semibold uppercase tracking-wider">
                      Needs Attention
                    </span>
                    <Icon icon={AlertCircleIcon} size="sm" className="text-amber-500" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-amber-800 mt-2">
                    {metrics?.needsAttention ?? 3}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-[11px] text-amber-700/80">
                    Discrepancies flagged for check
                  </p>
                </CardContent>
              </Card>
            </a>

            {/* Card 4: Decisions Pending */}
            <Link href="/claims?status=Decision+Pending" className="block group">
              <Card hoverable className="h-full border-slate-200">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between text-slate-500">
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      Decisions Pending
                    </span>
                    <Icon icon={CheckmarkCircle01Icon} size="sm" className="text-slate-400 group-hover:text-sky-600 transition-colors" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold text-indigo-700 mt-2">
                    {metrics?.decisionsPending ?? 2}
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-[11px] text-slate-500">
                    Ready for investigator sign-off
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </FadeIn>

        {/* Quick Actions Bar */}
        <FadeIn delay={0.08}>
          <div className="mb-8 rounded-xl border border-slate-200/80 bg-white p-4 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold text-slate-700">
              Quick Actions
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="primary" size="sm" asChild>
                <Link href="/claims/new">+ New Claim</Link>
              </Button>
              <Button variant="secondary" size="sm" asChild>
                <Link href="/claims">View Claims</Link>
              </Button>
              <Button variant="secondary" size="sm" asChild>
                <Link href="/investigations">View Investigations</Link>
              </Button>
              <Button variant="secondary" size="sm" asChild>
                <Link href="/reports">View Reports</Link>
              </Button>
            </div>
          </div>
        </FadeIn>

        {/* ============================================================ */}
        {/* NEEDS ATTENTION SECTION */}
        {/* ============================================================ */}
        <Section id="attention-section">
          <SectionHeader
            title="Needs Your Attention"
            description="Items flagged during consistency checks requiring human investigator determination."
          />
          <div className="space-y-3">
            {attentionItems?.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl border border-amber-200/70 bg-amber-50/30 hover:bg-amber-50/50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-700 shrink-0 mt-0.5">
                    <Icon icon={AlertCircleIcon} size="sm" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">
                        {item.claimId}
                      </span>
                      <span className="text-xs text-slate-600 font-medium">
                        • {item.claimant}
                      </span>
                    </div>
                    <h4 className="text-xs font-semibold text-amber-950 mt-0.5">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5 leading-normal">
                      {item.description}
                    </p>
                  </div>
                </div>

                <Button variant="secondary" size="sm" className="shrink-0 self-start sm:self-center" asChild>
                  <Link href={item.actionHref} className="gap-1 text-xs">
                    <span>{item.actionLabel}</span>
                    <Icon icon={ArrowRight01Icon} size="xs" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </Section>

        {/* ============================================================ */}
        {/* RECENT CLAIMS TABLE */}
        {/* ============================================================ */}
        <Section divided>
          <SectionHeader
            title="Recent Claims"
            description="Assigned claims queue ordered by recent activity."
            actions={
              <Button variant="outline" size="sm" asChild>
                <Link href="/claims">View All Claims</Link>
              </Button>
            }
          />

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim ID</TableHead>
                <TableHead>Claimant</TableHead>
                <TableHead>Claim Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Submitted</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {claims?.slice(0, 4).map((claim) => (
                <TableRow key={claim.id}>
                  <TableCell className="font-mono font-semibold text-slate-900">
                    <Link
                      href={`/claims/${claim.id}`}
                      className="hover:text-sky-600 transition-colors"
                    >
                      {claim.claimNumber}
                    </Link>
                  </TableCell>
                  <TableCell className="font-medium text-slate-800">
                    {claim.policyHolderName}
                  </TableCell>
                  <TableCell className="text-slate-600">{claim.policyType}</TableCell>
                  <TableCell className="font-semibold text-slate-900">
                    {formattedCurrency(claim.claimedAmount, claim.currency)}
                  </TableCell>
                  <TableCell className="text-slate-500 text-xs">
                    {claim.submittedDate}
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={claim.status} size="sm" />
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="secondary" size="sm" className="h-7 text-xs px-2.5" asChild>
                      <Link href={`/claims/${claim.id}`}>Review</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Section>

        {/* ============================================================ */}
        {/* RECENT INVESTIGATIONS */}
        {/* ============================================================ */}
        <Section>
          <SectionHeader
            title="Recent Investigations"
            description="Status tracking for ongoing forensic cross-checks."
            actions={
              <Button variant="outline" size="sm" asChild>
                <Link href="/investigations">View All</Link>
              </Button>
            }
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {claims?.slice(0, 3).map((claim) => (
              <Card key={claim.id} hoverable className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs font-bold text-slate-900">
                    {claim.claimNumber}
                  </span>
                  <StatusBadge status={claim.status} size="sm" />
                </div>
                <h4 className="text-xs font-semibold text-slate-800">
                  {claim.policyHolderName}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Last updated: {claim.lastUpdated}
                </p>
                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400">
                    {claim.evidenceItemsCount} evidence items
                  </span>
                  <Button variant="ghost" size="sm" className="h-7 text-xs px-2 text-sky-600 hover:text-sky-700" asChild>
                    <Link href={`/claims/${claim.id}`}>
                      <span>Inspect</span>
                      <Icon icon={ArrowRight01Icon} size="xs" />
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      </PageContainer>
    </AppShell>
  );
}
