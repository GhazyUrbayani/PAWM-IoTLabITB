# Website Profil Laboratorium IoT (Tugas Besar PAWM)

[![Status Proyek](https://img.shields.io/badge/Status-Development-blue.svg)](https://github.com/USERNAME-KAMU/pawm-tubes-iot-lab)
[![Tech Stack](https://img.shields.io/badge/Stack-Next.js-black?logo=nextdotjs)](https://nextjs.org/)
[![Deploy](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

Website profil resmi untuk Laboratorium Riset IoT. Proyek ini dikembangkan sebagai pemenuhan Tugas Besar (TuBes) mata kuliah Pengembangan Aplikasi Web dan Mobile (PAWM).

Website ini dirancang sebagai etalase digital utama untuk memamerkan riset, fasilitas, anggota tim, dan publikasi lab kepada mitra industri, akademisi, dan calon mahasiswa.

## Konteks ProSPEK (Proyek Spek)

Proyek ini ("Website Lab IoT") juga difungsikan sebagai objek studi kasus untuk Laporan Ujian Tengah Semester (UTS) II3130, di mana proyek ini dianalisis sebagai sebuah "Virtual Lab" sesuai arahan tugas.

## Fitur Utama

* **Profil Lab:** Halaman `Tentang Kami` yang mendetail (Visi, Misi, Sejarah).
* **Galeri Riset:** Database proyek riset yang dapat difilter (S1, S2, S3, Ongoing).
* **Tim Peneliti:** Pameran profil Dosen, Peneliti Utama, dan Mahasiswa.
* **Peta Jalan Riset:** Visualisasi *timeline* fokus riset lab.
* **Desain Dual-Mode:** *Toggle* Light Mode (profesional) dan Dark Mode (high-tech) yang elegan.
* **Panel Admin:** (WIP) Halaman admin untuk mengelola konten proyek dan anggota (CRUD).

## Tumpukan Teknologi (Tech Stack)

* **Frontend:** [Next.js](https://nextjs.org/) (React Framework)
* **Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **UI Generation:** [v0.dev](https://v0.dev/)
* **Backend:** Next.js API Routes / [Supabase](https://supabase.io/) (untuk Database & Auth)
* **Deployment:** [Vercel](https://vercel.com/)

## Instalasi & Menjalankan Proyek (Lokal)

Pastikan kamu memiliki [Node.js](https://nodejs.org/) (v18 atau lebih baru) dan `npm` terinstal.

1.  **Clone repository ini:**
    ```bash
    git clone [https://github.com/USERNAME-KAMU/pawm-tubes-iot-lab.git](https://github.com/USERNAME-KAMU/pawm-tubes-iot-lab.git)
    cd pawm-tubes-iot-lab
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Setup Environment Variables:**
    * Buat file `.env.local` di root proyek.
    * (WIP: Tambahkan variabel yang dibutuhkan, misal: `SUPABASE_URL` dan `SUPABASE_KEY`)

4.  **Jalankan development server:**
    ```bash
    npm run dev
    ```

Buka [http://localhost:3000](http://localhost:3000) di browser kamu.

## Struktur Direktori (Utama)

- ├── .next/ (Build output)
- ├── app/ (Next.js App Router - Struktur Halaman Utama)
- │ ├── (public)/ (Halaman publik)
- │ │ ├── about/
- │ │ ├── projects/
- │ │ └── page.tsx
- │ ├── (admin)/ (Halaman admin - protected)
- │ │ ├── dashboard/
- │ │ └── page.tsx
- │ └── layout.tsx
- ├── components/ (Komponen UI Reusable - cth: Navbar, Footer, Card)
- ├── public/ (Aset statis - images, fonts)
- ├── .gitignore (File yang diabaikan Git)
- └── README.md (Dokumentasi ini)

---
*Dikerjakan untuk mata kuliah II3140 Pengembangan Aplikasi Web dan Mobile.*
