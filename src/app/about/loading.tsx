export default function AboutLoading() {
  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <main className="relative z-10 pb-32">
        <section className="min-h-[70vh] flex flex-col items-center justify-center gap-8 px-6">
          <div className="skeleton h-8 w-32 rounded-full" />
          <div className="skeleton h-20 md:h-28 w-full max-w-3xl" />
          <div className="skeleton h-6 w-full max-w-xl" />
          <div className="skeleton h-6 w-3/4 max-w-lg" />
        </section>

        <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 space-y-24 pt-24">
          <div className="skeleton h-[400px] rounded-3xl" />
          <div className="skeleton h-[300px] rounded-3xl" />
          <div className="skeleton h-[350px] rounded-3xl" />
          <div className="skeleton h-[250px] rounded-3xl" />
          <div className="skeleton h-[200px] rounded-3xl" />
        </div>
      </main>
    </div>
  );
}
