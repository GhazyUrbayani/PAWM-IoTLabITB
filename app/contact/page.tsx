"use client"

import type React from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Mail, Phone, CheckCircle } from "lucide-react"
import { useForm, ValidationError } from "@formspree/react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ContactPage() {
  const [state, handleSubmit] = useForm(process.env.NEXT_PUBLIC_FORM!)

  if (state.succeeded) {
    return (
      <>
        <Navbar />
        <Container className="flex items-center justify-center min-h-[60vh]">
          <Alert
            variant="default"
            className="max-w-lg bg-green-50 border border-green-200"
          >
            <CheckCircle className="h-4 w-4 text-green-600" />
            <AlertTitle className="text-green-800 font-serif">
              Pesan Terkirim!
            </AlertTitle>
            <AlertDescription className="text-green-700">
              Terima kasih telah menghubungi kami. Tim kami akan segera merespons Anda.
            </AlertDescription>
          </Alert>
        </Container>
        <Footer />
      </>
    )
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
              Kami siap menjawab pertanyaan Anda tentang penelitian, kolaborasi,
              atau kunjungan ke lab
            </p>
          </div>
        </Container>
      </section>

      {/* Form & Info Section */}
      <section className="py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-12">
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
                  required
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
                  required
                />
                <ValidationError
                  prefix="Email"
                  field="email"
                  errors={state.errors}
                  className="text-sm text-destructive mt-1"
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
                  required
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
                  required
                />
                <ValidationError
                  prefix="Message"
                  field="message"
                  errors={state.errors}
                  className="text-sm text-destructive mt-1"
                />
              </div>

              <div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={state.submitting}
                >
                  {state.submitting ? "Mengirim..." : "Kirim Pesan"}
                </Button>
              </div>
            </form>

            {/* Info Kontak & Peta */}
            <div className="space-y-8">
              <h2 className="mb-8">Informasi Kontak</h2>
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
                      LabTek VIII ITB, Jl. Ganesa No.10, Bandung
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
                    <h3 className="font-serif font-bold text-foreground mb-1">
                      Telepon
                    </h3>
                    <a
                      href="tel:+622751506"
                      className="text-accent hover:text-accent/80 transition-colors"
                    >
                      +62 (274) 515-06
                    </a>
                  </div>
                </div>
              </div>

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