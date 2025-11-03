import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

// GET - Fetch statistics for dashboard
export async function GET(request: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  try {
    // Fetch counts from all tables
    const [projectsResult, membersResult, publicationsResult, partnersResult] = await Promise.all([
      supabase.from("projects").select("*", { count: "exact", head: true }),
      supabase.from("members").select("*", { count: "exact", head: true }),
      supabase.from("publications").select("*", { count: "exact", head: true }),
      supabase.from("partners").select("*", { count: "exact", head: true }),
    ])

    // Check for errors
    if (projectsResult.error || membersResult.error || publicationsResult.error || partnersResult.error) {
      return NextResponse.json(
        { error: "Failed to fetch statistics" },
        { status: 500 }
      )
    }

    const stats = {
      projects: projectsResult.count || 0,
      members: membersResult.count || 0,
      publications: publicationsResult.count || 0,
      partners: partnersResult.count || 0,
    }

    return NextResponse.json({ data: stats }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
