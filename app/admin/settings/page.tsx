"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Save, Loader2, Upload, X } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { pageContentApi } from "@/lib/api/client"
import { useToast } from "@/hooks/use-toast"
import { uploadToSupabase } from "@/lib/supabase/upload"
import Image from "next/image"

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const [heroTitle, setHeroTitle] = useState("")
  const [heroSubtitle, setHeroSubtitle] = useState("")
  const [heroImage, setHeroImage] = useState("")
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null)
  const [heroImagePreview, setHeroImagePreview] = useState("")
  
  const [aboutTitle, setAboutTitle] = useState("")
  const [aboutContent, setAboutContent] = useState("")
  const [aboutImage, setAboutImage] = useState("")
  const [aboutImageFile, setAboutImageFile] = useState<File | null>(null)
  const [aboutImagePreview, setAboutImagePreview] = useState("")
  
  const [historyTitle, setHistoryTitle] = useState("")
  const [historyContent, setHistoryContent] = useState("")
  const [historyImage, setHistoryImage] = useState("")
  const [historyImageFile, setHistoryImageFile] = useState<File | null>(null)
  const [historyImagePreview, setHistoryImagePreview] = useState("")
  
  const [contactAddress, setContactAddress] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")

  const [originalValues, setOriginalValues] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchPageContent()
  }, [])

  const fetchPageContent = async () => {
    setLoading(true)
    try {
      const { data, error } = await pageContentApi.getAll()

      if (error) {
        toast({
          title: "Error",
          description: error,
          variant: "destructive",
        })
      } else if (data && Array.isArray(data)) {
        const contentMap = new Map(data.map((item: any) => [item.key, item.value]))
        
        const heroTitleVal = contentMap.get("hero_title") || ""
        const heroSubtitleVal = contentMap.get("hero_subtitle") || ""
        const heroImageVal = contentMap.get("hero_image") || ""
        const aboutTitleVal = contentMap.get("about_title") || ""
        const aboutContentVal = contentMap.get("about_content") || ""
        const aboutImageVal = contentMap.get("about_image") || ""
        const historyTitleVal = contentMap.get("history_title") || ""
        const historyContentVal = contentMap.get("history_content") || ""
        const historyImageVal = contentMap.get("history_image") || ""
        const contactAddressVal = contentMap.get("contact_address") || ""
        const contactEmailVal = contentMap.get("contact_email") || ""
        const contactPhoneVal = contentMap.get("contact_phone") || ""
        
        setHeroTitle(heroTitleVal)
        setHeroSubtitle(heroSubtitleVal)
        setHeroImage(heroImageVal)
        setHeroImagePreview(heroImageVal)
        
        setAboutTitle(aboutTitleVal)
        setAboutContent(aboutContentVal)
        setAboutImage(aboutImageVal)
        setAboutImagePreview(aboutImageVal)
        
        setHistoryTitle(historyTitleVal)
        setHistoryContent(historyContentVal)
        setHistoryImage(historyImageVal)
        setHistoryImagePreview(historyImageVal)
        
        setContactAddress(contactAddressVal)
        setContactEmail(contactEmailVal)
        setContactPhone(contactPhoneVal)

        setOriginalValues({
          hero_title: heroTitleVal,
          hero_subtitle: heroSubtitleVal,
          hero_image: heroImageVal,
          about_title: aboutTitleVal,
          about_content: aboutContentVal,
          about_image: aboutImageVal,
          history_title: historyTitleVal,
          history_content: historyContentVal,
          history_image: historyImageVal,
          contact_address: contactAddressVal,
          contact_email: contactEmailVal,
          contact_phone: contactPhoneVal,
        })
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Gagal memuat data: " + err.message,
        variant: "destructive",
      })
    }
    setLoading(false)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'hero' | 'about' | 'history') => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        const preview = reader.result as string
        if (type === 'hero') {
          setHeroImageFile(file)
          setHeroImagePreview(preview)
        } else if (type === 'about') {
          setAboutImageFile(file)
          setAboutImagePreview(preview)
        } else if (type === 'history') {
          setHistoryImageFile(file)
          setHistoryImagePreview(preview)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    setSaving(true)

    try {
      let finalHeroImage = heroImage
      if (heroImageFile) {
        setIsUploading(true)
        const { url, error: uploadError } = await uploadToSupabase(heroImageFile, "settings")
        setIsUploading(false)
        if (uploadError) {
          toast({ title: "Error Upload Hero Image", description: uploadError, variant: "destructive" })
          setSaving(false)
          return
        }
        finalHeroImage = url!
      }

      let finalAboutImage = aboutImage
      if (aboutImageFile) {
        setIsUploading(true)
        const { url, error: uploadError } = await uploadToSupabase(aboutImageFile, "settings")
        setIsUploading(false)
        if (uploadError) {
          toast({ title: "Error Upload About Image", description: uploadError, variant: "destructive" })
          setSaving(false)
          return
        }
        finalAboutImage = url!
      }

      let finalHistoryImage = historyImage
      if (historyImageFile) {
        setIsUploading(true)
        const { url, error: uploadError } = await uploadToSupabase(historyImageFile, "settings")
        setIsUploading(false)
        if (uploadError) {
          toast({ title: "Error Upload History Image", description: uploadError, variant: "destructive" })
          setSaving(false)
          return
        }
        finalHistoryImage = url!
      }

      const allUpdates = [
        { key: "hero_title", value: heroTitle },
        { key: "hero_subtitle", value: heroSubtitle },
        { key: "hero_image", value: finalHeroImage },
        { key: "about_title", value: aboutTitle },
        { key: "about_content", value: aboutContent },
        { key: "about_image", value: finalAboutImage },
        { key: "history_title", value: historyTitle },
        { key: "history_content", value: historyContent },
        { key: "history_image", value: finalHistoryImage },
        { key: "contact_address", value: contactAddress },
        { key: "contact_email", value: contactEmail },
        { key: "contact_phone", value: contactPhone },
      ]

      const changedUpdates = allUpdates.filter(
        update => update.value !== (originalValues[update.key] || "")
      )

      if (changedUpdates.length === 0) {
        toast({ 
          title: "ℹ️ Tidak Ada Perubahan", 
          description: "Tidak ada pengaturan yang diubah.", 
          variant: "default",
          className: "backdrop-blur-sm"
        })
        setSaving(false)
        return
      }

      let hasError = false
      let savedCount = 0

      for (const update of changedUpdates) {
        const { error } = await pageContentApi.upsert(update.key, update.value)
        if (error) {
          hasError = true
          toast({ title: "Error", description: `Gagal menyimpan ${update.key}: ${error}`, variant: "destructive" })
          break
        }
        savedCount++
      }

      if (!hasError) {
        toast({ 
          title: "✅ Berhasil Disimpan!", 
          description: `${savedCount} pengaturan berhasil diperbarui.`, 
          variant: "default", 
          className: "backdrop-blur-sm" 
        })
        setHeroImageFile(null)
        setAboutImageFile(null)
        setHistoryImageFile(null)
        fetchPageContent()
      }
    } catch (err: any) {
      toast({ title: "Error", description: "Terjadi kesalahan: " + err.message, variant: "destructive" })
    }

    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Pengaturan Website</h1>
          <p className="text-muted-foreground mt-2">Kelola konten teks dan gambar halaman</p>
        </div>
        {!loading && (
          <Button onClick={handleSave} disabled={saving || isUploading} className="hover-lift cursor-pointer">
            {saving || isUploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {isUploading ? "Mengupload..." : "Menyimpan..."}
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

          <TabsContent value="hero" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
                <CardDescription>Teks dan gambar utama yang muncul di halaman beranda</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="hero-image">Gambar Hero</Label>
                  <div className="flex flex-col gap-4">
                    {heroImagePreview && (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                        <Image src={heroImagePreview} alt="Hero Preview" fill className="object-cover" />
                        <Button size="sm" variant="destructive" className="absolute top-2 right-2 hover-lift cursor-pointer" onClick={() => { setHeroImageFile(null); setHeroImagePreview(""); setHeroImage("") }}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      <Input id="hero-image-upload" type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'hero')} className="cursor-pointer" />
                      <Button type="button" variant="outline" onClick={() => document.getElementById("hero-image-upload")?.click()} className="hover-lift cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Upload gambar atau masukkan URL di bawah</p>
                    <Input placeholder="Atau masukkan URL gambar..." value={heroImage} onChange={(e) => { setHeroImage(e.target.value); setHeroImagePreview(e.target.value) }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-title">Judul Hero</Label>
                  <Input id="hero-title" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} placeholder="Judul utama halaman..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="hero-subtitle">Subtitle Hero</Label>
                  <Textarea id="hero-subtitle" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} placeholder="Deskripsi singkat..." rows={3} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Tentang Kami</CardTitle>
                <CardDescription>Konten untuk section "Tentang Kami"</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="about-image">Gambar Tentang Kami</Label>
                  <div className="flex flex-col gap-4">
                    {aboutImagePreview && (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                        <Image src={aboutImagePreview} alt="About Preview" fill className="object-cover" />
                        <Button size="sm" variant="destructive" className="absolute top-2 right-2 hover-lift cursor-pointer" onClick={() => { setAboutImageFile(null); setAboutImagePreview(""); setAboutImage("") }}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      <Input id="about-image-upload" type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'about')} className="cursor-pointer" />
                      <Button type="button" variant="outline" onClick={() => document.getElementById("about-image-upload")?.click()} className="hover-lift cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Upload gambar atau masukkan URL di bawah</p>
                    <Input placeholder="Atau masukkan URL gambar..." value={aboutImage} onChange={(e) => { setAboutImage(e.target.value); setAboutImagePreview(e.target.value) }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about-title">Judul Section</Label>
                  <Input id="about-title" value={aboutTitle} onChange={(e) => setAboutTitle(e.target.value)} placeholder="Judul section..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="about-content">Konten</Label>
                  <Textarea id="about-content" value={aboutContent} onChange={(e) => setAboutContent(e.target.value)} placeholder="Isi konten tentang lab..." rows={6} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Sejarah Lab</CardTitle>
                <CardDescription>Konten untuk section "Sejarah Kami"</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="history-image">Gambar Sejarah</Label>
                  <div className="flex flex-col gap-4">
                    {historyImagePreview && (
                      <div className="relative w-full h-48 rounded-lg overflow-hidden border">
                        <Image src={historyImagePreview} alt="History Preview" fill className="object-cover" />
                        <Button size="sm" variant="destructive" className="absolute top-2 right-2 hover-lift cursor-pointer" onClick={() => { setHistoryImageFile(null); setHistoryImagePreview(""); setHistoryImage("") }}>
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      <Input id="history-image-upload" type="file" accept="image/*" onChange={(e) => handleImageChange(e, 'history')} className="cursor-pointer" />
                      <Button type="button" variant="outline" onClick={() => document.getElementById("history-image-upload")?.click()} className="hover-lift cursor-pointer">
                        <Upload className="h-4 w-4 mr-2" />
                        Upload
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Upload gambar atau masukkan URL di bawah</p>
                    <Input placeholder="Atau masukkan URL gambar..." value={historyImage} onChange={(e) => { setHistoryImage(e.target.value); setHistoryImagePreview(e.target.value) }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="history-title">Judul Sejarah</Label>
                  <Input id="history-title" value={historyTitle} onChange={(e) => setHistoryTitle(e.target.value)} placeholder="Judul sejarah..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="history-content">Konten Sejarah</Label>
                  <Textarea id="history-content" value={historyContent} onChange={(e) => setHistoryContent(e.target.value)} placeholder="Cerita sejarah lab..." rows={8} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Kontak</CardTitle>
                <CardDescription>Detail kontak laboratorium</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="contact-address">Alamat</Label>
                  <Input id="contact-address" value={contactAddress} onChange={(e) => setContactAddress(e.target.value)} placeholder="Alamat lengkap..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email</Label>
                  <Input id="contact-email" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} placeholder="Email kontak..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">Telepon</Label>
                  <Input id="contact-phone" type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="Nomor telepon..." />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
