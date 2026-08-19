export default function HomeLoading() {
  return (
    <div className="flex flex-col gap-16 md:gap-32 pb-16 md:pb-24">
      {/* Hero skeleton */}
      <section className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
        <div className="flex-1 space-y-8">
          <div>
            <div className="skeleton h-4 w-32 mb-4 rounded-full" />
            <div className="skeleton h-16 sm:h-20 lg:h-24 w-full max-w-lg mb-2" />
            <div className="skeleton h-16 sm:h-20 lg:h-24 w-3/4" />
          </div>
          <div className="space-y-3">
            <div className="skeleton h-5 w-full max-w-xl" />
            <div className="skeleton h-5 w-3/4 max-w-lg" />
          </div>
          <div className="flex gap-4 pt-4">
            <div className="skeleton h-12 w-36 rounded-full" />
            <div className="skeleton h-12 w-28 rounded-full" />
            <div className="skeleton h-12 w-28 rounded-full" />
          </div>
        </div>
        <div className="flex-1 w-full flex flex-col justify-center items-end gap-5 mt-12 lg:mt-0">
          <div className="skeleton w-full max-w-[360px] lg:max-w-[440px] h-[100px] rounded-2xl" />
          <div className="skeleton w-full max-w-[360px] lg:max-w-[440px] h-[100px] rounded-2xl" />
          <div className="skeleton w-full max-w-[360px] lg:max-w-[440px] h-[100px] rounded-2xl" />
        </div>
      </section>

      {/* Featured work skeleton */}
      <section className="space-y-12">
        <div className="flex items-end justify-between">
          <div className="space-y-3">
            <div className="skeleton h-10 w-48" />
            <div className="skeleton h-5 w-64" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="skeleton col-span-1 md:col-span-2 h-[400px] sm:h-[500px]" />
          <div className="skeleton h-[350px] sm:h-[400px] md:h-[500px]" />
          <div className="skeleton h-[350px] sm:h-[400px] md:h-[500px]" />
          <div className="skeleton h-[350px] sm:h-[400px] md:h-[500px]" />
        </div>
      </section>

      {/* Process skeleton */}
      <section className="py-16">
        <div className="text-center mb-16 space-y-3">
          <div className="skeleton h-10 w-48 mx-auto" />
          <div className="skeleton h-5 w-full max-w-xl mx-auto" />
        </div>
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex flex-col items-center gap-4">
              <div className="skeleton w-16 h-16 rounded-full" />
              <div className="skeleton h-4 w-16" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
