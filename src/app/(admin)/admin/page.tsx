import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch summary counts
  const [
    { count: clientCount },
    { count: inquiryCount },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }).eq("role", "client"),
    supabase.from("inquiries").select("*", { count: "exact", head: true }),
  ]);

  const stats = [
    { label: "Total Clients", value: clientCount ?? 0 },
    { label: "Pending Inquiries", value: inquiryCount ?? 0 },
    { label: "Active Campaigns", value: "—" },
    { label: "Monthly Revenue", value: "—" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
      <p className="mt-1 text-muted-foreground">
        Manage clients, campaigns, and platform settings.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border/60 bg-card/50 p-6"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-xl border border-border/60 bg-card/50 p-6">
        <h2 className="font-semibold">Quick Actions</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Client management, integration setup, and ROI configuration will be
          available in upcoming phases.
        </p>
      </div>
    </div>
  );
}
