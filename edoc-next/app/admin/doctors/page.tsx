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
      <h1 className="text-4xl font-extrabold text-white mb-8 tracking-tight animate-fade-in-up">Doctors</h1>
      
      <DoctorForm specialties={specialties} />

      <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-3xl transition-all duration-300 ease-out animate-fade-in-up border border-white/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="p-4 font-medium text-zinc-400">Name</th>
              <th className="p-4 font-medium text-zinc-400">Email</th>
              <th className="p-4 font-medium text-zinc-400">Specialty</th>
              <th className="p-4 font-medium text-zinc-400">Phone</th>
              <th className="p-4 font-medium text-zinc-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id} className="border-b border-white/5 hover:bg-white/[0.04] transition-colors duration-200 ease-out">
                <td className="p-4 font-medium">{doc.docname}</td>
                <td className="p-4">{doc.user.email}</td>
                <td className="p-4">{doc.specialty.sname}</td>
                <td className="p-4">{doc.doctel}</td>
                <td className="p-4 text-right">
                  <form action={async () => {
                    "use server"
                    await deleteDoctor(doc.id)
                  }}>
                    <button className="text-red-400 hover:text-red-300 text-sm font-medium border border-red-500/20 rounded px-3 py-1 hover:bg-red-500/100/10 transition-colors">
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
