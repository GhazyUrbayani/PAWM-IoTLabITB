"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import { 
  Home, 
  Users, 
  Briefcase, 
  FileText, 
  BookOpen, 
  Settings,
  LogOut
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Toaster } from "@/components/ui/toaster"
import { CookieCleanup } from "@/components/cookie-cleanup"
import { useState } from "react"

const menuItems = [
  { href: "/admin/dashboard", icon: Home, label: "Dashboard" },
  { href: "/admin/projects", icon: Briefcase, label: "Proyek & Riset" },
  { href: "/admin/members", icon: Users, label: "Anggota Tim" },
  { href: "/admin/publications", icon: BookOpen, label: "Publikasi" },
  { href: "/admin/partners", icon: FileText, label: "Mitra & Funding" },
  { href: "/admin/settings", icon: Settings, label: "Pengaturan" },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleLogout = async () => {
    setIsLoggingOut(true)
    
    try {
      await fetch("/api/auth/logout", { method: "POST" })
      router.push("/login")
      router.refresh()
    } catch (error) {
      console.error("Logout error:", error)
      setIsLoggingOut(false)
    }
  }
  
  return (
    <div className="flex h-screen bg-background">
      {/* Cookie cleanup on tab close */}
      <CookieCleanup />
      
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/admin/dashboard" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary" />
              <span className="font-semibold">IoT Lab Admin</span>
            </Link>
          </div>

          {/* Navigation */}
          <ScrollArea className="flex-1 px-3 py-4">
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </ScrollArea>

          <Separator />

          {/* User Info & Logout */}
          <div className="p-4">
            <div className="mb-3 text-sm text-muted-foreground">
              Administrator
            </div>
            <Button 
              variant="outline" 
              className="w-full" 
              size="sm"
              onClick={handleLogout}
              disabled={isLoggingOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {isLoggingOut ? "Keluar..." : "Keluar"}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto p-6">
          {children}
        </div>
      </main>
      
      {/* Toast Notifications */}
      <Toaster />
    </div>
  )
}
