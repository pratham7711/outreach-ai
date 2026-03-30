import type { Variants } from "framer-motion";

export const ease = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0, filter: "blur(4px)" },
  visible: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.5, ease } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95, filter: "blur(8px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)", transition: { duration: 0.6, ease } },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -30, filter: "blur(8px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease } },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 30, filter: "blur(8px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.6, ease } },
};

export const stagger = (delay = 0.08): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay } },
});

export const viewportOnce = { once: true, margin: "-80px" as const };
