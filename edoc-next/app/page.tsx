import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-[#050505] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white/[0.02] rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10 backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-3xl p-10">
        <h1 className="text-5xl font-extrabold text-white tracking-tight">eDoc</h1>
        <p className="mt-4 text-xl text-zinc-300">Doctor Appointment System</p>
        <p className="mt-2 text-md text-zinc-400">Book appointments with qualified doctors online.</p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login" className="inline-flex justify-center items-center rounded-xl bg-white py-3 px-8 text-sm font-medium text-black hover:bg-zinc-200 transition-all duration-300 shadow-lg">
            Login
          </Link>
          <Link href="/signup" className="inline-flex justify-center items-center rounded-xl bg-white/10 hover:bg-white/20 py-3 px-8 text-sm font-medium text-white border border-white/20 transition-all duration-300">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
