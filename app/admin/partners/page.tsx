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
import Image from "next/image"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { partnersApi } from "@/lib/api/client"
import type { Partner } from "@/lib/types/database"
import { useToast } from "@/hooks/use-toast"
import { uploadToSupabase } from "@/lib/supabase/upload"

export default function PartnersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    name: "",
    logo_url: "",
    display_order: 0,
  })
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>("")
  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    fetchPartners()
  }, [])

  const fetchPartners = async () => {
    setLoading(true)
    const { data, error } = await partnersApi.getAll()
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    } else if (data) {
      setPartners(data as any)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Yakin ingin menghapus mitra "${name}"?`)) return

    const { error } = await partnersApi.delete(id)
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Berhasil",
        description: "Mitra berhasil dihapus",
      })
      fetchPartners()
    }
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setLogoFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = async () => {
    if (!formData.name) {
      toast({
        title: "Error",
        description: "Nama mitra wajib diisi",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    let finalLogoUrl = formData.logo_url

    if (logoFile) {
      setIsUploading(true)
      const { url, error: uploadError } = await uploadToSupabase(logoFile, "partners")
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

      finalLogoUrl = url!
    }

    if (!finalLogoUrl) {
      toast({
        title: "Error",
        description: "Logo mitra wajib diisi",
        variant: "destructive",
      })
      setIsSaving(false)
      return
    }

    const payload = {
      name: formData.name,
      logo_url: finalLogoUrl,
      display_order: formData.display_order,
    }

    const { error } = editingId
      ? await partnersApi.update(editingId, payload)
      : await partnersApi.create(payload)

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
        description: editingId ? "Mitra berhasil diupdate" : "Mitra berhasil ditambahkan",
      })
      setIsDialogOpen(false)
      resetForm()
      fetchPartners()
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      logo_url: "",
      display_order: 0,
    })
    setLogoFile(null)
    setLogoPreview("")
    setEditingId(null)
  }

  const openDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditDialog = (partner: Partner) => {
    setEditingId(partner.id)
    setFormData({
      name: partner.name,
      logo_url: partner.logo_url,
      display_order: partner.display_order || 0,
    })
    setLogoPreview(partner.logo_url)
    setIsDialogOpen(true)
  }

  const filteredPartners = partners.filter((partner) =>
    partner.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mitra & Funding</h1>
          <p className="text-muted-foreground mt-2">
            Kelola mitra kerjasama dan sponsor
          </p>
        </div>
        <Button onClick={openDialog} className="hover-lift cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Mitra
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Cari Mitra</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari berdasarkan nama mitra..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Partners Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Mitra ({filteredPartners.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredPartners.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Tidak ada mitra ditemukan
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Logo</TableHead>
                  <TableHead>Nama Mitra</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPartners.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell className="w-32">
                      <div className="h-12 w-24 relative bg-muted rounded flex-shrink-0">
                        <Image
                          src={partner.logo_url}
                          alt={partner.name}
                          fill
                          className="object-contain p-2"
                        />
                      </div>
                    </TableCell>
                    <TableCell className="font-medium max-w-xs">
                      <div className="truncate">{partner.name}</div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="hover-lift cursor-pointer"
                          onClick={() => openEditDialog(partner)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(partner.id, partner.name)}
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
            <DialogTitle>{editingId ? "Edit Mitra" : "Tambah Mitra Baru"}</DialogTitle>
            <DialogDescription>
              {editingId ? "Update informasi mitra" : "Tambahkan mitra kerjasama baru ke dalam database"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Logo Upload */}
            <div className="space-y-2">
              <Label htmlFor="logo">Logo Mitra *</Label>
              <div className="flex flex-col gap-4">
                {logoPreview && (
                  <div className="relative w-48 h-24 rounded-lg overflow-hidden border mx-auto bg-muted">
                    <Image
                      src={logoPreview}
                      alt="Preview"
                      fill
                      className="object-contain p-2"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute top-1 right-1 h-6 w-6 p-0 hover-lift cursor-pointer"
                      onClick={() => {
                        setLogoFile(null)
                        setLogoPreview("")
                      }}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
                <div className="flex items-center gap-4">
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="cursor-pointer"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => document.getElementById("logo")?.click()}
                    className="hover-lift cursor-pointer"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload
                  </Button>
                </div>
                <Input
                  placeholder="Atau masukkan URL logo..."
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                />
                <p className="text-sm text-muted-foreground">
                  Rekomendasi: Logo dengan background transparan, format PNG
                </p>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Nama Mitra *</Label>
              <Input
                id="name"
                placeholder="Masukkan nama perusahaan/organisasi..."
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  Update Mitra
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Mitra
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
