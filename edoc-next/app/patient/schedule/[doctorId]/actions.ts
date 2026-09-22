"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function bookAppointment(scheduleId: number) {
  const session = await auth()
  if (!session || session.user.role !== 'patient') {
    throw new Error("Unauthorized")
  }

  const patient = await prisma.patient.findUnique({
    where: { userId: session.user.id }
  })

  if (!patient) throw new Error("Patient record not found")

  // Check if patient already booked this session
  const existing = await prisma.appointment.findFirst({
    where: {
      scheduleId,
      patientId: patient.id
    }
  })

  if (existing) {
    return { error: "You have already booked this session." }
  }

  // Get schedule details and current bookings count
  const schedule = await prisma.schedule.findUnique({
    where: { id: scheduleId },
    include: { _count: { select: { appointments: true } } }
  })

  if (!schedule) throw new Error("Schedule not found")

  if (schedule._count.appointments >= schedule.nop) {
    return { error: "This session is fully booked." }
  }

  const appointmentNumber = schedule._count.appointments + 1

  await prisma.appointment.create({
    data: {
      patientId: patient.id,
      scheduleId: schedule.id,
      apponum: appointmentNumber,
      appodate: new Date()
    }
  })

  revalidatePath('/patient/appointments')
  redirect('/patient/appointments')
}
