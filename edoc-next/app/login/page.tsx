import { signIn } from "@/auth"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back!</h1>
          <p className="mt-2 text-sm text-gray-600">Login with your details to continue</p>
        </div>

        <form action={async (formData) => {
          "use server"
          await signIn("credentials", formData)
        }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input 
              name="email" 
              type="email" 
              required 
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
              placeholder="you@example.com" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input 
              name="password" 
              type="password" 
              required 
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500" 
              placeholder="••••••••" 
            />
          </div>
          <button 
            type="submit" 
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>

        <div className="text-center text-sm">
          Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Sign Up</a>
        </div>
      </div>
    </div>
  )
}
