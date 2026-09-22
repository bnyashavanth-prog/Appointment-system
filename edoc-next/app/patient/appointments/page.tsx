import { prisma } from "@/lib/db"
import { auth } from "@/auth"
import { cancelAppointment } from "./actions"

export default async function PatientAppointments() {
  const session = await auth()
  
  const patient = await prisma.patient.findUnique({
    where: { userId: session!.user.id }
  })

  const appointments = await prisma.appointment.findMany({
    where: { patientId: patient?.id },
    include: {
      schedule: {
        include: { doctor: true }
      }
    },
    orderBy: {
      schedule: { scheduledate: 'asc' }
    }
  })

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-white mb-8 tracking-tight">My Bookings</h1>

      <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-3xl border border-white/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="p-4 font-medium text-zinc-400">Appointment No.</th>
              <th className="p-4 font-medium text-zinc-400">Session Title</th>
              <th className="p-4 font-medium text-zinc-400">Doctor</th>
              <th className="p-4 font-medium text-zinc-400">Date & Time</th>
              <th className="p-4 font-medium text-zinc-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app.id} className="border-b border-white/5 hover:bg-white/10 transition-colors">
                <td className="p-4">{app.apponum}</td>
                <td className="p-4 font-medium">{app.schedule.title}</td>
                <td className="p-4">Dr. {app.schedule.doctor.docname}</td>
                <td className="p-4">
                  {app.schedule.scheduledate.toLocaleDateString()} @ {app.schedule.scheduletime.toString()}
                </td>
                <td className="p-4 text-right">
                  <form action={async () => {
                    "use server"
                    await cancelAppointment(app.id)
                  }}>
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
                  You have no appointments booked.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
