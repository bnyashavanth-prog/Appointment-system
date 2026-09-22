"use server"

import { prisma } from "@/lib/db"
import bcrypt from "bcryptjs"
import { z } from "zod"
import { redirect } from "next/navigation"

const signupSchema = z.object({
  pname: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  pnic: z.string().min(5, "NIC must be at least 5 characters"),
  pdob: z.string().refine((date) => !isNaN(Date.parse(date)), "Invalid date"),
  ptel: z.string().min(10, "Phone number must be at least 10 digits"),
  paddress: z.string().min(5, "Address must be at least 5 characters"),
})

export async function registerPatient(formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  
  const parsed = signupSchema.safeParse(data)
  if (!parsed.success) {
    return { error: parsed.error.issues[0].message }
  }

  const { pname, email, password, pnic, pdob, ptel, paddress } = parsed.data

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return { error: "Email already in use." }
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          role: "patient"
        }
      })

      await tx.patient.create({
        data: {
          userId: user.id,
          pname,
          pnic,
          pdob: new Date(pdob),
          ptel,
          paddress
        }
      })
    })
  } catch (error) {
    return { error: "Something went wrong during registration." }
  }

  redirect("/login")
}
