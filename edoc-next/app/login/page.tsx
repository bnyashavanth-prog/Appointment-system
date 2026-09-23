"use client"

import { useState } from "react"
import { SubmitButton } from "./SubmitButton"
import { loginAction } from "./actions"
import { m, LazyMotion, domAnimation, useReducedMotion } from "framer-motion"
import { Stethoscope, Plus, CalendarCheck, ClipboardList, Pill, Eye, EyeOff, User } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import styles from "./login.module.css"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isShaking, setIsShaking] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  return (
    <LazyMotion features={domAnimation}>
      <div className={`min-h-screen flex flex-col md:flex-row overflow-hidden ${styles.gradientBg}`}>
        
        {/* LEFT PANEL: Background Scene & Doctor */}
        <div className="relative w-full md:w-[55%] h-[35vh] md:h-screen flex-shrink-0 flex items-end justify-center overflow-hidden">
          
          {/* Heartbeat EKG Line */}
          <div className="absolute bottom-10 left-0 w-full h-24 opacity-30 z-0">
            <svg preserveAspectRatio="none" viewBox="0 0 1000 100" className="w-full h-full" fill="none">
              <m.path
                d="M0,50 L200,50 L220,20 L240,80 L260,50 L500,50 L520,10 L540,90 L560,50 L1000,50"
                stroke="#0F766E"
                strokeWidth="2"
                initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
                animate={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 1 }}
                transition={{ duration: 3, ease: "linear", repeat: Infinity }}
              />
              {!shouldReduceMotion && (
                <m.circle
                  r="3"
                  fill="#0F766E"
                  className="drop-shadow-[0_0_4px_rgba(15,118,110,0.8)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <animateMotion
                    dur="3s"
                    repeatCount="indefinite"
                    path="M0,50 L200,50 L220,20 L240,80 L260,50 L500,50 L520,10 L540,90 L560,50 L1000,50"
                  />
                </m.circle>
              )}
            </svg>
          </div>

          {/* Floating Icons */}
          {!shouldReduceMotion && (
            <>
              <m.div
                animate={{ y: [0, -10, 0], rotate: [0, 3, -3, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[10%] left-[15%] text-[#0F766E] opacity-15"
              >
                <Stethoscope size={64} strokeWidth={1} />
              </m.div>

              <m.div
                animate={{ y: [0, 8, 0], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-[30%] left-[5%] text-[#0F766E]"
              >
                <Plus size={48} strokeWidth={1} />
              </m.div>

              <m.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-[25%] left-[20%] text-[#0F766E] opacity-15"
              >
                <CalendarCheck size={72} strokeWidth={1} />
              </m.div>

              <m.div
                animate={{ y: [0, 10, 0], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                className="absolute top-[20%] right-[15%] text-[#0F766E] opacity-15 hidden md:block"
              >
                <ClipboardList size={56} strokeWidth={1} />
              </m.div>

              <m.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute top-[5%] right-[25%] text-[#0F766E] opacity-15 hidden md:block"
              >
                <Pill size={40} strokeWidth={1} className="rotate-45" />
              </m.div>
            </>
          )}

          {shouldReduceMotion && (
            <>
              <div className="absolute top-[10%] left-[15%] text-[#0F766E] opacity-15"><Stethoscope size={64} strokeWidth={1} /></div>
              <div className="absolute top-[30%] left-[5%] text-[#0F766E] opacity-15"><Plus size={48} strokeWidth={1} /></div>
              <div className="absolute bottom-[25%] left-[20%] text-[#0F766E] opacity-15"><CalendarCheck size={72} strokeWidth={1} /></div>
            </>
          )}

          {/* Doctor Photo */}
          <div className="relative w-full max-w-[500px] h-full flex items-end justify-center z-10">
            {/* Floor Shadow */}
            <m.div
              initial={shouldReduceMotion ? { opacity: 0.25 } : { opacity: 0.1 }}
              animate={shouldReduceMotion ? { opacity: 0.25 } : { opacity: 0.25 }}
              transition={{ delay: 0.2, duration: 0.9 }}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 w-64 h-8 bg-black/40 blur-xl rounded-full"
            />
            
            <m.div
              initial={shouldReduceMotion ? { x: 0, opacity: 1, scale: 1 } : { x: -120, opacity: 0, scale: 0.92 }}
              animate={shouldReduceMotion ? { x: 0, opacity: 1, scale: 1 } : { 
                x: 0, 
                opacity: 1, 
                scale: [0.92, 1, 1.02, 1],
                y: [15, -5, 0]
              }}
              transition={{ 
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.2,
                times: [0, 0.7, 0.9, 1]
              }}
              className="w-full h-[120%] md:h-[85%] relative flex justify-center items-end"
              onAnimationComplete={(def) => {
                // Trigger idle float after entrance
              }}
            >
              <m.div
                animate={shouldReduceMotion ? {} : { y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1.3 }}
                className="w-full h-full relative"
                style={{
                  maskImage: "linear-gradient(to top, transparent 0%, black 15%, black 100%)",
                  WebkitMaskImage: "linear-gradient(to top, transparent 0%, black 15%, black 100%)"
                }}
              >
                <Image
                  src="/images/doctor.jpg"
                  alt="Doctor welcoming you"
                  fill
                  className="object-contain object-bottom mix-blend-multiply"
                  priority
                />
              </m.div>
            </m.div>
          </div>
        </div>

        {/* RIGHT PANEL: Login Card */}
        <div className="relative w-full md:w-[45%] min-h-[65vh] md:h-screen flex items-center justify-center p-6 z-20">
          <m.div
            initial={shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: shouldReduceMotion ? 0 : 0.6 }}
            className={`w-full max-w-[420px] bg-white rounded-[24px] shadow-xl border border-gray-100 p-8 ${isShaking && !shouldReduceMotion ? styles.shake : ""}`}
            onAnimationEnd={() => setIsShaking(false)}
          >
            <div className="flex flex-col items-center mb-8">
              <m.div
                animate={shouldReduceMotion ? {} : { scale: [1, 1.05, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mb-4"
              >
                <User size={32} className="text-[#0F766E]" />
              </m.div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
              <p className="text-sm text-gray-500 mt-1">Sign in to your account</p>
            </div>

            {error && (
              <div className="mb-6 p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 text-center font-medium">
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
              <div className="group">
                <label className="block text-sm font-medium text-gray-700 mb-1.5 group-focus-within:text-[#0F766E] transition-colors">
                  Email Address
                </label>
                <input 
                  name="email" 
                  type="email" 
                  required 
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all duration-200 ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#0F766E]'}`}
                  placeholder="you@example.com" 
                />
              </div>

              <div className="group relative">
                <label className="block text-sm font-medium text-gray-700 mb-1.5 group-focus-within:text-[#0F766E] transition-colors">
                  Password
                </label>
                <input 
                  name="password" 
                  type={showPassword ? "text" : "password"} 
                  required 
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-teal-500/10 transition-all duration-200 pr-12 ${error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#0F766E]'}`}
                  placeholder="••••••••" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  className="absolute right-4 top-[34px] text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <m.div initial={false} animate={{ opacity: 1 }} transition={{ duration: 0.15 }}>
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </m.div>
                </button>
              </div>

              <div className="pt-2">
                <SubmitButton>Login</SubmitButton>
              </div>
            </form>

            <div className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link href="/signup" className="text-[#0F766E] font-semibold hover:underline underline-offset-4 decoration-2">
                Sign Up
              </Link>
            </div>
          </m.div>
        </div>

      </div>
    </LazyMotion>
  )
}
