"use client";

import React from "react";
import { motion, MotionProps } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { appleEase } from "./motionPresets";
import { cn } from "@/lib/utils";

interface FadeInProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
}

export function FadeIn({
  children,
  className,
  delay = 0,
  duration = 0.4,
  yOffset = 8,
  ...props
}: FadeInProps) {
  const shouldReduceMotion = usePrefersReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -yOffset }}
      transition={{
        duration,
        delay,
        ease: appleEase,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
