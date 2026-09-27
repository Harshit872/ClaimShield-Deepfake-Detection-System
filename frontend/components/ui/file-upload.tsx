import React, { useCallback } from "react";
import { useDropzone, DropzoneOptions } from "react-dropzone";
import { Icon, Upload01Icon, File01Icon, Cancel01Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  accept?: DropzoneOptions["accept"];
  maxSize?: number;
  className?: string;
}

export function FileUpload({ onFilesSelected, accept, maxSize = 10485760, className }: FileUploadProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFilesSelected(acceptedFiles);
      }
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept,
    maxSize,
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors",
        isDragActive ? "border-blue-500 bg-blue-50" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50",
        isDragReject ? "border-red-500 bg-red-50" : "",
        className
      )}
    >
      <input {...getInputProps()} />
      <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
        <Icon icon={Upload01Icon} size="lg" />
      </div>
      <h3 className="font-medium text-slate-900 mb-1">Drag & drop files here</h3>
      <p className="text-sm text-slate-500 mb-4">or <span className="text-blue-600 font-medium">Browse Files</span></p>
      <p className="text-xs text-slate-400">Supported: JPG, PNG, WEBP, PDF</p>
    </div>
  );
}
