import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, organization_id")
    .eq("id", user?.id ?? "")
    .single();

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Welcome back{profile?.full_name ? `, ${profile.full_name}` : ""}.
        </p>
      </div>

      {/* KPI Cards placeholder — Phase 2 */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {["Total Spend", "Cost per Lead", "Leads", "ROAS"].map((label) => (
          <div
            key={label}
            className="rounded-xl border border-border/60 bg-card/50 p-6"
          >
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="mt-2 text-2xl font-bold">—</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Data available after integration
            </p>
          </div>
        ))}
      </div>

      {/* Recent activity placeholder */}
      <div className="mt-8 rounded-xl border border-border/60 bg-card/50 p-6">
        <h2 className="font-semibold">Recent Activity</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Campaign updates and deliverables will appear here once your account
          is connected.
        </p>
      </div>
    </div>
  );
}
