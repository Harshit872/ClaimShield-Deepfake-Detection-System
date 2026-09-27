import { Transition, Variants } from "framer-motion";

/**
 * Clean, restrained Apple-style easing curves and transitions.
 */
export const appleEase = [0.16, 1, 0.3, 1] as const;

export const transitionFast: Transition = {
  duration: 0.2,
  ease: appleEase,
};

export const transitionBase: Transition = {
  duration: 0.35,
  ease: appleEase,
};

export const transitionSmooth: Transition = {
  duration: 0.5,
  ease: appleEase,
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 6 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitionBase,
  },
  exit: {
    opacity: 0,
    y: -4,
    transition: transitionFast,
  },
};

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.04,
    },
  },
};
