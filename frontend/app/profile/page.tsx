"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon, UserIcon, InformationCircleIcon, Layers01Icon, Shield01Icon, Clock01Icon, CheckmarkCircle01Icon } from "@/components/ui/icon";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Use local state for Profile values so changes persist in session
  const [profile, setProfile] = useState({
    firstName: "Sarah",
    lastName: "Jenkins",
    email: "s.jenkins@claimshield.internal",
    phone: "+1 (555) 019-8321",
    organization: "Global Liberty Insurance",
    role: "Senior SIU Investigator",
    department: "Special Investigations Unit",
    userId: "INV-8842-SJ",
  });

  const [editForm, setEditForm] = useState(profile);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("claimshield_profile");
    if (saved) {
      const parsed = JSON.parse(saved);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProfile(parsed);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEditForm(parsed);
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API delay without alert
    setTimeout(() => {
      setProfile(editForm);
      localStorage.setItem("claimshield_profile", JSON.stringify(editForm));
      setIsSaving(false);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }, 600);
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  return (
    <AppShell activeNavId="dashboard" pageTitle="My Profile">
      <PageContainer maxWidth="md">
        
        {/* Profile Header Card */}
        <FadeIn>
          <div className="relative mb-6 rounded-2xl overflow-hidden bg-white border border-slate-200/80 shadow-sm">
            {/* Background Cover */}
            <div className="h-24 sm:h-32 bg-gradient-to-r from-sky-600 to-indigo-700 w-full" />
            
            <div className="px-6 sm:px-8 pb-6 sm:pb-8 relative">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-0 -mt-12 sm:-mt-16 mb-4 sm:mb-0">
                <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 sm:gap-6">
                  {/* Avatar */}
                  <div className="h-24 w-24 sm:h-32 sm:w-32 rounded-2xl border-4 border-white bg-sky-100 flex items-center justify-center shadow-sm overflow-hidden shrink-0">
                    <span className="text-4xl sm:text-5xl font-bold text-sky-700">
                      {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                    </span>
                  </div>
                  
                  {/* Name & Basic Info */}
                  <div className="pb-2">
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                      {profile.firstName} {profile.lastName}
                    </h1>
                    <p className="text-slate-600 text-sm font-medium mt-1 flex items-center gap-2">
                      {profile.role}
                      <span className="h-1 w-1 rounded-full bg-slate-300" />
                      {profile.organization}
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-semibold uppercase tracking-wide">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Active Account
                      </span>
                    </div>
                  </div>
                </div>

                {/* Edit Button */}
                <div className="sm:pb-4 shrink-0">
                  {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </Button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={handleCancel} disabled={isSaving}>
                        Cancel
                      </Button>
                      <Button variant="primary" size="sm" onClick={handleSave} disabled={isSaving}>
                        {isSaving ? "Saving..." : "Save Changes"}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Success Toast / Notification Banner */}
        {showSuccess && (
          <FadeIn duration={0.2} className="mb-6">
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center gap-3 text-emerald-800 text-sm shadow-sm">
              <Icon icon={CheckmarkCircle01Icon} size="sm" className="text-emerald-600" />
              <span className="font-medium">Profile updated successfully.</span>
            </div>
          </FadeIn>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            
            {/* Personal Information */}
            <FadeIn delay={0.05}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Icon icon={UserIcon} size="sm" className="text-slate-400" />
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500">First Name</label>
                      {isEditing ? (
                        <Input 
                          value={editForm.firstName}
                          onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                          className="h-9 text-sm"
                        />
                      ) : (
                        <p className="text-sm font-medium text-slate-900">{profile.firstName}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500">Last Name</label>
                      {isEditing ? (
                        <Input 
                          value={editForm.lastName}
                          onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                          className="h-9 text-sm"
                        />
                      ) : (
                        <p className="text-sm font-medium text-slate-900">{profile.lastName}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500">Email Address</label>
                      {isEditing ? (
                        <Input 
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                          className="h-9 text-sm"
                        />
                      ) : (
                        <p className="text-sm font-medium text-slate-900 flex items-center gap-2">
                          {profile.email}
                        </p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500">Phone Number</label>
                      {isEditing ? (
                        <Input 
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm({...editForm, phone: e.target.value})}
                          className="h-9 text-sm"
                        />
                      ) : (
                        <p className="text-sm font-medium text-slate-900">{profile.phone}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>

            {/* Professional Information */}
            <FadeIn delay={0.1}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Icon icon={Layers01Icon} size="sm" className="text-slate-400" />
                    Professional Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500">Organization</label>
                      {isEditing ? (
                        <Input 
                          value={editForm.organization}
                          onChange={(e) => setEditForm({...editForm, organization: e.target.value})}
                          className="h-9 text-sm"
                        />
                      ) : (
                        <p className="text-sm font-medium text-slate-900">{profile.organization}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500">Department</label>
                      {isEditing ? (
                        <Input 
                          value={editForm.department}
                          onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                          className="h-9 text-sm"
                        />
                      ) : (
                        <p className="text-sm font-medium text-slate-900">{profile.department}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500">Role</label>
                      {isEditing ? (
                        <Input 
                          value={editForm.role}
                          onChange={(e) => setEditForm({...editForm, role: e.target.value})}
                          className="h-9 text-sm"
                        />
                      ) : (
                        <p className="text-sm font-medium text-slate-900">{profile.role}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-500">User ID</label>
                      <p className="text-sm font-mono text-slate-600 bg-slate-50 px-2 py-1 rounded inline-block">
                        {profile.userId}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </FadeIn>
          </div>

          <div className="space-y-6">
            {/* Account Status Card */}
            <FadeIn delay={0.15}>
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm flex items-center gap-2">
                    <Icon icon={Shield01Icon} size="sm" className="text-slate-400" />
                    Account Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Icon icon={CheckmarkCircle01Icon} size="sm" className="text-emerald-500" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Two-Factor Auth</p>
                        <p className="text-xs text-slate-500">Enabled via Authenticator App</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        <Icon icon={Clock01Icon} size="sm" className="text-slate-400" />
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">Last Active</p>
                        <p className="text-xs text-slate-500">Today at 10:42 AM (IP: 192.168.1.1)</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="pt-2 border-t border-slate-100 bg-slate-50/50 rounded-b-xl">
                  <Button variant="secondary" size="sm" className="w-full text-xs" asChild>
                    <a href="/settings">Security Settings</a>
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>
          </div>
        </div>
      </PageContainer>
    </AppShell>
  );
}
