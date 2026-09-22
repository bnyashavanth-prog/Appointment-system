import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">eDoc</h1>
        <p className="mt-4 text-xl text-gray-600">Doctor Appointment System</p>
        <p className="mt-2 text-md text-gray-500">Book appointments with qualified doctors online.</p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login" className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-3 px-8 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Login
          </Link>
          <Link href="/signup" className="inline-flex justify-center rounded-md border border-gray-300 bg-white py-3 px-8 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  )
}
