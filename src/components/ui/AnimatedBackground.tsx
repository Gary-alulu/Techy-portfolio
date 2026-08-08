export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none bg-[var(--color-background)]">
      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      
      {/* Animated Mesh Gradients - using radial-gradient natively instead of CSS blur() for massive performance gain */}
      <div 
        className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] rounded-full animate-[pulse_10s_ease-in-out_infinite_alternate]" 
        style={{ background: 'radial-gradient(circle, rgba(0, 117, 255, 0.15) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute top-[20%] right-[-10%] w-[40vw] h-[40vw] rounded-full animate-[pulse_12s_ease-in-out_infinite_alternate-reverse]"
        style={{ background: 'radial-gradient(circle, rgba(157, 0, 255, 0.15) 0%, transparent 70%)' }}
      />
      <div 
        className="absolute bottom-[-10%] left-[20%] w-[60vw] h-[60vw] rounded-full animate-[pulse_15s_ease-in-out_infinite_alternate]"
        style={{ background: 'radial-gradient(circle, rgba(255, 107, 0, 0.15) 0%, transparent 70%)' }}
      />
    </div>
  );
}
