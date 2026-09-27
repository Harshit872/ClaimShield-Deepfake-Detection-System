"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ClaimShieldBackground } from "@/components/background/ClaimShieldBackground";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import {
  Icon,
  Shield01Icon,
  Folder01Icon,
  Upload01Icon,
  Search01Icon,
  CheckmarkCircle01Icon,
  File01Icon,
  ViewIcon,
  Layers01Icon,
  ArrowRight01Icon,
  Menu01Icon,
  UserIcon,
} from "@/components/ui/icon";
import { FadeIn } from "@/components/motion/FadeIn";
import { StaggerContainer, StaggerItem } from "@/components/motion/Stagger";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen flex flex-col bg-transparent text-slate-900 selection:bg-sky-100 selection:text-sky-900">
      {/* Background System */}
      <ClaimShieldBackground />

      {/* ============================================================ */}
      {/* TOP NAVIGATION */}
      {/* ============================================================ */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo / Wordmark */}
          <Link
            href="/"
            className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-sm transition-transform group-hover:scale-105">
              <Icon icon={Shield01Icon} size="md" className="text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-slate-900">
                ClaimShield <span className="text-sky-600 font-extrabold">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                Investigation Suite
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a
              href="#product"
              className="hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-md px-1 py-0.5"
            >
              Product
            </a>
            <a
              href="#how-it-works"
              className="hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-md px-1 py-0.5"
            >
              How It Works
            </a>
            <a
              href="#capabilities"
              className="hover:text-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-md px-1 py-0.5"
            >
              Capabilities
            </a>
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button variant="primary" size="sm" asChild>
              <Link href="/signup">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex sm:hidden items-center">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <IconButton label="Open navigation menu" variant="ghost" size="sm">
                  <Icon icon={Menu01Icon} size="md" />
                </IconButton>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <SheetHeader>
                  <SheetTitle>ClaimShield AI</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-6">
                  <a
                    href="#product"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium text-slate-700 hover:text-sky-600 py-1"
                  >
                    Product
                  </a>
                  <a
                    href="#how-it-works"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium text-slate-700 hover:text-sky-600 py-1"
                  >
                    How It Works
                  </a>
                  <a
                    href="#capabilities"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-sm font-medium text-slate-700 hover:text-sky-600 py-1"
                  >
                    Capabilities
                  </a>
                  <div className="border-t border-slate-100 pt-4 flex flex-col gap-2">
                    <Button variant="outline" className="w-full justify-center" asChild>
                      <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        Log In
                      </Link>
                    </Button>
                    <Button variant="primary" className="w-full justify-center" asChild>
                      <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                        Get Started
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* ============================================================ */}
      {/* HERO SECTION */}
      {/* ============================================================ */}
      <section className="relative pt-16 pb-24 sm:pt-24 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            {/* Mission Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-sky-800 text-xs font-semibold mb-6 shadow-xs">
              <Icon icon={Shield01Icon} size="xs" className="text-sky-600" />
              <span>AI-Assisted Investigation for Human Investigators</span>
            </div>

            {/* Primary Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-normal py-4 sm:py-6">
              Investigate claims with clarity.
            </h1>

            {/* Supporting Text */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Review evidence, uncover inconsistencies, and make better-informed
              claim decisions with ClaimShield AI.
            </p>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <Button variant="primary" size="lg" className="shadow-md" asChild>
                <Link href="/dashboard" className="gap-2">
                  <span>Start Investigation</span>
                  <Icon icon={ArrowRight01Icon} size="xs" />
                </Link>
              </Button>
              <Button variant="secondary" size="lg" asChild>
                <Link href="/dashboard">Explore Demo</Link>
              </Button>
              <Button variant="ghost" size="lg" asChild>
                <Link href="/login">Log In</Link>
              </Button>
            </div>
          </FadeIn>

          {/* ============================================================ */}
          {/* PRODUCT VISUALIZATION: CLAIM → EVIDENCE → ANALYSIS → FINDINGS → HUMAN DECISION */}
          {/* ============================================================ */}
          <FadeIn delay={0.15}>
            <div className="mt-16 sm:mt-20 max-w-4xl mx-auto" id="product">
              <div className="rounded-2xl border border-slate-200/90 bg-white/90 p-5 sm:p-7 shadow-sm backdrop-blur-sm">
                <div className="text-center mb-6">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Investigation Flow
                  </span>
                  <h3 className="text-sm font-semibold text-slate-900 mt-1">
                    From Evidence Intake to Final Adjudication
                  </h3>
                </div>

                {/* Subtle Flow Stepper Diagram */}
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 sm:gap-2 items-center">
                  {/* Step 1: Claim */}
                  <div className="flex flex-col items-center text-center p-3 rounded-xl border border-slate-100 bg-slate-50/70">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-700 mb-2">
                      <Icon icon={Folder01Icon} size="sm" />
                    </div>
                    <span className="text-xs font-semibold text-slate-900">1. Claim</span>
                    <span className="text-[11px] text-slate-500 mt-0.5">Loss details</span>
                  </div>

                  <div className="hidden sm:flex justify-center text-slate-300">
                    <Icon icon={ArrowRight01Icon} size="xs" />
                  </div>

                  {/* Step 2: Evidence */}
                  <div className="flex flex-col items-center text-center p-3 rounded-xl border border-slate-100 bg-slate-50/70">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-100 text-sky-700 mb-2">
                      <Icon icon={Upload01Icon} size="sm" />
                    </div>
                    <span className="text-xs font-semibold text-slate-900">2. Evidence</span>
                    <span className="text-[11px] text-slate-500 mt-0.5">Photos & bills</span>
                  </div>

                  <div className="hidden sm:flex justify-center text-slate-300">
                    <Icon icon={ArrowRight01Icon} size="xs" />
                  </div>

                  {/* Step 3: Analysis */}
                  <div className="flex flex-col items-center text-center p-3 rounded-xl border border-sky-100 bg-sky-50/60">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-sky-600 text-white mb-2 shadow-xs">
                      <Icon icon={Search01Icon} size="sm" />
                    </div>
                    <span className="text-xs font-semibold text-sky-950">3. Analysis</span>
                    <span className="text-[11px] text-sky-800/80 mt-0.5">Consistency check</span>
                  </div>

                  <div className="hidden sm:flex justify-center text-slate-300">
                    <Icon icon={ArrowRight01Icon} size="xs" />
                  </div>

                  {/* Step 4: Findings */}
                  <div className="flex flex-col items-center text-center p-3 rounded-xl border border-slate-100 bg-slate-50/70">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700 mb-2">
                      <Icon icon={File01Icon} size="sm" />
                    </div>
                    <span className="text-xs font-semibold text-slate-900">4. Findings</span>
                    <span className="text-[11px] text-slate-500 mt-0.5">Explainable notes</span>
                  </div>

                  <div className="hidden sm:flex justify-center text-slate-300">
                    <Icon icon={ArrowRight01Icon} size="xs" />
                  </div>

                  {/* Step 5: Human Decision */}
                  <div className="flex flex-col items-center text-center p-3 rounded-xl border border-emerald-200 bg-emerald-50/60">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white mb-2 shadow-xs">
                      <Icon icon={CheckmarkCircle01Icon} size="sm" />
                    </div>
                    <span className="text-xs font-semibold text-emerald-950">5. Human Decision</span>
                    <span className="text-[11px] text-emerald-800/80 mt-0.5">Investigator sign-off</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ============================================================ */}
      {/* HOW IT WORKS */}
      {/* ============================================================ */}
      <section className="py-20 border-t border-slate-200/80 bg-white/50" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200/80">
              Simple Workflow
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-3">
              How It Works
            </h2>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Designed for ease of use by claim adjusters and Special Investigation Units.
            </p>
          </div>

          <StaggerContainer>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 01 */}
              <StaggerItem>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 border border-sky-200/70 text-sky-600">
                        <Icon icon={Folder01Icon} size="md" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-300">01</span>
                    </div>
                    <CardTitle className="text-base">Submit Claim</CardTitle>
                    <CardDescription className="text-xs leading-relaxed mt-2">
                      Enter policy information, loss date, and incident declaration into the investigation queue.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>

              {/* Step 02 */}
              <StaggerItem>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 border border-sky-200/70 text-sky-600">
                        <Icon icon={Upload01Icon} size="md" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-300">02</span>
                    </div>
                    <CardTitle className="text-base">Upload Evidence</CardTitle>
                    <CardDescription className="text-xs leading-relaxed mt-2">
                      Upload damage photographs, garage estimates, police FIR reports, and proof of identity.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>

              {/* Step 03 */}
              <StaggerItem>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 border border-sky-200/70 text-sky-600">
                        <Icon icon={Search01Icon} size="md" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-300">03</span>
                    </div>
                    <CardTitle className="text-base">Review Findings</CardTitle>
                    <CardDescription className="text-xs leading-relaxed mt-2">
                      Examine flagged inconsistencies, date anomalies, and image metadata findings with clear explanations.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>

              {/* Step 04 */}
              <StaggerItem>
                <Card className="h-full">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 border border-sky-200/70 text-sky-600">
                        <Icon icon={CheckmarkCircle01Icon} size="md" />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-300">04</span>
                    </div>
                    <CardTitle className="text-base">Make Decision</CardTitle>
                    <CardDescription className="text-xs leading-relaxed mt-2">
                      The investigator records the final decision—approved, escalated, or request information—with full audit logging.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </StaggerItem>
            </div>
          </StaggerContainer>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CAPABILITIES */}
      {/* ============================================================ */}
      <section className="py-20 border-t border-slate-200/80" id="capabilities">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full border border-sky-200/80">
              Built for Investigators
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mt-3">
              Investigation Capabilities
            </h2>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              Targeted tools designed to uncover anomalies across multiple evidence formats.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Capability 1 */}
            <Card hoverable>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 mb-3">
                  <Icon icon={ViewIcon} size="md" />
                </div>
                <CardTitle className="text-base">Evidence Review</CardTitle>
                <CardDescription className="text-xs leading-relaxed mt-1.5">
                  Organize, tag, and verify all photographic and documentary evidence in a unified case file.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Capability 2 */}
            <Card hoverable>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 mb-3">
                  <Icon icon={File01Icon} size="md" />
                </div>
                <CardTitle className="text-base">Document Analysis</CardTitle>
                <CardDescription className="text-xs leading-relaxed mt-1.5">
                  Inspect repair estimates, medical invoices, and FIR reports for structural tampering and chronological consistency.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Capability 3 */}
            <Card hoverable>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 mb-3">
                  <Icon icon={Folder01Icon} size="md" />
                </div>
                <CardTitle className="text-base">Image Review</CardTitle>
                <CardDescription className="text-xs leading-relaxed mt-1.5">
                  Verify camera EXIF timestamps, GPS coordinates, and lighting conditions against declared incident reports.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Capability 4 */}
            <Card hoverable>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 mb-3">
                  <Icon icon={UserIcon} size="md" />
                </div>
                <CardTitle className="text-base">Identity Verification</CardTitle>
                <CardDescription className="text-xs leading-relaxed mt-1.5">
                  Cross-check policyholder government IDs and registered driver details against vehicle registration records.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Capability 5 */}
            <Card hoverable>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 mb-3">
                  <Icon icon={Layers01Icon} size="md" />
                </div>
                <CardTitle className="text-base">Information Consistency</CardTitle>
                <CardDescription className="text-xs leading-relaxed mt-1.5">
                  Automatically identify discrepancies between repair invoices, police incident statements, and loss timelines.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Capability 6 */}
            <Card hoverable>
              <CardHeader>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-50 text-sky-600 mb-3">
                  <Icon icon={Shield01Icon} size="md" />
                </div>
                <CardTitle className="text-base">Investigation Reports</CardTitle>
                <CardDescription className="text-xs leading-relaxed mt-1.5">
                  Generate structured audit reports documenting investigator findings, verification states, and final sign-offs.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* HUMAN REVIEW PRINCIPLE CALLOUT */}
      {/* ============================================================ */}
      <section className="py-20 border-t border-slate-200/80 bg-slate-50/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-600 text-white mb-5 shadow-sm">
            <Icon icon={Shield01Icon} size="lg" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-snug">
            AI helps surface what needs attention.
            <br />
            <span className="text-sky-600">Investigators make the final decision.</span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            ClaimShield AI is built around the human-in-the-loop principle. The platform provides objective, explainable evidence signals to eliminate routine manual cross-checking. The final adjudication authority remains 100% in the hands of the human investigator.
          </p>
        </div>
      </section>

      {/* ============================================================ */}
      {/* CALL TO ACTION */}
      {/* ============================================================ */}
      <section className="py-16 sm:py-20 border-t border-slate-200/80 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Ready to review your next claim?
          </h2>
          <p className="mt-3 text-sm text-slate-500 max-w-xl mx-auto">
            Experience how ClaimShield AI streamlines evidence verification for insurance claims.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button variant="primary" size="lg" asChild>
              <Link href="/dashboard" className="gap-2">
                <span>Start Investigation</span>
                <Icon icon={ArrowRight01Icon} size="xs" />
              </Link>
            </Button>
            <Button variant="secondary" size="lg" asChild>
              <Link href="/dashboard">Explore Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* FOOTER */}
      {/* ============================================================ */}
      <footer className="mt-auto border-t border-slate-200/80 bg-white/70 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-sky-600 text-white">
              <Icon icon={Shield01Icon} size="xs" />
            </div>
            <span className="font-semibold text-slate-800">ClaimShield AI</span>
            <span className="text-slate-400">© 2026. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#product" className="hover:text-slate-800 transition-colors">
              Product
            </a>
            <a href="#how-it-works" className="hover:text-slate-800 transition-colors">
              How It Works
            </a>
            <a href="#capabilities" className="hover:text-slate-800 transition-colors">
              Capabilities
            </a>
            <Link href="/dashboard" className="hover:text-slate-800 transition-colors">
              Investigation Suite
            </Link>
            <span className="hover:text-slate-800 transition-colors cursor-pointer">
              Privacy
            </span>
            <span className="hover:text-slate-800 transition-colors cursor-pointer">
              Terms
            </span>
            <span className="hover:text-slate-800 transition-colors cursor-pointer">
              Contact
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
