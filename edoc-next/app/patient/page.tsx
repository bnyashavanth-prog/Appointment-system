import { auth } from "@/auth"
import { prisma } from "@/lib/db"

export default async function PatientDashboard() {
  const session = await auth()
  
  const patient = await prisma.patient.findUnique({
    where: { userId: session!.user.id }
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
    <div>
      <h1 className="text-4xl font-extrabold text-white mb-10 tracking-tight">Welcome, {patient?.pname || 'Patient'}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-8 rounded-3xl transition-transform hover:-translate-y-1">
          <div className="text-zinc-400 text-sm font-medium">Upcoming Appointments</div>
          <div className="mt-2 text-3xl font-bold text-white">{upcomingAppointments}</div>
        </div>
        
        <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-8 rounded-3xl transition-transform hover:-translate-y-1">
          <div className="text-zinc-400 text-sm font-medium">Quick Actions</div>
          <div className="mt-4 flex flex-col gap-2">
            <a href="/patient/doctors" className="text-white hover:underline">Book a new appointment &rarr;</a>
            <a href="/patient/appointments" className="text-white hover:underline">View my history &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  )
}
