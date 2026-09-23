"use server"

import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { revalidatePath } from "next/cache"
import { auth } from "@/auth"

const doctorSchema = z.object({
  docname: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6),
  docnic: z.string().min(5),
  doctel: z.string().min(10),
  specialtyId: z.coerce.number()
})

export async function addDoctor(formData: FormData) {
  const session = await auth()
  if (!session || session.user.role !== 'admin') throw new Error("Unauthorized")

  const data = Object.fromEntries(formData.entries())
  const parsed = doctorSchema.safeParse(data)
  
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { docname, email, password, docnic, doctel, specialtyId } = parsed.data

  try {
    const existing = await prisma.user.findUnique({ where: { email } })
    if (existing) return { error: "Email already in use." }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          role: "doctor"
        }
      })

      await tx.doctor.create({
        data: {
          userId: user.id,
          docname,
          docnic,
          doctel,
          specialtyId
        }
      })
    })

    revalidatePath('/admin/doctors')
  } catch (error) {
    return { error: "Failed to create doctor." }
  }
}

export async function deleteDoctor(doctorId: number) {
  const session = await auth()
  if (!session || session.user.role !== 'admin') throw new Error("Unauthorized")

  const doctor = await prisma.doctor.findUnique({ where: { id: doctorId } })
  if (!doctor) return

  // Delete user — cascade in schema will delete the doctor record too
  await prisma.user.delete({ where: { id: doctor.userId } })

  revalidatePath('/admin/doctors')
}
