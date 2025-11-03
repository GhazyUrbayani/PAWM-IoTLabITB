// API helper functions for frontend
import type {
  Project,
  InsertProject,
  UpdateProject,
  Member,
  InsertMember,
  UpdateMember,
  Publication,
  InsertPublication,
  UpdatePublication,
  Partner,
  InsertPartner,
  UpdatePartner,
  PageContent,
  InsertPageContent,
  UpdatePageContent,
  DashboardStats,
  ApiResponse,
} from "@/lib/types/database"

// Base fetch helper
async function fetchApi<T>(
  url: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...options?.headers,
      },
    })

    const data = await response.json()

    if (!response.ok) {
      return { error: data.error || "An error occurred" }
    }

    return data
  } catch (error: any) {
    return { error: error.message || "Network error" }
  }
}

// ==================== PROJECTS ====================

export const projectsApi = {
  getAll: async (category?: string) => {
    const url = category && category !== "all" 
      ? `/api/projects?category=${category}` 
      : "/api/projects"
    return fetchApi<Project[]>(url)
  },

  create: async (project: InsertProject) => {
    return fetchApi<Project[]>("/api/projects", {
      method: "POST",
      body: JSON.stringify(project),
    })
  },

  update: async (id: string, project: Partial<UpdateProject>) => {
    return fetchApi<Project[]>("/api/projects", {
      method: "PUT",
      body: JSON.stringify({ id, ...project }),
    })
  },

  delete: async (id: string) => {
    return fetchApi<{ message: string }>(`/api/projects?id=${id}`, {
      method: "DELETE",
    })
  },
}

// ==================== MEMBERS ====================

export const membersApi = {
  getAll: async () => {
    return fetchApi<Member[]>("/api/members")
  },

  create: async (member: InsertMember) => {
    return fetchApi<Member[]>("/api/members", {
      method: "POST",
      body: JSON.stringify(member),
    })
  },

  update: async (id: string, member: Partial<UpdateMember>) => {
    return fetchApi<Member[]>("/api/members", {
      method: "PUT",
      body: JSON.stringify({ id, ...member }),
    })
  },

  delete: async (id: string) => {
    return fetchApi<{ message: string }>(`/api/members?id=${id}`, {
      method: "DELETE",
    })
  },
}

// ==================== PUBLICATIONS ====================

export const publicationsApi = {
  getAll: async () => {
    return fetchApi<Publication[]>("/api/publications")
  },

  create: async (publication: InsertPublication) => {
    return fetchApi<Publication[]>("/api/publications", {
      method: "POST",
      body: JSON.stringify(publication),
    })
  },

  update: async (id: string, publication: Partial<UpdatePublication>) => {
    return fetchApi<Publication[]>("/api/publications", {
      method: "PUT",
      body: JSON.stringify({ id, ...publication }),
    })
  },

  delete: async (id: string) => {
    return fetchApi<{ message: string }>(`/api/publications?id=${id}`, {
      method: "DELETE",
    })
  },
}

// ==================== PARTNERS ====================

export const partnersApi = {
  getAll: async () => {
    return fetchApi<Partner[]>("/api/partners")
  },

  create: async (partner: InsertPartner) => {
    return fetchApi<Partner[]>("/api/partners", {
      method: "POST",
      body: JSON.stringify(partner),
    })
  },

  update: async (id: string, partner: Partial<UpdatePartner>) => {
    return fetchApi<Partner[]>("/api/partners", {
      method: "PUT",
      body: JSON.stringify({ id, ...partner }),
    })
  },

  delete: async (id: string) => {
    return fetchApi<{ message: string }>(`/api/partners?id=${id}`, {
      method: "DELETE",
    })
  },
}

// ==================== PAGE CONTENT ====================

export const pageContentApi = {
  getAll: async () => {
    return fetchApi<PageContent[]>("/api/page-content")
  },

  getByKey: async (key: string) => {
    return fetchApi<PageContent>(`/api/page-content?key=${key}`)
  },

  upsert: async (key: string, value: string) => {
    return fetchApi<PageContent[]>("/api/page-content", {
      method: "POST",
      body: JSON.stringify({ key, value }),
    })
  },

  update: async (key: string, value: string) => {
    return fetchApi<PageContent[]>("/api/page-content", {
      method: "PUT",
      body: JSON.stringify({ key, value }),
    })
  },

  delete: async (key: string) => {
    return fetchApi<{ message: string }>(`/api/page-content?key=${key}`, {
      method: "DELETE",
    })
  },
}

// ==================== STATS ====================

export const statsApi = {
  getDashboard: async () => {
    return fetchApi<DashboardStats>("/api/stats")
  },
}
