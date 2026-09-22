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
    <form id="sessionForm" action={handleSubmit} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 mb-8 space-y-4">
      <h2 className="text-xl font-bold mb-4">Add New Session</h2>
      
      {error && <div className="text-red-600 bg-red-50 p-2 rounded text-sm">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Session Title</label>
          <input name="title" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Date</label>
          <input type="date" name="scheduledate" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Time</label>
          <input type="time" name="scheduletime" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Max Patients</label>
          <input type="number" name="nop" min="1" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border px-3 py-2" />
        </div>
      </div>
      
      <button 
        type="submit" 
        disabled={pending}
        className="px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 disabled:opacity-50 mt-4"
      >
        {pending ? "Adding..." : "Add Session"}
      </button>
    </form>
  )
}
