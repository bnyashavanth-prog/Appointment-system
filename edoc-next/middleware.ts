import { NextResponse } from 'next/server'
import { auth } from './auth'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const role = req.auth?.user?.role

  const isApiAuthRoute = nextUrl.pathname.startsWith('/api/auth')
  const isPublicRoute = nextUrl.pathname === '/' || nextUrl.pathname === '/signup'
  const isLoginRoute = nextUrl.pathname === '/login'

  if (isApiAuthRoute) {
    return NextResponse.next()
  }

  if (isLoginRoute) {
    if (isLoggedIn) {
      if (role === 'admin') return Response.redirect(new URL('/admin', nextUrl))
      if (role === 'doctor') return Response.redirect(new URL('/doctor', nextUrl))
      if (role === 'patient') return Response.redirect(new URL('/patient', nextUrl))
    }
    return NextResponse.next()
  }

  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL('/login', nextUrl))
  }

  // Role-based protection
  if (nextUrl.pathname.startsWith('/admin') && role !== 'admin') {
    return Response.redirect(new URL('/login', nextUrl))
  }
  if (nextUrl.pathname.startsWith('/doctor') && role !== 'doctor') {
    return Response.redirect(new URL('/login', nextUrl))
  }
  if (nextUrl.pathname.startsWith('/patient') && role !== 'patient') {
    return Response.redirect(new URL('/login', nextUrl))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
