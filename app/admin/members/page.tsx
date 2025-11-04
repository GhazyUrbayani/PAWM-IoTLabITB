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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { membersApi } from "@/lib/api/client"
import type { Member } from "@/lib/types/database"
import { useToast } from "@/hooks/use-toast"
import { uploadToSupabase } from "@/lib/supabase/upload"
import Image from "next/image"

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    image_url: "",
    display_order: 0,
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    setLoading(true)
    const { data, error } = await membersApi.getAll()
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    } else if (data) {
      setMembers(data as any)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Yakin ingin menghapus anggota "${name}"?`)) return

    const { error } = await membersApi.delete(id)
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Berhasil",
        description: "Anggota berhasil dihapus",
      })
      fetchMembers()
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
    if (!formData.name || !formData.role) {
      toast({
        title: "Error",
        description: "Nama dan role wajib diisi",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    let finalImageUrl = formData.image_url

    if (imageFile) {
      setIsUploading(true)
      const { url, error: uploadError } = await uploadToSupabase(imageFile, "members")
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

    const payload = {
      name: formData.name,
      role: formData.role,
      image_url: finalImageUrl,
      display_order: formData.display_order,
    }

    const { error } = editingId
      ? await membersApi.update(editingId, payload)
      : await membersApi.create(payload)

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
        description: editingId ? "Anggota berhasil diupdate" : "Anggota berhasil ditambahkan",
      })
      setIsDialogOpen(false)
      resetForm()
      fetchMembers()
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      image_url: "",
      display_order: 0,
    })
    setImageFile(null)
    setImagePreview("")
    setEditingId(null)
  }

  const openDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditDialog = (member: Member) => {
    setEditingId(member.id)
    setFormData({
      name: member.name,
      role: member.role,
      image_url: member.image_url || "",
      display_order: member.display_order || 0,
    })
    setImagePreview(member.image_url || "")
    setIsDialogOpen(true)
  }

  const filteredMembers = members.filter((member) =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Anggota Tim</h1>
          <p className="text-muted-foreground mt-2">
            Kelola anggota tim laboratorium
          </p>
        </div>
        <Button onClick={openDialog} className="hover-lift cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Anggota
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Cari Anggota</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari berdasarkan nama..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Members Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Anggota ({filteredMembers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Tidak ada anggota ditemukan
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nama</TableHead>
                  <TableHead>Peran</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell className="max-w-xs">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <Avatar className="flex-shrink-0">
                          <AvatarImage src={member.image_url || ""} alt={member.name} />
                          <AvatarFallback>
                            {member.name.split(" ").map(n => n[0]).join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium truncate">{member.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[200px]">
                      <div className="truncate">{member.role}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="hover-lift cursor-pointer"
                          onClick={() => openEditDialog(member)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(member.id, member.name)}
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-primary/25 via-background to-accent/10 border-2 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Anggota" : "Tambah Anggota Baru"}</DialogTitle>
            <DialogDescription>
              {editingId ? "Update informasi anggota" : "Tambahkan anggota tim baru ke dalam database"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Image Upload */}
            <div className="space-y-2">
              <Label htmlFor="image">Foto Profil</Label>
              <div className="flex flex-col gap-4">
                {imagePreview && (
                  <div className="relative w-32 h-32 rounded-full overflow-hidden border mx-auto">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-1 right-1 h-6 w-6 p-0 hover-lift cursor-pointer"
                      onClick={() => {
                        setImageFile(null)
                        setImagePreview("")
                      }}
                    >
                      <X className="h-3 w-3" />
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
                <Input
                  placeholder="Atau masukkan URL foto..."
                  value={formData.image_url}
                  onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                />
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nama Lengkap *</Label>
              <Input
                id="name"
                placeholder="Masukkan nama lengkap..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* Role */}
            <div className="space-y-2">
              <Label htmlFor="role">Peran/Jabatan *</Label>
              <Input
                id="role"
                placeholder="Contoh: Ketua Lab, Peneliti, Mahasiswa S2"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              />
            </div>

            {/* Display Order */}
            <div className="space-y-2">
              <Label htmlFor="display_order">Urutan Tampilan</Label>
              <Input
                id="display_order"
                type="number"
                placeholder="0"
                value={formData.display_order}
                onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
              />
              <p className="text-sm text-muted-foreground">
                Angka lebih kecil akan tampil lebih dulu
              </p>
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
                  Update Anggota
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Anggota
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
