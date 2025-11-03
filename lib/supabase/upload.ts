import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface UploadResult {
  url?: string
  error?: string
}

/**
 * Upload file ke Supabase Storage
 * @param file - File yang akan diupload
 * @param folder - Folder tujuan (projects/members/partners)
 * @returns URL publik file atau error message
 */
export async function uploadToSupabase(
  file: File,
  folder: "projects" | "members" | "partners"
): Promise<UploadResult> {
  try {
    // Validasi file
    if (!file) {
      return { error: "File tidak ditemukan" }
    }

    // Validasi ukuran (max 10MB)
    const maxSize = 10 * 1024 * 1024 // 10MB
    if (file.size > maxSize) {
      return { error: "File terlalu besar (max 10MB)" }
    }

    // Validasi tipe file
    if (!file.type.startsWith("image/")) {
      return { error: "File harus berupa gambar" }
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(7)
    const fileExt = file.name.split(".").pop()
    const fileName = `${timestamp}-${randomString}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    // Upload ke Supabase Storage
    const { data, error } = await supabase.storage
      .from("public-assets")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      })

    if (error) {
      console.error("Upload error:", error)
      return { error: error.message }
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from("public-assets")
      .getPublicUrl(data.path)

    return { url: urlData.publicUrl }
  } catch (error) {
    console.error("Upload exception:", error)
    return { error: "Gagal mengupload file" }
  }
}

/**
 * Hapus file dari Supabase Storage
 * @param url - Public URL file yang akan dihapus
 */
export async function deleteFromSupabase(url: string): Promise<{ error?: string }> {
  try {
    // Extract path from URL
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split("/public-assets/")
    if (pathParts.length < 2) {
      return { error: "URL tidak valid" }
    }
    const filePath = pathParts[1]

    // Delete from storage
    const { error } = await supabase.storage
      .from("public-assets")
      .remove([filePath])

    if (error) {
      console.error("Delete error:", error)
      return { error: error.message }
    }

    return {}
  } catch (error) {
    console.error("Delete exception:", error)
    return { error: "Gagal menghapus file" }
  }
}
