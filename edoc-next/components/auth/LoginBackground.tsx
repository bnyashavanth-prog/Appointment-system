"use client"

import { m, LazyMotion, domAnimation } from "framer-motion"
import { Stethoscope, Activity, Pill, Cross, CalendarCheck, ClipboardList } from "lucide-react"

export function LoginBackground() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-br from-teal-50 via-white to-slate-50 pointer-events-none">
        
        {/* Soft Blurred Orbs */}
        <m.div
          animate={{ x: [0, 30, 0], y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
        />
        <m.div
          animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 -right-32 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <m.div
          animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute -bottom-40 left-1/4 w-[500px] h-[500px] bg-teal-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40"
        />

        {/* Floating Medical Icons */}
        {/* Icon 1: Stethoscope */}
        <m.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-10 md:left-24 text-primary opacity-10"
        >
          <Stethoscope size={100} strokeWidth={1} />
        </m.div>

        {/* Icon 2: Pill (Hidden on small screens) */}
        <m.div
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 right-16 md:right-32 text-primary opacity-10 hidden sm:block"
        >
          <Pill size={80} strokeWidth={1} className="rotate-45" />
        </m.div>

        {/* Icon 3: Calendar */}
        <m.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-40 left-12 md:left-36 text-primary opacity-10"
        >
          <CalendarCheck size={120} strokeWidth={1} className="-rotate-12" />
        </m.div>

        {/* Icon 4: Clipboard (Hidden on small screens) */}
        <m.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-32 right-20 md:right-40 text-primary opacity-10 hidden sm:block"
        >
          <ClipboardList size={90} strokeWidth={1} className="rotate-12" />
        </m.div>

        {/* Icon 5: Cross */}
        <m.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-1/2 left-4 md:left-1/4 text-primary opacity-[0.07]"
        >
          <Cross size={140} strokeWidth={1} />
        </m.div>

        {/* EKG / Pulse Line across bottom */}
        <div className="absolute bottom-0 left-0 w-full h-32 opacity-15">
          <svg
            className="w-full h-full"
            preserveAspectRatio="none"
            viewBox="0 0 1000 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <m.path
              d="M0,50 L200,50 L220,20 L240,80 L260,50 L500,50 L520,10 L540,90 L560,50 L1000,50"
              stroke="currentColor"
              className="text-primary"
              strokeWidth="2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{
                pathLength: { duration: 4, ease: "linear", repeat: Infinity },
                opacity: { duration: 0.5 }
              }}
            />
          </svg>
        </div>
      </div>
    </LazyMotion>
  )
}
