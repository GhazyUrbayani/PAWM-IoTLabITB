import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get("category")
  const supabase = await createClient()

  try {
    let query = supabase.from("projects").select("*").order("created_at", { ascending: false })
    if (category && category !== "all") {
      query = query.eq("category", category)
    }
    const { data, error } = await query
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    return NextResponse.json({ data }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: Request) {
  const body = await request.json()
  const { title, description, category, image_url, slug, members } = body
  if (!title || !description || !category || !slug) {
    return NextResponse.json({ error: "Required fields missing" }, { status: 400 })
  }
  const supabase = await createClient()
  try {
    const { data, error } = await supabase.from("projects").insert([{ 
      title, 
      description, 
      category, 
      image_url: image_url || null, 
      slug,
      members: members || [] // Default ke array kosong jika tidak ada
    }]).select()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  const body = await request.json()
  const { id, title, description, category, image_url, slug, members } = body
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 })
  const supabase = await createClient()
  try {
    const updateData: any = { title, description, category, image_url, slug }
    // Hanya update members jika ada di request
    if (members !== undefined) {
      updateData.members = members
    }
    const { data, error } = await supabase.from("projects").update(updateData).eq("id", id).select()
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ data }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get("id")
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 })
  const supabase = await createClient()
  try {
    const { error } = await supabase.from("projects").delete().eq("id", id)
    if (error) return NextResponse.json({ error: error.message }, { status: 500 })
    return NextResponse.json({ message: "Deleted" }, { status: 200 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
