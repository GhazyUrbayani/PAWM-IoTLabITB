export interface UploadResult {
  url?: string
  error?: string
}
export async function uploadToSupabase(
  file: File,
  folder: "projects" | "members" | "partners" | "settings"
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

    // Create FormData
    const formData = new FormData()
    formData.append('file', file)
    formData.append('folder', folder)

    // Upload via API route (server-side dengan authenticated client)
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data.error || 'Upload gagal' }
    }

    return { url: data.url }
  } catch (error) {
    console.error("Upload exception:", error)
    return { error: "Gagal mengupload file" }
  }
}

export async function deleteFromSupabase(url: string): Promise<{ error?: string }> {
  try {
    if (!url) {
      return { error: "URL tidak valid" }
    }

    // Delete via API route (server-side dengan authenticated client)
    const response = await fetch(`/api/upload?url=${encodeURIComponent(url)}`, {
      method: 'DELETE',
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data.error || 'Delete gagal' }
    }

    return {}
  } catch (error) {
    console.error("Delete exception:", error)
    return { error: "Gagal menghapus file" }
  }
}
