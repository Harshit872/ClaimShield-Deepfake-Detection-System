import React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  divided?: boolean;
}

export function Section({
  divided = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      className={cn(
        "py-5 sm:py-6",
        divided && "border-b border-slate-200/80",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
