import * as React from "react";
import { Button, ButtonProps } from "./button";
import { cn } from "@/lib/utils";

export interface IconButtonProps extends Omit<ButtonProps, "size"> {
  label: string;
  size?: "sm" | "md" | "lg";
}

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ className, label, size = "md", variant = "ghost", children, ...props }, ref) => {
    const sizeClasses = {
      sm: "h-8 w-8 p-0 rounded-md",
      md: "h-9 w-9 p-0 rounded-lg",
      lg: "h-11 w-11 p-0 rounded-xl",
    };

    return (
      <Button
        ref={ref}
        variant={variant}
        size="icon"
        aria-label={label}
        title={label}
        className={cn(sizeClasses[size], className)}
        {...props}
      >
        {children}
      </Button>
    );
  }
);
IconButton.displayName = "IconButton";
