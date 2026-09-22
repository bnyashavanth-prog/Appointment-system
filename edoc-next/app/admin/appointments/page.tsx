import { prisma } from "@/lib/db"
import { revalidatePath } from "next/cache"

export default async function AdminAppointments() {
  const appointments = await prisma.appointment.findMany({
    include: {
      schedule: { include: { doctor: true } },
      patient: true
    },
    orderBy: {
      schedule: { scheduledate: 'desc' }
    }
  })

  async function cancelAppointment(appointmentId: number) {
    "use server"
    await prisma.appointment.delete({ where: { id: appointmentId } })
    revalidatePath('/admin/appointments')
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Appointments</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-medium text-gray-600">Patient</th>
              <th className="p-4 font-medium text-gray-600">Doctor</th>
              <th className="p-4 font-medium text-gray-600">Session</th>
              <th className="p-4 font-medium text-gray-600">Date & Time</th>
              <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-medium">{app.patient.pname}</td>
                <td className="p-4">Dr. {app.schedule.doctor.docname}</td>
                <td className="p-4">{app.schedule.title}</td>
                <td className="p-4">
                  {app.schedule.scheduledate.toLocaleDateString()} @ {app.schedule.scheduletime.toISOString().substring(11, 16)}
                </td>
                <td className="p-4 text-right">
                  <form action={cancelAppointment.bind(null, app.id)}>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium border border-red-200 rounded px-3 py-1 hover:bg-red-50">
                      Cancel
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
