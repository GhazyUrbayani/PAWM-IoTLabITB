import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Container } from "@/components/container"
import { ExternalLink } from "lucide-react"

export default function PublicationsPage() {
  const publications = [
    {
      title: "Real-Time Structural Health Monitoring of Bridges Using IoT Sensors",
      authors: "Bambang Riyanto, Siti Nurhaliza, Ahmad Wijaya",
      year: 2024,
      journal: "IEEE Transactions on Industrial Electronics",
      doi: "10.1109/TIE.2024.xxxxx",
    },
    {
      title: "Machine Learning Approaches for Anomaly Detection in IoT Networks",
      authors: "Siti Nurhaliza, Eka Putri, Rudi Hermawan",
      year: 2024,
      journal: "Journal of Network and Computer Applications",
      doi: "10.1016/j.jnca.2024.xxxxx",
    },
    {
      title: "Wearable Sensors for Continuous Health Monitoring: A Comprehensive Review",
      authors: "Ahmad Wijaya, Bambang Riyanto",
      year: 2023,
      journal: "Sensors and Actuators A: Physical",
      doi: "10.1016/j.sna.2023.xxxxx",
    },
    {
      title: "Edge Computing for IoT Applications: Architecture and Performance Analysis",
      authors: "Eka Putri, Rudi Hermawan, Dewi Lestari",
      year: 2023,
      journal: "Future Generation Computer Systems",
      doi: "10.1016/j.future.2023.xxxxx",
    },
    {
      title: "Smart Manufacturing Systems: Integration of IoT and AI Technologies",
      authors: "Rudi Hermawan, Bambang Riyanto, Siti Nurhaliza",
      year: 2023,
      journal: "Computers in Industry",
      doi: "10.1016/j.compind.2023.xxxxx",
    },
    {
      title: "Data Privacy and Security in IoT-Based Healthcare Systems",
      authors: "Dewi Lestari, Ahmad Wijaya, Eka Putri",
      year: 2022,
      journal: "IEEE Access",
      doi: "10.1109/ACCESS.2022.xxxxx",
    },
  ]

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-secondary/30">
        <Container>
          <div className="text-center">
            <h1 className="mb-4">Publikasi Ilmiah</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Koleksi publikasi penelitian kami di jurnal internasional terkemuka
            </p>
          </div>
        </Container>
      </section>

      {/* Publications List */}
      <section className="py-20">
        <Container>
          <div className="max-w-4xl mx-auto space-y-6">
            {publications.map((pub, idx) => (
              <div
                key={idx}
                className="bg-card rounded-lg p-6 border border-border hover:border-accent/50 transition-colors"
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="flex-1">
                    <h3 className="font-serif font-bold text-foreground mb-2">{pub.title}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{pub.authors}</p>
                    <p className="text-sm text-muted-foreground mb-3">
                      <span className="text-accent font-medium">{pub.journal}</span> • {pub.year}
                    </p>
                    <p className="text-xs text-muted-foreground font-mono">DOI: {pub.doi}</p>
                  </div>
                  <a
                    href={`https://doi.org/${pub.doi}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-10 h-10 rounded-lg bg-secondary flex items-center justify-center text-accent hover:bg-secondary/80 transition-colors"
                    title="Baca Selengkapnya"
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Footer />
    </>
  )
}
