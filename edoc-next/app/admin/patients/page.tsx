import { prisma } from "@/lib/db"

export default async function AdminPatients() {
  const patients = await prisma.patient.findMany({
    include: { user: true }
  })

  return (
    <div>
      <h1 className="text-4xl font-extrabold text-white mb-8 tracking-tight animate-fade-in-up">Patients</h1>

      <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-3xl transition-all duration-300 ease-out animate-fade-in-up border border-white/10 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10">
              <th className="p-4 font-medium text-zinc-400">Name</th>
              <th className="p-4 font-medium text-zinc-400">Email</th>
              <th className="p-4 font-medium text-zinc-400">NIC</th>
              <th className="p-4 font-medium text-zinc-400">Phone</th>
              <th className="p-4 font-medium text-zinc-400">DOB</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((pat) => (
              <tr key={pat.id} className="border-b border-white/5 hover:bg-white/[0.04] transition-colors duration-200 ease-out">
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
