import { auth } from "@/auth"
import { prisma } from "@/lib/db"
import { Suspense } from "react"
import { SkeletonTable } from "@/components/ui/SkeletonBlock"

async function ScheduleList({ userId }: { userId: string }) {
  const doctor = await prisma.doctor.findUnique({ where: { userId } })
  const schedules = await prisma.schedule.findMany({
    where: { doctorId: doctor?.id },
    include: { _count: { select: { appointments: true } } },
    orderBy: { scheduledate: 'asc' }
  })

  return (
    <div className="bg-card rounded-2xl border border-border shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b border-border">
            <th className="p-4 font-medium text-sm text-muted-foreground">Session</th>
            <th className="p-4 font-medium text-sm text-muted-foreground">Date</th>
            <th className="p-4 font-medium text-sm text-muted-foreground">Time</th>
            <th className="p-4 font-medium text-sm text-muted-foreground">Capacity</th>
          </tr>
        </thead>
        <tbody>
          {schedules.map((s) => (
            <tr key={s.id} className="border-b border-border last:border-0 hover:bg-slate-50/50 transition-colors">
              <td className="p-4 text-sm font-medium">{s.title}</td>
              <td className="p-4 text-sm text-muted-foreground">{s.scheduledate.toLocaleDateString()}</td>
              <td className="p-4 text-sm text-muted-foreground">{s.scheduletime.toString()}</td>
              <td className="p-4 text-sm">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  s._count.appointments >= s.nop 
                    ? 'bg-red-50 text-red-700' 
                    : 'bg-teal-50 text-teal-700'
                }`}>
                  {s._count.appointments} / {s.nop}
                </span>
              </td>
            </tr>
          ))}
          {schedules.length === 0 && (
            <tr>
              <td colSpan={4} className="p-8 text-center text-muted-foreground">No sessions scheduled yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default async function DoctorSchedulePage() {
  const session = await auth()
  if (!session?.user?.id) return null

  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">My Schedule</h1>
      <Suspense fallback={<SkeletonTable rows={3} cols={4} />}>
        <ScheduleList userId={session.user.id} />
      </Suspense>
    </div>
  )
}
