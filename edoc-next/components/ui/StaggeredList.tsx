"use client"

import { m, LazyMotion, domAnimation } from "framer-motion"
import { ReactNode } from "react"

interface StaggeredListProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
  maxAnimated?: number;
}

export function StaggeredList({ children, className = "", staggerDelay = 0.04, maxAnimated = 8 }: StaggeredListProps) {
  return (
    <LazyMotion features={domAnimation}>
      <div className={className}>
        {children.map((child, i) => (
          <m.div
            key={i}
            initial={i < maxAnimated ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut", delay: i < maxAnimated ? i * staggerDelay : 0 }}
          >
            {child}
          </m.div>
        ))}
      </div>
    </LazyMotion>
  )
}
