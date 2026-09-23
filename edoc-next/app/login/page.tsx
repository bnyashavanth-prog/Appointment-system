"use client"

import { useState } from "react"
import { SubmitButton } from "./SubmitButton"
import { loginAction } from "./actions"
import { m, LazyMotion, domAnimation, useMotionValue, useTransform, useReducedMotion } from "framer-motion"
import { User, Eye, EyeOff, Plus, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { LoginBackground, MobileFloatingIcons } from "@/components/auth/LoginBackground"
import styles from "./login.module.css"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  
  const shouldReduceMotion = useReducedMotion()

  // Mouse Parallax values
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Max shift ±8px
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
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.6, staggerChildren: 0.1 }
    }
  }

  const itemVariants: any = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  }

  return (
    <LazyMotion features={domAnimation}>
      <div 
        className={`flex min-h-screen ${styles.gradientBg} relative overflow-hidden`}
        onMouseMove={handleMouseMove}
      >
        
        {/* RIGHT PANEL DECORATIVE SHAPES (Parallax) */}
        <m.div 
          style={{ x: shiftX, y: shiftY }}
          className="absolute inset-0 pointer-events-none z-0 right-panel-bg hidden md:block"
        >
          <m.div 
            animate={shouldReduceMotion ? {} : { rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[10%] -right-[5%] w-[400px] h-[400px] bg-teal-500/[0.04] rounded-full blur-[80px]" 
          />
          <m.div 
            animate={shouldReduceMotion ? {} : { rotate: -360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[10%] right-[15%] w-[300px] h-[300px] bg-[#E8FBF3] rounded-full blur-[60px]" 
          />
          <div className="absolute top-[20%] right-[8%] text-[#0F766E]/5"><Plus size={32} /></div>
          <div className="absolute bottom-[15%] right-[25%] text-[#0F766E]/5"><Plus size={24} /></div>
        </m.div>

        {/* HEADER BRANDING */}
        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-[100]">
          <m.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="flex items-center gap-2.5"
          >
            <m.div 
              initial={shouldReduceMotion ? {} : { boxShadow: "0 0 0 rgba(15,118,110,0)" }}
              animate={shouldReduceMotion ? {} : { boxShadow: ["0 0 0 rgba(15,118,110,0)", "0 0 20px rgba(15,118,110,0.6)", "0 0 0 rgba(15,118,110,0)"] }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-9 h-9 bg-[#0F766E] rounded-xl flex items-center justify-center text-white shadow-lg"
            >
              <Plus size={22} strokeWidth={2.5} />
            </m.div>
            <span className="text-xl font-bold text-[#1F2937] tracking-tight drop-shadow-sm">
              HealthCare<span className="text-[#0F766E]">+</span>
            </span>
          </m.div>
        </div>

        {/* LEFT PANEL — animated scene */}
        <LoginBackground />

        {/* Mobile floating icons (visible < md only) */}
        <MobileFloatingIcons />

        {/* RIGHT PANEL — login card */}
        <div className="relative w-full md:w-[40%] min-h-screen flex items-center justify-center p-6 z-10">
          <m.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className={`w-full max-w-[420px] bg-white/95 backdrop-blur-[10px] rounded-[24px] p-10 shadow-[0_4px_6px_rgba(0,0,0,0.03),0_12px_24px_rgba(0,0,0,0.06)] border border-white/60 ${isShaking && !shouldReduceMotion ? styles.shake : ""}`}
            onAnimationEnd={() => setIsShaking(false)}
          >
            {/* Avatar badge with pulse */}
            <m.div variants={itemVariants} className="flex justify-center mb-5">
              <div className="relative w-16 h-16">
                <span className="absolute -inset-1.5 rounded-full border-2 border-[#0F766E]/15 animate-[pulseRing_2.5s_ease-in-out_infinite]" />
                <div className="w-full h-full rounded-full bg-[#E8FBF3] flex items-center justify-center relative z-10">
                  <User size={28} className="text-[#0F766E]" />
                </div>
              </div>
            </m.div>

            <m.h1 variants={itemVariants} className="text-center text-[26px] font-bold text-[#1F2937] mb-1">Welcome Back</m.h1>
            <m.p variants={itemVariants} className="text-center text-sm text-[#6B7280] mb-7">Sign in to your account</m.p>

            {error && (
              <m.div variants={itemVariants} className="mb-5 p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 text-center font-medium animate-[fadeIn_0.25s_ease]">
                {error}
              </m.div>
            )}

            <form
              action={async (formData) => {
                setError(null)
                const result = await loginAction(formData)
                if (result?.error) {
                  setError(result.error)
                  setIsShaking(true)
                }
              }}
              className="space-y-5"
            >
              {/* Email */}
              <m.div variants={itemVariants} className="group">
                <label htmlFor="email" className="block text-[13px] font-semibold text-[#374151] mb-1.5 group-focus-within:text-[#0F766E] transition-colors">
                  Email Address
                </label>
                <div className="relative">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${emailValue ? 'text-[#0F766E]' : 'text-[#9CA3AF] group-focus-within:text-[#0F766E]'}`}>
                    <Mail size={18} />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="doctor@edoc.com"
                    autoComplete="email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    className="w-full pl-11 pr-4 py-3.5 text-[15px] bg-[#EEF2F9] border-2 border-transparent rounded-xl text-[#1F2937] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#0F766E] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.12)] focus:-translate-y-[2px] focus:bg-white"
                  />
                </div>
              </m.div>

              {/* Password */}
              <m.div variants={itemVariants} className="group">
                <label htmlFor="password" className="block text-[13px] font-semibold text-[#374151] mb-1.5 group-focus-within:text-[#0F766E] transition-colors">
                  Password
                </label>
                <div className="relative">
                  <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200 ${passwordValue ? 'text-[#0F766E]' : 'text-[#9CA3AF] group-focus-within:text-[#0F766E]'}`}>
                    <Lock size={18} />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    autoComplete="current-password"
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    className="w-full pl-11 pr-12 py-3.5 text-[15px] bg-[#EEF2F9] border-2 border-transparent rounded-xl text-[#1F2937] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#0F766E] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.12)] focus:-translate-y-[2px] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#9CA3AF] hover:text-[#0F766E] transition-colors"
                  >
                    <div className="relative w-5 h-5">
                      <m.div initial={false} animate={{ opacity: showPassword ? 1 : 0 }} transition={{ duration: 0.15 }} className="absolute inset-0">
                        <EyeOff size={20} />
                      </m.div>
                      <m.div initial={false} animate={{ opacity: showPassword ? 0 : 1 }} transition={{ duration: 0.15 }} className="absolute inset-0">
                        <Eye size={20} />
                      </m.div>
                    </div>
                  </button>
                </div>
              </m.div>

              <m.div variants={itemVariants} className="pt-1">
                <SubmitButton>Login</SubmitButton>
              </m.div>
            </form>

            <m.div variants={itemVariants} className="mt-6 text-center text-sm text-[#6B7280]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#0F766E] font-bold relative group inline-block">
                Sign Up
                <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-[#0F766E] transition-all duration-300 group-hover:w-full" />
              </Link>
            </m.div>
          </m.div>
        </div>
      </div>
    </LazyMotion>
  )
}
