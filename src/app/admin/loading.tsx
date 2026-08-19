export default function AdminLoading() {
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="skeleton h-10 w-40" />
        <div className="skeleton h-10 w-36 rounded-md" />
      </div>

      <div className="bg-neutral-900 border border-white/10 rounded-xl overflow-hidden">
        <div className="bg-neutral-950 border-b border-white/10 px-6 py-4">
          <div className="flex gap-8">
            <div className="h-4 w-24 bg-white/10 rounded" />
            <div className="h-4 w-28 bg-white/10 rounded" />
            <div className="h-4 w-20 bg-white/10 rounded" />
            <div className="h-4 w-16 bg-white/10 rounded" />
          </div>
        </div>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="border-b border-white/5 px-6 py-4">
            <div className="flex gap-8 items-center">
              <div className="skeleton h-4 w-48" />
              <div className="skeleton h-4 w-32" />
              <div className="skeleton h-6 w-20 rounded" />
              <div className="skeleton h-4 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
