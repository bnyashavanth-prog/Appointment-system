import { auth } from "@/auth"
import { prisma } from "@/lib/db"

export default async function DoctorDashboard() {
  const session = await auth()
  
  const doctor = await prisma.doctor.findUnique({
    where: { userId: session!.user.id },
    include: { specialty: true }
  })

  const sessionCount = await prisma.schedule.count({
    where: { doctorId: doctor?.id }
  })

  const appointmentCount = await prisma.appointment.count({
    where: { 
      schedule: { doctorId: doctor?.id }
    }
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">Welcome, Dr. {doctor?.docname || 'Doctor'}!</h1>
      <p className="text-gray-500 mb-8">{doctor?.specialty.sname}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium">My Sessions</div>
          <div className="mt-2 text-3xl font-bold text-emerald-600">{sessionCount}</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium">Total Appointments</div>
          <div className="mt-2 text-3xl font-bold text-emerald-600">{appointmentCount}</div>
        </div>
      </div>
    </div>
  )
}
