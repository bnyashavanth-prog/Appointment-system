import { prisma } from "@/lib/db"
import { auth } from "@/auth"
import SessionForm from "./SessionForm"
import { deleteSession } from "./actions"

export default async function DoctorSchedulePage() {
  const session = await auth()
  
  const doctor = await prisma.doctor.findUnique({
    where: { userId: session!.user.id }
  })

  const schedules = await prisma.schedule.findMany({
    where: { doctorId: doctor?.id },
    orderBy: { scheduledate: 'desc' },
    include: { _count: { select: { appointments: true } } }
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">My Schedule</h1>
      
      <SessionForm />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-medium text-gray-600">Session Title</th>
              <th className="p-4 font-medium text-gray-600">Date & Time</th>
              <th className="p-4 font-medium text-gray-600">Max Patients</th>
              <th className="p-4 font-medium text-gray-600">Booked</th>
              <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((sched) => (
              <tr key={sched.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-medium">{sched.title}</td>
                <td className="p-4">
                  {sched.scheduledate.toLocaleDateString()} @ {sched.scheduletime.toISOString().substring(11, 16)}
                </td>
                <td className="p-4">{sched.nop}</td>
                <td className="p-4">{sched._count.appointments}</td>
                <td className="p-4 text-right">
                  <form action={async () => {
                    "use server"
                    await deleteSession(sched.id)
                  }}>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium border border-red-200 rounded px-3 py-1 hover:bg-red-50">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {schedules.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No sessions scheduled.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
