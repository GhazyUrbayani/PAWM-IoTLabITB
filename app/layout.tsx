import type React from "react"
import type { Metadata } from "next"
import { Merriweather, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ScrollToTop } from "@/components/scroll-to-top"
import "./globals.css"

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-serif",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "IoT Lab - Research Laboratory",
  description:
    "IoT Lab: Bridging the physical and digital worlds through cutting-edge research in sensor networks, big data, and intelligent systems.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${merriweather.variable} ${poppins.variable} font-sans antialiased bg-background text-foreground`}
      >
        {children}
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  )
}
