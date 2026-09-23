import { prisma } from "@/lib/db"

export default async function AdminDashboard() {
  const [doctorCount, patientCount, appointmentCount, sessionCount] = await Promise.all([
    prisma.doctor.count(),
    prisma.patient.count(),
    prisma.appointment.count(),
    prisma.schedule.count()
  ])

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-white mb-10 tracking-tight animate-fade-in-up">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-8 rounded-3xl transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.08] hover:border-white/25 hover:shadow-[0_16px_40px_0_rgba(0,0,0,0.9)] animate-fade-in-up">
          <div className="text-zinc-400 text-sm font-medium">Total Doctors</div>
          <div className="mt-2 text-3xl font-bold text-white">{doctorCount}</div>
        </div>
        
        <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-8 rounded-3xl transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.08] hover:border-white/25 hover:shadow-[0_16px_40px_0_rgba(0,0,0,0.9)] animate-fade-in-up">
          <div className="text-zinc-400 text-sm font-medium">Total Patients</div>
          <div className="mt-2 text-3xl font-bold text-white">{patientCount}</div>
        </div>

        <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-8 rounded-3xl transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.08] hover:border-white/25 hover:shadow-[0_16px_40px_0_rgba(0,0,0,0.9)] animate-fade-in-up">
          <div className="text-zinc-400 text-sm font-medium">Total Appointments</div>
          <div className="mt-2 text-3xl font-bold text-white">{appointmentCount}</div>
        </div>

        <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-8 rounded-3xl transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.08] hover:border-white/25 hover:shadow-[0_16px_40px_0_rgba(0,0,0,0.9)] animate-fade-in-up">
          <div className="text-zinc-400 text-sm font-medium">Scheduled Sessions</div>
          <div className="mt-2 text-3xl font-bold text-white">{sessionCount}</div>
        </div>
      </div>
    </div>
  )
}
