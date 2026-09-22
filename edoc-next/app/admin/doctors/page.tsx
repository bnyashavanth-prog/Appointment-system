import { prisma } from "@/lib/db"
import DoctorForm from "./DoctorForm"
import { deleteDoctor } from "./actions"

export default async function AdminDoctors() {
  const doctors = await prisma.doctor.findMany({
    include: { specialty: true, user: true }
  })
  
  const specialties = await prisma.specialty.findMany()

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Doctors</h1>
      
      <DoctorForm specialties={specialties} />

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-medium text-gray-600">Name</th>
              <th className="p-4 font-medium text-gray-600">Email</th>
              <th className="p-4 font-medium text-gray-600">Specialty</th>
              <th className="p-4 font-medium text-gray-600">Phone</th>
              <th className="p-4 font-medium text-gray-600 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-medium">{doc.docname}</td>
                <td className="p-4">{doc.user.email}</td>
                <td className="p-4">{doc.specialty.sname}</td>
                <td className="p-4">{doc.doctel}</td>
                <td className="p-4 text-right">
                  <form action={async () => {
                    "use server"
                    await deleteDoctor(doc.id)
                  }}>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium border border-red-200 rounded px-3 py-1 hover:bg-red-50">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
