"use client"

import type React from "react"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Phone } from "lucide-react"
import { useState } from "react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-secondary/30">
        <Container>
          <div className="text-center">
            <h1 className="mb-4">Hubungi Kami</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Kami siap menjawab pertanyaan Anda tentang penelitian, kolaborasi, atau kunjungan ke lab
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Section */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Left: Form */}
            <div>
              <h2 className="mb-8">Kirim Pesan</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Nama</label>
                  <Input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama Anda"
                    required
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="email@example.com"
                    required
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Subjek</label>
                  <Input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subjek pesan"
                    required
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Pesan</label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tulis pesan Anda di sini..."
                    required
                    rows={6}
                    className="bg-secondary border-border text-foreground placeholder:text-muted-foreground resize-none"
                  />
                </div>

                <Button type="submit" className="w-full bg-accent text-primary-foreground hover:bg-accent/90">
                  Kirim Pesan
                </Button>
              </form>
            </div>

            {/* Right: Contact Info & Map */}
            <div>
              <h2 className="mb-8">Informasi Kontak</h2>

              <div className="space-y-6 mb-8">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <MapPin size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-foreground mb-1">Alamat</h3>
                    <p className="text-muted-foreground">
                      Institut Teknologi Bandung
                      <br />
                      Jl. Ganesha No. 10
                      <br />
                      Bandung 40132, Indonesia
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <Mail size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-foreground mb-1">Email</h3>
                    <a
                      href="mailto:info@iotlab.itb.ac.id"
                      className="text-accent hover:text-accent/80 transition-colors"
                    >
                      info@iotlab.itb.ac.id
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
                    <Phone size={24} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-foreground mb-1">Telepon</h3>
                    <a href="tel:+622751506" className="text-accent hover:text-accent/80 transition-colors">
                      +62 (274) 515-06
                    </a>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="relative h-64 rounded-lg overflow-hidden border border-border bg-secondary">
              <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d623.8186730402282!2d107.61061868448607!3d-6.890395282026629!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6576b8e4a93%3A0x7f724c692aa6bfeb!2sLabtek%20VIII%20Achmad%20Bakrie!5e0!3m2!1sid!2sid!4v1761618897567!5m2!1sid!2sid" 
              width="600" 
              height="450" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade">
              </iframe>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  )
}
