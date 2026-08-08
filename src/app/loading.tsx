export default function Loading() {
  return (
    <div className="fixed inset-0 z-[999999] flex items-center justify-center bg-[#0D0D0D] transition-opacity duration-200">
      <div className="flex flex-col items-center gap-5">
        <div className="relative w-10 h-10">
          {/* Outer ring */}
          <div className="absolute inset-0 rounded-full border-[2px] border-white/5 border-t-[var(--color-accent-orange)] animate-spin" style={{ animationDuration: '0.7s' }} />
          {/* Inner dot */}
          <div className="absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-[var(--color-accent-blue)] animate-pulse shadow-[0_0_8px_var(--color-accent-blue)]" />
        </div>
        <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase font-medium">Loading</p>
      </div>
    </div>
  );
}
