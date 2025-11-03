import { createClient } from "@supabase/supabase-js"
import { NextResponse, type NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  const { email, password } = await request.json()

  if (!email || !password) {
    return NextResponse.json(
      { error: "Email dan password harus diisi" },
      { status: 400 },
    )
  }
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )

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

    return NextResponse.json({ session: data.session }, { status: 200 })
  } catch (err) {
    console.error("Internal server error:", err)
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server." },
      { status: 500 },
    )
  }
}