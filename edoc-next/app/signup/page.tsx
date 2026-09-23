"use client"

import { registerPatient } from "./actions"
import { useState } from "react"
import Link from "next/link"

export default function SignupPage() {
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError(null)
    const result = await registerPatient(formData)
    if (result?.error) {
      setError(result.error)
      setPending(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 via-white to-slate-50 py-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg border border-border animate-fade-in-up">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-teal-50 rounded-xl mb-4">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Register as a new patient</p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-700 bg-red-50 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Full Name</label>
            <input name="pname" type="text" required className="w-full px-4 py-2.5 mt-1 bg-slate-50 border border-border rounded-xl text-foreground placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Email Address</label>
            <input name="email" type="email" required className="w-full px-4 py-2.5 mt-1 bg-slate-50 border border-border rounded-xl text-foreground placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Password</label>
            <input name="password" type="password" required className="w-full px-4 py-2.5 mt-1 bg-slate-50 border border-border rounded-xl text-foreground placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" placeholder="••••••••" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">NIC Number</label>
              <input name="pnic" type="text" required className="w-full px-4 py-2.5 mt-1 bg-slate-50 border border-border rounded-xl text-foreground placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700">Date of Birth</label>
              <input name="pdob" type="date" required className="w-full px-4 py-2.5 mt-1 bg-slate-50 border border-border rounded-xl text-foreground placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Phone Number</label>
            <input name="ptel" type="tel" required className="w-full px-4 py-2.5 mt-1 bg-slate-50 border border-border rounded-xl text-foreground placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700">Address</label>
            <textarea name="paddress" required className="w-full px-4 py-2.5 mt-1 bg-slate-50 border border-border rounded-xl text-foreground placeholder:text-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" rows={2}></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={pending}
            className="w-full px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-teal-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {pending ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center text-sm text-muted-foreground">
          Already have an account? <Link href="/login" className="text-primary font-medium hover:underline">Login</Link>
        </div>
      </div>
    </div>
  )
}
