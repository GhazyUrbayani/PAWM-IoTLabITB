"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, Users, BookOpen, FileText, TrendingUp, Clock } from "lucide-react"
import { useEffect, useState } from "react"
import { statsApi, activityLogsApi } from "@/lib/api/client"
import type { DashboardStats, ActivityLog } from "@/lib/types/database"
import { formatDistanceToNow } from "date-fns"
import { id as idLocale } from "date-fns/locale"

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    members: 0,
    publications: 0,
    partners: 0,
  })
  const [activities, setActivities] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const [activitiesLoading, setActivitiesLoading] = useState(true)

  useEffect(() => {
    fetchStats()
    fetchActivities()
  }, [])

  const fetchStats = async () => {
    setLoading(true)
    const { data, error } = await statsApi.getDashboard()
    if (data) {
      setStats(data as any)
    }
    setLoading(false)
  }

  const fetchActivities = async () => {
    setActivitiesLoading(true)
    const { data, error } = await activityLogsApi.getRecent(5)
    if (data) {
      setActivities(data)
    }
    setActivitiesLoading(false)
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

  const getActionIcon = (action: string) => {
    switch (action) {
      case "create":
        return "➕"
      case "update":
        return "✏️"
      case "delete":
        return "🗑️"
      default:
        return "📝"
    }
  }

  const getActionColor = (action: string) => {
    switch (action) {
      case "create":
        return "text-green-600"
      case "update":
        return "text-blue-600"
      case "delete":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getEntityTypeLabel = (entityType: string) => {
    switch (entityType) {
      case "project":
        return "Proyek"
      case "member":
        return "Anggota"
      case "publication":
        return "Publikasi"
      case "partner":
        return "Mitra"
      case "page_content":
        return "Konten Halaman"
      default:
        return entityType
    }
  }

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
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Aktivitas Terbaru
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activitiesLoading ? (
            <div className="text-center py-8 text-muted-foreground">
              Memuat aktivitas...
            </div>
          ) : activities.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              Belum ada aktivitas terbaru
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors"
                >
                  <span className="text-2xl" role="img" aria-label={activity.action}>
                    {getActionIcon(activity.action)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-medium ${getActionColor(activity.action)}`}>
                        {activity.action === 'create' ? 'Dibuat' : activity.action === 'update' ? 'Diperbarui' : 'Dihapus'}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {getEntityTypeLabel(activity.entity_type)}
                      </span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(activity.created_at), {
                          addSuffix: true,
                          locale: idLocale,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
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
