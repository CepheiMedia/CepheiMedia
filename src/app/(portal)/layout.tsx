export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark bg-zinc-950 text-zinc-50">
      {children}
    </div>
  );
}
