"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Search, Pencil, Trash2, ExternalLink, Loader2 } from "lucide-react"
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
import { publicationsApi } from "@/lib/api/client"
import type { Publication } from "@/lib/types/database"
import { useToast } from "@/hooks/use-toast"

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [publications, setPublications] = useState<Publication[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  // Dialog state
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    authors: "",
    journal: "",
    year: new Date().getFullYear(),
    url: "",
    doi: "",
  })

  useEffect(() => {
    fetchPublications()
  }, [])

  const fetchPublications = async () => {
    setLoading(true)
    const { data, error } = await publicationsApi.getAll()
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    } else if (data) {
      setPublications(data as any)
    }
    setLoading(false)
  }

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Yakin ingin menghapus publikasi "${title}"?`)) return

    const { error } = await publicationsApi.delete(id)
    
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    } else {
      toast({
        title: "Berhasil",
        description: "Publikasi berhasil dihapus",
      })
      fetchPublications()
    }
  }

  const handleSubmit = async () => {
    if (!formData.title || !formData.authors || !formData.journal) {
      toast({
        title: "Error",
        description: "Judul, penulis, dan jurnal wajib diisi",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    const payload = {
      title: formData.title,
      authors: formData.authors,
      journal: formData.journal,
      year: formData.year,
      url: formData.url,
      doi: formData.doi,
    }

    const { error } = editingId
      ? await publicationsApi.update(editingId, payload)
      : await publicationsApi.create(payload)

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
        description: editingId ? "Publikasi berhasil diupdate" : "Publikasi berhasil ditambahkan",
      })
      setIsDialogOpen(false)
      resetForm()
      fetchPublications()
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      authors: "",
      journal: "",
      year: new Date().getFullYear(),
      url: "",
      doi: "",
    })
    setEditingId(null)
  }

  const openDialog = () => {
    resetForm()
    setIsDialogOpen(true)
  }

  const openEditDialog = (pub: Publication) => {
    setEditingId(pub.id)
    setFormData({
      title: pub.title,
      authors: pub.authors,
      journal: pub.journal,
      year: pub.year || new Date().getFullYear(),
      url: pub.url || "",
      doi: pub.doi || "",
    })
    setIsDialogOpen(true)
  }

  const filteredPublications = publications.filter((pub) =>
    pub.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Publikasi Ilmiah</h1>
          <p className="text-muted-foreground mt-2">
            Kelola publikasi dan paper penelitian
          </p>
        </div>
        <Button onClick={openDialog} className="hover-lift cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Tambah Publikasi
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <CardTitle>Cari Publikasi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari berdasarkan judul atau penulis..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Publications Table */}
      <Card>
        <CardHeader>
          <CardTitle>Daftar Publikasi ({filteredPublications.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredPublications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Tidak ada publikasi ditemukan
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Judul</TableHead>
                  <TableHead>Penulis</TableHead>
                  <TableHead>Jurnal</TableHead>
                  <TableHead>Tahun</TableHead>
                  <TableHead className="text-right">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPublications.map((pub) => (
                  <TableRow key={pub.id}>
                    <TableCell className="font-medium max-w-xs">
                      <div className="flex items-center gap-2">
                        {pub.title}
                        {pub.url && (
                          <a 
                            href={pub.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:text-primary/80"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {pub.authors}
                    </TableCell>
                    <TableCell>{pub.journal}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{pub.year || "-"}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="hover-lift cursor-pointer"
                          onClick={() => openEditDialog(pub)}
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(pub.id, pub.title)}
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
            <DialogTitle>{editingId ? "Edit Publikasi" : "Tambah Publikasi Baru"}</DialogTitle>
            <DialogDescription>
              {editingId ? "Update informasi publikasi" : "Tambahkan publikasi ilmiah baru ke dalam database"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title">Judul Publikasi *</Label>
              <Input
                id="title"
                placeholder="Masukkan judul paper/publikasi..."
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            {/* Authors */}
            <div className="space-y-2">
              <Label htmlFor="authors">Penulis *</Label>
              <Input
                id="authors"
                placeholder="Nama1, Nama2, Nama3"
                value={formData.authors}
                onChange={(e) => setFormData({ ...formData, authors: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">
                Pisahkan nama penulis dengan koma
              </p>
            </div>

            {/* Journal */}
            <div className="space-y-2">
              <Label htmlFor="journal">Nama Jurnal/Konferensi *</Label>
              <Input
                id="journal"
                placeholder="IEEE Transactions, ACM Conference, dll"
                value={formData.journal}
                onChange={(e) => setFormData({ ...formData, journal: e.target.value })}
              />
            </div>

            {/* Year */}
            <div className="space-y-2">
              <Label htmlFor="year">Tahun Publikasi</Label>
              <Input
                id="year"
                type="number"
                placeholder="2024"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
              />
            </div>

            {/* DOI */}
            <div className="space-y-2">
              <Label htmlFor="doi">DOI</Label>
              <Input
                id="doi"
                placeholder="10.1234/example.doi"
                value={formData.doi}
                onChange={(e) => setFormData({ ...formData, doi: e.target.value })}
              />
            </div>

            {/* URL */}
            <div className="space-y-2">
              <Label htmlFor="url">URL Publikasi</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://..."
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">
                Link ke paper (IEEE Xplore, arXiv, ResearchGate, dll)
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
              disabled={isSaving}
              className="hover-lift cursor-pointer"
            >
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Menyimpan...
                </>
              ) : editingId ? (
                <>
                  <Pencil className="mr-2 h-4 w-4" />
                  Update Publikasi
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Publikasi
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
