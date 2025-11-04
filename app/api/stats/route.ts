import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const supabase = await createClient()
  
  try {
    const [projects, members, partners, publications] = await Promise.all([
      supabase.from("projects").select("id", { count: "exact", head: true }),
      supabase.from("members").select("id", { count: "exact", head: true }),
      supabase.from("partners").select("id", { count: "exact", head: true }),
      supabase.from("publications").select("id", { count: "exact", head: true }),
    ])

    const stats = {
      projects: projects.count || 0,
      members: members.count || 0,
      partners: partners.count || 0,
      publications: publications.count || 0,
    }

    return NextResponse.json({ data: stats }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
