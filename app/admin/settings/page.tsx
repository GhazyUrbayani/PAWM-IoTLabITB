"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Save, Loader2 } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { pageContentApi } from "@/lib/api/client"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const { toast } = useToast()

  const [heroTitle, setHeroTitle] = useState("")
  const [heroSubtitle, setHeroSubtitle] = useState("")
  const [aboutTitle, setAboutTitle] = useState("")
  const [aboutContent, setAboutContent] = useState("")
  const [historyTitle, setHistoryTitle] = useState("")
  const [historyContent, setHistoryContent] = useState("")
  const [contactAddress, setContactAddress] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")

  useEffect(() => {
    fetchPageContent()
  }, [])

  const fetchPageContent = async () => {
    setLoading(true)
    const { data, error } = await pageContentApi.getAll()

    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    } else if (data) {
      const contentMap = new Map(data.map((item: any) => [item.key, item.value]))
      setHeroTitle(contentMap.get("hero_title") || "")
      setHeroSubtitle(contentMap.get("hero_subtitle") || "")
      setAboutTitle(contentMap.get("about_title") || "")
      setAboutContent(contentMap.get("about_content") || "")
      setHistoryTitle(contentMap.get("history_title") || "")
      setHistoryContent(contentMap.get("history_content") || "")
      setContactAddress(contentMap.get("contact_address") || "")
      setContactEmail(contentMap.get("contact_email") || "")
      setContactPhone(contentMap.get("contact_phone") || "")
    }
    setLoading(false)
  }

  const handleSave = async () => {
    setSaving(true)

    const updates = [
      { key: "hero_title", value: heroTitle, label: "Judul Hero" },
      { key: "hero_subtitle", value: heroSubtitle, label: "Subtitle Hero" },
      { key: "about_title", value: aboutTitle, label: "Judul Tentang Kami" },
      { key: "about_content", value: aboutContent, label: "Konten Tentang Kami" },
      { key: "history_title", value: historyTitle, label: "Judul Sejarah" },
      { key: "history_content", value: historyContent, label: "Konten Sejarah" },
      { key: "contact_address", value: contactAddress, label: "Alamat Kontak" },
      { key: "contact_email", value: contactEmail, label: "Email Kontak" },
      { key: "contact_phone", value: contactPhone, label: "Telepon Kontak" },
    ]

    let hasError = false
    let savedCount = 0

    for (const update of updates) {
      const { error } = await pageContentApi.upsert(update.key, update.value)
      if (error) {
        hasError = true
        toast({
          title: "Error",
          description: `Gagal menyimpan ${update.label}: ${error}`,
          variant: "destructive",
        })
        break
      }
      savedCount++
    }

    if (!hasError) {
      toast({
        title: "✅ Berhasil Disimpan!",
        description: `${savedCount} pengaturan berhasil diperbarui. Perubahan sudah diterapkan ke website.`,
        variant: "default",
      })
    }

    setSaving(false)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pengaturan Website</h1>
          <p className="text-muted-foreground mt-2">
            Kelola konten teks dan pengaturan halaman
          </p>
        </div>
        {!loading && (
          <Button onClick={handleSave} disabled={saving} className="hover-lift cursor-pointer">
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Menyimpan...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Simpan Perubahan
              </>
            )}
          </Button>
        )}
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <Tabs defaultValue="hero" className="space-y-4">
          <TabsList>
            <TabsTrigger value="hero" className="cursor-pointer">Hero Section</TabsTrigger>
            <TabsTrigger value="about" className="cursor-pointer">Tentang Kami</TabsTrigger>
            <TabsTrigger value="history" className="cursor-pointer">Sejarah</TabsTrigger>
            <TabsTrigger value="contact" className="cursor-pointer">Kontak</TabsTrigger>
          </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>
                Teks utama yang muncul di halaman beranda
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="hero-title">Judul Hero</Label>
                <Input
                  id="hero-title"
                  value={heroTitle}
                  onChange={(e) => setHeroTitle(e.target.value)}
                  placeholder="Judul utama halaman..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-subtitle">Subtitle Hero</Label>
                <Textarea
                  id="hero-subtitle"
                  value={heroSubtitle}
                  onChange={(e) => setHeroSubtitle(e.target.value)}
                  placeholder="Deskripsi singkat..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* About Section */}
        <TabsContent value="about" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Tentang Kami</CardTitle>
              <CardDescription>
                Konten untuk section "Tentang Kami"
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="about-title">Judul Section</Label>
                <Input
                  id="about-title"
                  value={aboutTitle}
                  onChange={(e) => setAboutTitle(e.target.value)}
                  placeholder="Judul section..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about-content">Konten</Label>
                <Textarea
                  id="about-content"
                  value={aboutContent}
                  onChange={(e) => setAboutContent(e.target.value)}
                  placeholder="Isi konten tentang lab..."
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Section */}
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sejarah Lab</CardTitle>
              <CardDescription>
                Konten untuk section "Sejarah Kami"
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="history-title">Judul Sejarah</Label>
                <Input
                  id="history-title"
                  value={historyTitle}
                  onChange={(e) => setHistoryTitle(e.target.value)}
                  placeholder="Judul sejarah..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="history-content">Konten Sejarah</Label>
                <Textarea
                  id="history-content"
                  value={historyContent}
                  onChange={(e) => setHistoryContent(e.target.value)}
                  placeholder="Cerita sejarah lab..."
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Section */}
        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Kontak</CardTitle>
              <CardDescription>
                Detail kontak laboratorium
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="contact-address">Alamat</Label>
                <Input
                  id="contact-address"
                  value={contactAddress}
                  onChange={(e) => setContactAddress(e.target.value)}
                  placeholder="Alamat lengkap..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-email">Email</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="Email kontak..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">Telepon</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="Nomor telepon..."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      )}
    </div>
  )
}
