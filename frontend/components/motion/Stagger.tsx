"use client";

import React from "react";
import { motion, MotionProps } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";
import { staggerContainerVariants, fadeInVariants } from "./motionPresets";
import { cn } from "@/lib/utils";

interface StaggerContainerProps extends MotionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function StaggerContainer({
  children,
  className,
  ...props
}: StaggerContainerProps) {
  const shouldReduceMotion = usePrefersReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={staggerContainerVariants}
      initial="hidden"
      animate="visible"
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = usePrefersReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div variants={fadeInVariants} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}
