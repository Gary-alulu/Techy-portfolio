export default function WorkLoading() {
  return (
    <div className="pb-24">
      <div className="pt-32 pb-16">
        <div className="skeleton h-16 md:h-20 w-48 mb-6" />
        <div className="skeleton h-6 w-full max-w-2xl" />
        <div className="skeleton h-6 w-3/4 max-w-lg mt-2" />
      </div>

      <div className="mb-12 flex items-center gap-2 pb-4">
        <div className="skeleton h-10 w-16 rounded-full" />
        <div className="skeleton h-10 w-28 rounded-full" />
        <div className="skeleton h-10 w-32 rounded-full" />
        <div className="skeleton h-10 w-36 rounded-full" />
        <div className="skeleton h-10 w-36 rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="skeleton h-[400px]" />
        ))}
      </div>
    </div>
  );
}
