import { prisma } from "@/lib/db"
import Link from "next/link"
import { Suspense } from "react"
import { SkeletonCard } from "@/components/ui/SkeletonBlock"

async function DoctorsListItems() {
  const doctors = await prisma.doctor.findMany({
    include: { specialty: true, user: true }
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {doctors.map(doctor => (
        <div key={doctor.id} className="bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">{doctor.docname}</h2>
              <p className="text-sm text-muted-foreground">{doctor.specialty?.sname || 'General'}</p>
            </div>
          </div>
          
          <div className="space-y-1.5 mb-5 text-sm text-slate-600">
            <p><span className="font-medium text-slate-500">Email:</span> {doctor.user.email}</p>
            <p><span className="font-medium text-slate-500">Phone:</span> {doctor.doctel}</p>
          </div>

          <Link 
            href={`/patient/schedule/${doctor.id}`}
            className="block w-full text-center bg-primary text-white py-2.5 rounded-xl hover:bg-teal-700 font-medium transition-all duration-200 text-sm"
          >
            View Schedule & Book
          </Link>
        </div>
      ))}

      {doctors.length === 0 && (
        <div className="col-span-full text-center text-muted-foreground py-12">
          No doctors available at the moment.
        </div>
      )}
    </div>
  )
}

export default async function DoctorsList() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-foreground mb-8">Our Doctors</h1>
      <Suspense fallback={
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <SkeletonCard /><SkeletonCard /><SkeletonCard />
        </div>
      }>
        <DoctorsListItems />
      </Suspense>
    </div>
  )
}
