import { prisma } from "@/lib/db"
import { bookAppointment } from "./actions"

export default async function DoctorSchedule({ params }: { params: Promise<{ doctorId: string }> }) {
  const { doctorId } = await params
  
  const doctor = await prisma.doctor.findUnique({
    where: { id: parseInt(doctorId) },
    include: { specialty: true }
  })

  if (!doctor) return <div>Doctor not found</div>

  const schedules = await prisma.schedule.findMany({
    where: { 
      doctorId: doctor.id,
      scheduledate: { gte: new Date() }
    },
    include: {
      _count: { select: { appointments: true } }
    },
    orderBy: { scheduledate: 'asc' }
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Dr. {doctor.docname}'s Schedule</h1>
      <p className="text-gray-500 mb-8">{doctor.specialty.sname}</p>

      <div className="space-y-4">
        {schedules.map(schedule => {
          const isFull = schedule._count.appointments >= schedule.nop
          return (
            <div key={schedule.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{schedule.title}</h3>
                <p className="text-gray-600">
                  {schedule.scheduledate.toLocaleDateString()} at {schedule.scheduletime.toString()}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Booked: {schedule._count.appointments} / {schedule.nop}
                </p>
              </div>
              
              <form action={async () => {
                "use server"
                await bookAppointment(schedule.id)
              }}>
                <button 
                  type="submit"
                  disabled={isFull}
                  className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {isFull ? 'Full' : 'Book Now'}
                </button>
              </form>
            </div>
          )
        })}

        {schedules.length === 0 && (
          <div className="text-gray-500">No upcoming sessions scheduled for this doctor.</div>
        )}
      </div>
    </div>
  )
}

