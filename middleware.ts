import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token')?.value
    const path = request.nextUrl.pathname

    // Allow access to landing page and auth routes
    if (path === '/' || path.startsWith('/login') || path.startsWith('/signup')) {
        return NextResponse.next()
    }

    // Redirect to login if no token
    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // Get user role from token (you'll need to implement token decoding)
    const userRole = getUserRoleFromToken(token)

    // Student role checks
    if (userRole === 'student') {
        if (!path.startsWith('/student')) {
            return NextResponse.redirect(new URL('/student', request.url))
        }
    }

    // Teacher role checks 
    if (userRole === 'teacher') {
        if (!path.startsWith('/teacher')) {
            return NextResponse.redirect(new URL('/teacher', request.url))
        }
    }

    return NextResponse.next()
}

// Helper function to decode token and get role
function getUserRoleFromToken(token: string): string {
    try {
        // Get role from localStorage
        const role = localStorage.getItem('role')
        return role || ''
    } catch (error) {
        return ''
    }
}

// Configure which paths the middleware should run on
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
