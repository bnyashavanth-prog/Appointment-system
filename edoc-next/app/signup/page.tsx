"use client"

import { useState } from "react"
import { registerPatient } from "./actions"
import { m, LazyMotion, domAnimation, useMotionValue, useTransform, useReducedMotion } from "framer-motion"
import { UserPlus, Plus } from "lucide-react"
import Link from "next/link"
import { AuthBackground, MobileFloatingIcons } from "@/components/auth/AuthBackground"
import { SubmitButton } from "@/app/login/SubmitButton"
import styles from "@/app/login/login.module.css"

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null)
  const [isShaking, setIsShaking] = useState(false)
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
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut", delay: 0.6, staggerChildren: 0.05 } }
  }
  const itemVariants: any = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  }

  return (
    <LazyMotion features={domAnimation}>
      <div className={`flex min-h-screen ${styles.gradientBg} relative overflow-hidden`} onMouseMove={handleMouseMove}>
        
        {/* RIGHT PANEL DECORATIVE SHAPES */}
        <m.div style={{ x: shiftX, y: shiftY }} className="absolute inset-0 pointer-events-none z-0 right-panel-bg hidden md:block">
          <m.div animate={shouldReduceMotion ? {} : { rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute -top-[10%] -right-[5%] w-[400px] h-[400px] bg-teal-500/[0.04] rounded-full blur-[80px]" />
          <m.div animate={shouldReduceMotion ? {} : { rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute bottom-[10%] right-[15%] w-[300px] h-[300px] bg-[#E8FBF3] rounded-full blur-[60px]" />
          <div className="absolute top-[20%] right-[8%] text-[#0F766E]/5"><Plus size={32} /></div>
          <div className="absolute bottom-[15%] right-[25%] text-[#0F766E]/5"><Plus size={24} /></div>
        </m.div>

        {/* HEADER BRANDING */}
        <div className="absolute top-8 left-8 md:top-10 md:left-10 z-[100]">
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

        {/* LEFT PANEL */}
        <AuthBackground />
        <MobileFloatingIcons />

        {/* RIGHT PANEL — signup card */}
        <div className="relative w-full md:w-[40%] min-h-screen flex items-center justify-center p-6 z-10 py-20">
          <m.div
            variants={containerVariants} initial="hidden" animate="show"
            className={`w-full max-w-[460px] bg-white/95 backdrop-blur-[10px] rounded-[24px] p-8 md:p-10 shadow-[0_4px_6px_rgba(0,0,0,0.03),0_12px_24px_rgba(0,0,0,0.06)] border border-white/60 ${isShaking && !shouldReduceMotion ? styles.shake : ""}`}
            onAnimationEnd={() => setIsShaking(false)}
          >
            {/* Avatar badge with pulse */}
            <m.div variants={itemVariants} className="flex justify-center mb-5">
              <div className="relative w-16 h-16">
                <span className="absolute -inset-1.5 rounded-full border-2 border-[#0F766E]/15 animate-[pulseRing_2.5s_ease-in-out_infinite]" />
                <div className="w-full h-full rounded-full bg-[#E8FBF3] flex items-center justify-center relative z-10">
                  <UserPlus size={28} className="text-[#0F766E]" />
                </div>
              </div>
            </m.div>

            <m.h1 variants={itemVariants} className="text-center text-[26px] font-bold text-[#1F2937] mb-1">Create Account</m.h1>
            <m.p variants={itemVariants} className="text-center text-sm text-[#6B7280] mb-7">Register as a new patient</m.p>

            {error && (
              <m.div variants={itemVariants} className="mb-5 p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 text-center font-medium animate-[fadeIn_0.25s_ease]">
                {error}
              </m.div>
            )}

            <form
              action={async (formData) => {
                setError(null)
                const result = await registerPatient(formData)
                if (result?.error) {
                  setError(result.error)
                  setIsShaking(true)
                }
              }}
              className="space-y-4"
            >
              <m.div variants={itemVariants} className="group">
                <label className="block text-[13px] font-semibold text-[#374151] mb-1.5 group-focus-within:text-[#0F766E] transition-colors">Full Name</label>
                <input name="pname" type="text" required placeholder="John Doe" className="w-full px-4 py-3 text-[14px] bg-[#EEF2F9] border-2 border-transparent rounded-xl text-[#1F2937] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#0F766E] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.12)] focus:-translate-y-[2px] focus:bg-white" />
              </m.div>

              <m.div variants={itemVariants} className="group">
                <label className="block text-[13px] font-semibold text-[#374151] mb-1.5 group-focus-within:text-[#0F766E] transition-colors">Email Address</label>
                <input name="email" type="email" required placeholder="you@example.com" className="w-full px-4 py-3 text-[14px] bg-[#EEF2F9] border-2 border-transparent rounded-xl text-[#1F2937] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#0F766E] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.12)] focus:-translate-y-[2px] focus:bg-white" />
              </m.div>

              <m.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-[13px] font-semibold text-[#374151] mb-1.5 group-focus-within:text-[#0F766E] transition-colors">NIC Number</label>
                  <input name="pnic" type="text" required className="w-full px-4 py-3 text-[14px] bg-[#EEF2F9] border-2 border-transparent rounded-xl text-[#1F2937] outline-none transition-all duration-200 focus:border-[#0F766E] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.12)] focus:-translate-y-[2px] focus:bg-white" />
                </div>
                <div className="group">
                  <label className="block text-[13px] font-semibold text-[#374151] mb-1.5 group-focus-within:text-[#0F766E] transition-colors">Date of Birth</label>
                  <input name="pdob" type="date" required className="w-full px-4 py-3 text-[14px] bg-[#EEF2F9] border-2 border-transparent rounded-xl text-[#1F2937] outline-none transition-all duration-200 focus:border-[#0F766E] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.12)] focus:-translate-y-[2px] focus:bg-white" />
                </div>
              </m.div>

              <m.div variants={itemVariants} className="grid grid-cols-2 gap-4">
                <div className="group">
                  <label className="block text-[13px] font-semibold text-[#374151] mb-1.5 group-focus-within:text-[#0F766E] transition-colors">Phone</label>
                  <input name="ptel" type="tel" required className="w-full px-4 py-3 text-[14px] bg-[#EEF2F9] border-2 border-transparent rounded-xl text-[#1F2937] outline-none transition-all duration-200 focus:border-[#0F766E] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.12)] focus:-translate-y-[2px] focus:bg-white" />
                </div>
                <div className="group">
                  <label className="block text-[13px] font-semibold text-[#374151] mb-1.5 group-focus-within:text-[#0F766E] transition-colors">Password</label>
                  <input name="password" type="password" required className="w-full px-4 py-3 text-[14px] bg-[#EEF2F9] border-2 border-transparent rounded-xl text-[#1F2937] outline-none transition-all duration-200 focus:border-[#0F766E] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.12)] focus:-translate-y-[2px] focus:bg-white" />
                </div>
              </m.div>

              <m.div variants={itemVariants} className="group">
                <label className="block text-[13px] font-semibold text-[#374151] mb-1.5 group-focus-within:text-[#0F766E] transition-colors">Address</label>
                <textarea name="paddress" required rows={2} className="w-full px-4 py-3 text-[14px] bg-[#EEF2F9] border-2 border-transparent rounded-xl text-[#1F2937] outline-none transition-all duration-200 focus:border-[#0F766E] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.12)] focus:-translate-y-[2px] focus:bg-white resize-none" />
              </m.div>

              <m.div variants={itemVariants} className="pt-2">
                <SubmitButton>Sign Up</SubmitButton>
              </m.div>
            </form>

            <m.div variants={itemVariants} className="mt-6 text-center text-sm text-[#6B7280]">
              Already have an account?{" "}
              <Link href="/login" className="text-[#0F766E] font-bold relative group inline-block">
                Login
                <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-[#0F766E] transition-all duration-300 group-hover:w-full" />
              </Link>
            </m.div>
          </m.div>
        </div>
      </div>
    </LazyMotion>
  )
}
