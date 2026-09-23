"use client"

import { m, LazyMotion, domAnimation } from "framer-motion"
import { Stethoscope, Pill, ClipboardList, Activity } from "lucide-react"

export function LoginBackground() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="hidden md:flex relative w-[60%] h-full flex-shrink-0 overflow-hidden">
        
        {/* Animated gradient background (video fallback / base) */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#d1fae5] via-[#99f6e4] to-[#5eead4]" 
          style={{ animation: "kenBurns 20s ease-in-out alternate infinite" }} />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 z-[1]"
          style={{ background: "linear-gradient(135deg, rgba(232,245,240,0.55), rgba(15,118,110,0.25))" }} />

        {/* Floating Medical Icons */}
        <m.div
          animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[8%] left-[6%] z-[2] text-[#0F766E]/[0.12]"
        >
          <Stethoscope size={72} strokeWidth={1.2} />
        </m.div>

        <m.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-[14%] right-[12%] z-[2] text-[#0F766E]/[0.12]"
        >
          <Pill size={56} strokeWidth={1.2} className="rotate-45" />
        </m.div>

        <m.div
          animate={{ y: [0, -8, 0], rotate: [0, -2, 2, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[22%] left-[10%] z-[2] text-[#0F766E]/[0.12]"
        >
          <ClipboardList size={64} strokeWidth={1.2} />
        </m.div>

        <m.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-[48%] right-[8%] z-[2] text-[#0F766E]/[0.12]"
        >
          <Activity size={68} strokeWidth={1.2} />
        </m.div>

        {/* ECG Heartbeat Line */}
        <div className="absolute bottom-10 left-0 w-full h-20 z-[2] opacity-30">
          <svg viewBox="0 0 1000 80" preserveAspectRatio="none" className="w-full h-full" fill="none">
            <path
              d="M0,40 L150,40 L170,15 L185,65 L200,40 L350,40 L370,10 L385,70 L400,40 L550,40 L570,15 L585,65 L600,40 L750,40 L770,10 L785,70 L800,40 L1000,40"
              stroke="#0F766E"
              strokeWidth="2"
              fill="none"
              className="animate-[drawEcg_3s_linear_infinite]"
              style={{ strokeDasharray: 1200, strokeDashoffset: 1200 }}
            />
            <circle r="4" fill="#0F766E" style={{ filter: "drop-shadow(0 0 4px rgba(15,118,110,0.7))" }}>
              <animateMotion dur="3s" repeatCount="indefinite"
                path="M0,40 L150,40 L170,15 L185,65 L200,40 L350,40 L370,10 L385,70 L400,40 L550,40 L570,15 L585,65 L600,40 L750,40 L770,10 L785,70 L800,40 L1000,40" />
            </circle>
          </svg>
        </div>

        {/* Doctor Photo */}
        <m.div
          initial={{ x: -120, opacity: 0, scale: 0.92 }}
          animate={{ x: 0, opacity: 1, scale: [0.92, 1, 1.02, 1], y: [15, -5, 0] }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2, times: [0, 0.7, 0.9, 1] }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[3] w-[420px] h-[75%]"
        >
          {/* Shadow */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-60 h-6 bg-black/20 blur-xl rounded-full" />
          <m.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}
            className="w-full h-full relative"
            style={{ maskImage: "linear-gradient(to top, transparent 0%, black 12%, black 100%)", WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 12%, black 100%)" }}
          >
            <img src="/images/doctor.jpg" alt="" className="w-full h-full object-contain object-bottom mix-blend-multiply" />
          </m.div>
        </m.div>
      </div>
    </LazyMotion>
  )
}

/* Mobile-only floating icons */
export function MobileFloatingIcons() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="md:hidden fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <m.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[8%] left-[6%] text-[#0F766E]/[0.08]"><Stethoscope size={56} strokeWidth={1} /></m.div>
        <m.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-[18%] right-[10%] text-[#0F766E]/[0.08]"><Pill size={48} strokeWidth={1} /></m.div>
        <m.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[12%] left-[14%] text-[#0F766E]/[0.08]"><ClipboardList size={52} strokeWidth={1} /></m.div>
      </div>
    </LazyMotion>
  )
}
