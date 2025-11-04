import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check authentication
  const authToken = request.cookies.get('auth-token')?.value
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value
  const hasAuth = authToken && isAuthenticated === 'true'

  if (pathname.startsWith('/admin')) {
    if (pathname === '/login') {
      if (hasAuth) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url))
      }
      return NextResponse.next()
    }

    if (!hasAuth) {
      const loginUrl = new URL('/login', request.url)
      loginUrl.searchParams.set('redirect', pathname)
      return NextResponse.redirect(loginUrl)
    }
  }

  // Protect API routes that modify data (POST, PUT, DELETE)
  if (pathname.match(/^\/api\/(projects|members|publications|partners|page-content|upload)/)) {
    if (request.method !== 'GET' && !hasAuth) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/login',
    '/admin/:path*',
    '/api/projects/:path*',
    '/api/members/:path*',
    '/api/publications/:path*',
    '/api/partners/:path*',
    '/api/page-content/:path*',
    '/api/upload/:path*',
  ]
}

