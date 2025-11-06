export default function Loading() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 bg-muted animate-pulse rounded"></div>
        <div className="h-10 w-32 bg-muted animate-pulse rounded"></div>
      </div>

      {/* Partners Grid Skeleton */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="rounded-lg border bg-card p-6 hover-lift">
            <div className="flex justify-center mb-4">
              <div className="w-32 h-24 bg-muted animate-pulse rounded"></div>
            </div>
            <div className="space-y-2">
              <div className="h-5 w-3/4 mx-auto bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-1/2 mx-auto bg-muted animate-pulse rounded"></div>
            </div>
            <div className="flex gap-2 mt-4">
              <div className="h-9 flex-1 bg-muted animate-pulse rounded"></div>
              <div className="h-9 w-9 bg-muted animate-pulse rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
