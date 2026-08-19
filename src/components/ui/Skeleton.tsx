import { twMerge } from "tailwind-merge";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={twMerge(
        "relative overflow-hidden rounded-2xl bg-white/[0.04] border border-white/[0.04]",
        "before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/[0.04] before:to-transparent",
        className
      )}
      {...props}
    />
  );
}

export function SkeletonHero() {
  return (
    <section className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
      <div className="flex-1 space-y-8">
        <div>
          <Skeleton className="h-4 w-32 mb-4" />
          <Skeleton className="h-16 sm:h-20 lg:h-24 w-full max-w-lg mb-2" />
          <Skeleton className="h-16 sm:h-20 lg:h-24 w-3/4" />
        </div>
        <Skeleton className="h-5 w-full max-w-xl" />
        <Skeleton className="h-5 w-3/4 max-w-lg" />
        <div className="flex gap-4 pt-4">
          <Skeleton className="h-12 w-36 rounded-full" />
          <Skeleton className="h-12 w-28 rounded-full" />
          <Skeleton className="h-12 w-28 rounded-full" />
        </div>
      </div>
      <div className="flex-1 w-full flex flex-col justify-center items-end gap-5 mt-12 lg:mt-0">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="w-full max-w-[360px] lg:max-w-[440px] h-[100px] rounded-2xl" />
        ))}
      </div>
    </section>
  );
}

export function SkeletonProjectCard({ large }: { large?: boolean }) {
  return (
    <Skeleton
      className={`col-span-1 rounded-[var(--radius-container)] ${
        large ? "md:col-span-2 h-[400px] sm:h-[500px]" : "h-[350px] sm:h-[400px] md:h-[500px]"
      }`}
    />
  );
}

export function SkeletonProjectGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <SkeletonProjectCard large />
      <SkeletonProjectCard />
      <SkeletonProjectCard />
      <SkeletonProjectCard />
      <SkeletonProjectCard />
      <SkeletonProjectCard />
    </div>
  );
}

export function SkeletonWorkHeader() {
  return (
    <div className="pt-32 pb-16">
      <Skeleton className="h-16 md:h-20 w-48 mb-6" />
      <Skeleton className="h-6 w-full max-w-2xl" />
      <Skeleton className="h-6 w-3/4 max-w-lg mt-2" />
    </div>
  );
}

export function SkeletonProjectDetail() {
  return (
    <div className="pb-32 bg-black min-h-screen">
      <div className="relative w-full h-[80vh] md:h-[90vh] min-h-[600px] overflow-hidden">
        <Skeleton className="absolute inset-0 w-full h-full rounded-none" />
        <div className="absolute inset-0 p-6 md:p-16 flex flex-col justify-end max-w-7xl mx-auto">
          <Skeleton className="h-10 w-36 rounded-full mb-10" />
          <Skeleton className="h-12 w-40 rounded-full mb-6" />
          <Skeleton className="h-20 md:h-28 w-full max-w-3xl" />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 pt-24 space-y-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className={`h-32 rounded-3xl ${i === 4 ? "md:col-span-2" : ""}`} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <Skeleton className="lg:col-span-4 h-12" />
          <div className="lg:col-span-8 space-y-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-5/6" />
            <Skeleton className="h-10 w-4/6" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function SkeletonAboutSection({ height = "h-64" }: { height?: string }) {
  return (
    <div className="py-16">
      <Skeleton className={`w-full ${height} rounded-3xl`} />
    </div>
  );
}

export function SkeletonGallery() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
      {Array.from({ length: 9 }).map((_, i) => (
        <Skeleton
          key={i}
          className={`rounded-3xl ${
            i % 5 === 0 ? "col-span-2 row-span-2 h-[350px]" : "h-[200px]"
          }`}
        />
      ))}
    </div>
  );
}

export function SkeletonServices() {
  return (
    <div className="space-y-16 pb-24 pt-32">
      <div className="text-center space-y-4">
        <Skeleton className="h-16 w-80 mx-auto" />
        <Skeleton className="h-6 w-full max-w-xl mx-auto" />
        <Skeleton className="h-6 w-2/3 max-w-md mx-auto" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-48 rounded-3xl" />
        ))}
      </div>
    </div>
  );
}

export function SkeletonAdminTable() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Skeleton className="h-10 w-40" />
        <Skeleton className="h-10 w-36 rounded-md" />
      </div>
      <div className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden">
        <div className="bg-neutral-950 border-b border-white/10 px-6 py-4">
          <div className="flex gap-8">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="border-b border-white/5 px-6 py-4">
            <div className="flex gap-8 items-center">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-6 w-20 rounded" />
              <Skeleton className="h-4 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
