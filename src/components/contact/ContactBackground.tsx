"use client";

export function ContactBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden bg-[var(--color-background)]">
      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg width=\\'40\\' height=\\'40\\' viewBox=\\'0 0 40 40\\' xmlns=\\'http://www.w3.org/2000/svg\\'%3E%3Cpath d=\\'M0 0h40v40H0V0zm1 1h38v38H1V1z\\' fill=\\'%23FFF\\' fill-rule=\\'evenodd\\'/%3E%3C/svg%3E')" }} />
      
      {/* Optimized Ambient Glows */}
      <div className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[var(--color-accent-blue)]/10 rounded-full blur-[90px] will-change-transform" />
      <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] bg-[var(--color-accent-purple)]/10 rounded-full blur-[80px] will-change-transform" />
      <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[350px] h-[350px] bg-[var(--color-accent-orange)]/8 rounded-full blur-[70px] will-change-transform" />
    </div>
  );
}
