import { prisma } from "@/lib/db"

export default async function AdminPatients() {
  const patients = await prisma.patient.findMany({
    include: { user: true }
  })

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Patients</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="p-4 font-medium text-gray-600">Name</th>
              <th className="p-4 font-medium text-gray-600">Email</th>
              <th className="p-4 font-medium text-gray-600">NIC</th>
              <th className="p-4 font-medium text-gray-600">Phone</th>
              <th className="p-4 font-medium text-gray-600">DOB</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((pat) => (
              <tr key={pat.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-4 font-medium">{pat.pname}</td>
                <td className="p-4">{pat.user.email}</td>
                <td className="p-4">{pat.pnic}</td>
                <td className="p-4">{pat.ptel}</td>
                <td className="p-4">{pat.pdob.toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
