"use client"

import { useFormStatus } from "react-dom"
import { useState, useRef } from "react"
import { Check } from "lucide-react"

export function SubmitButton({ children }: { children: React.ReactNode }) {
  const { pending } = useFormStatus()
  const [ripples, setRipples] = useState<{ x: number, y: number, id: number }[]>([])
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  // Create a ripple effect on click
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return
    const rect = buttonRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()
    setRipples((prev) => [...prev, { x, y, id }])
    
    // Remove ripple after animation completes
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 500)
  }

  // NOTE: The green checkmark logic isn't fully possible here without knowing 
  // if login succeeded, because Server Actions either throw RedirectError (success) 
  // or return an error object. But we show a spinner while pending.
  
  return (
    <button 
      ref={buttonRef}
      type="submit" 
      onClick={handleClick}
      disabled={pending}
      className="w-full py-3.5 bg-[#0F766E] text-white rounded-xl font-bold text-base transition-all duration-200 shadow-sm hover:bg-[#0d645e] hover:-translate-y-px hover:shadow-md active:scale-[0.98] disabled:opacity-90 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:active:scale-100 flex items-center justify-center gap-2 relative overflow-hidden"
    >
      {/* Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="absolute bg-white/30 rounded-full animate-ripple pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: '200%',
            height: '200%',
            transform: 'translate(-50%, -50%) scale(0)',
          }}
        />
      ))}
      
      {pending ? (
        <div className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      ) : (
        <span className="relative z-10">{children}</span>
      )}
    </button>
  )
}
