"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { AppShell } from "@/components/layout/AppShell";
import { PageContainer } from "@/components/layout/PageContainer";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Icon, ArrowLeft01Icon, ArrowRight01Icon, Upload01Icon, File01Icon, Cancel01Icon, CheckmarkCircle01Icon } from "@/components/ui/icon";
import { FadeIn } from "@/components/motion/FadeIn";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FileUpload } from "@/components/ui/file-upload";
import { EvidenceCategory } from "@/types/claims";
import Link from "next/link";
import { Progress } from "@/components/ui/progress";

// Form Validation Schema
const claimDetailsSchema = z.object({
  claimantName: z.string().min(2, "Claimant name is required"),
  claimType: z.enum(["Vehicle Damage", "Property Damage", "Health", "Travel", "Other"]),
  claimAmount: z.string().min(1, "Valid amount required"),
  incidentDate: z.string().min(1, "Incident date is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type ClaimDetailsForm = z.infer<typeof claimDetailsSchema>;

// Mock Upload File Interface
interface UploadedFile {
  id: string;
  file: File;
  previewUrl: string;
  category: EvidenceCategory;
  status: "Ready" | "Uploading" | "Failed";
}

export default function NewClaimPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  
  const { register, handleSubmit, control, formState: { errors, isValid } } = useForm<ClaimDetailsForm>({
    resolver: zodResolver(claimDetailsSchema),
    mode: "onChange",
  });

  const [claimDetails, setClaimDetails] = useState<ClaimDetailsForm | null>(null);

  const onStep1Submit = (data: ClaimDetailsForm) => {
    setClaimDetails(data);
    setCurrentStep(2);
  };

  const handleFilesSelected = (files: File[]) => {
    const newFiles = files.map(file => ({
      id: Math.random().toString(36).substring(7),
      file,
      previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : "",
      category: "Other" as EvidenceCategory,
      status: "Ready" as const,
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file && file.previewUrl) URL.revokeObjectURL(file.previewUrl);
      return prev.filter(f => f.id !== id);
    });
  };

  const updateFileCategory = (id: string, category: EvidenceCategory) => {
    setUploadedFiles(prev => prev.map(f => f.id === id ? { ...f, category } : f));
  };

  const startInvestigation = () => {
    setCurrentStep(4);
    setTimeout(() => {
      // Simulate backend creation and navigate to demo claim
      router.push("/claims/CLM-10291");
    }, 800);
  };

  return (
    <AppShell activeNavId="claims" pageTitle="New Claim">
      <PageContainer maxWidth="md">
        <FadeIn>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <Link href="/claims" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors mb-2">
                <Icon icon={ArrowLeft01Icon} size="sm" className="mr-1" /> Back to Claims
              </Link>
              <h1 className="text-3xl font-semibold tracking-tight text-slate-900">Start a New Claim</h1>
              <p className="text-slate-500 mt-1">Add the claim details and evidence you want ClaimShield AI to review.</p>
            </div>
          </div>
          
          <div className="mb-8">
             <Progress value={currentStep * 25} className="h-2" />
             <div className="flex justify-between text-xs font-medium text-slate-500 mt-2">
               <span className={currentStep >= 1 ? "text-slate-900" : ""}>1. Claim Details</span>
               <span className={currentStep >= 2 ? "text-slate-900" : ""}>2. Evidence</span>
               <span className={currentStep >= 3 ? "text-slate-900" : ""}>3. Review</span>
               <span className={currentStep >= 4 ? "text-slate-900" : ""}>4. Start</span>
             </div>
          </div>
        </FadeIn>

        {currentStep === 1 && (
          <FadeIn key="step1">
            <Card>
              <form onSubmit={handleSubmit(onStep1Submit)}>
                <CardHeader>
                  <CardTitle>Claim Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Claimant Name</label>
                    <Input {...register("claimantName")} placeholder="e.g. Rajesh Kumar" />
                    {errors.claimantName && <p className="text-xs text-red-500">{errors.claimantName.message}</p>}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Claim Type</label>
                      <Controller
                        name="claimType"
                        control={control}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Vehicle Damage">Vehicle Damage</SelectItem>
                              <SelectItem value="Property Damage">Property Damage</SelectItem>
                              <SelectItem value="Health">Health</SelectItem>
                              <SelectItem value="Travel">Travel</SelectItem>
                              <SelectItem value="Other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.claimType && <p className="text-xs text-red-500">{errors.claimType.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-900">Claim Amount (₹)</label>
                      <Input type="number" {...register("claimAmount")} placeholder="240000" />
                      {errors.claimAmount && <p className="text-xs text-red-500">{errors.claimAmount.message}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Incident Date</label>
                    <Input type="date" {...register("incidentDate")} />
                    {errors.incidentDate && <p className="text-xs text-red-500">{errors.incidentDate.message}</p>}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Claim Description</label>
                    <Textarea {...register("description")} placeholder="Describe the incident..." rows={4} />
                    {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t bg-slate-50/50 py-4 px-6 mt-4">
                  <Button type="submit" disabled={!isValid}>
                    Continue to Evidence <Icon icon={ArrowRight01Icon} size="sm" className="ml-2" />
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </FadeIn>
        )}

        {currentStep === 2 && (
          <FadeIn key="step2">
            <Card>
              <CardHeader>
                <CardTitle>Add Claim Evidence</CardTitle>
                <CardDescription>Upload the photos and documents related to this claim.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <FileUpload 
                  onFilesSelected={handleFilesSelected}
                  accept={{
                    'image/jpeg': ['.jpeg', '.jpg'],
                    'image/png': ['.png'],
                    'image/webp': ['.webp'],
                    'application/pdf': ['.pdf']
                  }}
                />

                {uploadedFiles.length > 0 && (
                  <div className="space-y-3 mt-6">
                    <h4 className="text-sm font-semibold text-slate-900">Uploaded Files ({uploadedFiles.length})</h4>
                    <div className="space-y-2">
                      {uploadedFiles.map(file => (
                        <div key={file.id} className="flex items-center gap-4 p-3 border rounded-lg bg-white shadow-sm">
                          {file.previewUrl ? (
                            <img src={file.previewUrl} alt={file.file.name} className="w-12 h-12 object-cover rounded-md border" />
                          ) : (
                            <div className="w-12 h-12 bg-slate-100 rounded-md flex items-center justify-center text-slate-400 border">
                              <Icon icon={File01Icon} size="md" />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 truncate">{file.file.name}</p>
                            <p className="text-xs text-slate-500">{(file.file.size / 1024 / 1024).toFixed(2)} MB</p>
                          </div>
                          <div className="w-48">
                            <Select 
                              value={file.category} 
                              onValueChange={(val) => updateFileCategory(file.id, val as EvidenceCategory)}
                            >
                              <SelectTrigger className="h-8 text-xs">
                                <SelectValue placeholder="Category" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Vehicle / Property Photos">Vehicle / Property Photos</SelectItem>
                                <SelectItem value="Identity Document">Identity Document</SelectItem>
                                <SelectItem value="Invoice / Receipt">Invoice / Receipt</SelectItem>
                                <SelectItem value="Repair Document">Repair Document</SelectItem>
                                <SelectItem value="Other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <button onClick={() => removeFile(file.id)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                            <Icon icon={Cancel01Icon} size="sm" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t bg-slate-50/50 py-4 px-6">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>Back</Button>
                <Button onClick={() => setCurrentStep(3)} disabled={uploadedFiles.length === 0}>
                  Review <Icon icon={ArrowRight01Icon} size="sm" className="ml-2" />
                </Button>
              </CardFooter>
            </Card>
          </FadeIn>
        )}

        {currentStep === 3 && claimDetails && (
          <FadeIn key="step3">
            <Card>
              <CardHeader>
                <CardTitle>Review</CardTitle>
                <CardDescription>Review the claim information before starting the investigation.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                
                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b flex justify-between items-center">
                    <h3 className="font-semibold text-slate-900 text-sm">Claim Details</h3>
                    <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setCurrentStep(1)}>Edit</Button>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-4 text-sm">
                    <div><span className="text-slate-500">Claimant:</span> <span className="font-medium">{claimDetails.claimantName}</span></div>
                    <div><span className="text-slate-500">Type:</span> <span className="font-medium">{claimDetails.claimType}</span></div>
                    <div><span className="text-slate-500">Amount:</span> <span className="font-medium">₹{claimDetails.claimAmount}</span></div>
                    <div><span className="text-slate-500">Date:</span> <span className="font-medium">{claimDetails.incidentDate}</span></div>
                    <div className="col-span-2"><span className="text-slate-500">Description:</span> <p className="mt-1 text-slate-900">{claimDetails.description}</p></div>
                  </div>
                </div>

                <div className="border rounded-lg overflow-hidden">
                  <div className="bg-slate-50 px-4 py-3 border-b flex justify-between items-center">
                    <h3 className="font-semibold text-slate-900 text-sm">Evidence ({uploadedFiles.length} files)</h3>
                    <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setCurrentStep(2)}>Edit</Button>
                  </div>
                  <div className="p-4 space-y-2">
                    {uploadedFiles.map(file => (
                      <div key={file.id} className="flex justify-between text-sm items-center">
                        <div className="flex items-center gap-2">
                          <Icon icon={file.previewUrl ? File01Icon : File01Icon} size="sm" className="text-slate-400" />
                          <span className="font-medium truncate max-w-[200px]">{file.file.name}</span>
                        </div>
                        <span className="text-slate-500 text-xs px-2 py-1 bg-slate-100 rounded">{file.category}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </CardContent>
              <CardFooter className="flex justify-between border-t bg-slate-50/50 py-4 px-6">
                <Button variant="outline" onClick={() => setCurrentStep(2)}>Back</Button>
                <Button onClick={startInvestigation} variant="primary">
                  Start Investigation
                </Button>
              </CardFooter>
            </Card>
          </FadeIn>
        )}

        {currentStep === 4 && (
          <FadeIn key="step4" className="flex flex-col items-center justify-center py-24 text-center">
             <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center animate-pulse mb-6">
               <Icon icon={CheckmarkCircle01Icon} size="xl" />
             </div>
             <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Preparing your investigation...</h2>
             <p className="text-slate-500 mt-2">Setting up the workspace and initializing ClaimShield AI.</p>
          </FadeIn>
        )}

      </PageContainer>
    </AppShell>
  );
}
