export default function ProjectLoading() {
  return (
    <div className="pb-32 bg-black min-h-screen">
      <div className="relative w-full h-[80vh] md:h-[90vh] min-h-[600px] overflow-hidden skeleton rounded-none">
        <div className="absolute inset-0 p-6 md:p-16 flex flex-col justify-end max-w-7xl mx-auto">
          <div className="skeleton h-10 w-36 rounded-full mb-10" />
          <div className="skeleton h-12 w-40 rounded-full mb-6" />
          <div className="skeleton h-20 md:h-28 w-full max-w-3xl" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-24 space-y-32">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="skeleton h-32" />
          <div className="skeleton h-32" />
          <div className="skeleton h-32" />
          <div className="skeleton h-32 md:col-span-2" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="skeleton h-12 w-48" />
          </div>
          <div className="lg:col-span-8 space-y-6">
            <div className="skeleton h-10 w-full" />
            <div className="skeleton h-10 w-5/6" />
            <div className="skeleton h-10 w-4/6" />
          </div>
        </div>

        <div className="space-y-6 pt-16">
          <div className="skeleton h-10 w-64" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="skeleton h-[300px] md:h-[400px] rounded-3xl" />
            <div className="skeleton h-[300px] md:h-[400px] rounded-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
