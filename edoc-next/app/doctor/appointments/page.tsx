import { prisma } from "@/lib/db"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export default async function DoctorAppointments() {
  const session = await auth()
  
  const doctor = await prisma.doctor.findUnique({
    where: { userId: session!.user.id }
  })

  const appointments = await prisma.appointment.findMany({
    where: { 
      schedule: { doctorId: doctor?.id }
    },
    include: {
      schedule: true,
      patient: true
    },
    orderBy: {
      schedule: { scheduledate: 'desc' }
    }
  })

  async function cancelAppointment(appointmentId: number) {
    "use server"
    // Security check: ensure this belongs to the doctor
    const session = await auth()
    if (!session || session.user.role !== 'doctor') return
    const doc = await prisma.doctor.findUnique({ where: { userId: session.user.id } })
    const appt = await prisma.appointment.findUnique({ where: { id: appointmentId }, include: { schedule: true } })
    
    if (appt?.schedule.doctorId === doc?.id) {
      await prisma.appointment.delete({ where: { id: appointmentId } })
      revalidatePath('/doctor/appointments')
    }
  }

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-white mb-8 tracking-tight animate-fade-in-up">Patient Appointments</h1>

      <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-3xl transition-all duration-300 ease-out animate-fade-in-up border border-white/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="p-4 font-medium text-zinc-400">Appt No.</th>
              <th className="p-4 font-medium text-zinc-400">Patient Name</th>
              <th className="p-4 font-medium text-zinc-400">Session</th>
              <th className="p-4 font-medium text-zinc-400">Date & Time</th>
              <th className="p-4 font-medium text-zinc-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app.id} className="border-b border-white/5 hover:bg-white/[0.04] transition-colors duration-200 ease-out">
                <td className="p-4">{app.apponum}</td>
                <td className="p-4 font-medium">{app.patient.pname} <span className="text-xs text-gray-400 block">{app.patient.ptel}</span></td>
                <td className="p-4">{app.schedule.title}</td>
                <td className="p-4">
                  {app.schedule.scheduledate.toLocaleDateString()} @ {app.schedule.scheduletime.toISOString().substring(11, 16)}
                </td>
                <td className="p-4 text-right">
                  <form action={cancelAppointment.bind(null, app.id)}>
                    <button className="text-red-400 hover:text-red-300 text-sm font-medium border border-red-500/20 rounded px-3 py-1 hover:bg-red-500/100/10 transition-colors">
                      Cancel
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-zinc-400">
                  No appointments booked for your sessions yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
