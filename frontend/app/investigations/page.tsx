"use client";

import React, { useState } from "react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
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
import { Icon, Search01Icon, ArrowRight01Icon } from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { FadeIn } from "@/components/motion/FadeIn";
import { useClaims } from "@/lib/api";
import { ClaimStatus } from "@/types/ui";

export default function InvestigationsPage() {
  const { data: claims } = useClaims();
  const [filterQuery, setFilterQuery] = useState("");
  const [activeTab, setActiveTab] = useState<string>("All");

  const filteredClaims = claims?.filter((claim) => {
    const matchesQuery =
      claim.claimNumber.toLowerCase().includes(filterQuery.toLowerCase()) ||
      claim.policyHolderName.toLowerCase().includes(filterQuery.toLowerCase());
    if (activeTab === "All") return matchesQuery;
    return matchesQuery && claim.status === activeTab;
  });

  return (
    <AppShell activeNavId="investigations" pageTitle="Investigations">
      <PageContainer maxWidth="xl">
        <FadeIn>
          <PageHeader
            title="Investigations"
            description="Track claims currently undergoing evidence analysis and review."
            actions={
              <Button variant="primary" size="sm" asChild>
                <Link href="/claims/new">+ New Claim</Link>
              </Button>
            }
          />
        </FadeIn>

        {/* Filter bar */}
        <FadeIn delay={0.05}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
            <div className="relative flex-1 max-w-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Icon icon={Search01Icon} size="sm" />
              </div>
              <Input
                type="text"
                placeholder="Filter investigations..."
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="pl-9 h-9 text-xs"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5">
              {["All", "Needs Review", "In Review", "Analyzing", "Decision Pending"].map((status) => (
                <button
                  key={status}
                  onClick={() => setActiveTab(status)}
                  className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === status
                      ? "bg-sky-50 text-sky-800 font-semibold border border-sky-200"
                      : "text-slate-600 hover:bg-slate-100 border border-transparent"
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Investigations Table */}
        <FadeIn delay={0.1}>
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Active Investigation Queue</CardTitle>
              <CardDescription className="text-xs">
                Click on any case to review evidence discrepancies and record determination.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Claimant</TableHead>
                    <TableHead>Investigation Status</TableHead>
                    <TableHead>Evidence Files</TableHead>
                    <TableHead>Last Updated</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClaims?.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-mono font-semibold text-slate-900">
                        <Link
                          href={`/claims/${item.id}`}
                          className="hover:text-sky-600 transition-colors"
                        >
                          {item.claimNumber}
                        </Link>
                      </TableCell>
                      <TableCell className="font-medium text-slate-800">
                        {item.policyHolderName}
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={item.status as ClaimStatus} size="sm" />
                      </TableCell>
                      <TableCell className="text-xs text-slate-500">
                        {item.evidenceItemsCount} files
                      </TableCell>
                      <TableCell className="text-xs text-slate-500">
                        {item.lastUpdated}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="secondary"
                          size="sm"
                          className="h-7 text-xs px-2.5 gap-1"
                          asChild
                        >
                          <Link href={`/claims/${item.id}`}>
                            <span>Open</span>
                            <Icon icon={ArrowRight01Icon} size="xs" />
                          </Link>
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
