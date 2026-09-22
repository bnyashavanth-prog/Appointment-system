import { prisma } from "@/lib/db"

export default async function AdminDashboard() {
  const doctorCount = await prisma.doctor.count()
  const patientCount = await prisma.patient.count()
  const appointmentCount = await prisma.appointment.count()
  const sessionCount = await prisma.schedule.count()

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-white mb-10 tracking-tight">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-8 rounded-3xl transition-transform hover:-translate-y-1">
          <div className="text-zinc-400 text-sm font-medium">Total Doctors</div>
          <div className="mt-2 text-3xl font-bold text-white">{doctorCount}</div>
        </div>
        
        <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-8 rounded-3xl transition-transform hover:-translate-y-1">
          <div className="text-zinc-400 text-sm font-medium">Total Patients</div>
          <div className="mt-2 text-3xl font-bold text-white">{patientCount}</div>
        </div>

        <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-8 rounded-3xl transition-transform hover:-translate-y-1">
          <div className="text-zinc-400 text-sm font-medium">Total Appointments</div>
          <div className="mt-2 text-3xl font-bold text-white">{appointmentCount}</div>
        </div>

        <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-8 rounded-3xl transition-transform hover:-translate-y-1">
          <div className="text-zinc-400 text-sm font-medium">Scheduled Sessions</div>
          <div className="mt-2 text-3xl font-bold text-white">{sessionCount}</div>
        </div>
      </div>
    </div>
  )
}
