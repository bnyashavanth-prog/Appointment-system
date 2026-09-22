"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"

export async function cancelAppointment(appointmentId: number) {
  const session = await auth()
  if (!session || session.user.role !== 'patient') throw new Error("Unauthorized")

  const patient = await prisma.patient.findUnique({
    where: { userId: session.user.id }
  })

  // Ensure this appointment belongs to this patient
  const appointment = await prisma.appointment.findFirst({
    where: { 
      id: appointmentId,
      patientId: patient?.id
    }
  })

  if (!appointment) throw new Error("Appointment not found")

  await prisma.appointment.delete({
    where: { id: appointmentId }
  })

  revalidatePath('/patient/appointments')
}
