export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        <div className="relative w-20 h-20 mx-auto">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-primary/20 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
        <div className="space-y-2">
          <p className="text-xl font-semibold text-foreground animate-pulse">
            Memuat...
          </p>
          <p className="text-sm text-muted-foreground">
            Mohon tunggu sebentar
          </p>
        </div>
      </div>
    </div>
  )
}
