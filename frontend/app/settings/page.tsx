"use client";

import React, { useState, useEffect } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { FadeIn } from "@/components/motion/FadeIn";
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icon, Settings01Icon, Notification01Icon, Layers01Icon, Shield01Icon, Search01Icon, UserIcon, CheckmarkCircle01Icon } from "@/components/ui/icon";

const Switch = ({ checked, onChange }: { checked: boolean, onChange: (v: boolean) => void }) => (
  <button 
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${checked ? 'bg-sky-600' : 'bg-slate-200'}`}
  >
    <span className={`pointer-events-none block h-4 w-4 rounded-full bg-white shadow-sm ring-0 transition-transform ${checked ? 'translate-x-2' : '-translate-x-2'}`} />
  </button>
);

type TabType = 'GENERAL' | 'NOTIFICATIONS' | 'APPEARANCE' | 'SECURITY' | 'INVESTIGATION' | 'ACCOUNT';

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('GENERAL');
  const [showToast, setShowToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Settings State
  const [settings, setSettings] = useState({
    // General
    displayName: "Sarah Jenkins",
    email: "s.jenkins@claimshield.internal",
    timezone: "America/New_York",
    language: "en-US",
    dateFormat: "MM/DD/YYYY",
    
    // Notifications
    investigationAlerts: true,
    claimUpdates: true,
    evidenceUpdates: true,
    riskAlerts: true,
    reportCompletion: true,
    systemNotifications: true,
    emailNotifications: "important",
    inAppNotifications: "all",
    
    // Appearance
    theme: "light",
    reducedMotion: false,
    
    // Investigation
    defaultView: "grid",
    evidencePreview: "auto",
    riskThreshold: "medium",
    autoReportNotif: true,
    investigationActivity: true,
  });

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("claimshield_settings");
    if (saved) {
      try {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setSettings(prev => ({ ...prev, ...JSON.parse(saved) }));
      } catch(e) {}
    }
  }, []);

  const updateSetting = (key: keyof typeof settings, value: string | boolean) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem("claimshield_settings", JSON.stringify(newSettings));
    
    // Show saving status very briefly to make interaction feel immediate but acknowledged
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    }, 200);
  };

  const navItems = [
    { id: 'GENERAL', label: 'General', icon: Settings01Icon },
    { id: 'NOTIFICATIONS', label: 'Notifications', icon: Notification01Icon },
    { id: 'APPEARANCE', label: 'Appearance', icon: Layers01Icon },
    { id: 'SECURITY', label: 'Security', icon: Shield01Icon },
    { id: 'INVESTIGATION', label: 'Investigation', icon: Search01Icon },
    { id: 'ACCOUNT', label: 'Account', icon: UserIcon },
  ] as const;

  return (
    <AppShell activeNavId="settings" pageTitle="Settings">
      <PageContainer maxWidth="xl">
        <FadeIn>
          <PageHeader
            title="Settings"
            description="Manage your account preferences, notification rules, and investigation configurations."
          />
        </FadeIn>

        {showToast && (
          <FadeIn duration={0.2} className="fixed bottom-6 right-6 z-50">
            <div className="bg-slate-900 text-white rounded-lg px-4 py-3 flex items-center gap-3 shadow-lg">
              <Icon icon={CheckmarkCircle01Icon} size="sm" className="text-emerald-400" />
              <span className="text-sm font-medium">Preferences saved successfully.</span>
            </div>
          </FadeIn>
        )}

        <div className="flex flex-col md:flex-row gap-8 mt-2">
          {/* Settings Navigation Sidebar */}
          <FadeIn delay={0.05} className="w-full md:w-64 shrink-0">
            <nav className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-hide">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                      isActive 
                        ? "bg-slate-100 text-slate-900" 
                        : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }`}
                  >
                    <Icon icon={item.icon} size="sm" className={isActive ? "text-sky-600" : "text-slate-400"} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </FadeIn>

          {/* Settings Content Area */}
          <div className="flex-1 min-w-0 pb-12">
            
            {/* GENERAL */}
            {activeTab === 'GENERAL' && (
              <FadeIn>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">General Settings</h3>
                    <p className="text-sm text-slate-500 mt-1">Configure your basic workspace preferences.</p>
                  </div>
                  
                  <Card>
                    <CardContent className="p-6 space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-700">Display Name</label>
                          <Input 
                            value={settings.displayName} 
                            onChange={(e) => updateSetting("displayName", e.target.value)}
                            className="h-9 text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-700">Email Address</label>
                          <Input 
                            value={settings.email} 
                            onChange={(e) => updateSetting("email", e.target.value)}
                            className="h-9 text-sm"
                            type="email"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-700">Timezone</label>
                          <Select value={settings.timezone} onValueChange={(v) => updateSetting("timezone", v)}>
                            <SelectTrigger className="h-9 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                              <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                              <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                              <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                              <SelectItem value="UTC">UTC</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-slate-700">Language</label>
                          <Select value={settings.language} onValueChange={(v) => updateSetting("language", v)}>
                            <SelectTrigger className="h-9 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="en-US">English (US)</SelectItem>
                              <SelectItem value="en-GB">English (UK)</SelectItem>
                              <SelectItem value="fr-FR">Français</SelectItem>
                              <SelectItem value="es-ES">Español</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </FadeIn>
            )}

            {/* NOTIFICATIONS */}
            {activeTab === 'NOTIFICATIONS' && (
              <FadeIn>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Notification Preferences</h3>
                    <p className="text-sm text-slate-500 mt-1">Control when and how you are alerted to system events.</p>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-3 border-b border-slate-100">
                      <CardTitle className="text-base">Event Alerts</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-slate-100">
                        <ToggleRow 
                          label="Investigation Alerts" 
                          description="Get notified when an investigation status changes."
                          checked={settings.investigationAlerts}
                          onChange={(v) => updateSetting("investigationAlerts", v)}
                        />
                        <ToggleRow 
                          label="Claim Updates" 
                          description="Alerts for new claims entering your assigned queue."
                          checked={settings.claimUpdates}
                          onChange={(v) => updateSetting("claimUpdates", v)}
                        />
                        <ToggleRow 
                          label="Evidence Updates" 
                          description="Notifications when new evidence is uploaded or processed."
                          checked={settings.evidenceUpdates}
                          onChange={(v) => updateSetting("evidenceUpdates", v)}
                        />
                        <ToggleRow 
                          label="Risk Alerts" 
                          description="Immediate notification when a high-risk anomaly is detected."
                          checked={settings.riskAlerts}
                          onChange={(v) => updateSetting("riskAlerts", v)}
                        />
                        <ToggleRow 
                          label="Report Completion" 
                          description="Alert when a comprehensive investigation report is finalized."
                          checked={settings.reportCompletion}
                          onChange={(v) => updateSetting("reportCompletion", v)}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3 border-b border-slate-100">
                      <CardTitle className="text-base">Delivery Methods</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-slate-900">Email Notifications</p>
                          <p className="text-xs text-slate-500 mt-0.5">Control the volume of emails sent to your inbox.</p>
                        </div>
                        <Select value={settings.emailNotifications} onValueChange={(v) => updateSetting("emailNotifications", v)}>
                          <SelectTrigger className="w-[180px] h-9 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All notifications</SelectItem>
                            <SelectItem value="important">Important only</SelectItem>
                            <SelectItem value="none">None</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                        <div>
                          <p className="text-sm font-medium text-slate-900">In-App Notifications</p>
                          <p className="text-xs text-slate-500 mt-0.5">Control what shows up in the notification center.</p>
                        </div>
                        <Select value={settings.inAppNotifications} onValueChange={(v) => updateSetting("inAppNotifications", v)}>
                          <SelectTrigger className="w-[180px] h-9 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All notifications</SelectItem>
                            <SelectItem value="important">Important only</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </FadeIn>
            )}

            {/* APPEARANCE */}
            {activeTab === 'APPEARANCE' && (
              <FadeIn>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Appearance Settings</h3>
                    <p className="text-sm text-slate-500 mt-1">Customize the visual presentation of the workspace.</p>
                  </div>
                  
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y divide-slate-100">
                        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium text-slate-900">Color Theme</p>
                            <p className="text-xs text-slate-500 mt-0.5">The application is currently optimized for the Clean Light aesthetic.</p>
                          </div>
                          <Select value={settings.theme} disabled>
                            <SelectTrigger className="w-[180px] h-9 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="light">Clean Light</SelectItem>
                              <SelectItem value="dark">Dark (Disabled)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <ToggleRow 
                          label="Reduced Motion" 
                          description="Minimize animations and transitions across the interface."
                          checked={settings.reducedMotion}
                          onChange={(v) => updateSetting("reducedMotion", v)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </FadeIn>
            )}

            {/* SECURITY */}
            {activeTab === 'SECURITY' && (
              <FadeIn>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Security</h3>
                    <p className="text-sm text-slate-500 mt-1">Manage your credentials and active sessions.</p>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-3 border-b border-slate-100">
                      <CardTitle className="text-base">Authentication</CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-slate-900">Password</p>
                          <p className="text-xs text-slate-500 mt-0.5">Last changed 45 days ago</p>
                        </div>
                        <Button variant="secondary" size="sm">Update Password</Button>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                        <div>
                          <p className="text-sm font-medium text-slate-900">Two-Factor Authentication (2FA)</p>
                          <p className="text-xs text-slate-500 mt-0.5">Authenticator app configured</p>
                        </div>
                        <Button variant="outline" size="sm" className="text-emerald-700 border-emerald-200 bg-emerald-50 hover:bg-emerald-100">Configured</Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="pb-3 border-b border-slate-100">
                      <CardTitle className="text-base">Active Sessions</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="divide-y divide-slate-100">
                        <div className="p-4 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-900">Windows ? Chrome</p>
                            <p className="text-xs text-slate-500 mt-0.5">New York, USA ? Current Session</p>
                          </div>
                          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Active Now</span>
                        </div>
                        <div className="p-4 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-slate-900">macOS ? Safari</p>
                            <p className="text-xs text-slate-500 mt-0.5">New York, USA ? Last active 2 days ago</p>
                          </div>
                          <Button variant="ghost" size="sm" className="text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50">Revoke</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </FadeIn>
            )}

            {/* INVESTIGATION */}
            {activeTab === 'INVESTIGATION' && (
              <FadeIn>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Investigation Preferences</h3>
                    <p className="text-sm text-slate-500 mt-1">Configure default behaviors for the investigation workspace.</p>
                  </div>
                  
                  <Card>
                    <CardContent className="p-0">
                      <div className="divide-y divide-slate-100">
                        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium text-slate-900">Default View Mode</p>
                            <p className="text-xs text-slate-500 mt-0.5">Initial layout when opening a claim.</p>
                          </div>
                          <Select value={settings.defaultView} onValueChange={(v) => updateSetting("defaultView", v)}>
                            <SelectTrigger className="w-[180px] h-9 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="grid">Grid View</SelectItem>
                              <SelectItem value="list">List View</SelectItem>
                              <SelectItem value="timeline">Timeline View</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div>
                            <p className="text-sm font-medium text-slate-900">Risk Alert Threshold</p>
                            <p className="text-xs text-slate-500 mt-0.5">Minimum confidence required to auto-flag anomalies.</p>
                          </div>
                          <Select value={settings.riskThreshold} onValueChange={(v) => updateSetting("riskThreshold", v)}>
                            <SelectTrigger className="w-[180px] h-9 text-sm">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="low">Low Sensitivity</SelectItem>
                              <SelectItem value="medium">Medium Sensitivity</SelectItem>
                              <SelectItem value="high">High Sensitivity</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <ToggleRow 
                          label="Auto-generate Draft Reports" 
                          description="Automatically compile findings into a draft when all modules are reviewed."
                          checked={settings.autoReportNotif}
                          onChange={(v) => updateSetting("autoReportNotif", v)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </FadeIn>
            )}

            {/* ACCOUNT */}
            {activeTab === 'ACCOUNT' && (
              <FadeIn>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">Account Status</h3>
                    <p className="text-sm text-slate-500 mt-1">Review organizational details and account standing.</p>
                  </div>
                  
                  <Card>
                    <CardContent className="p-6 space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-slate-500">Organization</p>
                          <p className="text-sm font-medium text-slate-900 mt-1">Global Liberty Insurance</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Department</p>
                          <p className="text-sm font-medium text-slate-900 mt-1">Special Investigations Unit</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Role</p>
                          <p className="text-sm font-medium text-slate-900 mt-1">Senior SIU Investigator</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">Account Status</p>
                          <div className="mt-1 flex items-center gap-1.5 text-sm font-medium text-emerald-700">
                            <Icon icon={CheckmarkCircle01Icon} size="xs" />
                            Active
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="pt-4 border-t border-slate-100 bg-slate-50/50 rounded-b-xl flex justify-between items-center">
                      <p className="text-xs text-slate-500">Need to transfer account ownership?</p>
                      <Button variant="secondary" size="sm" className="text-rose-600 hover:text-rose-700 hover:bg-rose-50" asChild>
                         <a href="/login">Sign Out</a>
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              </FadeIn>
            )}
          </div>
        </div>
      </PageContainer>
    </AppShell>
  );
}

function ToggleRow({ label, description, checked, onChange }: { label: string; description: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <div className="p-6 flex items-start sm:items-center justify-between gap-4">
      <div className="flex-1 pr-4">
        <p className="text-sm font-medium text-slate-900">{label}</p>
        <p className="text-xs text-slate-500 mt-0.5">{description}</p>
      </div>
      <Switch checked={checked} onChange={onChange} />
    </div>
  );
}
