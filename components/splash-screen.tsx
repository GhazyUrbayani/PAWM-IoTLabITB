"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

interface SplashScreenProps {
  size?: "sm" | "md" | "lg" | "full"
  text?: string
  subtext?: string
  showLogo?: boolean
}

export function SplashScreen({ 
  size = "full", 
  text = "Memuat...", 
  subtext = "Mohon tunggu sebentar",
  showLogo = true 
}: SplashScreenProps) {
  const [dots, setDots] = useState("")

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".")
    }, 500)
    return () => clearInterval(interval)
  }, [])

  const sizeClasses = {
    sm: "min-h-[200px]",
    md: "min-h-[400px]",
    lg: "min-h-[600px]",
    full: "min-h-screen"
  }

  const spinnerSizes = {
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-20 h-20",
    full: "w-24 h-24"
  }

  const logoSizes = {
    sm: 40,
    md: 60,
    lg: 80,
    full: 100
  }

  return (
    <div className={`flex items-center justify-center ${sizeClasses[size]} bg-background/95 backdrop-blur-sm`}>
      <div className="text-center space-y-6 animate-fade-in-up">
        {/* Logo */}
        {showLogo && (
          <div className="flex justify-center mb-6 animate-pulse">
            <div className="relative">
              <Image
                src="/Logo Lab IoT.png"
                alt="IoT Lab Logo"
                width={logoSizes[size]}
                height={logoSizes[size]}
                className="object-contain"
                priority
              />
            </div>
          </div>
        )}

        {/* Spinner */}
        <div className="flex justify-center">
          <div className={`relative ${spinnerSizes[size]}`}>
            {/* Outer ring */}
            <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 rounded-full"></div>
            {/* Spinning ring */}
            <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            {/* Inner pulse */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-primary/10 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Text */}
        <div className="space-y-2 px-4">
          <p className="text-xl md:text-2xl font-bold text-foreground">
            {text}{dots}
          </p>
          <p className="text-sm md:text-base text-muted-foreground animate-pulse">
            {subtext}
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full animate-loading-bar"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Compact loading component for inline use
export function LoadingSpinner({ 
  size = "md",
  className = "" 
}: { 
  size?: "xs" | "sm" | "md" | "lg"
  className?: string 
}) {
  const sizeMap = {
    xs: "w-4 h-4 border-2",
    sm: "w-6 h-6 border-2",
    md: "w-8 h-8 border-3",
    lg: "w-12 h-12 border-4"
  }

  return (
    <div className={`relative ${sizeMap[size]} ${className}`}>
      <div className="absolute top-0 left-0 w-full h-full border-primary/20 rounded-full"></div>
      <div className="absolute top-0 left-0 w-full h-full border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

// Section loading skeleton
export function LoadingSkeleton({ 
  rows = 3,
  className = "" 
}: { 
  rows?: number
  className?: string 
}) {
  return (
    <div className={`space-y-4 ${className}`}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="animate-pulse space-y-3">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-4 bg-muted rounded w-5/6"></div>
        </div>
      ))}
    </div>
  )
}