"use client"

import { addDoctor } from "./actions"
import { useState } from "react"

export default function DoctorForm({ specialties }: { specialties: any[] }) {
  const [error, setError] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  async function handleSubmit(formData: FormData) {
    setPending(true)
    setError(null)
    try {
      const result = await addDoctor(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        const form = document.getElementById("doctorForm") as HTMLFormElement
        form.reset()
      }
    } catch (e) {
      setError("Failed to create doctor.")
    } finally {
      setPending(false)
    }
  }

  return (
    <form id="doctorForm" action={handleSubmit} className="bg-card border border-border shadow-sm p-6 rounded-2xl mb-8 space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Add New Doctor</h2>
      
      {error && <div className="text-red-700 bg-red-50 p-3 rounded-xl text-sm border border-red-200">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Name</label>
          <input name="docname" required className="mt-1 block w-full rounded-xl border border-border bg-slate-50 px-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Email</label>
          <input type="email" name="email" required className="mt-1 block w-full rounded-xl border border-border bg-slate-50 px-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Password</label>
          <input type="password" name="password" required className="mt-1 block w-full rounded-xl border border-border bg-slate-50 px-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">NIC Number</label>
          <input name="docnic" required className="mt-1 block w-full rounded-xl border border-border bg-slate-50 px-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Phone</label>
          <input name="doctel" required className="mt-1 block w-full rounded-xl border border-border bg-slate-50 px-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200" />
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Specialty</label>
          <select name="specialtyId" required className="mt-1 block w-full rounded-xl border border-border bg-slate-50 px-4 py-2.5 text-foreground focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200">
            {specialties.map(s => (
              <option key={s.id} value={s.id}>{s.sname}</option>
            ))}
          </select>
        </div>
      </div>
      
      <button 
        type="submit" 
        disabled={pending}
        className="px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-teal-700 transition-all duration-200 shadow-sm font-medium disabled:opacity-50 cursor-pointer"
      >
        {pending ? "Adding..." : "Add Doctor"}
      </button>
    </form>
  )
}
