import { auth, signOut } from "@/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  try {
    const session = await auth()
    
    if (!session || session.user.role !== 'admin') {
      redirect('/login')
    }

    return (
      <div className="flex h-screen bg-background">
        <aside className="w-64 bg-white border-r border-border flex flex-col shadow-sm">
          <div className="p-5 border-b border-border">
            <div className="text-xl font-bold text-primary tracking-tight">eDoc</div>
            <div className="text-xs text-muted-foreground mt-0.5">Admin Portal</div>
          </div>
          <nav className="flex-1 p-3 space-y-1">
            <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-accent hover:text-primary transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              Dashboard
            </Link>
            <Link href="/admin/doctors" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-accent hover:text-primary transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              Doctors
            </Link>
            <Link href="/admin/patients" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-accent hover:text-primary transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              Patients
            </Link>
            <Link href="/admin/appointments" className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-accent hover:text-primary transition-colors">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Appointments
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
        <h1 className="text-2xl font-bold mb-4">Admin Layout Error</h1>
        <pre className="whitespace-pre-wrap text-sm">{error.message || String(error)}</pre>
      </div>
    )
  }
}
