import { createClient } from "@/lib/supabase/server"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email dan password harus diisi" },
      { status: 400 },
    )
  }

  const supabase = await createClient()

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    if (error) {
      console.error("Supabase login error:", error.message)
      return NextResponse.json(
        { error: "Kredensial tidak valid." },
        { status: 401 },
      )
    }

    // Create response with session
    const response = NextResponse.json({ session: data.session }, { status: 200 })
    
    // Set secure HTTP-only cookies
    if (data.session) {
      response.cookies.set('auth-token', data.session.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })
      
      response.cookies.set('isAuthenticated', 'true', {
        httpOnly: false, // Accessible by client for UI
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
      })
    }

    return response
  } catch (err) {
    console.error("Internal server error:", err)
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." },
      { status: 500 },
    )
  }
}