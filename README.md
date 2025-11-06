# IoT Lab Website

Website resmi laboratorium IoT yang dibangun dengan Next.js 16, Supabase, dan Resend.

## Tech Stack

- **Framework**: Next.js 16.0.0 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Email Service**: Resend
- **UI Components**: Radix UI, shadcn/ui
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **Package Manager**: pnpm

## Features

- ✅ Dynamic content management (Hero, About, History)
- ✅ Image upload untuk semua section (Hero, About, History)
- ✅ Admin dashboard dengan authentication
- ✅ Project/Research management
- ✅ Team members management
- ✅ Publications management
- ✅ Partners/Funding management
- ✅ Contact form dengan Resend email service
- ✅ Dark/Light theme toggle
- ✅ Responsive design
- ✅ Smart cookie management (persist on refresh, clear on close)

## Environment Variables

Copy `.env.local.example` ke `.env.local` dan isi dengan nilai yang sesuai:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# Resend Email Service
# Get your API key from: https://resend.com/api-keys
RESEND_API_KEY=re_your_resend_api_key_here
```

### Cara Mendapatkan API Keys

#### Supabase

1. Buat project baru di [Supabase](https://supabase.com/)
2. Pergi ke Settings → API
3. Copy **URL** dan **anon/public key**

#### Resend

1. Daftar di [Resend](https://resend.com/)
2. Pergi ke [API Keys](https://resend.com/api-keys)
3. Buat API key baru
4. **Penting**: Untuk production, verifikasi domain Anda terlebih dahulu

## Database Setup

1. Jalankan script SQL di file `SETUP_PAGE_CONTENT_TABLE.sql` di Supabase SQL Editor
2. Script ini akan membuat table `page_content` dengan semua field yang diperlukan

## Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start
```

## Admin Access

1. Navigasi ke `/admin/login`
2. Login dengan email dan password yang terdaftar di Supabase `users` table
3. Akses admin dashboard untuk manage content

## Upload Folders

Upload folders yang digunakan di Supabase Storage:

- `settings/` - Hero, About, History images
- `projects/` - Project images
- `members/` - Team member photos
- `partners/` - Partner logos

## Contact Form

Contact form menggunakan Resend email service. Email akan dikirim ke alamat yang diset di page_content table (key: `contact_email`).

**Catatan Penting untuk Production:**

- Update `from` address di `app/api/send-email/route.ts` dengan domain yang sudah diverifikasi di Resend
- Default: `onboarding@resend.dev` (hanya untuk testing)

## Cookie Management

Website menggunakan smart cookie cleanup:

- **Persist**: Cookie tetap ada saat refresh/reload page
- **Clear**: Cookie dihapus otomatis saat tab/browser ditutup (bukan saat refresh)
- **Timeout**: Cookie dihapus setelah 30 menit tidak aktif

## Project Structure

```
app/
├── admin/          # Admin panel (protected routes)
├── api/            # API routes (auth, upload, send-email)
├── contact/        # Contact page
├── research/       # Research detail pages
├── page.tsx        # Homepage
└── ...

components/
├── ui/             # shadcn/ui components
├── navbar.tsx      # Navigation bar
├── footer.tsx      # Footer component
└── ...

lib/
├── api/            # API client functions
├── supabase/       # Supabase client
└── utils.ts        # Utility functions
```

## Key Changes from Formspree to Resend

- ✅ Removed `@formspree/react` dependency
- ✅ Created `/api/send-email` route using Resend SDK
- ✅ Email recipient from database (not hardcoded)
- ✅ Custom form handling with better error states
- ✅ No external form service dependency

## Content Management

All content (teks, gambar, contact info) dikelola melalui admin panel di `/admin/settings`. Tidak ada hardcoded content di frontend.

## License

Proprietary - IoT Lab

## Support

Untuk pertanyaan atau support, hubungi email yang tertera di website.
