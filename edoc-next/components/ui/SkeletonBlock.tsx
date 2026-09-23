"use client"

export function SkeletonBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-slate-200/60 rounded-xl animate-pulse ${className}`}
      style={{
        backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
        backgroundSize: "200% 100%",
        animation: "shimmer 2.5s linear infinite, pulse 2s ease-in-out infinite"
      }}
    />
  )
}

export function SkeletonCard() {
  return (
    <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
      <SkeletonBlock className="h-5 w-1/3" />
      <SkeletonBlock className="h-4 w-2/3" />
      <SkeletonBlock className="h-4 w-1/2" />
      <SkeletonBlock className="h-10 w-full mt-4" />
    </div>
  )
}

export function SkeletonTable({ rows = 4, cols = 4 }: { rows?: number; cols?: number }) {
  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="bg-slate-50 border-b border-border p-4 flex gap-4">
        {Array.from({ length: cols }).map((_, i) => (
          <SkeletonBlock key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="p-4 flex gap-4 border-b border-border last:border-0">
          {Array.from({ length: cols }).map((_, j) => (
            <SkeletonBlock key={j} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  )
}

export function SkeletonStats({ count = 2 }: { count?: number }) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-${count} gap-6`}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-card rounded-2xl border border-border p-6 space-y-3">
          <SkeletonBlock className="h-4 w-1/3" />
          <SkeletonBlock className="h-8 w-1/4" />
        </div>
      ))}
    </div>
  )
}
