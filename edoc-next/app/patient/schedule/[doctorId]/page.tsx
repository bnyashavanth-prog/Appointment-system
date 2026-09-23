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
      <h1 className="text-3xl font-bold mb-2 animate-fade-in-up">Dr. {doctor.docname}'s Schedule</h1>
      <p className="text-zinc-400 mb-8">{doctor.specialty?.sname || 'General'}</p>

      <div className="space-y-4">
        {schedules.map(schedule => {
          const isFull = schedule._count.appointments >= schedule.nop
          return (
            <div key={schedule.id} className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-8 rounded-3xl transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.08] hover:border-white/25 hover:shadow-[0_16px_40px_0_rgba(0,0,0,0.9)] animate-fade-in-up flex justify-between items-center">
              <div>
                <h3 className="text-lg font-bold">{schedule.title}</h3>
                <p className="text-zinc-400">
                  {schedule.scheduledate.toLocaleDateString()} at {schedule.scheduletime.toString()}
                </p>
                <p className="text-sm text-zinc-400 mt-1">
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
                  className="px-6 py-2 bg-white text-black rounded-xl hover:bg-zinc-200 transition-all duration-300 shadow-lg hover:-translate-y-0.5 active:scale-[0.97] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isFull ? 'Full' : 'Book Now'}
                </button>
              </form>
            </div>
          )
        })}

        {schedules.length === 0 && (
          <div className="text-zinc-400">No upcoming sessions scheduled for this doctor.</div>
        )}
      </div>
    </div>
  )
}

