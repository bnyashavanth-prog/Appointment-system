"use server"

import { prisma } from "@/lib/db"
import { auth } from "@/auth"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const sessionSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  scheduledate: z.string().refine(val => !isNaN(Date.parse(val)), "Invalid date"),
  scheduletime: z.string().min(4, "Time is required"),
  nop: z.coerce.number().min(1, "Must allow at least 1 patient")
})

export async function addSession(formData: FormData) {
  const session = await auth()
  if (!session || session.user.role !== 'doctor') throw new Error("Unauthorized")

  const data = Object.fromEntries(formData.entries())
  const parsed = sessionSchema.safeParse(data)
  
  if (!parsed.success) {
    return { error: parsed.error.errors[0].message }
  }

  const doctor = await prisma.doctor.findUnique({
    where: { userId: session.user.id }
  })

  if (!doctor) throw new Error("Doctor not found")

  // The database stores time as Time type (which Prisma maps to Date for purely time sometimes or String)
  // Let's store time as a string/Date depending on Prisma type. Wait, the old DB had `Time`. Prisma maps SQL Time to Date (1970-01-01TXX:XX:XXZ).
  // Actually, we can construct a Date object for the time:
  const timeDate = new Date(`1970-01-01T${parsed.data.scheduletime}:00Z`)

  await prisma.schedule.create({
    data: {
      doctorId: doctor.id,
      title: parsed.data.title,
      scheduledate: new Date(parsed.data.scheduledate),
      scheduletime: timeDate,
      nop: parsed.data.nop
    }
  })

  revalidatePath('/doctor/schedule')
}

export async function deleteSession(scheduleId: number) {
  const session = await auth()
  if (!session || session.user.role !== 'doctor') throw new Error("Unauthorized")

  const doctor = await prisma.doctor.findUnique({
    where: { userId: session.user.id }
  })

  // Ensure this session belongs to the doctor
  const schedule = await prisma.schedule.findFirst({
    where: { id: scheduleId, doctorId: doctor?.id }
  })

  if (!schedule) throw new Error("Schedule not found")

  await prisma.schedule.delete({
    where: { id: scheduleId }
  })

  revalidatePath('/doctor/schedule')
}
