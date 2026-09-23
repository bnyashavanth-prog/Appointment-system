import { auth, signOut } from "@/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function PatientLayout({ children }: { children: React.ReactNode }) {
  try {
    const session = await auth()
    
    if (!session || session.user.role !== 'patient') {
      redirect('/login')
    }

    return (
      <div className="flex h-screen bg-background">
        <aside className="w-64 bg-white border-r border-border flex flex-col shadow-sm">
          <div className="p-5 border-b border-border">
            <div className="text-xl font-bold text-primary tracking-tight">eDoc</div>
            <div className="text-xs text-muted-foreground mt-0.5">Patient Portal</div>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            <Link href="/patient" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-accent hover:text-primary transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              Dashboard
            </Link>
            <Link href="/patient/doctors" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-accent hover:text-primary transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              Find Doctors
            </Link>
            <Link href="/patient/appointments" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-accent hover:text-primary transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              My Bookings
            </Link>
            <Link href="/patient/settings" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-accent hover:text-primary transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              Settings
            </Link>
          </nav>
          <div className="p-4 border-t border-border">
            <div className="mb-3 text-xs text-muted-foreground truncate">{session.user.email}</div>
            <form action={async () => {
              "use server"
              await signOut()
            }}>
              <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium transition-colors px-4 py-2 rounded-xl cursor-pointer">
                Log Out
              </button>
            </form>
          </div>
        </aside>
        <main className="flex-1 overflow-auto p-8 bg-background">
          {children}
        </main>
      </div>
    )
  } catch (error: any) {
    if (error.message === "NEXT_REDIRECT" || error.name === "RedirectError" || error.digest?.startsWith('NEXT_REDIRECT')) {
      throw error;
    }
    return (
      <div className="p-8 bg-red-50 text-red-900 rounded-2xl border border-red-200 m-8">
        <h1 className="text-2xl font-bold mb-4">Patient Layout Error</h1>
        <pre className="whitespace-pre-wrap text-sm">{error.message || String(error)}</pre>
      </div>
    )
  }
}
