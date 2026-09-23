"use client"

import { useState } from "react"
import { SubmitButton } from "./SubmitButton"
import { loginAction } from "./actions"
import { m, LazyMotion, domAnimation } from "framer-motion"
import { User, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { LoginBackground, MobileFloatingIcons } from "@/components/auth/LoginBackground"
import styles from "./login.module.css"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  return (
    <LazyMotion features={domAnimation}>
      <div className={`flex min-h-screen ${styles.gradientBg}`}>

        {/* LEFT PANEL — animated scene */}
        <LoginBackground />

        {/* Mobile floating icons (visible < md only) */}
        <MobileFloatingIcons />

        {/* RIGHT PANEL — login card */}
        <div className="relative w-full md:w-[40%] min-h-screen flex items-center justify-center p-6 z-10">
          <m.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            className={`w-full max-w-[420px] bg-white/95 backdrop-blur-[10px] rounded-[24px] p-10 shadow-[0_4px_6px_rgba(0,0,0,0.03),0_12px_24px_rgba(0,0,0,0.06)] border border-white/60 ${isShaking ? styles.shake : ""}`}
            onAnimationEnd={() => setIsShaking(false)}
          >
            {/* Avatar badge with pulse */}
            <div className="flex justify-center mb-5">
              <div className="relative w-16 h-16">
                <span className="absolute -inset-1.5 rounded-full border-2 border-[#0F766E]/15 animate-[pulseRing_2.5s_ease-in-out_infinite]" />
                <div className="w-full h-full rounded-full bg-[#E8FBF3] flex items-center justify-center">
                  <User size={28} className="text-[#0F766E]" />
                </div>
              </div>
            </div>

            <h1 className="text-center text-[26px] font-bold text-[#1F2937] mb-1">Welcome Back</h1>
            <p className="text-center text-sm text-[#6B7280] mb-7">Sign in to your account</p>

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
              <div className="group">
                <label htmlFor="email" className="block text-[13px] font-semibold text-[#374151] mb-1.5 group-focus-within:text-[#0F766E] transition-colors">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="doctor@edoc.com"
                  autoComplete="email"
                  className="w-full px-4 py-3.5 text-[15px] bg-[#EEF2F9] border-2 border-transparent rounded-xl text-[#1F2937] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#0F766E] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.12)] focus:-translate-y-[2px] focus:bg-white"
                />
              </div>

              {/* Password */}
              <div className="group">
                <label htmlFor="password" className="block text-[13px] font-semibold text-[#374151] mb-1.5 group-focus-within:text-[#0F766E] transition-colors">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="••••••••"
                    autoComplete="current-password"
                    className="w-full px-4 py-3.5 pr-12 text-[15px] bg-[#EEF2F9] border-2 border-transparent rounded-xl text-[#1F2937] placeholder:text-[#9CA3AF] outline-none transition-all duration-200 focus:border-[#0F766E] focus:shadow-[0_0_0_3px_rgba(15,118,110,0.12)] focus:-translate-y-[2px] focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#9CA3AF] hover:text-[#0F766E] transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="pt-1">
                <SubmitButton>Login</SubmitButton>
              </div>
            </form>

            <div className="mt-6 text-center text-sm text-[#6B7280]">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="text-[#0F766E] font-bold hover:underline underline-offset-[3px] decoration-2 transition-all hover:scale-[1.04] inline-block">
                Sign Up
              </Link>
            </div>
          </m.div>
        </div>
      </div>
    </LazyMotion>
  )
}
