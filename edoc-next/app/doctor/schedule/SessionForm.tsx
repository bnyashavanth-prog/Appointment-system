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
    <form id="sessionForm" action={handleSubmit} className="bg-card border border-border shadow-sm p-6 rounded-2xl mb-8 space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Add New Session</h2>
      
      {error && <div className="text-red-700 bg-red-50 p-3 rounded-xl text-sm border border-red-200">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Session Title</label>
          <input name="title" required className="mt-1 block w-full rounded-xl border border-border bg-slate-50 px-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Date</label>
          <input type="date" name="scheduledate" required className="mt-1 block w-full rounded-xl border border-border bg-slate-50 px-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Time</label>
          <input type="time" name="scheduletime" required className="mt-1 block w-full rounded-xl border border-border bg-slate-50 px-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Max Patients</label>
          <input type="number" name="nop" min="1" required className="mt-1 block w-full rounded-xl border border-border bg-slate-50 px-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" />
        </div>
      </div>
      
      <button 
        type="submit" 
        disabled={pending}
        className="px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-teal-700 transition-all duration-200 shadow-sm font-medium disabled:opacity-50 cursor-pointer"
      >
        {pending ? "Adding..." : "Add Session"}
      </button>
    </form>
  )
}
