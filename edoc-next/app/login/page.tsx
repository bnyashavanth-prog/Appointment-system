"use client"

import { useState, useEffect } from "react"
import { SubmitButton } from "./SubmitButton"
import { loginAction } from "./actions"
import { m, LazyMotion, domAnimation, useMotionValue, useTransform, useReducedMotion } from "framer-motion"
import { User, Eye, EyeOff, Plus, Mail, Lock } from "lucide-react"
import Link from "next/link"
import { AuthBackground, MobileFloatingIcons } from "@/components/auth/AuthBackground"
import styles from "./login.module.css"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const [emailValue, setEmailValue] = useState("")
  const [passwordValue, setPasswordValue] = useState("")
  
  const shouldReduceMotion = useReducedMotion()
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem("introPlayed")) {
      setHasPlayedIntro(true)
    } else {
      sessionStorage.setItem("introPlayed", "true")
    }
  }, [])

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

  return (
    <LazyMotion features={domAnimation}>
      <div 
        className={`flex flex-col md:flex-row min-h-[100dvh] md:min-h-screen ${styles.gradientBg} relative overflow-x-hidden ${hasPlayedIntro ? styles.skipIntro : ''}`}
        onMouseMove={handleMouseMove}
      >
        {/* RIGHT PANEL DECORATIVE SHAPES (Parallax) */}
        <m.div 
          style={{ x: shiftX, y: shiftY }}
          className={`absolute inset-0 pointer-events-none z-0 right-panel-bg hidden md:block ${styles.introBg}`}
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

        {/* LEFT PANEL — animated scene (desktop only) */}
        <AuthBackground />

        {/* Mobile floating icons (visible < md only) */}
        <MobileFloatingIcons />

        {/* RIGHT PANEL / MOBILE CONTAINER */}
        <div className="flex-1 flex flex-col min-h-[100dvh] md:min-h-screen w-full relative z-10 overflow-y-auto overflow-x-hidden">
          
          {/* HEADER BRANDING (in flow on mobile, fixed on desktop) */}
          <div className={`w-full pt-8 px-6 pb-2 md:p-0 md:fixed md:top-10 md:left-10 z-[100] flex justify-start ${styles.introLogo}`}>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <m.div 
                  initial={shouldReduceMotion ? {} : { filter: "drop-shadow(0 0 0 rgba(15,118,110,0))" }}
                  animate={shouldReduceMotion ? {} : { filter: ["drop-shadow(0 0 0 rgba(15,118,110,0))", "drop-shadow(0 0 12px rgba(15,118,110,0.8))", "drop-shadow(0 0 0 rgba(15,118,110,0))"] }}
                  transition={{ duration: 1, delay: 2.2 }}
                  className="text-[#0F766E]"
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4C16 2.89543 15.1046 2 14 2H10C8.89543 2 8 2.89543 8 4V8H4C2.89543 8 2 8.89543 2 10V14C2 15.1046 2.89543 16 4 16H8V20C8 21.1046 8.89543 22 10 22H14C15.1046 22 16 21.1046 16 20V16H20C21.1046 16 22 15.1046 22 14V10C22 8.89543 21.1046 8 20 8H16V4Z" />
                  </svg>
                </m.div>
                <span className="text-[22px] font-bold text-[#1F2937] tracking-tight drop-shadow-sm leading-none">
                  HealthCare<span className="text-[#0F766E]">+</span>
                </span>
              </div>
              <span className="text-[11px] font-medium text-[#4B5563] mt-1.5 ml-[36px] tracking-wide">
                Better Care. Healthier Tomorrow.
              </span>
            </div>
          </div>

          {/* CARD CONTAINER */}
          <div className="flex-1 flex items-center justify-center p-4 py-8 md:p-6 w-full">
            <div
              className={`w-full max-w-[420px] bg-white/95 backdrop-blur-[10px] rounded-[24px] shadow-[0_4px_6px_rgba(0,0,0,0.03),0_12px_24px_rgba(0,0,0,0.06)] border border-white/60 relative ${styles.introCard} ${isShaking && !shouldReduceMotion ? styles.shake : ""}`}
              onAnimationEnd={(e) => {
                if (e.animationName.includes('shake')) setIsShaking(false)
              }}
            >
              
              {/* SKELETON PLACEHOLDER */}
              <div className={`absolute inset-0 rounded-[24px] bg-white/80 backdrop-blur-md flex flex-col items-center justify-start p-10 z-50 pointer-events-none ${styles.introSkeleton}`}>
                <div className="w-16 h-16 rounded-full bg-slate-200/60 animate-pulse mb-6" />
                <div className="w-3/4 h-8 rounded-lg bg-slate-200/60 animate-pulse mb-10" />
                <div className="w-full h-12 rounded-xl bg-slate-200/60 animate-pulse mb-4" />
                <div className="w-full h-12 rounded-xl bg-slate-200/60 animate-pulse mb-6" />
                <div className="w-full h-12 rounded-xl bg-teal-600/20 animate-pulse" />
              </div>

              {/* REAL CONTENT */}
              <div className="p-8 md:p-10">
                {/* Avatar badge */}
                <div className={`flex justify-center mb-5 ${styles.introAvatar}`}>
                  <div className="relative w-16 h-16">
                    <span className="absolute -inset-1.5 rounded-full border-2 border-[#0F766E]/15 animate-[pulseRing_2.5s_ease-in-out_infinite]" />
                    <div className="w-full h-full rounded-full bg-[#E8FBF3] flex items-center justify-center relative z-10">
                      <User size={28} className="text-[#0F766E]" />
                    </div>
                  </div>
                </div>

                <h1 className={`text-center text-[26px] font-bold text-[#1F2937] mb-1 ${styles.introTitle}`}>Welcome Back</h1>
                <p className={`text-center text-sm text-[#6B7280] mb-7 ${styles.introSub}`}>Sign in to your account</p>

                {error && (
                  <div className="mb-5 p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 text-center font-medium animate-[fadeIn_0.25s_ease]">
                    {error}
                  </div>
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
                  <div className={`group ${styles.introEmail}`}>
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
                  </div>

                  {/* Password */}
                  <div className={`group ${styles.introPass}`}>
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
                  </div>

                  <div className={`pt-1 ${styles.introBtn}`}>
                    <SubmitButton>Login</SubmitButton>
                  </div>
                </form>

                <div className={`mt-6 text-center text-sm text-[#6B7280] ${styles.introFooter}`}>
                  Don&apos;t have an account?{" "}
                  <Link href="/signup" className="text-[#0F766E] font-bold relative group inline-block">
                    Sign Up
                    <span className="absolute -bottom-0.5 left-0 w-0 h-[2px] bg-[#0F766E] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LazyMotion>
  )
}
