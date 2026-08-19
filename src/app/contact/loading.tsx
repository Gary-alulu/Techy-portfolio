export default function ContactLoading() {
  return (
    <div className="min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="space-y-8">
            <div className="skeleton h-14 w-64" />
            <div className="skeleton h-6 w-full max-w-md" />
            <div className="space-y-4 pt-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="skeleton w-12 h-12 rounded-full shrink-0" />
                  <div className="space-y-2 flex-1">
                    <div className="skeleton h-4 w-24" />
                    <div className="skeleton h-3 w-40" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass-panel rounded-3xl p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><div className="skeleton h-3 w-16" /><div className="skeleton h-12 rounded-2xl" /></div>
                <div className="space-y-2"><div className="skeleton h-3 w-16" /><div className="skeleton h-12 rounded-2xl" /></div>
              </div>
              <div className="space-y-2"><div className="skeleton h-3 w-20" /><div className="skeleton h-12 rounded-2xl" /></div>
              <div className="space-y-2"><div className="skeleton h-3 w-20" /><div className="skeleton h-12 rounded-2xl" /></div>
              <div className="space-y-2"><div className="skeleton h-3 w-20" /><div className="skeleton h-32 rounded-2xl" /></div>
              <div className="skeleton h-12 w-full rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
