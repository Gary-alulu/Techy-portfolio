export default function GalleryLoading() {
  return (
    <div className="bg-black pt-16 min-h-screen">
      <div className="p-4">
        <div className="skeleton h-12 w-48 mx-auto mb-8" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="skeleton col-span-2 row-span-2 h-[350px] rounded-3xl" />
          <div className="skeleton h-[200px] rounded-3xl" />
          <div className="skeleton h-[200px] rounded-3xl" />
          <div className="skeleton h-[200px] rounded-3xl" />
          <div className="skeleton h-[200px] rounded-3xl" />
          <div className="skeleton h-[200px] rounded-3xl" />
          <div className="skeleton h-[200px] rounded-3xl" />
          <div className="skeleton h-[200px] rounded-3xl" />
        </div>
      </div>
    </div>
  );
}
