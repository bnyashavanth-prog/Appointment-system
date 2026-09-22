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
    <form id="doctorForm" action={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8 space-y-4">
      <h2 className="text-xl font-bold mb-4">Add New Doctor</h2>
      
      {error && <div className="text-red-600 bg-red-50 p-2 rounded text-sm">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input name="docname" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input type="password" name="password" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">NIC Number</label>
          <input name="docnic" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Phone</label>
          <input name="doctel" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Specialty</label>
          <select name="specialtyId" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border px-3 py-2">
            {specialties.map(s => (
              <option key={s.id} value={s.id}>{s.sname}</option>
            ))}
          </select>
        </div>
      </div>
      
      <button 
        type="submit" 
        disabled={pending}
        className="px-4 py-2 bg-slate-800 text-white rounded-md hover:bg-slate-900 disabled:opacity-50 mt-4"
      >
        {pending ? "Adding..." : "Add Doctor"}
      </button>
    </form>
  )
}
