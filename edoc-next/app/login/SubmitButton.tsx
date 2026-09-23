"use client"

import { useFormStatus } from "react-dom"

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()

  return (
    <button 
      type="submit" 
      disabled={pending}
      className="w-full px-4 py-2 text-black bg-white rounded-xl hover:bg-zinc-200 transition-all duration-300 shadow-lg hover:-translate-y-0.5 active:scale-[0.97] font-medium disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
    >
      {pending && (
        <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      )}
      {pending ? "Logging in..." : children}
    </button>
  )
}
