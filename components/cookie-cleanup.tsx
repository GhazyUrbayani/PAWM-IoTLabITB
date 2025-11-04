'use client'

import { useEffect } from 'react'

export function CookieCleanup() {
  useEffect(() => {
    const clearAuthCookies = () => {
      document.cookie = 'auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      document.cookie = 'isAuthenticated=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
      
      const cookies = document.cookie.split(';')
      for (let cookie of cookies) {
        const eqPos = cookie.indexOf('=')
        const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim()
        if (name.startsWith('sb-') || name.includes('supabase')) {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`
        }
      }
    }

    // Set flag bahwa page sedang aktif
    sessionStorage.setItem('page-active', 'true')

    // Handle tab visibility (untuk 30 menit inactivity)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        sessionStorage.setItem('tab-hidden-at', Date.now().toString())
      } else if (document.visibilityState === 'visible') {
        const hiddenAt = sessionStorage.getItem('tab-hidden-at')
        if (hiddenAt) {
          const hiddenDuration = Date.now() - parseInt(hiddenAt)
          const thirtyMinutes = 30 * 60 * 1000
          
          if (hiddenDuration > thirtyMinutes) {
            clearAuthCookies()
            window.location.href = '/login'
          }
        }
      }
    }

    // Handle page unload (tab/browser close)
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      // Gunakan pagehide yang lebih reliable untuk mendeteksi close
      sessionStorage.removeItem('page-active')
    }

    const handlePageHide = () => {
      // Cek apakah ini benar-benar close (bukan refresh)
      // sessionStorage akan hilang jika tab ditutup, tapi tetap ada jika refresh
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      const isRefresh = navigation?.type === 'reload'
      
      if (!isRefresh) {
        // Tab/browser ditutup, hapus cookies
        clearAuthCookies()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('pagehide', handlePageHide)

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('pagehide', handlePageHide)
    }
  }, [])

  return null
}
