"use client"

import { useFormStatus } from "react-dom"

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full px-4 py-2.5 bg-primary text-white rounded-xl hover:bg-teal-700 transition-all duration-200 shadow-sm hover:shadow-md font-medium disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
    >
      {pending && (
        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      )}
      {pending ? "Logging in..." : children}
    </button>
  )
}
