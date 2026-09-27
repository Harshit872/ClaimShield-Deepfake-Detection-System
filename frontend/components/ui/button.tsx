import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 select-none active:scale-[0.99]",
  {
    variants: {
      variant: {
        primary:
          "bg-sky-600 text-white shadow-sm hover:bg-sky-700 hover:shadow active:bg-sky-800",
        secondary:
          "bg-white text-slate-800 border border-slate-200 shadow-sm hover:bg-slate-50 hover:border-slate-300",
        outline:
          "border border-slate-300 bg-transparent text-slate-700 hover:bg-slate-100/80 hover:text-slate-900",
        ghost:
          "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900",
        destructive:
          "bg-rose-600 text-white shadow-sm hover:bg-rose-700 active:bg-rose-800",
        accent:
          "bg-sky-50 text-sky-700 border border-sky-200/80 hover:bg-sky-100/80 hover:border-sky-300",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-md",
        md: "h-9 px-4 py-2",
        lg: "h-11 px-6 text-base rounded-xl",
        icon: "h-9 w-9 p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
