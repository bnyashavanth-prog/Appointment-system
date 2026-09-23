import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle decorative circles */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-teal-100 rounded-full blur-3xl opacity-40 pointer-events-none"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-teal-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
      
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10 bg-white border border-border shadow-lg rounded-2xl p-10 animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-50 rounded-2xl mb-6">
          <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-foreground tracking-tight">eDoc</h1>
        <p className="mt-3 text-lg text-muted-foreground">Doctor Appointment System</p>
        <p className="mt-2 text-sm text-slate-400">Book appointments with qualified doctors online.</p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/login" className="inline-flex justify-center items-center rounded-xl bg-primary py-3 px-8 text-sm font-medium text-white hover:bg-teal-700 transition-all duration-200 shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-[0.98]">
            Login
          </Link>
          <Link href="/signup" className="inline-flex justify-center items-center rounded-xl bg-white hover:bg-slate-50 py-3 px-8 text-sm font-medium text-slate-700 border border-border transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.98]">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
