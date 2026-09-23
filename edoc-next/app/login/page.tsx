"use client"

import { SubmitButton } from "./SubmitButton"
import { loginAction } from "./actions"
import { useState } from "react"
import { LoginBackground } from "@/components/auth/LoginBackground"

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <LoginBackground />
      <div className="relative z-10 w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-xl border border-border animate-fade-in-up">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-50 rounded-xl mb-4">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Welcome Back</h1>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to your account</p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-50 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form action={async (formData) => {
          setError(null)
          const result = await loginAction(formData)
          if (result?.error) {
            setError(result.error)
          }
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Email Address</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full px-4 py-2.5 mt-1 bg-slate-50 border border-border rounded-xl text-foreground placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" 
              placeholder="you@example.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full px-4 py-2.5 mt-1 bg-slate-50 border border-border rounded-xl text-foreground placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" 
              placeholder="••••••••" 
            />
          </div>
          <SubmitButton>Login</SubmitButton>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Don't have an account? <a href="/signup" className="text-primary font-medium hover:underline">Sign Up</a>
        </div>
      </div>
    </div>
  )
}
