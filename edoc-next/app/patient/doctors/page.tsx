import { prisma } from "@/lib/db"
import Link from "next/link"

export default async function DoctorsList() {
  const doctors = await prisma.doctor.findMany({
    include: {
      specialty: true,
      user: true
    }
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Our Doctors</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {doctors.map(doctor => (
          <div key={doctor.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <h2 className="text-xl font-bold">{doctor.docname}</h2>
            <p className="text-gray-500 mb-4">{doctor.specialty.sname}</p>
            
            <div className="space-y-2 mb-6 text-sm">
              <p><strong>Email:</strong> {doctor.user.email}</p>
              <p><strong>Phone:</strong> {doctor.doctel}</p>
            </div>

            <Link 
              href={`/patient/schedule/${doctor.id}`}
              className="block w-full text-center bg-blue-50 text-blue-700 py-2 rounded-md hover:bg-blue-100 font-medium"
            >
              View Schedule & Book
            </Link>
          </div>
        ))}

        {doctors.length === 0 && (
          <div className="col-span-full text-center text-gray-500 py-12">
            No doctors available at the moment.
          </div>
        )}
      </div>
    </div>
  )
}
