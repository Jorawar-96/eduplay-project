"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { twMerge } from "tailwind-merge";

interface GlowCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export function GlowCard({ children, className, ...props }: GlowCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className={twMerge(
        "bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.07)] rounded-2xl transition-colors duration-300 hover:border-[rgba(255,255,255,0.15)]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}