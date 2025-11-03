-- ============================================
-- IoT Lab ITB - Database Schema Migration
-- Run this SQL in Supabase Dashboard → SQL Editor
-- ============================================
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
-- ============================================
-- 1. PROJECTS TABLE
-- Index for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
-- RLS Policies
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
-- Allow public read access
CREATE POLICY "Allow public read access on projects" ON projects FOR
SELECT TO public USING (true);
-- Allow authenticated users to insert/update/delete
CREATE POLICY "Allow authenticated insert on projects" ON projects FOR
INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on projects" ON projects FOR
UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete on projects" ON projects FOR DELETE TO authenticated USING (true);
-- ============================================
-- 2. MEMBERS TABLE
-- RLS Policies
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on members" ON members FOR
SELECT TO public USING (true);
CREATE POLICY "Allow authenticated insert on members" ON members FOR
INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on members" ON members FOR
UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete on members" ON members FOR DELETE TO authenticated USING (true);
-- ============================================
-- 3. PUBLICATIONS TABLE
-- Menambahkan kolom year ke tabel publication (jika belum ada)
alter table public.publications
ADD COLUMN IF NOT EXISTS year INTEGER;
-- Index for year sorting
CREATE INDEX IF NOT EXISTS idx_publications_year ON publications(year DESC);
-- RLS Policies
ALTER TABLE publications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on publications" ON publications FOR
SELECT TO public USING (true);
CREATE POLICY "Allow authenticated insert on publications" ON publications FOR
INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on publications" ON publications FOR
UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete on publications" ON publications FOR DELETE TO authenticated USING (true);
-- ============================================
-- 4. PARTNERS TABLE
-- ============================================
-- RLS Policies
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on partners" ON partners FOR
SELECT TO public USING (true);
CREATE POLICY "Allow authenticated insert on partners" ON partners FOR
INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on partners" ON partners FOR
UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete on partners" ON partners FOR DELETE TO authenticated USING (true);
-- ============================================
-- 5. PAGE_CONTENT TABLE (Key-Value Store)
-- ============================================
-- Menambahkan kolom created_at ke tabel page_content (jika belum ada)
ALTER TABLE public.page_content
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();
-- Menambahkan kolom updated_at ke tabel page_content (jika belum ada)
ALTER TABLE public.page_content
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
-- RLS Policies
ALTER TABLE page_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read access on page_content" ON page_content FOR
SELECT TO public USING (true);
CREATE POLICY "Allow authenticated insert on page_content" ON page_content FOR
INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update on page_content" ON page_content FOR
UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Allow authenticated delete on page_content" ON page_content FOR DELETE TO authenticated USING (true);
-- ============================================
-- 6. AUTO UPDATE TIMESTAMP TRIGGER
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = NOW();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;
-- Apply trigger to all tables
CREATE TRIGGER update_projects_updated_at BEFORE
UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_members_updated_at BEFORE
UPDATE ON members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_publications_updated_at BEFORE
UPDATE ON publications FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_partners_updated_at BEFORE
UPDATE ON partners FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_page_content_updated_at BEFORE
UPDATE ON page_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
-- ============================================
-- 7. SUPABASE STORAGE SETUP
-- ============================================
-- Create public storage bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('public-assets', 'public-assets', true) ON CONFLICT (id) DO NOTHING;
-- Storage policies for public-assets bucket
CREATE POLICY "Allow public read access on public-assets" ON storage.objects FOR
SELECT TO public USING (bucket_id = 'public-assets');
CREATE POLICY "Allow authenticated upload to public-assets" ON storage.objects FOR
INSERT TO authenticated WITH CHECK (bucket_id = 'public-assets');
CREATE POLICY "Allow authenticated update in public-assets" ON storage.objects FOR
UPDATE TO authenticated USING (bucket_id = 'public-assets') WITH CHECK (bucket_id = 'public-assets');
CREATE POLICY "Allow authenticated delete in public-assets" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'public-assets');
-- ============================================
-- MIGRATION COMPLETE! ✅
-- ============================================
-- Next steps:
-- 1. Verify tables created: Check Table Editor
-- 2. Verify RLS policies: Check Authentication → Policies
-- 3. Verify storage bucket: Check Storage → Buckets
-- 4. Start adding data via Admin Panel