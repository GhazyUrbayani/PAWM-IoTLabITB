"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { User } from "lucide-react"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import Image from "next/image"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/#riset", label: "Riset & Proyek" },
    { href: "/#member", label: "Member Lab" },
    { href: "/#publikasi", label: "Publikasi Ilmiah" },
    { href: "/contact", label: "Kontak" },
  ]

  const isActive = (href: string) => pathname === href

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-300 rounded-lg ${
            isScrolled
              ? "backdrop-blur-sm border border-border shadow-lg shadow-accent/10"
              : "backdrop-blur-lg border border-border/50"
          }`}
        >
          <div className="flex justify-between items-center px-4 sm:px-10 h-15">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="IoT Lab Logo"
                width={120}
                height={120}
                className="object-contain md:w-[160px] md:h-[160px]"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-all duration-200 relative ${
                    isActive(link.href)
                      ? "text-accent"
                      : "text-muted-foreground hover:text-accent"
                  } after:absolute after:bottom-0 after:left-0 after:h-0.5 after:bg-accent after:transition-all after:duration-300 ${
                    isActive(link.href)
                      ? "after:w-full"
                      : "after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Login Button */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="hidden md:flex rounded-lg"
              >
                <Link href="/login">
                  <User className="h-4 w-4 mr-2" />
                  <span>Admin Log-in</span>
                </Link>
              </Button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-foreground hover:text-accent transition-colors p-2"
              >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden px-4 pb-4 animate-in fade-in slide-in-from-top-2 bg-background/95 backdrop-blur-sm border-t border-border/50">
              <div className="py-2 space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-2 transition-all ${
                      isActive(link.href)
                        ? "bg-accent/10 text-accent font-medium"
                        : "text-muted-foreground hover:text-accent hover:bg-accent/5"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2 transition-all text-muted-foreground hover:text-accent hover:bg-accent/5"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-4 w-4" />
                  <span>Admin Login</span>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
