# Website Profil & CMS Laboratorium IoT ITB (TuBes PAWM)

[![Status Proyek](https://img.shields.io/badge/Status-Development-blue.svg)](https://github.com/GhazyUrbayani/PAWM-IoTLabITB)
[![Tech Stack](https://img.shields.io/badge/Stack-Next.js_16-black?logo=nextdotjs)](https://nextjs.org/)
[![Database](https://img.shields.io/badge/Database-Supabase-green?logo=supabase)](https://supabase.io/)
[![Deployment](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

Website profil resmi untuk Laboratorium Riset IoT, dikembangkan sebagai Tugas Besar mata kuliah Pengembangan Aplikasi Web dan Mobile (PAWM).

Ini bukan hanya *website* statis, tetapi sebuah *Content Management System* (CMS) penuh yang memungkinkan admin lab mengelola seluruh konten halaman depan secara dinamis melalui *dashboard* admin yang terproteksi.

## ✨ Fitur Utama (Sesuai Kode Final)

* **Arsitektur Single-Page:** Semua konten utama (Sejarah, Member, Riset, Publikasi, Partner) ditampilkan di Halaman Utama sesuai arahan Dosen Koordinator.
* **Panel Admin Lengkap:** *Dashboard* admin (`/admin`) terproteksi dengan autentikasi Supabase.
* **Manajemen Konten Halaman:** Admin dapat mengedit Teks Hero, Sejarah, dan gambar terkait melalui halaman *Settings* (`/admin/settings`) yang terhubung ke tabel `page_content`.
* **CRUD Penuh:** Fungsionalitas *Create, Read, Update, Delete* (CRUD) penuh untuk:
    * Riset & Proyek
    * Member Lab
    * Publikasi Ilmiah
    * Partners & Funding
* **Upload Gambar:** *Upload* file terintegrasi ke Supabase Storage (untuk foto member, logo partner, dll).
* **Filter Proyek:** Fitur *filter* proyek interaktif di Halaman Utama.
* **Formulir Kontak:** Halaman kontak terhubung ke API *backend* (`/api/send-email`) menggunakan Resend.
* **Fitur Tambahan:** *Dark/Light theme toggle*, Tombol *Scroll to Top*, *Loading skeletons*, dan *layout* responsif.

## 🛠️ Tumpukan Teknologi (Tech Stack)

* **Framework**: Next.js 16 (App Router)
* **Bahasa**: TypeScript
* **Database (BaaS)**: Supabase (PostgreSQL)
* **Autentikasi**: Supabase Auth
* **File Storage**: Supabase Storage
* **Email Service**: Resend
* **UI**: Tailwind CSS & shadcn/ui
* **Package Manager**: pnpm
* **Deployment**: Vercel

## ⚙️ Pengaturan Lokal

### 1. Setup Environment Variables

Salin `.env.example` (jika ada) atau buat file baru bernama `.env.local` di *root* proyek. Isi dengan kredensial Supabase dan Resend kamu.

```bash
# Kredensial dari Supabase Dashboard -> Settings -> API
NEXT_PUBLIC_SUPABASE_URL=https://<id-proyek-kamu>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<kunci_anon_publik_kamu>

# Kredensial dari Resend Dashboard -> API Keys
RESEND_API_KEY=re_kunci_api_resend_kamu

(Catatan: File .env.local yang kamu unggah juga berisi NEXT_PUBLIC_FORM untuk Formspree. Jika kamu final menggunakan Resend, kamu tidak memerlukannya. Jika kamu tetap pakai Formspree, kamu tidak perlu RESEND_API_KEY.)

### 2. Setup Database Supabase
Seluruh skema database, RLS (Row Level Security), dan data awal ada di satu file.
* 1. Buka dashboard proyek Supabase kamu.
* 2. Pergi ke SQL Editor.
* 3. Salin seluruh isi dari file database-schema.sql.
* 4. Tempel ke SQL Editor dan klik "RUN".
Ini akan membuat tabel projects, members, publications, partners, page_content, activity_logs dan mengaktifkan RLS.
