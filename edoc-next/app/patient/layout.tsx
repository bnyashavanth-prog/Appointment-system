import { auth, signOut } from "@/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function PatientLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  
  if (!session || session.user.role !== 'patient') {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-[#050505]">
      <aside className="w-64 backdrop-blur-2xl bg-white/[0.03] border-r border-white/10 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-white/10">eDoc Patient</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/patient" className="block px-4 py-2 rounded hover:bg-white/10 text-zinc-300 hover:text-white transition-all">Dashboard</Link>
          <Link href="/patient/doctors" className="block px-4 py-2 rounded hover:bg-white/10 text-zinc-300 hover:text-white transition-all">All Doctors</Link>
          <Link href="/patient/appointments" className="block px-4 py-2 rounded hover:bg-white/10 text-zinc-300 hover:text-white transition-all">My Bookings</Link>
          <Link href="/patient/settings" className="block px-4 py-2 rounded hover:bg-white/10 text-zinc-300 hover:text-white transition-all">Settings</Link>
        </nav>
        <div className="p-4 border-t border-white/10">
          <div className="mb-4 text-sm truncate">{session.user.email}</div>
          <form action={async () => {
            "use server"
            await signOut()
          }}>
            <button className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97] px-4 py-2 rounded">
              Log Out
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 overflow-auto p-8">
        {children}
      </main>
    </div>
  )
}
