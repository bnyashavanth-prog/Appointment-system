import { auth } from "@/auth"
import { prisma } from "@/lib/db"

import { Suspense } from "react"

async function PatientDashboardStats({ userId }: { userId: string }) {
  const patient = await prisma.patient.findUnique({
    where: { userId }
  })

  const upcomingAppointments = await prisma.appointment.count({
    where: { 
      patientId: patient?.id,
      schedule: {
        scheduledate: {
          gte: new Date()
        }
      }
    }
  })

  return (
    <>
      <h1 className="text-4xl font-extrabold text-white mb-10 tracking-tight animate-fade-in-up">Welcome, {patient?.pname || 'Patient'}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-8 rounded-3xl transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.08] hover:border-white/25 hover:shadow-[0_16px_40px_0_rgba(0,0,0,0.9)] animate-fade-in-up">
          <div className="text-zinc-400 text-sm font-medium">Upcoming Appointments</div>
          <div className="mt-2 text-3xl font-bold text-white">{upcomingAppointments}</div>
        </div>
        
        <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-8 rounded-3xl transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.08] hover:border-white/25 hover:shadow-[0_16px_40px_0_rgba(0,0,0,0.9)] animate-fade-in-up">
          <div className="text-zinc-400 text-sm font-medium">Quick Actions</div>
          <div className="mt-4 flex flex-col gap-2">
            <a href="/patient/doctors" className="text-white hover:underline">Book a new appointment &rarr;</a>
            <a href="/patient/appointments" className="text-white hover:underline">View my history &rarr;</a>
          </div>
        </div>
      </div>
    </>
  )
}

export default async function PatientDashboard() {
  try {
    const session = await auth()
    if (!session?.user?.id) return null

    return (
      <div>
        <Suspense fallback={
          <div className="animate-pulse">
            <div className="h-10 bg-white/10 rounded w-1/3 mb-10"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-40 bg-white/10 rounded-3xl"></div>
              <div className="h-40 bg-white/10 rounded-3xl"></div>
            </div>
          </div>
        }>
          <PatientDashboardStats userId={session.user.id} />
        </Suspense>
      </div>
    )
  } catch (error: any) {
    return (
      <div className="p-8 bg-red-900/50 text-white rounded-3xl border border-red-500">
        <h1 className="text-2xl font-bold mb-4">Patient Dashboard Crash Report</h1>
        <pre className="whitespace-pre-wrap">{error.message || String(error)}</pre>
        <pre className="whitespace-pre-wrap mt-4 text-sm text-red-200">{error.stack}</pre>
      </div>
    )
  }
}
