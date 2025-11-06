import { SplashScreen } from "@/components/splash-screen"

export default function Loading() {
  return <SplashScreen size="lg" text="Memuat Dashboard Admin" subtext="Mengambil data dari server..." showLogo={false} />
}
