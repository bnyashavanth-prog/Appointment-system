"use client"

import Link from 'next/link'
import { m, LazyMotion, domAnimation, useMotionValue, useTransform, useReducedMotion } from "framer-motion"
import { AuthBackground, MobileFloatingIcons } from "@/components/auth/AuthBackground"
import { Plus, ArrowRight } from "lucide-react"
import styles from "@/app/login/login.module.css"

export default function Home() {
  const shouldReduceMotion = useReducedMotion()

  // Mouse Parallax values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const shiftX = useTransform(mouseX, [-0.5, 0.5], [-8, 8])
  const shiftY = useTransform(mouseY, [-0.5, 0.5], [-8, 8])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(x)
    mouseY.set(y)
  }

  const containerVariants: any = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.6, staggerChildren: 0.1 } }
  }
  const itemVariants: any = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className={`flex flex-col md:flex-row min-h-[100dvh] md:min-h-screen ${styles.gradientBg} relative overflow-x-hidden`} onMouseMove={handleMouseMove}>
        
        {/* RIGHT PANEL DECORATIVE SHAPES */}
        <m.div style={{ x: shiftX, y: shiftY }} className="absolute inset-0 pointer-events-none z-0 right-panel-bg hidden md:block">
          <m.div animate={shouldReduceMotion ? {} : { rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute -top-[10%] -right-[5%] w-[400px] h-[400px] bg-teal-500/[0.04] rounded-full blur-[80px]" />
          <m.div animate={shouldReduceMotion ? {} : { rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute bottom-[10%] right-[15%] w-[300px] h-[300px] bg-[#E8FBF3] rounded-full blur-[60px]" />
          <div className="absolute top-[20%] right-[8%] text-[#0F766E]/5"><Plus size={32} /></div>
          <div className="absolute bottom-[15%] right-[25%] text-[#0F766E]/5"><Plus size={24} /></div>
        </m.div>

        {/* LEFT PANEL */}
        <AuthBackground />
        
        {/* Mobile floating icons (visible < md only) */}
        <MobileFloatingIcons />

        {/* RIGHT PANEL / MOBILE CONTAINER */}
        <div className="flex-1 flex flex-col min-h-[100dvh] md:min-h-screen w-full relative z-10 overflow-y-auto overflow-x-hidden">
          
          {/* HEADER BRANDING */}
          <div className="w-full pt-8 px-6 pb-2 md:p-0 md:fixed md:top-10 md:left-10 z-[100] flex justify-start">
            <m.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }} className="flex flex-col">
              <div className="flex items-center gap-2">
                <m.div initial={shouldReduceMotion ? {} : { filter: "drop-shadow(0 0 0 rgba(15,118,110,0))" }} animate={shouldReduceMotion ? {} : { filter: ["drop-shadow(0 0 0 rgba(15,118,110,0))", "drop-shadow(0 0 12px rgba(15,118,110,0.8))", "drop-shadow(0 0 0 rgba(15,118,110,0))"] }} transition={{ duration: 1, delay: 0.5 }} className="text-[#0F766E]">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 2.89543 8 4V8H4C2.89543 8 2 8.89543 2 10V14C2 15.1046 2.89543 16 4 16H8V20C8 21.1046 8.89543 22 10 22H14C15.1046 22 16 21.1046 16 20V16H20C21.1046 16 22 15.1046 22 14V10C22 8.89543 21.1046 8 20 8H16V4Z" />
                  </svg>
                </m.div>
                <span className="text-[22px] font-bold text-[#1F2937] tracking-tight drop-shadow-sm leading-none">HealthCare<span className="text-[#0F766E]">+</span></span>
              </div>
              <span className="text-[11px] font-medium text-[#4B5563] mt-1.5 ml-[36px] tracking-wide">Better Care. Healthier Tomorrow.</span>
            </m.div>
          </div>

          {/* CARD CONTAINER */}
          <div className="flex-1 flex items-center justify-center p-4 py-8 md:p-6 w-full">
            <m.div
              variants={containerVariants} initial="hidden" animate="show"
              className="w-full max-w-[420px] bg-white/95 backdrop-blur-[10px] rounded-[24px] p-8 md:p-10 shadow-[0_4px_6px_rgba(0,0,0,0.03),0_12px_24px_rgba(0,0,0,0.06)] border border-white/60 text-center"
            >
            <m.div variants={itemVariants} className="flex justify-center mb-6">
              <div className="relative w-20 h-20">
                <span className="absolute -inset-2 rounded-full border-2 border-[#0F766E]/15 animate-[pulseRing_2.5s_ease-in-out_infinite]" />
                <div className="w-full h-full rounded-full bg-[#E8FBF3] flex items-center justify-center relative z-10 text-[#0F766E]">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 2.89543 8 4V8H4C2.89543 8 2 8.89543 2 10V14C2 15.1046 2.89543 16 4 16H8V20C8 21.1046 8.89543 22 10 22H14C15.1046 22 16 21.1046 16 20V16H20C21.1046 16 22 15.1046 22 14V10C22 8.89543 21.1046 8 20 8H16V4Z" />
                  </svg>
                </div>
              </div>
            </m.div>

            <m.h1 variants={itemVariants} className="text-[32px] font-bold text-[#1F2937] mb-2">eDoc Portal</m.h1>
            <m.p variants={itemVariants} className="text-[#6B7280] mb-10 leading-relaxed text-[15px]">
              The modern appointment system for doctors and patients. Book your next visit instantly.
            </m.p>

            <m.div variants={itemVariants} className="flex flex-col gap-3">
              <Link href="/login" className="w-full py-4 bg-[#0F766E] text-white rounded-xl font-bold text-[15px] transition-all duration-200 shadow-sm hover:bg-[#0d645e] hover:-translate-y-px hover:shadow-md active:scale-[0.98] flex items-center justify-center gap-2 group">
                Sign In to Account
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              
              <Link href="/signup" className="w-full py-4 bg-[#EEF2F9] text-[#1F2937] rounded-xl font-bold text-[15px] transition-all duration-200 hover:bg-[#E2E8F4] hover:-translate-y-px active:scale-[0.98]">
                Register as Patient
              </Link>
            </m.div>
          </m.div>
        </div>
      </div>
      </div>
    </LazyMotion>
  )
}
