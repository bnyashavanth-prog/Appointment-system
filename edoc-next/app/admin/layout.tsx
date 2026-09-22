import { auth, signOut } from "@/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  
  if (!session || session.user.role !== 'admin') {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <aside className="w-64 bg-slate-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-slate-700">eDoc Admin</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin" className="block px-4 py-2 rounded hover:bg-slate-700">Dashboard</Link>
          <Link href="/admin/doctors" className="block px-4 py-2 rounded hover:bg-slate-700">Doctors</Link>
          <Link href="/admin/patients" className="block px-4 py-2 rounded hover:bg-slate-700">Patients</Link>
          <Link href="/admin/appointments" className="block px-4 py-2 rounded hover:bg-slate-700">Appointments</Link>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <div className="mb-4 text-sm truncate">{session.user.email}</div>
          <form action={async () => {
            "use server"
            await signOut()
          }}>
            <button className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
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
