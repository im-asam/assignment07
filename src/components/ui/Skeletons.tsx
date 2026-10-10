export function CardSkeleton() {
  return (
    <div className="rounded-2xl border border-gray-200/70 bg-white p-4">
      <div className="flex items-center gap-3">
        <div className="skeleton h-12 w-12 shrink-0 rounded-xl" />
        <div className="flex-1 space-y-2">
          <div className="skeleton h-4 w-3/4 rounded" />
          <div className="skeleton h-3 w-1/2 rounded" />
        </div>
      </div>
      <div className="skeleton mt-4 h-3 w-1/4 rounded" />
      <div className="mt-2 flex items-center justify-between">
        <div className="skeleton h-6 w-1/3 rounded" />
        <div className="skeleton h-6 w-16 rounded-full" />
      </div>
    </div>
  );
}

export function CardGridSkeleton({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
