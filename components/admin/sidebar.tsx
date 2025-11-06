"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Home,
  Files,
  Users,
  BookOpen,
  Handshake,
  Settings,
  Menu,
  X,
  LogOut
} from "lucide-react"
import { cn } from "@/lib/utils"

const menuItems = [
  { href: "/admin/dashboard", icon: Home, label: "Dashboard" },
  { href: "/admin/projects", icon: Files, label: "Proyek & Riset" },
  { href: "/admin/members", icon: Users, label: "Anggota Tim" },
  { href: "/admin/publications", icon: BookOpen, label: "Publikasi" },
  { href: "/admin/partners", icon: Handshake, label: "Mitra & Funding" },
  { href: "/admin/settings", icon: Settings, label: "Pengaturan" },
]

export function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md hover:bg-gray-50"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen transition-transform lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "bg-white border-r w-64 pt-20 pb-4 flex flex-col"
        )}
      >
        {/* Brand */}
        <div className="px-6 mb-8">
          <h1 className="text-xl font-bold">IoT Lab Admin</h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive(item.href)
                    ? "bg-accent text-accent-foreground"
                    : "hover:bg-secondary"
                )}
                onClick={() => setIsOpen(false)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer/Actions */}
        <div className="px-3 mt-auto">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 hover:bg-secondary"
            onClick={() => {
              // Add logout logic here
              console.log("Logging out...")
            }}
          >
            <LogOut size={20} />
            <span>Keluar</span>
          </Button>
        </div>
      </aside>

      {/* Main Content Wrapper - Add padding for sidebar */}
      <div className="lg:pl-64">
        {/* Your page content will go here */}
      </div>
    </>
  )
}