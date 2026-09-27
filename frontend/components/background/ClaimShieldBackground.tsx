"use client";

import React from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

/**
 * ClaimShieldBackground
 * 
 * Clean, light spatial background inspired by the minimal, restrained
 * visual language of Antigravity. Features a warm off-white base,
 * an ultra-subtle spatial grid texture, soft neutral gradients, and
 * a very slow, calm ambient glow. Zero visual noise; high contrast for content.
 */
export function ClaimShieldBackground() {
  const shouldReduceMotion = usePrefersReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden bg-[#FAFBFD]"
    >
      {/* Subtle Spatial Dot & Grid Texture */}
      <div 
        className="absolute inset-0 bg-subtle-grid opacity-75"
        style={{
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 20%, #000 60%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 20%, #000 60%, transparent 100%)",
        }}
      />

      {/* Atmospheric Neutral Top Gradient */}
      <div className="absolute top-0 inset-x-0 h-96 bg-gradient-to-b from-white/80 via-white/40 to-transparent pointer-events-none" />

      {/* Very subtle ambient cyan/blue spatial glow (calm & restrained) */}
      {!shouldReduceMotion ? (
        <motion.div
          animate={{
            x: [0, 25, -20, 0],
            y: [0, -15, 10, 0],
            opacity: [0.035, 0.055, 0.035],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-br from-sky-400/20 via-blue-500/10 to-transparent blur-3xl pointer-events-none"
        />
      ) : (
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-gradient-to-br from-sky-400/10 via-blue-500/5 to-transparent blur-3xl opacity-40 pointer-events-none" />
      )}

      {/* Gentle bottom neutral vignette for spatial anchor */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-slate-100/40 to-transparent pointer-events-none" />
    </div>
  );
}
