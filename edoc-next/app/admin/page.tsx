import { prisma } from "@/lib/db"

export default async function AdminDashboard() {
  const doctorCount = await prisma.doctor.count()
  const patientCount = await prisma.patient.count()
  const appointmentCount = await prisma.appointment.count()
  const sessionCount = await prisma.schedule.count()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium">Total Doctors</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{doctorCount}</div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium">Total Patients</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{patientCount}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium">Total Appointments</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{appointmentCount}</div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="text-gray-500 text-sm font-medium">Scheduled Sessions</div>
          <div className="mt-2 text-3xl font-bold text-gray-900">{sessionCount}</div>
        </div>
      </div>
    </div>
  )
}
