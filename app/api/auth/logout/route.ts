import { NextResponse, type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  // Create response
  const response = NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  )

  // Clear auth cookies
  response.cookies.delete('auth-token')
  response.cookies.delete('isAuthenticated')

  return response
}
