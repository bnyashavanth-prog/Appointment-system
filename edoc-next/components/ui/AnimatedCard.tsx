"use client"

import { m, LazyMotion, domAnimation } from "framer-motion"
import { ReactNode } from "react"

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedCard({ children, className = "", delay = 0 }: AnimatedCardProps) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut", delay }}
        whileHover={{ y: -2 }}
        className={`bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow duration-300 rounded-2xl border border-border overflow-hidden ${className}`}
      >
        {children}
      </m.div>
    </LazyMotion>
  )
}
