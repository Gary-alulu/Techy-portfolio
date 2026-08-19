export default function ServicesLoading() {
  return (
    <div className="pb-24 pt-32">
      <div className="text-center space-y-4 mb-24">
        <div className="skeleton h-16 md:h-20 w-80 mx-auto" />
        <div className="skeleton h-6 w-full max-w-xl mx-auto" />
        <div className="skeleton h-6 w-2/3 max-w-md mx-auto" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-24">
        <div className="skeleton h-48" />
        <div className="skeleton h-48" />
        <div className="skeleton h-48" />
        <div className="skeleton h-48" />
      </div>

      <div className="max-w-4xl mx-auto space-y-16">
        <div className="space-y-4">
          <div className="skeleton h-8 w-48" />
          <div className="skeleton h-32" />
        </div>
        <div className="space-y-4">
          <div className="skeleton h-8 w-48" />
          <div className="skeleton h-32" />
        </div>
      </div>
    </div>
  );
}
