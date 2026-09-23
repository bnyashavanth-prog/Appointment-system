"use client"

import { useEffect, useRef } from "react"
import { m, LazyMotion, domAnimation } from "framer-motion"
import { Stethoscope, Pill, ClipboardList, Activity } from "lucide-react"

export function LoginBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {
      console.warn("[eDoc] Video failed to autoplay — showing gradient fallback.")
    })
    video.addEventListener("error", () => {
      console.warn("[eDoc] Video failed to load (404 or unsupported codec) — showing gradient fallback.", video.error)
      video.style.display = "none"
    })
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <div className="hidden md:block relative w-[60%] h-screen flex-shrink-0 overflow-hidden">

        {/* ========== LAYER 0: Gradient fallback (always visible behind video) ========== */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-gradient-to-br from-[#d1fae5] via-[#99f6e4] to-[#5eead4]"
            style={{ animation: "kenBurns 20s ease-in-out alternate infinite" }}
          />
        </div>

        {/* ========== LAYER 1: Video background (sits on top of gradient) ========== */}
        <div className="absolute inset-0 z-[1]" style={{ animation: "kenBurns 20s ease-in-out alternate infinite" }}>
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/assets/doctors-walking.mp4" type="video/mp4" />
          </video>
        </div>

        {/* ========== LAYER 2: Semi-transparent gradient overlay + Right Vignette ========== */}
        <div
          className="absolute inset-0 z-[2]"
          style={{ 
            background: "linear-gradient(135deg, rgba(232,245,240,0.55), rgba(15,118,110,0.25))",
            boxShadow: "inset -120px 0 100px -30px #EAF6F1" // Vignette blending into right panel
          }}
        />

        {/* ========== LAYER 3: Floating Medical Icons ========== */}
        {/* Pulsing Stethoscope */}
        <m.div
          animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0], opacity: [0.14, 0.3, 0.14] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[8%] left-[6%] z-[3] text-[#0F766E]"
        >
          <Stethoscope size={72} strokeWidth={1.2} />
        </m.div>

        {/* Pill */}
        <m.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-[14%] right-[12%] z-[3] text-[#0F766E] opacity-[0.14]"
        >
          <Pill size={56} strokeWidth={1.2} className="rotate-45" />
        </m.div>

        {/* Clipboard */}
        <m.div
          animate={{ y: [0, -8, 0], rotate: [0, -2, 2, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[22%] left-[10%] z-[3] text-[#0F766E] opacity-[0.14]"
        >
          <ClipboardList size={64} strokeWidth={1.2} />
        </m.div>

        {/* Pulsing Activity Heart */}
        <m.div
          animate={{ y: [0, 12, 0], opacity: [0.14, 0.3, 0.14] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-[48%] right-[8%] z-[3] text-[#0F766E]"
        >
          <Activity size={68} strokeWidth={1.2} />
        </m.div>

        {/* ========== LAYER 3: ECG Heartbeat Line ========== */}
        <div className="absolute bottom-10 left-0 w-full h-20 z-[3] opacity-30">
          <svg viewBox="0 0 1000 80" preserveAspectRatio="none" className="w-full h-full" fill="none">
            <path
              d="M0,40 L150,40 L170,15 L185,65 L200,40 L350,40 L370,10 L385,70 L400,40 L550,40 L570,15 L585,65 L600,40 L750,40 L770,10 L785,70 L800,40 L1000,40"
              stroke="#0F766E"
              strokeWidth="2"
              fill="none"
              style={{
                strokeDasharray: 1200,
                animation: "drawEcg 3s linear infinite"
              }}
            />
            {/* Glowing dot with trailing glow */}
            <circle r="4" fill="#14B8A6" style={{ filter: "drop-shadow(0 0 6px #14B8A6) drop-shadow(-10px 0 6px rgba(20,184,166,0.6))" }}>
              <animateMotion dur="3s" repeatCount="indefinite"
                path="M0,40 L150,40 L170,15 L185,65 L200,40 L350,40 L370,10 L385,70 L400,40 L550,40 L570,15 L585,65 L600,40 L750,40 L770,10 L785,70 L800,40 L1000,40" />
            </circle>
          </svg>
        </div>

        {/* ========== LAYER 4: Doctor Photo ========== */}
        <m.div
          initial={{ x: -120, opacity: 0, scale: 0.92 }}
          animate={{ x: 0, opacity: 1, scale: [0.92, 1, 1.02, 1], y: [15, -5, 0] }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2, times: [0, 0.7, 0.9, 1] }}
          className="absolute bottom-0 left-1/2 -translate-x-1/2 z-[4] w-[420px] h-[75%]"
        >
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-60 h-6 bg-black/20 blur-xl rounded-full" />
          <m.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}
            className="w-full h-full relative"
            style={{
              maskImage: "linear-gradient(to top, transparent 0%, black 12%, black 100%)",
              WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 12%, black 100%)"
            }}
          >
            <img src="/images/doctor.jpg" alt="" className="w-full h-full object-contain object-bottom mix-blend-multiply" />
          </m.div>
        </m.div>
      </div>
    </LazyMotion>
  )
}

export function MobileFloatingIcons() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="md:hidden fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <m.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[8%] left-[6%] text-[#0F766E] opacity-[0.08]"><Stethoscope size={56} strokeWidth={1} /></m.div>
        <m.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-[18%] right-[10%] text-[#0F766E] opacity-[0.08]"><Pill size={48} strokeWidth={1} /></m.div>
        <m.div animate={{ y: [0, -8, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[12%] left-[14%] text-[#0F766E] opacity-[0.08]"><ClipboardList size={52} strokeWidth={1} /></m.div>
      </div>
    </LazyMotion>
  )
}
