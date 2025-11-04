export default function Loading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 bg-muted animate-pulse rounded"></div>
        <div className="h-10 w-32 bg-muted animate-pulse rounded"></div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="h-10 flex-1 bg-muted animate-pulse rounded"></div>
        <div className="h-10 w-40 bg-muted animate-pulse rounded"></div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="rounded-lg border bg-card overflow-hidden">
            <div className="h-48 bg-muted animate-pulse"></div>
            <div className="p-6 space-y-3">
              <div className="h-6 w-3/4 bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-full bg-muted animate-pulse rounded"></div>
              <div className="h-4 w-5/6 bg-muted animate-pulse rounded"></div>
              <div className="flex gap-2 mt-4">
                <div className="h-6 w-20 bg-muted animate-pulse rounded-full"></div>
                <div className="h-6 w-16 bg-muted animate-pulse rounded-full"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
