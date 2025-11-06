import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = formData.get('folder') as string

    if (!file) {
      return NextResponse.json(
        { error: 'File tidak ditemukan' },
        { status: 400 }
      )
    }

    if (!folder) {
      return NextResponse.json(
        { error: 'Folder tidak ditemukan' },
        { status: 400 }
      )
    }

    // Validasi ukuran (max 10MB)
    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File terlalu besar (max 10MB)' },
        { status: 400 }
      )
    }

    // Validasi tipe file
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File harus berupa gambar' },
        { status: 400 }
      )
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(7)
    const fileExt = file.name.split('.').pop()
    const fileName = `${timestamp}-${randomString}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    // Get authenticated Supabase client
    const supabase = await createClient()

    // Convert File to ArrayBuffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage
      .from('public-assets')
      .upload(filePath, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: false,
      })

    if (error) {
      console.error('Upload error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('public-assets')
      .getPublicUrl(data.path)

    return NextResponse.json(
      { url: urlData.publicUrl },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Upload exception:', error)
    return NextResponse.json(
      { error: 'Gagal mengupload file' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const url = searchParams.get('url')

    if (!url) {
      return NextResponse.json(
        { error: 'URL tidak ditemukan' },
        { status: 400 }
      )
    }

    // Extract path from URL
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split('/public-assets/')
    
    if (pathParts.length < 2) {
      return NextResponse.json(
        { error: 'URL tidak valid' },
        { status: 400 }
      )
    }

    const filePath = pathParts[1]

    // Get authenticated Supabase client
    const supabase = await createClient()

    // Delete from storage
    const { error } = await supabase.storage
      .from('public-assets')
      .remove([filePath])

    if (error) {
      console.error('Delete error:', error)
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'File deleted successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Delete exception:', error)
    return NextResponse.json(
      { error: 'Gagal menghapus file' },
      { status: 500 }
    )
  }
}
