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
      <h1 className="text-4xl font-extrabold text-white mb-8 tracking-tight">My Schedule</h1>
      
      <SessionForm />

      <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-3xl border border-white/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="p-4 font-medium text-zinc-400">Session Title</th>
              <th className="p-4 font-medium text-zinc-400">Date & Time</th>
              <th className="p-4 font-medium text-zinc-400">Max Patients</th>
              <th className="p-4 font-medium text-zinc-400">Booked</th>
              <th className="p-4 font-medium text-zinc-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.map((sched) => (
              <tr key={sched.id} className="border-b border-white/5 hover:bg-white/10 transition-colors">
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
                    <button className="text-red-400 hover:text-red-300 text-sm font-medium border border-red-500/20 rounded px-3 py-1 hover:bg-red-500/100/10 transition-colors">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {schedules.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-zinc-400">
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
