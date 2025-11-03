"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users, BookOpen, FileText, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"
import { statsApi } from "@/lib/api/client"
import type { DashboardStats } from "@/lib/types/database"

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    members: 0,
    publications: 0,
    partners: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    setLoading(true)
    const { data, error } = await statsApi.getDashboard()
    if (data) {
      setStats(data as any)
    }
    setLoading(false)
  }

  const statCards = [
    {
      title: "Total Proyek",
      value: stats.projects,
      icon: Briefcase,
      description: "Proyek riset aktif",
      color: "text-blue-600",
    },
    {
      title: "Anggota Tim",
      value: stats.members,
      icon: Users,
      description: "Peneliti dan asisten",
      color: "text-green-600",
    },
    {
      title: "Publikasi",
      value: stats.publications,
      icon: BookOpen,
      description: "Paper yang dipublikasikan",
      color: "text-purple-600",
    },
    {
      title: "Mitra",
      value: stats.partners,
      icon: FileText,
      description: "Partner kerjasama",
      color: "text-orange-600",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Admin</h1>
        <p className="text-muted-foreground mt-2">
          Selamat datang di panel administrasi IoT Lab ITB
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Aktivitas Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            Belum ada aktivitas terbaru
          </div>
        </CardContent>
      </Card>

      {/* Welcome Message */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Tips Pengelolaan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li>• Pastikan semua proyek memiliki gambar dan deskripsi lengkap</li>
            <li>• Update publikasi secara berkala untuk menunjukkan produktivitas lab</li>
            <li>• Jaga informasi kontak anggota tim tetap up-to-date</li>
            <li>• Tambahkan mitra baru untuk memperkuat kredibilitas lab</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
