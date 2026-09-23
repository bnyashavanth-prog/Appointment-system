"use server"

import { signIn } from "@/auth"

export async function loginAction(formData: FormData) {
  try {
    await signIn("credentials", formData)
  } catch (error: any) {
    if (error.name === "RedirectError" || error.digest?.startsWith("NEXT_REDIRECT")) {
      throw error;
    }
    // Return error if it's an AuthError or other error we want to show
    return { error: "Invalid credentials." }
  }
}
