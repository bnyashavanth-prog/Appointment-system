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
    <div className="flex min-h-screen items-center justify-center bg-[#050505] py-12">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/5 rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold animate-fade-in-up">Create Account</h1>
          <p className="mt-2 text-sm text-zinc-400">Register as a new patient</p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-400 bg-red-500/10 rounded-xl">
            {error}
          </div>
        )}

        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300">Full Name</label>
            <input name="pname" type="text" required className="w-full px-3 py-2 mt-1 bg-white/[0.04] border border-white/15 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40 focus:bg-white/[0.07] focus:ring-1 focus:ring-white/10 transition-all duration-300" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300">Email Address</label>
            <input name="email" type="email" required className="w-full px-3 py-2 mt-1 bg-white/[0.04] border border-white/15 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40 focus:bg-white/[0.07] focus:ring-1 focus:ring-white/10 transition-all duration-300" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300">Password</label>
            <input name="password" type="password" required className="w-full px-3 py-2 mt-1 bg-white/[0.04] border border-white/15 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40 focus:bg-white/[0.07] focus:ring-1 focus:ring-white/10 transition-all duration-300" placeholder="••••••••" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-zinc-300">NIC Number</label>
              <input name="pnic" type="text" required className="w-full px-3 py-2 mt-1 bg-white/[0.04] border border-white/15 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40 focus:bg-white/[0.07] focus:ring-1 focus:ring-white/10 transition-all duration-300" />
            </div>
            <div>
              <label className="block text-sm font-medium text-zinc-300">Date of Birth</label>
              <input name="pdob" type="date" required className="w-full px-3 py-2 mt-1 bg-white/[0.04] border border-white/15 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40 focus:bg-white/[0.07] focus:ring-1 focus:ring-white/10 transition-all duration-300" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300">Phone Number</label>
            <input name="ptel" type="tel" required className="w-full px-3 py-2 mt-1 bg-white/[0.04] border border-white/15 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40 focus:bg-white/[0.07] focus:ring-1 focus:ring-white/10 transition-all duration-300" />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300">Address</label>
            <textarea name="paddress" required className="w-full px-3 py-2 mt-1 bg-white/[0.04] border border-white/15 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:border-white/40 focus:bg-white/[0.07] focus:ring-1 focus:ring-white/10 transition-all duration-300" rows={2}></textarea>
          </div>
          
          <button 
            type="submit" 
            disabled={pending}
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-xl hover:backdrop-blur-2xl bg-white/[0.03] border-r border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400"
          >
            {pending ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="text-center text-sm">
          Already have an account? <Link href="/login" className="text-white hover:underline">Login</Link>
        </div>
      </div>
    </div>
  )
}
