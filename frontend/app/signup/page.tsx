"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ClaimShieldBackground } from "@/components/background/ClaimShieldBackground";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Icon, Shield01Icon, ArrowRight01Icon } from "@/components/ui/icon";
import { FadeIn } from "@/components/motion/FadeIn";

const signupSchema = z
  .object({
    fullName: z
      .string()
      .min(2, "Full name must be at least 2 characters")
      .nonempty("Full name is required"),
    workEmail: z
      .string()
      .email("Please provide a valid work email address")
      .nonempty("Work email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .nonempty("Password is required"),
    confirmPassword: z
      .string()
      .nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      fullName: "",
      workEmail: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = () => {
    // Frontend-only registration: route to /dashboard
    router.push("/dashboard");
  };

  const handleDemoLogin = () => {
    router.push("/dashboard");
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center p-4 sm:p-6 bg-transparent text-slate-900">
      <ClaimShieldBackground />

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

        {/* Signup Card */}
        <Card className="shadow-lg border-slate-200/90 bg-white/95 backdrop-blur-md">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl">Create Investigator Account</CardTitle>
            <CardDescription className="text-xs mt-1">
              Join your organization&apos;s Special Investigation Unit workspace
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3.5">
              {/* Full Name */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Full Name</label>
                <Input
                  {...register("fullName")}
                  placeholder="e.g. Sarah Jenkins"
                  error={!!errors.fullName}
                />
                {errors.fullName && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.fullName.message}</p>
                )}
              </div>

              {/* Work Email */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Work Email</label>
                <Input
                  type="email"
                  {...register("workEmail")}
                  placeholder="name@insurance-company.com"
                  error={!!errors.workEmail}
                />
                {errors.workEmail && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.workEmail.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Password</label>
                <Input
                  type="password"
                  {...register("password")}
                  placeholder="At least 8 characters"
                  error={!!errors.password}
                />
                {errors.password && (
                  <p className="text-[11px] text-rose-600 mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Confirm Password</label>
                <Input
                  type="password"
                  {...register("confirmPassword")}
                  placeholder="Repeat your password"
                  error={!!errors.confirmPassword}
                />
                {errors.confirmPassword && (
                  <p className="text-[11px] text-rose-600 mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                disabled={isSubmitting}
                className="w-full gap-2 mt-2"
              >
                <span>Create Account</span>
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
              Continue with Demo (Pre-configured Workspace)
            </Button>

            <div className="text-center text-xs text-slate-500 pt-2">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-sky-600 hover:text-sky-700 transition-colors"
              >
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Footer note */}
        <div className="text-center mt-6 text-[11px] text-slate-400">
          ClaimShield AI • Secure Investigation Infrastructure
        </div>
      </FadeIn>
    </div>
  );
}
