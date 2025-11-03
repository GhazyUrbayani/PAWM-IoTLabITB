"use client"

import { useState, useMemo, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Container } from "@/components/container"
import { Button } from "@/components/ui/button"
import { ArrowRight, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { projectsApi, membersApi, publicationsApi, partnersApi, pageContentApi } from "@/lib/api/client"
import type { Project, Member, Publication, Partner } from "@/lib/types/database"

export default function Home() {
  const [filter, setFilter] = useState("all")
  const categories = ["all", "S1", "S2", "S3"]
  
  // State untuk data dari API
  const [projects, setProjects] = useState<Project[]>([])
  const [members, setMembers] = useState<Member[]>([])
  const [publications, setPublications] = useState<Publication[]>([])
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)
  
  // State untuk page content
  const [heroTitle, setHeroTitle] = useState("Inovasi Terhubung: Masa Depan Riset IoT")
  const [heroSubtitle, setHeroSubtitle] = useState("Menjembatani dunia fisik dan digital melalui penelitian mutakhir di bidang sensor networks, big data, dan intelligent systems.")
  const [aboutTitle, setAboutTitle] = useState("Sekilas Tentang IoT Lab ITB")
  const [aboutContent, setAboutContent] = useState("")
  const [historyTitle, setHistoryTitle] = useState("IoT & Future Digital Economy Lab")
  const [historyContent, setHistoryContent] = useState("")

  useEffect(() => {
    fetchAllData()
  }, [])

  const fetchAllData = async () => {
    setLoading(true)
    
    // Fetch projects
    const { data: projectsData } = await projectsApi.getAll()
    if (projectsData) setProjects(projectsData as any)
    
    // Fetch members
    const { data: membersData } = await membersApi.getAll()
    if (membersData) setMembers(membersData as any)
    
    // Fetch publications
    const { data: publicationsData } = await publicationsApi.getAll()
    if (publicationsData) setPublications(publicationsData as any)
    
    // Fetch partners
    const { data: partnersData } = await partnersApi.getAll()
    if (partnersData) setPartners(partnersData as any)
    
    // Fetch page content
    const { data: pageContentData } = await pageContentApi.getAll()
    if (pageContentData) {
      const contentMap = new Map(pageContentData.map((item: any) => [item.key, item.value]))
      
      if (contentMap.get("hero_title")) setHeroTitle(contentMap.get("hero_title")!)
      if (contentMap.get("hero_subtitle")) setHeroSubtitle(contentMap.get("hero_subtitle")!)
      if (contentMap.get("about_title")) setAboutTitle(contentMap.get("about_title")!)
      if (contentMap.get("about_content")) setAboutContent(contentMap.get("about_content")!)
      if (contentMap.get("history_title")) setHistoryTitle(contentMap.get("history_title")!)
      if (contentMap.get("history_content")) setHistoryContent(contentMap.get("history_content")!)
    }
    
    setLoading(false)
  }

  const filteredProjects = useMemo(() => {
    if (filter === "all") return projects
    return projects.filter((p) => p.category.toLowerCase() === filter.toLowerCase())
  }, [filter, projects])

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-sec.jpg"
            alt="IoT Lab"
            fill
            className="object-cover blur-lg brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-background/70"></div>
        </div>
        {/* Content */}
        <Container className="relative z-10 text-center">
          <div className="bg-background/70 p-8 md:p-12 rounded-lg max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 text-foreground animate-fade-in-up">
              {heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in-up animation-delay-100">
              {heroSubtitle}
            </p>
            <div className="animate-fade-in-up animation-delay-200">
              <Button asChild size="lg">
                <Link href="#riset">
                  {" "}
                  Lihat Proyek Kami{" "}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/Lab IoT.jpg"
                alt="Lab IoT ITB"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                Tentang Kami
              </span>
              <h2 className="mb-4 mt-2">{aboutTitle}</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {aboutContent ? (
                  <p>{aboutContent}</p>
                ) : (
                  <>
                    <p>
                      Diresmikan pada tahun 2019 melalui kerjasama strategis dengan
                      Indosat Ooredoo, IoT Lab ITB didedikasikan untuk mendorong
                      inovasi di era Industri 4.0.
                    </p>
                    <p>
                      Kami fokus menghasilkan ide inovatif, referensi desain produk,
                      dan solusi terapan guna menjawab tantangan nyata di industri
                      dan masyarakat, sekaligus mendukung program "Making Indonesia
                      4.0".
                    </p>
                  </>
                )}
              </div>
              <div className="mt-8">
                <Button asChild size="lg" variant="outline">
                  <Link href="#sejarah">
                    {" "}
                    Lihat Sejarah Kami{" "}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section id="sejarah" className="py-20 bg-secondary/30">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Kolom Teks Sejarah */}
            <div>
              <span className="text-sm font-semibold text-accent uppercase tracking-wider">
                Sejarah Kami
              </span>
              <h2 className="mb-4">
                {historyTitle}
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                {historyContent ? (
                  <p>{historyContent}</p>
                ) : (
                  <>
                    <p>
                      Diresmikan pada 18 Maret 2019 oleh Menteri Perindustrian
                      Airlangga Hartarto, "Internet of Things (IoT) and Future
                      Digital Economy Lab" di Institut Teknologi Bandung (ITB) hadir
                      atas kerjasama dengan Indosat Ooredoo.
                    </p>
                    <p>
                      Peresmian ini merupakan upaya mendorong inovasi dan kemajuan
                      dalam bidang ekonomi digital, terutama di era industri 4.0. Lab
                      ini diharapkan mampu menghasilkan ide inovasi, referensi desain
                      produk, dan solusi guna menjawab kasus-kasus IoT yang dapat
                      dikembangkan dalam skala industri.
                    </p>
                  </>
                )}
              </div>
            </div>
            {/* Kolom Gambar */}
            <div className="rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/peresmian.jpeg"
                alt="Peresmian IoT Lab ITB (Dok. Humas ITB)"
                width={600}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </Container>
      </section>

      <section id="member" className="py-20">
        <Container>
          <div className="text-center w-full mx-auto">
            <h2 className="mb-4">Member Lab</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Tim kami terdiri dari peneliti, dosen, dan mahasiswa yang berdedikasi untuk inovasi IoT.
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : members.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Belum ada data anggota tim
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {members.map((member) => (
                <Card
                  key={member.id}
                  className="text-center hover-lift transition-all"
                >
                  <CardHeader>
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      {member.image_url && (
                        <Image
                          src={member.image_url}
                          alt={member.name}
                          width={96}
                          height={96}
                          className="object-cover"
                        />
                      )}
                    </Avatar>
                    <CardTitle className="font-serif">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Riset & Proyek */}
      <section id="riset" className="py-20 bg-secondary/30">
        <Container>
          <div className="text-center w-full mx-auto">
            <h2 className="mb-4">Riset & Proyek</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Jelajahi proyek-proyek inovatif yang sedang dan telah kami kerjakan di laboratorium.
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                onClick={() => setFilter(category)}
                className="capitalize hover-lift cursor-pointer transition-all"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Project Grid */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Belum ada proyek riset
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <Card
                  key={project.id}
                  className="overflow-hidden hover-lift transition-all"
                >
                  <Link href={`/research/${project.slug}`}>
                    <div className="relative h-48 w-full">
                      {project.image_url && (
                        <Image
                          src={project.image_url}
                          alt={project.title}
                          fill
                          className="object-cover"
                        />
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="font-serif text-lg mb-2">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-2">
                        {project.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-start gap-2">
                        <Badge variant="secondary">{project.category}</Badge>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Publikasi Ilmiah */}
      <section id="publikasi" className="py-20">
        <Container>
          <div className="text-center w-full mx-auto">
            <h2 className="mb-4">Publikasi Ilmiah</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Riset terbaru kami yang dipublikasikan di jurnal dan konferensi internasional.
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : publications.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Belum ada publikasi ilmiah
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {publications.slice(0, 6).map((pub) => (
                <Link
                  href={pub.url || "#"}
                  target="_blank"
                  key={pub.id}
                  className="block p-6 bg-card rounded-lg border border-border hover-lift transition-all"
                >
                  <h3 className="font-serif font-bold text-foreground mb-2">
                    {pub.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {pub.authors}
                  </p>
                  <Badge variant="outline">{pub.year || "-"}</Badge>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* Partners & Funding Section (Tetap) */}
      <section className="py-20 bg-secondary/30">
        <Container>
          <div className="text-center w-full mx-auto">
            <h2 className="mb-4">Partners & Funding</h2>
            <p className="text-lg text-muted-foreground mb-12">
              Riset kami didukung oleh kolaborasi dengan industri terkemuka dan lembaga pendanaan.
            </p>
          </div>
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : partners.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              Belum ada data mitra
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              {partners.map((partner) => (
                <div key={partner.id} className="flex justify-center">
                  <div className="relative w-[150px] h-[70px]">
                    <Image
                      src={partner.logo_url}
                      alt={partner.name}
                      fill
                      className="opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      <Footer />
    </>
  )
}