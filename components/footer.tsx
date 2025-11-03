import Link from "next/link"
import { Linkedin, Youtube, Mail, MapPin, Phone } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Lab Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="font-serif font-bold text-foreground">IoT Lab</span>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <MapPin size={16} className="mt-1 flex-shrink-0 text-accent" />
                <p>
                  Institut Teknologi Bandung
                  <br />
                  Bandung, Indonesia
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                <a href="mailto:info@iotlab.itb.ac.id" className="hover:text-accent transition-colors">
                  info@iotlab.itb.ac.id
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-accent" />
                <a href="tel:+622751506" className="hover:text-accent transition-colors">
                  +62 (274) 515-06
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="font-serif font-bold text-foreground mb-4">Navigasi</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="hover:text-accent transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-accent transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/research" className="hover:text-accent transition-colors">
                  Riset & Proyek
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-accent transition-colors">
                  Kontak
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Social & University */}
          <div>
            <h3 className="font-serif font-bold text-foreground mb-4">Ikuti Kami</h3>
            <div className="flex gap-4 mb-6">
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Youtube size={20} />
              </a>
            </div>
            <p className="text-xs text-muted-foreground">Bagian dari Institut Teknologi Bandung</p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 IoT Lab. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
