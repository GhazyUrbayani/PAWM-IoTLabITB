export default function Loading() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-40 bg-muted animate-pulse rounded"></div>
        <div className="h-10 w-32 bg-muted animate-pulse rounded"></div>
      </div>

      {/* Search Skeleton */}
      <div className="h-10 w-full max-w-md bg-muted animate-pulse rounded"></div>

      {/* Publications List Skeleton */}
      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-lg border bg-card p-6 hover-lift">
            <div className="space-y-3">
              <div className="h-6 w-5/6 bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-2/3 bg-muted animate-pulse rounded"></div>
              <div className="flex gap-2 mt-3">
                <div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>
                <div className="h-6 w-24 bg-muted animate-pulse rounded-full"></div>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="h-9 flex-1 bg-muted animate-pulse rounded"></div>
                <div className="h-9 w-20 bg-muted animate-pulse rounded"></div>
                <div className="h-9 w-9 bg-muted animate-pulse rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
