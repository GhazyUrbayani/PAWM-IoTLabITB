"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Phone, CheckCircle, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { pageContentApi } from "@/lib/api/client"

export default function ContactPage() {
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [contactEmail, setContactEmail] = useState("")
  const [contactPhone, setContactPhone] = useState("")
  const [contactAddress, setContactAddress] = useState("")
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  })

  useEffect(() => {
    fetchContactInfo()
  }, [])

  const fetchContactInfo = async () => {
    setLoading(true)
    const { data } = await pageContentApi.getAll()
    if (data) {
      const contentMap = new Map(data.map((item: any) => [item.key, item.value]))
      setContactEmail(contentMap.get("contact_email") || "")
      setContactPhone(contentMap.get("contact_phone") || "")
      setContactAddress(contentMap.get("contact_address") || "")
    }
    setLoading(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError("")
    setSubmitSuccess(false)

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitSuccess(true)
        setFormData({ name: "", email: "", subject: "", message: "" })
      } else {
        setSubmitError(result.error || "Gagal mengirim email. Silakan coba lagi.")
      }
    } catch (error) {
      setSubmitError("Terjadi kesalahan. Silakan coba lagi.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12">
        <Container>
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Hubungi Kami</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kami siap menjawab pertanyaan Anda tentang penelitian, kolaborasi,
              atau kunjungan ke lab
            </p>
          </div>
        </Container>
      </section>

      {/* Form & Info Section */}
      <section className="py-5">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-6">
              {/* Success Alert */}
              {submitSuccess && (
                <Alert variant="default" className="bg-green-50 border border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertTitle className="text-green-800 font-serif">
                    Pesan Terkirim!
                  </AlertTitle>
                  <AlertDescription className="text-green-700">
                    Terima kasih telah menghubungi kami. Tim kami akan segera merespons Anda.
                  </AlertDescription>
                </Alert>
              )}

              {/* Error Alert */}
              {submitError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Gagal Mengirim</AlertTitle>
                  <AlertDescription>{submitError}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Nama Lengkap
                  </label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Nama Anda"
                    className="placeholder:text-gray-400"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="anda@email.com"
                    className="placeholder:text-gray-400"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Subjek
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    name="subject"
                    placeholder="Subjek pesan Anda"
                    className="placeholder:text-gray-400"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Pesan
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    rows={6}
                    placeholder="Tulis pesan Anda di sini..."
                    className="placeholder:text-gray-400"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    disabled={submitting}
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full hover-lift cursor-pointer bg-green-500 hover:bg-green-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all px-8 py-3 rounded-lg"
                    disabled={submitting}
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Mengirim...
                      </>
                    ) : (
                      "Kirim Pesan"
                    )}
                  </Button>
                </div>
              </form>
            </div>

            {/* Info Kontak & Peta */}
            <div className="space-y-8">
              <h2 className="mb-8">Informasi Kontak</h2>
              {loading ? (
                <div className="flex justify-center items-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Alamat */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <MapPin size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-foreground mb-1">
                        Alamat
                      </h3>
                      <p className="text-muted-foreground">
                        {contactAddress}
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <Mail size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-foreground mb-1">
                        Email
                      </h3>
                      <a
                        href={`mailto:${contactEmail}`}
                        className="text-accent hover:text-accent/80 transition-colors"
                      >
                        {contactEmail}
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                      <Phone size={24} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-foreground mb-1">
                        Telepon
                      </h3>
                      <a
                        href={`tel:${contactPhone}`}
                        className="text-accent hover:text-accent/80 transition-colors"
                      >
                        {contactPhone}
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Map Placeholder */}
              <div className="relative h-64 rounded-lg overflow-hidden border border-border bg-secondary">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d623.8186730402282!2d107.61061868448607!3d-6.890395282026629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6576b8e4a93%3A0x7f724c692aa6bfeb!2sLabtek%20VIII%20Achmad%20Bakrie!5e0!3m2!1sid!2sid!4v1761618897567!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  )
}