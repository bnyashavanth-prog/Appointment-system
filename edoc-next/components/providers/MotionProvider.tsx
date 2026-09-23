"use client"

import { MotionConfig } from "framer-motion"

export function MotionProvider({ children }: { children: React.ReactNode }) {
  // reducedMotion="user" means it automatically respects OS preferences
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
