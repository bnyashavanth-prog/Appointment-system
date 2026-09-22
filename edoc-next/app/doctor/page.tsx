import { auth } from "@/auth"
import { prisma } from "@/lib/db"

export default async function DoctorDashboard() {
  const session = await auth()
  
  const doctor = await prisma.doctor.findUnique({
    where: { userId: session!.user.id },
    include: { specialty: true }
  })

  const sessionCount = await prisma.schedule.count({
    where: { doctorId: doctor?.id }
  })

  const appointmentCount = await prisma.appointment.count({
    where: { 
      schedule: { doctorId: doctor?.id }
    }
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2 animate-fade-in-up">Welcome, Dr. {doctor?.docname || 'Doctor'}!</h1>
      <p className="text-zinc-400 mb-8">{doctor?.specialty.sname}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-8 rounded-3xl transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.08] hover:border-white/25 hover:shadow-[0_16px_40px_0_rgba(0,0,0,0.9)] animate-fade-in-up">
          <div className="text-zinc-400 text-sm font-medium">My Sessions</div>
          <div className="mt-2 text-3xl font-bold text-white">{sessionCount}</div>
        </div>
        
        <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-8 rounded-3xl transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.08] hover:border-white/25 hover:shadow-[0_16px_40px_0_rgba(0,0,0,0.9)] animate-fade-in-up">
          <div className="text-zinc-400 text-sm font-medium">Total Appointments</div>
          <div className="mt-2 text-3xl font-bold text-white">{appointmentCount}</div>
        </div>
      </div>
    </div>
  )
}
