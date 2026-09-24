"use client"

import { useEffect, useRef, useState } from "react"
import { m, LazyMotion, domAnimation } from "framer-motion"
import { Stethoscope, Pill, ClipboardList, Activity } from "lucide-react"

export function AuthBackground() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isLooping, setIsLooping] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    video.play().catch(() => {})
    video.addEventListener("error", () => {
      video.style.display = "none"
    })

    // Precise tracking for loop point crossfade
    let animationFrame: number
    const checkLoop = () => {
      if (video.duration > 0 && !video.paused) {
        const timeLeft = video.duration - video.currentTime
        // Dip opacity to 0 in the last 0.4s
        if (timeLeft <= 0.4 && timeLeft > 0) {
          setIsLooping(true)
        } 
        // Fade back in quickly at the start of the next loop
        else if (video.currentTime < 0.4) {
          setIsLooping(false)
        }
      }
      animationFrame = requestAnimationFrame(checkLoop)
    }
    animationFrame = requestAnimationFrame(checkLoop)

    return () => cancelAnimationFrame(animationFrame)
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <div className="hidden md:block relative w-[60%] h-screen flex-shrink-0 overflow-hidden bg-black">

        {/* LAYER 0: Gradient fallback */}
        <div className="absolute inset-0 z-0">
          <div
            className="w-full h-full bg-gradient-to-br from-[#d1fae5] via-[#99f6e4] to-[#5eead4]"
            style={{ animation: "kenBurns 20s ease-in-out alternate infinite" }}
          />
        </div>

        {/* LAYER 1: Video / Image background — fades in at 0.8s */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            animation: "kenBurns 20s ease-in-out alternate infinite, introFadeIn 1s ease-out 0.8s both"
          }}
        >
          {/* Corridor fallback image */}
          <img
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2000&auto=format&fit=crop"
            alt="Hospital Corridor"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <video
            ref={videoRef}
            autoPlay loop muted playsInline
            className={`absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-[400ms] ease-in-out ${isLooping ? 'opacity-0' : 'opacity-100'}`}
          >
            <source src="/assets/hospital-brand-film.mp4" type="video/mp4" />
          </video>
        </div>

        {/* LAYER 2: Subtle teal overlay — fades in at 1.8s (LOW opacity, not washed out) */}
        <div
          className="absolute inset-0 z-[2]"
          style={{
            background: "linear-gradient(135deg, rgba(232,245,240,0.25), rgba(15,118,110,0.20))",
            boxShadow: "inset -120px 0 100px -30px rgba(234,246,241,0.7)",
            animation: "introFadeIn 1.4s ease-out 1.8s both"
          }}
        />

        {/* LAYER 3: Floating Medical Icons — fade in staggered at 0.9s */}
        <m.div
          animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[8%] left-[6%] z-[3] text-white/80"
          style={{ animation: "introFadeIn 0.6s ease-out 0.9s both" }}
        >
          <Stethoscope size={72} strokeWidth={1.2} />
        </m.div>

        <m.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute top-[14%] right-[12%] z-[3] text-white/60"
          style={{ animation: "introFadeIn 0.6s ease-out 1.0s both" }}
        >
          <Pill size={56} strokeWidth={1.2} className="rotate-45" />
        </m.div>

        <m.div
          animate={{ y: [0, -8, 0], rotate: [0, -2, 2, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[22%] left-[10%] z-[3] text-white/60"
          style={{ animation: "introFadeIn 0.6s ease-out 1.1s both" }}
        >
          <ClipboardList size={64} strokeWidth={1.2} />
        </m.div>

        <m.div
          animate={{ y: [0, 12, 0], opacity: [0.25, 0.5, 0.25] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute top-[48%] right-[8%] z-[3] text-white/80"
          style={{ animation: "introFadeIn 0.6s ease-out 1.2s both" }}
        >
          <Activity size={68} strokeWidth={1.2} />
        </m.div>

        {/* LAYER 3: ECG Heartbeat Line — starts at 0.9s */}
        <div
          className="absolute bottom-10 left-0 w-full h-20 z-[3]"
          style={{ animation: "introFadeIn 0.8s ease-out 0.9s both" }}
        >
          <svg viewBox="0 0 1000 80" preserveAspectRatio="none" className="w-full h-full" fill="none">
            <path
              d="M0,40 L150,40 L170,15 L185,65 L200,40 L350,40 L370,10 L385,70 L400,40 L550,40 L570,15 L585,65 L600,40 L750,40 L770,10 L785,70 L800,40 L1000,40"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="2"
              fill="none"
              style={{ strokeDasharray: 1200, animation: "drawEcg 3s linear infinite" }}
            />
            <circle r="4" fill="#5eead4" style={{ filter: "drop-shadow(0 0 8px #5eead4) drop-shadow(-10px 0 8px rgba(94,234,212,0.6))" }}>
              <animateMotion
                dur="3s"
                repeatCount="indefinite"
                path="M0,40 L150,40 L170,15 L185,65 L200,40 L350,40 L370,10 L385,70 L400,40 L550,40 L570,15 L585,65 L600,40 L750,40 L770,10 L785,70 L800,40 L1000,40"
              />
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
