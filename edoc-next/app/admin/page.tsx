import { prisma } from "@/lib/db"
import { Suspense } from "react"
import { SkeletonStats } from "@/components/ui/SkeletonBlock"

async function AdminDashboardStats() {
  const [doctorCount, patientCount, appointmentCount, sessionCount] = await Promise.all([
    prisma.doctor.count(),
    prisma.patient.count(),
    prisma.appointment.count(),
    prisma.schedule.count()
  ])

  const stats = [
    { label: "Total Doctors", value: doctorCount, color: "text-primary" },
    { label: "Total Patients", value: patientCount, color: "text-teal-600" },
    { label: "Appointments", value: appointmentCount, color: "text-primary" },
    { label: "Sessions", value: sessionCount, color: "text-teal-600" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
          <div className={`mt-1 text-3xl font-bold ${stat.color}`}>{stat.value}</div>
        </div>
      ))}
    </div>
  )
}

export default async function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Admin Dashboard</h1>
      <Suspense fallback={<SkeletonStats count={4} />}>
        <AdminDashboardStats />
      </Suspense>
    </div>
  )
}
