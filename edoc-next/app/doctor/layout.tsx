import { auth, signOut } from "@/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default async function DoctorLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  
  if (!session || session.user.role !== 'doctor') {
    redirect('/login')
  }

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-emerald-700 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-emerald-600">eDoc Doctor</div>
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/doctor" className="block px-4 py-2 rounded hover:bg-emerald-600">Dashboard</Link>
          <Link href="/doctor/schedule" className="block px-4 py-2 rounded hover:bg-emerald-600">My Schedule</Link>
          <Link href="/doctor/appointments" className="block px-4 py-2 rounded hover:bg-emerald-600">Appointments</Link>
          <Link href="/doctor/patients" className="block px-4 py-2 rounded hover:bg-emerald-600">My Patients</Link>
        </nav>
        <div className="p-4 border-t border-emerald-600">
          <div className="mb-4 text-sm truncate">{session.user.email}</div>
          <form action={async () => {
            "use server"
            await signOut()
          }}>
            <button className="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
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
