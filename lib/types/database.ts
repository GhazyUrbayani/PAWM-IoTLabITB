// Database types for Supabase tables

export type Project = {
  id: string
  title: string
  description: string
  category: "S1" | "S2" | "S3"
  image_url: string | null
  slug: string
  created_at: string
  updated_at: string
}

export type InsertProject = Omit<Project, "id" | "created_at" | "updated_at">

export type UpdateProject = Partial<InsertProject> & { id: string }

export type Member = {
  id: string
  name: string
  role: string
  image_url: string | null
  display_order: number
  created_at: string
  updated_at: string
}

export type InsertMember = Omit<Member, "id" | "created_at" | "updated_at">

export type UpdateMember = Partial<InsertMember> & { id: string }

export type Publication = {
  id: string
  title: string
  authors: string
  journal: string
  year: number | null
  url: string | null
  created_at: string
  updated_at: string
}

export type InsertPublication = Omit<Publication, "id" | "created_at" | "updated_at">

export type UpdatePublication = Partial<InsertPublication> & { id: string }

export type Partner = {
  id: string
  name: string
  logo_url: string
  display_order: number
  created_at: string
  updated_at: string
}

export type InsertPartner = Omit<Partner, "id" | "created_at" | "updated_at">

export type UpdatePartner = Partial<InsertPartner> & { id: string }

export type PageContent = {
  key: string
  value: string
  updated_at: string
}

export type InsertPageContent = Omit<PageContent, "updated_at">

export type UpdatePageContent = InsertPageContent

export type DashboardStats = {
  projects: number
  members: number
  publications: number
  partners: number
}

export type ActivityLog = {
  id: string
  action: 'create' | 'update' | 'delete'
  entity_type: 'project' | 'member' | 'publication' | 'partner' | 'page_content'
  entity_id: string | null
  entity_name: string | null
  user_email: string | null
  description: string | null
  created_at: string
}

// API Response types
export type ApiResponse<T> = {
  data?: T
  error?: string
}

export type ApiSuccessResponse<T> = {
  data: T
}

export type ApiErrorResponse = {
  error: string
}
