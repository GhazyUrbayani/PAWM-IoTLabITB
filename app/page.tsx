import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/modern-iot-laboratory-with-advanced-equipment.jpg"
            alt="IoT Lab"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/70"></div>
        </div>

        {/* Content */}
        <Container className="relative z-10 text-center py-20">
          <h1 className="mb-6 text-balance animate-fade-in-up">Inovasi Terhubung: Masa Depan Riset IoT</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 text-balance animate-fade-in-up animation-delay-100">
            Menjembatani dunia fisik dan digital melalui penelitian mutakhir di bidang sensor networks, big data, dan
            intelligent systems.
          </p>
          <Link href="/research">
            <Button
              size="lg"
              className="bg-accent text-primary-foreground hover:bg-accent/90 gap-2 animate-fade-in-up animation-delay-200 hover-lift"
            >
              Jelajahi Riset Kami
              <ArrowRight size={20} />
            </Button>
          </Link>
        </Container>
      </section>

      {/* About Section */}
      <section className="py-20 bg-secondary/30">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left: Text */}
            <div>
              <h2 className="mb-6">Sekilas Tentang Lab</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  IoT Lab adalah pusat penelitian terkemuka yang berfokus pada pengembangan teknologi Internet of Things
                  (IoT) dan sistem cerdas. Kami berkomitmen untuk menjembatani kesenjangan antara dunia fisik dan
                  digital melalui inovasi berkelanjutan.
                </p>
                <p>
                  Dengan tim peneliti berpengalaman dan fasilitas canggih, kami mengembangkan solusi IoT yang dapat
                  diterapkan dalam berbagai industri, mulai dari kesehatan, infrastruktur, hingga manufaktur pintar.
                </p>
                <p>
                  Visi kami adalah menjadi pusat keunggulan dalam penelitian IoT yang menghasilkan dampak positif bagi
                  masyarakat dan industri global.
                </p>
              </div>
              <Link href="/about" className="inline-block mt-6">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 bg-transparent">
                  Pelajari Lebih Lanjut
                </Button>
              </Link>
            </div>

            {/* Right: Image */}
            <div className="relative h-96 rounded-lg overflow-hidden group hover-lift">
              <Image
                src="/researchers-working-in-iot-laboratory.jpg"
                alt="Lab researchers"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Research */}
      <section className="py-20">
        <Container>
          <h2 className="text-center mb-12">Riset Unggulan Kami</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Smart Health Monitoring",
                description: "Sistem pemantauan kesehatan real-time menggunakan sensor wearable dan analitik data.",
                tags: ["Smart Health", "S3"],
                image: "/smart-health-monitoring-system.jpg",
              },
              {
                title: "Bridge Structural Health",
                description:
                  "Teknologi sensor untuk pemantauan kesehatan struktural jembatan dan infrastruktur kritis.",
                tags: ["Infrastructure", "S2"],
                image: "/bridge-monitoring-sensors.jpg",
              },
              {
                title: "Smart Manufacturing",
                description: "Solusi IoT untuk optimasi proses manufaktur dan predictive maintenance.",
                tags: ["Industry 4.0", "S1"],
                image: "/smart-manufacturing-iot.jpg",
              },
            ].map((project, idx) => (
              <div
                key={idx}
                className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 group cursor-pointer hover-lift"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif font-bold text-foreground mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-secondary text-accent text-xs font-medium rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/research">
              <Button size="lg" className="bg-accent text-primary-foreground hover:bg-accent/90 gap-2 hover-lift">
                Lihat Semua Proyek
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Peta Jalan Riset */}
      <section className="py-20 bg-secondary/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="mb-4">Peta Jalan Riset</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Fokus kami berkembang dari fondasi hingga implementasi skala penuh, mendorong inovasi di setiap langkah.
            </p>
          </div>

          {/* Timeline Items */}
          <div className="relative w-full max-w-6xl mx-auto"> {/* 1. Wrapper dengan max-width */}
            {/* 2. Garis Horizontal di Tengah */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border"></div>

            {/* 3. Grid untuk mengatur kolom */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-4">
              {[
                { year: "2024", title: "Fondasi", desc: "Pembentukan tim dan infrastruktur dasar" },
                { year: "2025", title: "Pengembangan Prototipe", desc: "Pengembangan prototipe dan uji coba awal" },
                { year: "2026", title: "Uji Coba Skala Penuh", desc: "Implementasi di lapangan dan validasi" },
                { year: "2027", title: "Komersial", desc: "Peluncuran produk dan kemitraan industri" },
              ].map((item, idx) => (
                // 4. Setiap kolom dengan padding vertikal
                <div key={idx} className="relative flex flex-col justify-center min-h-[300px] md:min-h-[350px]">
                  {/* 5. Timeline Dot */}
                  <div className="hidden md:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                    <div className="w-5 h-5 bg-accent rounded-full border-4 border-background shadow-lg"></div>
                  </div>

                  {/* 6. Card dengan posisi atas/bawah */}
                  <div
                    className={cn(
                      "w-full bg-card rounded-lg p-6 border border-border text-center hover-lift shadow-md relative z-10",
                      // Mobile: margin top untuk spacing
                      "mt-8 md:mt-0",
                      // Desktop: Item genap ke atas, ganjil ke bawah
                      idx % 2 === 0 
                        ? "md:self-start md:-translate-y-24" // Atas
                        : "md:self-end md:translate-y-24" // Bawah
                    )}
                  >
                    <div className="text-accent font-serif font-bold text-2xl mb-2">{item.year}</div>
                    <h3 className="font-serif font-bold text-foreground mb-2 text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <Footer />
    </>
  )
}
