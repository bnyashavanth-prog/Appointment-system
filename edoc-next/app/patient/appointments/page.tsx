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
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-medium text-gray-600">Appointment No.</th>
              <th className="p-4 font-medium text-gray-600">Session Title</th>
              <th className="p-4 font-medium text-gray-600">Doctor</th>
              <th className="p-4 font-medium text-gray-600">Date & Time</th>
              <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
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
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium border border-red-200 rounded px-3 py-1 hover:bg-red-50">
                      Cancel
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {appointments.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
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
