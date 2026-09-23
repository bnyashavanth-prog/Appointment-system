import { prisma } from "@/lib/db"

import { Suspense } from "react"

async function AdminPatientsList() {
  const patients = await prisma.patient.findMany({
    include: { user: true }
  })

  return (
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
          {patients.length === 0 && (
            <tr>
              <td colSpan={5} className="p-8 text-center text-zinc-400">
                No patients registered yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default async function AdminPatients() {
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-white mb-8 tracking-tight animate-fade-in-up">Patients</h1>

      <Suspense fallback={
        <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-3xl h-64 flex items-center justify-center animate-pulse">
           <div className="text-zinc-500">Loading patients...</div>
        </div>
      }>
        <AdminPatientsList />
      </Suspense>
    </div>
  )
}
