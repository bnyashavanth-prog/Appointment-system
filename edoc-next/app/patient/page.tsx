import { auth } from "@/auth"
import { prisma } from "@/lib/db"

export default async function PatientDashboard() {
  const session = await auth()
  
  const patient = await prisma.patient.findUnique({
    where: { userId: session!.user.id }
  })

  const upcomingAppointments = await prisma.appointment.count({
    where: { 
      patientId: patient?.id,
      schedule: {
        scheduledate: {
          gte: new Date()
        }
      }
    }
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Welcome, {patient?.pname || 'Patient'}!</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium">Upcoming Appointments</div>
          <div className="mt-2 text-3xl font-bold text-blue-600">{upcomingAppointments}</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium">Quick Actions</div>
          <div className="mt-4 flex flex-col gap-2">
            <a href="/patient/doctors" className="text-blue-600 hover:underline">Book a new appointment &rarr;</a>
            <a href="/patient/appointments" className="text-blue-600 hover:underline">View my history &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  )
}
