type ImportadoraPageShellProps = {
  children: React.ReactNode;
  className?: string;
};

export default function ImportadoraPageShell({
  children,
  className = "",
}: ImportadoraPageShellProps) {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#03070d] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.16),transparent_32%),radial-gradient(circle_at_top_right,rgba(76,111,88,0.18),transparent_30%),linear-gradient(180deg,#07111d_0%,#03070d_45%,#020408_100%)]" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-[460px] w-[900px] -translate-x-1/2 rounded-full bg-[#f59e0b]/10 blur-[120px]" />

      <div className="pointer-events-none absolute inset-0 opacity-[0.035] [background-image:linear-gradient(rgba(255,255,255,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.8)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div
        className={[
          "relative z-10 mx-auto min-h-screen w-full max-w-md px-4 py-5",
          "md:max-w-7xl md:px-8 md:py-8",
          "lg:px-10",
          className,
        ].join(" ")}
      >
        {children}
      </div>
    </main>
  );
}