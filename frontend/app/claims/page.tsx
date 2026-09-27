"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Icon, Search01Icon, Folder01Icon } from "@/components/ui/icon";
import { EmptyState } from "@/components/ui/empty-state";
import { FadeIn } from "@/components/motion/FadeIn";
import { useClaims } from "@/lib/api";
import { ClaimStatus } from "@/types/ui";

const STATUS_FILTERS: Array<ClaimStatus | "All"> = [
  "All",
  "Needs Review",
  "In Review",
  "Analyzing",
  "Decision Pending",
  "Approved",
];

function ClaimsPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const initialStatus = (searchParams.get("status") as ClaimStatus) || "All";

  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedStatus, setSelectedStatus] = useState<ClaimStatus | "All">(initialStatus);

  const { data: claims } = useClaims({
    searchQuery,
    status: selectedStatus,
  });

  const formattedCurrency = (val: number, cur = "₹") => {
    return `${cur}${val.toLocaleString("en-IN")}`;
  };

  return (
    <AppShell activeNavId="claims" pageTitle="Claims">
      <PageContainer maxWidth="xl">
        {/* Page Header */}
        <FadeIn>
          <PageHeader
            title="Claims"
            description="Review and manage submitted claims across your investigation caseload."
            actions={
              <Button variant="primary" size="sm" asChild>
                <Link href="/claims/new">+ New Claim</Link>
              </Button>
            }
          />
        </FadeIn>

        {/* Filter & Search Bar */}
        <FadeIn delay={0.05}>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Icon icon={Search01Icon} size="sm" />
              </div>
              <Input
                type="text"
                placeholder="Filter by Claim ID, Claimant, or Loss Type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-9 text-xs"
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap hidden sm:inline">
                Status:
              </span>
              <Select
                value={selectedStatus}
                onValueChange={(val) => setSelectedStatus(val as ClaimStatus | "All")}
              >
                <SelectTrigger className="w-[180px] h-9 text-xs">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_FILTERS.map((st) => (
                    <SelectItem key={st} value={st}>
                      {st === "All" ? "All Statuses" : st}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </FadeIn>

        {/* Claims Table / Results */}
        <FadeIn delay={0.1}>
          {claims && claims.length > 0 ? (
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
                {claims.map((claim) => (
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
                    <TableCell className="text-slate-600 text-xs">
                      {claim.policyType}
                    </TableCell>
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
                      <Button
                        variant="secondary"
                        size="sm"
                        className="h-7 text-xs px-3"
                        asChild
                      >
                        <Link href={`/claims/${claim.id}`}>Review</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <EmptyState
              title="No claims match your filters"
              description="Try adjusting your search query or reset status filters to view the full queue."
              icon={Folder01Icon}
              actionLabel="Reset Filters"
              onAction={() => {
                setSearchQuery("");
                setSelectedStatus("All");
              }}
            />
          )}
        </FadeIn>
      </PageContainer>
    </AppShell>
  );
}

export default function ClaimsPage() {
  return (
    <Suspense>
      <ClaimsPageContent />
    </Suspense>
  );
}
