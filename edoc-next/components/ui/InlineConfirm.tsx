"use client"

import { useState } from "react"
import { m, AnimatePresence, LazyMotion, domAnimation } from "framer-motion"

interface InlineConfirmProps {
  action: () => void;
  label?: string;
  confirmLabel?: string;
}

export function InlineConfirm({ action, label = "Delete", confirmLabel = "Sure?" }: InlineConfirmProps) {
  const [isConfirming, setIsConfirming] = useState(false)
  const [isPending, setIsPending] = useState(false)

  const handleConfirm = async () => {
    setIsPending(true)
    await action()
    setIsPending(false)
    setIsConfirming(false)
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative inline-block">
        <AnimatePresence mode="wait">
          {!isConfirming ? (
            <m.button
              key="delete-btn"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.15 }}
              onClick={(e) => {
                e.preventDefault()
                setIsConfirming(true)
              }}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 text-sm font-medium border border-red-200 rounded px-3 py-1 transition-colors cursor-pointer"
            >
              {label}
            </m.button>
          ) : (
            <m.div
              key="confirm-btn"
              initial={{ opacity: 0, scale: 0.9, x: 10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: 10 }}
              transition={{ duration: 0.15 }}
              className="flex items-center gap-2"
            >
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setIsConfirming(false)
                }}
                className="text-slate-500 hover:bg-slate-100 text-sm font-medium border border-slate-200 rounded px-3 py-1 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  handleConfirm()
                }}
                disabled={isPending}
                className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium border border-transparent rounded px-3 py-1 transition-colors cursor-pointer disabled:opacity-50"
              >
                {isPending ? "..." : confirmLabel}
              </button>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </LazyMotion>
  )
}
