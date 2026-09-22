import { signIn } from "@/auth"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050505]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/5 rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="mt-2 text-sm text-zinc-400">Login with your details to continue</p>
        </div>

        <form action={async (formData) => {
          "use server"
          try {
            await signIn("credentials", formData)
          } catch (error: any) {
            if (error.name === "RedirectError") throw error; // Next.js redirect
          }
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300">Email Address</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full px-3 py-2 mt-1 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all" 
              placeholder="you@example.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full px-3 py-2 mt-1 bg-white/5 border border-white/10 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all" 
              placeholder="••••••••" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-xl hover:backdrop-blur-2xl bg-white/[0.03] border-r border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        <div className="text-center text-sm">
          Don't have an account? <a href="/signup" className="text-white hover:underline">Sign Up</a>
        </div>
      </div>
    </div>
  )
}
