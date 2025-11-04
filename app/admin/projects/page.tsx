"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Pencil, Trash2, Loader2, Upload, X } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { projectsApi } from "@/lib/api/client"
import type { Project } from "@/lib/types/database"
import { useToast } from "@/hooks/use-toast"
import { uploadToSupabase, deleteFromSupabase } from "@/lib/supabase/upload"
import Image from "next/image"

export default function ProjectsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [categoryFilter, setCategoryFilter] = useState<string>("all")
  const { toast } = useToast()

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "S1" as "S1" | "S2" | "S3",
    slug: "",
    image_url: "",
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    fetchProjects()
  }, [categoryFilter])

  const fetchProjects = async () => {
    setLoading(true)
    const { data, error } = await projectsApi.getAll(categoryFilter)
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    } else if (data) {
      setProjects(data as any)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Yakin ingin menghapus proyek "${title}"?`)) return

    const { error } = await projectsApi.delete(id)
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Berhasil",
        description: "Proyek berhasil dihapus",
      })
      fetchProjects()
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.description || !formData.slug) {
      toast({
        title: "Error",
        description: "Semua field wajib diisi",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    // Upload image to Supabase Storage jika ada imageFile
    let finalImageUrl = formData.image_url

    if (imageFile) {
      setIsUploading(true)
      const { url, error: uploadError } = await uploadToSupabase(imageFile, "projects")
      setIsUploading(false)

      if (uploadError) {
        toast({
          title: "Error Upload",
          description: uploadError,
          variant: "destructive",
        })
        setIsSaving(false)
        return
      }

      finalImageUrl = url!
    }

    // Validasi image_url
    if (!finalImageUrl) {
      toast({
        title: "Error",
        description: "Gambar proyek wajib diisi",
        variant: "destructive",
      })
      setIsSaving(false)
      return
    }

    // CREATE or UPDATE
    const payload = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      slug: formData.slug,
      image_url: finalImageUrl,
      members: [], // Default ke array kosong untuk new projects
    }

    const { error } = editingId
      ? await projectsApi.update(editingId, payload)
      : await projectsApi.create(payload)

    setIsSaving(false)

    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Berhasil",
        description: editingId ? "Proyek berhasil diupdate" : "Proyek berhasil ditambahkan",
      })
      setIsDialogOpen(false)
      resetForm()
      fetchProjects()
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "S1",
      slug: "",
      image_url: "",
    })
    setImageFile(null)
    setImagePreview("")
    setEditingId(null)
  }

  const openDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditDialog = (project: Project) => {
    setEditingId(project.id)
    setFormData({
      title: project.title,
      description: project.description,
      category: project.category,
      slug: project.slug,
      image_url: project.image_url || "",
    })
    setImagePreview(project.image_url || "")
    setIsDialogOpen(true)
  }

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Proyek & Riset</h1>
          <p className="text-muted-foreground mt-2">
            Kelola proyek riset laboratorium
          </p>
        </div>
        <Button onClick={openDialog} className="hover-lift cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Proyek
        </Button>
      </div>

      {/* Search & Filter */}
      <Card>
        <CardHeader>
          <CardTitle>Cari Proyek</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Cari berdasarkan judul proyek..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {["all", "S1", "S2", "S3"].map((cat) => (
                <Button
                  key={cat}
                  variant={categoryFilter === cat ? "default" : "outline"}
                  onClick={() => setCategoryFilter(cat)}
                  className="hover-lift cursor-pointer"
                >
                  {cat === "all" ? "Semua" : cat}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Projects Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Proyek ({filteredProjects.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Tidak ada proyek ditemukan
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Kategori</TableHead>
                  <TableHead>Slug</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="font-medium max-w-xs">
                      <div className="truncate">{project.title}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{project.category}</Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground max-w-[200px]">
                      <div className="truncate">{project.slug}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="hover-lift cursor-pointer"
                          onClick={() => openEditDialog(project)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(project.id, project.title)}
                          className="hover-lift cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-primary/25 via-background to-accent/10 border-2 backdrop-blur-sm backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Proyek" : "Tambah Proyek Baru"}</DialogTitle>
            <DialogDescription>
              {editingId ? "Update informasi proyek" : "Tambahkan proyek riset baru ke dalam database"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="image">Gambar Proyek</Label>
              <div className="flex flex-col gap-4">
                {imagePreview && (
                  <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-2 right-2 hover-lift cursor-pointer"
                      onClick={() => {
                        setImageFile(null)
                        setImagePreview("")
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("image")?.click()}
                    className="hover-lift cursor-pointer"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground">
                  Upload gambar atau masukkan URL di bawah
                </p>
                <Input
                  placeholder="Atau masukkan URL gambar..."
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Judul Proyek *</Label>
              <Input
                id="title"
                placeholder="Masukkan judul proyek..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <Label htmlFor="category">Kategori *</Label>
              <Select
                value={formData.category}
                onValueChange={(value: "S1" | "S2" | "S3") =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Pilih kategori"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="S1">S1</SelectItem>
                  <SelectItem value="S2">S2</SelectItem>
                  <SelectItem value="S3">S3</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                placeholder="contoh-judul-proyek"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">
                Slug digunakan untuk URL (contoh: /research/contoh-judul-proyek)
              </p>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi *</Label>
              <Textarea
                id="description"
                placeholder="Deskripsi proyek..."
                rows={5}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isSaving}
              className="hover-lift cursor-pointer"
            >
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSaving || isUploading}
              className="hover-lift cursor-pointer"
            >
              {isSaving || isUploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isUploading ? "Mengupload..." : "Menyimpan..."}
                </>
              ) : editingId ? (
                <>
                  <Pencil className="mr-2 h-4 w-4" />
                  Update Proyek
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Proyek
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
