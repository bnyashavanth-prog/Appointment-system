import { prisma } from "@/lib/db"
import Link from "next/link"

import { Suspense } from "react"

async function DoctorsListItems() {
  const doctors = await prisma.doctor.findMany({
    include: {
      specialty: true,
      user: true
    }
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {doctors.map(doctor => (
        <div key={doctor.id} className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] p-8 rounded-3xl transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/[0.08] hover:border-white/25 hover:shadow-[0_16px_40px_0_rgba(0,0,0,0.9)] animate-fade-in-up">
          <h2 className="text-xl font-bold">{doctor.docname}</h2>
          <p className="text-zinc-400 mb-4">{doctor.specialty?.sname || 'General'}</p>
          
          <div className="space-y-2 mb-6 text-sm">
            <p><strong>Email:</strong> {doctor.user.email}</p>
            <p><strong>Phone:</strong> {doctor.doctel}</p>
          </div>

          <Link 
            href={`/patient/schedule/${doctor.id}`}
            className="block w-full text-center bg-white text-black py-2 rounded-xl hover:bg-zinc-200 font-medium transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.97]"
          >
            View Schedule & Book
          </Link>
        </div>
      ))}

      {doctors.length === 0 && (
        <div className="col-span-full text-center text-zinc-400 py-12">
          No doctors available at the moment.
        </div>
      )}
    </div>
  )
}

export default async function DoctorsList() {
  return (
    <div>
      <h1 className="text-4xl font-extrabold text-white mb-8 tracking-tight animate-fade-in-up">Our Doctors</h1>
      
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-pulse">
          <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-3xl h-64"></div>
          <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-3xl h-64"></div>
          <div className="backdrop-blur-2xl bg-white/[0.06] border border-white/15 shadow-[0_8px_32px_0_rgba(0,0,0,0.8)] rounded-3xl h-64"></div>
        </div>
      }>
        <DoctorsListItems />
      </Suspense>
    </div>
  )
}
