import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import { NextResponse } from 'next/server'

const { auth } = NextAuth(authConfig)

const middleware = auth((req) => {
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
      if (role === 'admin') return NextResponse.redirect(new URL('/admin', nextUrl))
      if (role === 'doctor') return NextResponse.redirect(new URL('/doctor', nextUrl))
      if (role === 'patient') return NextResponse.redirect(new URL('/patient', nextUrl))
    }
    return NextResponse.next()
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  // Role-based protection
  if (nextUrl.pathname.startsWith('/admin') && role !== 'admin') {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }
  if (nextUrl.pathname.startsWith('/doctor') && role !== 'doctor') {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }
  if (nextUrl.pathname.startsWith('/patient') && role !== 'patient') {
    return NextResponse.redirect(new URL('/login', nextUrl))
  }

  return NextResponse.next()
})

export default async function (req: any, ctx: any) {
  const res = await middleware(req, ctx)
  
  // NextAuth returns 403 if JWE decryption fails due to a changed AUTH_SECRET
  if (res && res.status === 403) {
    const redirect = NextResponse.redirect(new URL('/login', req.nextUrl))
    redirect.cookies.delete('authjs.session-token')
    redirect.cookies.delete('__Secure-authjs.session-token')
    redirect.cookies.delete('authjs.csrf-token')
    redirect.cookies.delete('__Host-authjs.csrf-token')
    return redirect
  }
  
  return res
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
