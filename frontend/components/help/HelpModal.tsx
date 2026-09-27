"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Icon, Shield01Icon, Folder01Icon, File01Icon, HelpCircleIcon } from "@/components/ui/icon";

export interface HelpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function HelpModal({ open, onOpenChange }: HelpModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
              <Icon icon={HelpCircleIcon} size="sm" />
            </div>
            <DialogTitle>ClaimShield Help & Guide</DialogTitle>
          </div>
          <DialogDescription>
            Reference guidelines for human claim investigators using ClaimShield AI.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2 text-xs">
          {/* Item 1 */}
          <div className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-3.5 space-y-1">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <Icon icon={Shield01Icon} size="xs" className="text-sky-600" />
              <span>How ClaimShield Works</span>
            </div>
            <p className="text-slate-600 leading-relaxed pl-5">
              ClaimShield AI cross-references submitted claim photos, invoices, and FIR reports to detect date anomalies, metadata inconsistencies, and damage discrepancies.
            </p>
          </div>

          {/* Item 2 */}
          <div className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-3.5 space-y-1">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <Icon icon={Folder01Icon} size="xs" className="text-sky-600" />
              <span>How to Submit a Claim</span>
            </div>
            <p className="text-slate-600 leading-relaxed pl-5">
              Navigate to Claims and click <strong>+ New Claim</strong>. Input policyholder details, loss date, and upload all photographic and documentary evidence files.
            </p>
          </div>

          {/* Item 3 */}
          <div className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-3.5 space-y-1">
            <div className="flex items-center gap-2 font-semibold text-slate-900">
              <Icon icon={File01Icon} size="xs" className="text-sky-600" />
              <span>How Evidence is Reviewed</span>
            </div>
            <p className="text-slate-600 leading-relaxed pl-5">
              Each piece of evidence is verified for digital authenticity and timeline logic. Potential issues are flagged with explainable plain-English notes for your review.
            </p>
          </div>

          {/* Item 4 */}
          <div className="rounded-xl border border-sky-100 bg-sky-50/60 p-3.5 space-y-1">
            <div className="font-semibold text-sky-950">
              Human Final Decision Policy
            </div>
            <p className="text-sky-900/80 leading-relaxed">
              AI provides objective signals to support your investigation. The AI never approves or denies claims autonomously — the final claim decision always belongs to the human investigator.
            </p>
          </div>

          {/* Support */}
          <div className="text-slate-500 pt-1 flex justify-between items-center text-[11px]">
            <span>SIU Support Desk: ext. 4410</span>
            <span className="font-mono text-slate-400">help@claimshield.internal</span>
          </div>
        </div>

        <DialogFooter>
          <Button variant="secondary" size="sm" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
