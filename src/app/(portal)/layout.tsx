import { PortalSidebar } from "@/components/portal/sidebar";
import { PortalShell } from "@/components/portal/portal-shell";

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dark flex h-screen overflow-hidden bg-zinc-950 text-zinc-50">
      <PortalSidebar />
      <PortalShell>{children}</PortalShell>
    </div>
  );
}
