"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ClaimShieldBackground } from "@/components/background/ClaimShieldBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Icon, Shield01Icon, ArrowRight01Icon } from "@/components/ui/icon";
import { FadeIn } from "@/components/motion/FadeIn";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("s.jenkins@claimshield.internal");
  const [password, setPassword] = useState("••••••••••••");
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError("Please enter your work email.");
      return;
    }
    // Frontend-only authentication: route directly to /dashboard
    router.push("/dashboard");
  };

  const handleDemoLogin = () => {
    router.push("/dashboard");
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 bg-transparent text-slate-900">
      <ClaimShieldBackground />

      {/* Forgot Password Dialog */}
      <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Reset Password</DialogTitle>
            <DialogDescription>
              Enter your work email address to receive password recovery instructions from your IT administrator.
            </DialogDescription>
          </DialogHeader>

          {resetSent ? (
            <div className="rounded-lg bg-sky-50 border border-sky-200 p-3 text-xs text-sky-800">
              Recovery instructions have been sent to your administrator.
            </div>
          ) : (
            <div className="space-y-2 py-1">
              <label className="text-xs font-semibold text-slate-700">Work Email</label>
              <Input defaultValue={email} placeholder="investigator@company.com" />
            </div>
          )}

          <DialogFooter>
            {resetSent ? (
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => {
                  setResetSent(false);
                  setForgotPasswordOpen(false);
                }}
              >
                Done
              </Button>
            ) : (
              <Button
                variant="primary"
                size="sm"
                className="w-full"
                onClick={() => setResetSent(true)}
              >
                Send Recovery Instructions
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <FadeIn duration={0.35} className="w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-lg p-1"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-sky-600 text-white shadow-sm transition-transform group-hover:scale-105">
              <Icon icon={Shield01Icon} size="md" className="text-white" />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-lg font-bold tracking-tight text-slate-900">
                ClaimShield <span className="text-sky-600">AI</span>
              </span>
              <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
                Investigation Suite
              </span>
            </div>
          </Link>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg border-slate-200/90 bg-white/95 backdrop-blur-md">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Investigator Sign In</CardTitle>
            <CardDescription className="text-xs mt-1">
              Access the Special Investigation Unit workspace
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="rounded-lg bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-700">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Work Email</label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError("");
                  }}
                  placeholder="name@claimshield.internal"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">Password</label>
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(true)}
                    className="text-[11px] font-medium text-sky-600 hover:text-sky-700 transition-colors"
                  >
                    Forgot Password?
                  </button>
                </div>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  required
                />
              </div>

              <Button type="submit" variant="primary" className="w-full gap-2 mt-2">
                <span>Sign In</span>
                <Icon icon={ArrowRight01Icon} size="xs" />
              </Button>
            </form>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200" />
              </div>
              <span className="relative bg-white px-2 text-[11px] font-medium text-slate-400 uppercase">
                Or
              </span>
            </div>

            <Button
              type="button"
              variant="secondary"
              onClick={handleDemoLogin}
              className="w-full text-slate-700 font-medium"
            >
              Continue with Demo (Investigator Sarah Jenkins)
            </Button>

            <div className="text-center text-xs text-slate-500 pt-2">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="font-semibold text-sky-600 hover:text-sky-700 transition-colors"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer note */}
        <div className="text-center mt-6 text-[11px] text-slate-400">
          ClaimShield AI • Human-in-the-Loop Investigation Framework
        </div>
      </FadeIn>
    </div>
  );
}
