import { NextRequest } from "next/server"

export function isAuthenticated(request: NextRequest): boolean {
  const authToken = request.cookies.get('auth-token')?.value
  return !!authToken
}

export function getAuthToken(request: NextRequest): string | undefined {
  return request.cookies.get('auth-token')?.value
}
