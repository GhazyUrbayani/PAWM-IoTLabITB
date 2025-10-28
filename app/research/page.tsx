"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Container } from "@/components/container"
import Image from "next/image"
import { useState } from "react"

export default function ResearchPage() {
  const [activeFilter, setActiveFilter] = useState("Semua")

  const projects = [
    {
      title: "Smart Health Monitoring",
      description: "Sistem pemantauan kesehatan real-time menggunakan sensor wearable dan analitik data.",
      tags: ["Smart Health", "S3"],
      category: "Ongoing",
      image: "/smart-health-monitoring-system.jpg",
    },
    {
      title: "Bridge Structural Health",
      description: "Teknologi sensor untuk pemantauan kesehatan struktural jembatan dan infrastruktur kritis.",
      tags: ["Infrastructure", "S2"],
      category: "Kesehatan Jembatan",
      image: "/bridge-monitoring-sensors.jpg",
    },
    {
      title: "Smart Manufacturing",
      description: "Solusi IoT untuk optimasi proses manufaktur dan predictive maintenance.",
      tags: ["Industry 4.0", "S1"],
      category: "Ongoing",
      image: "/smart-manufacturing-iot.jpg",
    },
    {
      title: "Environmental Monitoring",
      description: "Jaringan sensor untuk pemantauan kualitas lingkungan dan polusi udara real-time.",
      tags: ["Environment", "S3"],
      category: "Ongoing",
      image: "/environmental-monitoring-iot.jpg",
    },
    {
      title: "Smart City Infrastructure",
      description: "Platform IoT terintegrasi untuk manajemen infrastruktur kota pintar.",
      tags: ["Smart City", "S2"],
      category: "S2",
      image: "/smart-city-infrastructure.jpg",
    },
    {
      title: "Agricultural IoT",
      description: "Sistem IoT untuk pertanian presisi dan optimasi hasil panen.",
      tags: ["Agriculture", "S1"],
      category: "S1",
      image: "/agricultural-iot-system.jpg",
    },
  ]

  const categories = ["Semua", "Ongoing", "S3", "S2", "S1", "Kesehatan Jembatan"]

  const filteredProjects =
    activeFilter === "Semua"
      ? projects
      : projects.filter((p) => p.category === activeFilter || p.tags.includes(activeFilter))

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-secondary/30">
        <Container>
          <div className="text-center">
            <h1 className="mb-4">Proyek & Riset</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Jelajahi portofolio lengkap proyek penelitian dan inovasi IoT kami
            </p>
          </div>
        </Container>
      </section>

      {/* Filter Section */}
      <section className="py-12 border-b border-border">
        <Container>
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full font-medium transition-all ${
                  activeFilter === category
                    ? "bg-accent text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-accent border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Container>
      </section>

      {/* Projects Gallery */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, idx) => (
              <div
                key={idx}
                className="bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 group cursor-pointer"
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

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Tidak ada proyek yang sesuai dengan filter.</p>
            </div>
          )}
        </Container>
      </section>

      <Footer />
    </>
  )
}
