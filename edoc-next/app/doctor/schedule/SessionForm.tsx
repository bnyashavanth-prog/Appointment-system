"use client"

import { addSession } from "./actions"
import { useState } from "react"

export default function SessionForm() {
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError(null)
    try {
      const result = await addSession(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        const form = document.getElementById("sessionForm") as HTMLFormElement
        form.reset()
      }
    } catch (e) {
      setError("Failed to create session.")
    } finally {
      setPending(false)
    }
  }

  return (
    <form id="sessionForm" action={handleSubmit} className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-8 rounded-3xl transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.08] hover:border-white/25 hover:shadow-[0_16px_40px_0_rgba(0,0,0,0.9)] animate-fade-in-up mb-8 space-y-4">
      <h2 className="text-xl font-bold mb-4">Add New Session</h2>
      
      {error && <div className="text-red-400 bg-red-500/10 p-2 rounded text-sm">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300">Session Title</label>
          <input name="title" required className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300">Date</label>
          <input type="date" name="scheduledate" required className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300">Time</label>
          <input type="time" name="scheduletime" required className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300">Max Patients</label>
          <input type="number" name="nop" min="1" required className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm border px-3 py-2" />
        </div>
      </div>
      
      <button 
        type="submit" 
        disabled={pending}
        className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:backdrop-blur-2xl bg-white/[0.03] border-r border-white/10 disabled:opacity-50 mt-4"
      >
        {pending ? "Adding..." : "Add Session"}
      </button>
    </form>
  )
}
