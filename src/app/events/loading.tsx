import { Skeleton } from "@/components/ui/skeleton";

export default function EventsLoading() {
  return (
    <main className="mt-20 min-h-screen w-full bg-background text-foreground transition-colors duration-300">
      {/* Header skeleton */}
      <section className="relative overflow-hidden border-b border-[#dce5d8] px-5 py-14 dark:border-[#26372b] sm:py-16">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
          <Skeleton className="h-7 w-40 rounded-full" />
          <Skeleton className="h-10 w-64 sm:h-12 sm:w-80" />
          <Skeleton className="h-5 w-full max-w-md" />
          <Skeleton className="h-5 w-3/4 max-w-sm" />
          <div className="mt-3 flex gap-3">
            <Skeleton className="h-11 w-36 rounded-lg" />
            <Skeleton className="h-11 w-28 rounded-lg" />
          </div>
        </div>
      </section>

      {/* Grid skeleton */}
      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 sm:py-12">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-2xl border border-[#dce5d8] bg-card dark:border-[#26372b]"
            >
              <Skeleton className="aspect-[16/10] w-full rounded-none" />
              <div className="space-y-3 p-4">
                <Skeleton className="h-5 w-4/5" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
                <div className="space-y-2 border-t border-[#eef3ec] pt-3 dark:border-[#22331f]">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-3/5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
