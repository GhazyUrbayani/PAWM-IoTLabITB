import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Container } from "@/components/container"
import Image from "next/image"

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  // In a real app, this would fetch data based on slug
  const project = {
    title: "Studi Kasus: Pemantauan Kesehatan Struktural Jembatan",
    researchers: "Dr. Bambang Riyanto, Prof. Siti Nurhaliza, Dr. Ahmad Wijaya",
    description:
      "Proyek ini mengembangkan sistem pemantauan kesehatan struktural jembatan menggunakan jaringan sensor IoT yang terdistribusi. Sistem ini mampu mendeteksi kerusakan struktural secara real-time dan memberikan peringatan dini untuk tindakan pemeliharaan preventif.",
    overview:
      "Kesehatan struktural jembatan adalah aspek kritis dalam infrastruktur transportasi. Kerusakan yang tidak terdeteksi dapat menyebabkan kecelakaan fatal dan kerugian ekonomi yang besar. Proyek ini mengembangkan solusi IoT yang komprehensif untuk pemantauan berkelanjutan.",
    methodology:
      "Kami menggunakan sensor akselerometer, strain gauge, dan temperature sensor yang ditempatkan secara strategis di seluruh struktur jembatan. Data dikumpulkan secara real-time dan dianalisis menggunakan algoritma machine learning untuk mendeteksi anomali dan pola kerusakan.",
    results:
      "Sistem telah berhasil diimplementasikan di 3 jembatan utama dengan akurasi deteksi kerusakan mencapai 95%. Sistem ini telah membantu mengidentifikasi 12 potensi kerusakan struktural yang memerlukan perbaikan segera.",
    images: [
      "/bridge-monitoring-sensors.jpg",
      "/bridge-monitoring-installation.jpg",
      "/bridge-monitoring-dashboard.jpg",
    ],
  }

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-secondary/30">
        <Container>
          <div>
            <h1 className="mb-4">{project.title}</h1>
            <p className="text-lg text-accent mb-2">Tim Peneliti:</p>
            <p className="text-muted-foreground">{project.researchers}</p>
          </div>
        </Container>
      </section>

      {/* Article Content */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto space-y-12">
            {/* Description */}
            <div>
              <h2 className="mb-6">Deskripsi Proyek</h2>
              <p className="text-muted-foreground leading-relaxed">{project.description}</p>
            </div>

            {/* Overview */}
            <div>
              <h2 className="mb-6">Apa itu Kesehatan Jembatan?</h2>
              <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
            </div>

            {/* Methodology */}
            <div>
              <h2 className="mb-6">Metodologi & Solusi</h2>
              <p className="text-muted-foreground leading-relaxed">{project.methodology}</p>
            </div>

            {/* Results */}
            <div>
              <h2 className="mb-6">Hasil & Dampak</h2>
              <p className="text-muted-foreground leading-relaxed">{project.results}</p>
            </div>

            {/* Gallery */}
            <div>
              <h2 className="mb-6">Galeri Prototipe</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.images.map((image, idx) => (
                  <div key={idx} className="relative h-64 rounded-lg overflow-hidden border border-border">
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Prototype ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  )
}
