import { LoadingSkeleton } from "@/components/splash-screen"

export default function Loading() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-48 bg-muted animate-pulse rounded"></div>
        <div className="h-10 w-32 bg-muted animate-pulse rounded"></div>
      </div>
      
      {/* Stats Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-lg border bg-card p-6 space-y-2 hover-lift">
            <div className="h-4 w-24 bg-muted animate-pulse rounded"></div>
            <div className="h-8 w-16 bg-muted animate-pulse rounded"></div>
            <div className="h-3 w-20 bg-muted animate-pulse rounded mt-2"></div>
          </div>
        ))}
      </div>

      {/* Activity Log Skeleton */}
      <div className="rounded-lg border bg-card p-6 space-y-4">
        <div className="h-6 w-40 bg-muted animate-pulse rounded"></div>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="flex items-center gap-4 p-4 border-b last:border-0">
            <div className="h-10 w-10 bg-muted animate-pulse rounded-full"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-3/4 bg-muted animate-pulse rounded"></div>
              <div className="h-3 w-1/2 bg-muted animate-pulse rounded"></div>
            </div>
            <div className="h-3 w-20 bg-muted animate-pulse rounded"></div>
          </div>
        ))}
      </div>
    </div>
  )
}
