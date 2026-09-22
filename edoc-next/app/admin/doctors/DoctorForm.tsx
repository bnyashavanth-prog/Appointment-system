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
    <form id="doctorForm" action={handleSubmit} className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-8 rounded-3xl transition-transform hover:-translate-y-1 mb-8 space-y-4">
      <h2 className="text-xl font-bold mb-4">Add New Doctor</h2>
      
      {error && <div className="text-red-400 bg-red-500/10 p-2 rounded text-sm">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-zinc-300">Name</label>
          <input name="docname" required className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300">Email</label>
          <input type="email" name="email" required className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300">Password</label>
          <input type="password" name="password" required className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300">NIC Number</label>
          <input name="docnic" required className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300">Phone</label>
          <input name="doctel" required className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-zinc-300">Specialty</label>
          <select name="specialtyId" required className="mt-1 block w-full rounded-xl border-gray-300 shadow-sm border px-3 py-2">
            {specialties.map(s => (
              <option key={s.id} value={s.id}>{s.sname}</option>
            ))}
          </select>
        </div>
      </div>
      
      <button 
        type="submit" 
        disabled={pending}
        className="px-4 py-2 backdrop-blur-2xl bg-white/[0.03] border-r border-white/10 text-white rounded-xl hover:bg-slate-900 disabled:opacity-50 mt-4"
      >
        {pending ? "Adding..." : "Add Doctor"}
      </button>
    </form>
  )
}
