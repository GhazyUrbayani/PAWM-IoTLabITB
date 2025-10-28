"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Container } from "@/components/container"
import Image from "next/image"
import { useState } from "react"
import { X } from "lucide-react"

export default function AboutPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  const teamMembers = [
    {
      name: "Dr. Bambang Riyanto",
      role: "Kepala Laboratorium",
      image: "/team-member-1.jpg",
      links: { linkedin: "#", scholar: "#", email: "bambang@iotlab.itb.ac.id" },
    },
    {
      name: "Prof. Siti Nurhaliza",
      role: "Peneliti Senior",
      image: "/team-member-2.jpg",
      links: { linkedin: "#", scholar: "#", email: "siti@iotlab.itb.ac.id" },
    },
    {
      name: "Dr. Ahmad Wijaya",
      role: "Peneliti Senior",
      image: "/team-member-3.jpg",
      links: { linkedin: "#", scholar: "#", email: "ahmad@iotlab.itb.ac.id" },
    },
    {
      name: "Dr. Eka Putri",
      role: "Peneliti",
      image: "/team-member-4.jpg",
      links: { linkedin: "#", scholar: "#", email: "eka@iotlab.itb.ac.id" },
    },
    {
      name: "Rudi Hermawan",
      role: "Engineer Teknis",
      image: "/team-member-5.jpg",
      links: { linkedin: "#", scholar: "#", email: "rudi@iotlab.itb.ac.id" },
    },
    {
      name: "Dewi Lestari",
      role: "Koordinator Proyek",
      image: "/team-member-6.jpg",
      links: { linkedin: "#", scholar: "#", email: "dewi@iotlab.itb.ac.id" },
    },
  ]

  const facilities = [
    { title: "3D Printer", image: "/facility-3d-printer.jpg" },
    { title: "Sensor Array", image: "/facility-sensor-array.jpg" },
    { title: "Drone Testing", image: "/facility-drone-testing.jpg" },
    { title: "Data Center", image: "/facility-data-center.jpg" },
    { title: "Workstation", image: "/facility-workstation.jpg" },
    { title: "Testing Lab", image: "/facility-testing-lab.jpg" },
    { title: "Server Room", image: "/facility-server-room.jpg" },
    { title: "Meeting Room", image: "/facility-meeting-room.jpg" },
  ]

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-secondary/30">
        <Container>
          <div className="text-center">
            <h1 className="mb-4">Tentang Kami</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Memahami visi, misi, dan perjalanan IoT Lab dalam mengembangkan teknologi masa depan
            </p>
          </div>
        </Container>
      </section>

      {/* Vision, Mission, History */}
      <section className="py-20">
        <Container>
          <div className="space-y-16">
            {/* Vision */}
            <div>
              <h2 className="mb-6 text-accent">Visi Kami</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Menjadi pusat keunggulan penelitian IoT tingkat dunia yang menghasilkan inovasi berkelanjutan dan
                berdampak positif bagi masyarakat, industri, dan lingkungan. Kami berkomitmen untuk menjembatani
                kesenjangan antara penelitian akademis dan aplikasi praktis dalam mengembangkan solusi IoT yang
                transformatif.
              </p>
            </div>

            {/* Mission */}
            <div>
              <h2 className="mb-6 text-accent">Misi Kami</h2>
              <ul className="space-y-4 text-muted-foreground">
                <li className="flex gap-4">
                  <span className="text-accent font-bold flex-shrink-0">1.</span>
                  <span>
                    Melakukan penelitian fundamental dan terapan dalam bidang IoT, sensor networks, big data analytics,
                    dan intelligent systems
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold flex-shrink-0">2.</span>
                  <span>
                    Mengembangkan solusi IoT yang dapat diterapkan dalam berbagai sektor industri dan layanan publik
                  </span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold flex-shrink-0">3.</span>
                  <span>Melatih generasi peneliti dan engineer yang kompeten di bidang IoT dan teknologi terkait</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-accent font-bold flex-shrink-0">4.</span>
                  <span>
                    Membangun kolaborasi strategis dengan industri, universitas, dan lembaga penelitian global
                  </span>
                </li>
              </ul>
            </div>

            {/* History */}
            <div>
              <h2 className="mb-6 text-accent">Sejarah Lab</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  IoT Lab didirikan pada tahun 2020 sebagai bagian dari inisiatif Institut Teknologi Bandung untuk
                  memperkuat penelitian di bidang teknologi informasi dan komunikasi. Sejak awal, lab ini telah fokus
                  pada pengembangan solusi IoT yang inovatif dan relevan dengan kebutuhan industri Indonesia.
                </p>
                <p>
                  Dalam lima tahun pertama, IoT Lab telah menghasilkan lebih dari 50 publikasi ilmiah, 15 paten, dan
                  berbagai prototipe yang telah diimplementasikan di lapangan. Tim kami terdiri dari peneliti
                  berpengalaman, engineer berbakat, dan mahasiswa berdedikasi yang bekerja sama untuk menciptakan dampak
                  positif melalui teknologi.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-secondary/30">
        <Container>
          <h2 className="text-center mb-12">Tim Peneliti Kami</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="bg-card rounded-lg p-6 border border-border text-center hover:border-accent/50 transition-colors"
              >
                {/* Profile Image */}
                <div className="mb-4 flex justify-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-accent">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Name and Role */}
                <h3 className="font-serif font-bold text-foreground mb-1">{member.name}</h3>
                <p className="text-sm text-accent mb-4">{member.role}</p>

                {/* Social Links */}
                <div className="flex justify-center gap-3">
                  <a
                    href={member.links.linkedin}
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-secondary/80 transition-colors"
                    title="LinkedIn"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                  <a
                    href={member.links.scholar}
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-secondary/80 transition-colors"
                    title="Google Scholar"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm3.5-10c0 1.933-1.567 3.5-3.5 3.5S8.5 13.933 8.5 12 10.067 8.5 12 8.5s3.5 1.567 3.5 3.5z" />
                    </svg>
                  </a>
                  <a
                    href={`mailto:${member.links.email}`}
                    className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-accent hover:bg-secondary/80 transition-colors"
                    title="Email"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Facilities Section */}
      <section className="py-20">
        <Container>
          <h2 className="text-center mb-12">Fasilitas Kami</h2>

          {/* Masonry Grid */}
          <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {facilities.map((facility, idx) => (
              <div
                key={idx}
                className="break-inside-avoid bg-card rounded-lg overflow-hidden border border-border hover:border-accent/50 cursor-pointer group transition-all"
                onClick={() => setSelectedImage(facility.image)}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={facility.image || "/placeholder.svg"}
                    alt={facility.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
                    <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity font-serif font-bold">
                      Lihat Detail
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-serif font-bold text-foreground">{facility.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-accent transition-colors"
            >
              <X size={32} />
            </button>
            <Image
              src={selectedImage || "/placeholder.svg"}
              alt="Facility"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg"
            />
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
