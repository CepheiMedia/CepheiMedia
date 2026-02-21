export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen items-center justify-center px-6">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/hero-bg.mp4?v=2" type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 bg-black/60" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
