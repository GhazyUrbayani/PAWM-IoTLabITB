import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full py-5 md:py-10 lg:py-15
                    bg-gradient-to-br from-background via-secondary/10 to-primary/10 
                    overflow-hidden">
        <div className="absolute h-[80vh] inset-0 z-0">
          <Image
            src="/modern-iot-laboratory-with-advanced-equipment.jpg"
            alt="IoT Lab"
            fill
            className="object-cover blur-lg"
            priority
          />
          <div className="absolute inset-0 bg-background/70"></div>
        </div>

        {/* Content */}
        <Container className="relative z-10 text-center py-20">
          <h1 className="mb-6 text-balance animate-fade-in-up">Inovasi Terhubung: Masa Depan Riset IoT</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-balance animate-fade-in-up animation-delay-100">
            Menjembatani dunia fisik dan digital melalui penelitian mutakhir di bidang sensor networks, big data, dan
            intelligent systems.
          </p>
          <Link href="/research">
            <Button
              size="lg"
              className="bg-accent text-primary-foreground hover:bg-accent/90 gap-2 animate-fade-in-up animation-delay-200 hover-lift cursor-pointer"
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
                <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 bg-transparent animate-fade-in-up animation-delay-200 hover-lift cursor-pointer">
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
              <Button size="lg" className="bg-accent text-primary-foreground hover:bg-accent/90 gap-2 hover-lift animate-fade-in-up animation-delay-200 cursor-pointer">
                Lihat Semua Proyek
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </Container>
      </section>

      {/* Member Lab*/}
      <section className="py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="mb-4">Member Lab</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Tim kami terdiri dari peneliti, dosen, dan mahasiswa yang berdedikasi untuk inovasi IoT.
            </p>
          </div>

          {/* Profile Card Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 hover-lift cursor-pointer">
            {[
              { name: "Dr. Budi Hartono", role: "Kepala Laboratorium", img: "/team-member-1.jpg" },
              { name: "Siti Aminah, M.T.", role: "Peneliti Utama", img: "/team-member-2.jpg" },
              { name: "Andi Wijaya, Ph.D.", role: "Dosen Pembimbing", img: "/team-member-3.jpg" },
            ].map((member) => (
              <Card key={member.name} className="text-center hover-lift">
                <CardHeader>
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <Image
                      src={member.img}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </Avatar>
                  <CardTitle className="font-serif">{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/about">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent/10 hover-lift cursor-pointer">
                Lihat Semua Anggota <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </Container>
      </section>
      {/* Publikasi Ilmiah Section */}
      <section className="py-20 bg-secondary/30">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="mb-4">Publikasi Ilmiah</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Riset terbaru kami yang dipublikasikan di jurnal dan konferensi internasional.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "A Novel Framework for IoT-based Bridge Health Monitoring", authors: "B. Hartono, S. Aminah", year: 2024, url: "#" },
              { title: "Scalable Data Ingestion for Smart City IoT Networks", authors: "A. Wijaya", year: 2024, url: "#" },
            ].map((pub) => (
              <Link
                href={pub.url}
                target="_blank"
                key={pub.title}
                className="block p-6 bg-card rounded-lg border border-border hover-lift transition-all"
              >
                <h3 className="font-serif font-bold text-foreground mb-2">{pub.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{pub.authors}</p>
                <Badge variant="outline">{pub.year}</Badge>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Partners & Funding Section */}
      <section className="py-20">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="mb-4">Partners & Funding</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Riset kami didukung oleh kolaborasi dengan industri terkemuka dan lembaga pendanaan.
            </p>
          </div>

          {/* Grid Logo */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            <div className="flex justify-center">
              <Image src="/placeholder-logo.svg" alt="Partner Logo" width={150} height={70} className="opacity-60" />
            </div>
            <div className="flex justify-center">
              <Image src="/placeholder-logo.svg" alt="Partner Logo" width={150} height={70} className="opacity-60" />
            </div>
            <div className="flex justify-center">
              <Image src="/placeholder-logo.svg" alt="Partner Logo" width={150} height={70} className="opacity-60" />
            </div>
            <div className="flex justify-center">
              <Image src="/placeholder-logo.svg" alt="Partner Logo" width={150} height={70} className="opacity-60" />
            </div>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  )
}
