import type React from "react"
import type { Metadata } from "next"
import { Merriweather, Poppins } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"
import "./globals.css"

<head>
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
</head>

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
        className={`${merriweather.variable} ${poppins.variable} animated-gradient font-sans text-foreground min-h-screen antialiased m-0 p-0`}
      >
        {children}
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Analytics />

          <div className="rounded-full border cursor-pointer fixed bottom-25 left-6 z-40 flex flex-col hover-lift">
            <ThemeToggle />
          </div>
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  )
}
