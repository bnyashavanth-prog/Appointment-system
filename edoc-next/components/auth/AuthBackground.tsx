"use client"

import { useEffect, useRef } from "react"
import { m, LazyMotion, domAnimation } from "framer-motion"
import { Stethoscope, Pill, ClipboardList, Activity } from "lucide-react"
import styles from "@/app/login/login.module.css"

export function AuthBackground() {
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

        {/* ========== LAYER 0: Gradient fallback ========== */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-gradient-to-br from-[#d1fae5] via-[#99f6e4] to-[#5eead4]"
            style={{ animation: "kenBurns 20s ease-in-out alternate infinite" }}
          />
        </div>

        {/* ========== LAYER 1: Video background ========== */}
        <div className={`absolute inset-0 z-[1] ${styles.introVideo}`} style={{ animation: "kenBurns 20s ease-in-out alternate infinite" }}>
          <img src="https://images.unsplash.com/photo-1581056771107-24ca5f033842?q=80&w=2000&auto=format&fit=crop" alt="Hospital Hallway" className="absolute inset-0 w-full h-full object-cover" />
          <video ref={videoRef} autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover z-10">
            <source src="/assets/doctors-walking.mp4" type="video/mp4" />
          </video>
        </div>

        {/* ========== LAYER 2: Overlay ========== */}
        <div
          className={`absolute inset-0 z-[2] ${styles.introOverlay}`}
          style={{ 
            background: "linear-gradient(135deg, rgba(232,245,240,0.65), rgba(15,118,110,0.35))",
            boxShadow: "inset -120px 0 100px -30px #EAF6F1"
          }}
        />

        {/* ========== LAYER 3: Icons ========== */}
        <div style={{ animation: "introFade 0.8s ease-out 0.8s both" }} className="absolute inset-0 z-[3]">
          <m.div animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0], opacity: [0.14, 0.3, 0.14] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[8%] left-[6%] text-[#0F766E]">
            <Stethoscope size={72} strokeWidth={1.2} />
          </m.div>
          <m.div animate={{ y: [0, 10, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute top-[14%] right-[12%] text-[#0F766E] opacity-[0.14]">
            <Pill size={56} strokeWidth={1.2} className="rotate-45" />
          </m.div>
          <m.div animate={{ y: [0, -8, 0], rotate: [0, -2, 2, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[22%] left-[10%] text-[#0F766E] opacity-[0.14]">
            <ClipboardList size={64} strokeWidth={1.2} />
          </m.div>
          <m.div animate={{ y: [0, 12, 0], opacity: [0.14, 0.3, 0.14] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute top-[48%] right-[8%] text-[#0F766E]">
            <Activity size={68} strokeWidth={1.2} />
          </m.div>
        </div>

        {/* ========== LAYER 3: ECG Heartbeat Line ========== */}
        <div style={{ animation: "introFade 0.8s ease-out 0.8s both" }} className="absolute bottom-10 left-0 w-full h-20 z-[3] opacity-30">
          <svg viewBox="0 0 1000 80" preserveAspectRatio="none" className="w-full h-full" fill="none">
            <path d="M0,40 L150,40 L170,15 L185,65 L200,40 L350,40 L370,10 L385,70 L400,40 L550,40 L570,15 L585,65 L600,40 L750,40 L770,10 L785,70 L800,40 L1000,40" stroke="#0F766E" strokeWidth="2" fill="none" style={{ strokeDasharray: 1200, animation: "drawEcg 3s linear infinite" }} />
            <circle r="4" fill="#14B8A6" style={{ filter: "drop-shadow(0 0 6px #14B8A6) drop-shadow(-10px 0 6px rgba(20,184,166,0.6))" }}>
              <animateMotion dur="3s" repeatCount="indefinite" path="M0,40 L150,40 L170,15 L185,65 L200,40 L350,40 L370,10 L385,70 L400,40 L550,40 L570,15 L585,65 L600,40 L750,40 L770,10 L785,70 L800,40 L1000,40" />
            </circle>
          </svg>
        </div>
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
