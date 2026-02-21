import { PortalSidebar } from "@/components/portal/sidebar";
import { PortalShell } from "@/components/portal/portal-shell";

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
      <PortalSidebar />
      <PortalShell>{children}</PortalShell>
    </div>
  );
}
