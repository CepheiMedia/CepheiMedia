import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Users,
  MessageSquare,
  FileText,
  FileCheck,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // Fetch all summary counts in parallel
  const [
    { count: clientCount },
    { count: activeClientCount },
    { count: orgCount },
    { count: newInquiryCount },
    { count: totalInquiryCount },
    { count: activeContractCount },
    { count: deliverableCount },
    { data: recentInquiries },
    { data: recentClients },
  ] = await Promise.all([
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "client"),
    supabase
      .from("profiles")
      .select("*", { count: "exact", head: true })
      .eq("role", "client")
      .eq("status", "active"),
    supabase
      .from("organizations")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("inquiries")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase
      .from("inquiries")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("contracts")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),
    supabase
      .from("deliverables")
      .select("*", { count: "exact", head: true })
      .eq("status", "delivered"),
    supabase
      .from("inquiries")
      .select("id, name, email, company, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("profiles")
      .select("id, full_name, email, created_at, organization:organizations(name)")
      .eq("role", "client")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);

  const stats = [
    {
      label: "Organizations",
      value: orgCount ?? 0,
      icon: Building2,
      href: "/admin/organizations",
      color: "text-blue-500",
    },
    {
      label: "Total Clients",
      value: clientCount ?? 0,
      subtext: `${activeClientCount ?? 0} active`,
      icon: Users,
      href: "/admin/clients",
      color: "text-green-500",
    },
    {
      label: "New Inquiries",
      value: newInquiryCount ?? 0,
      subtext: `${totalInquiryCount ?? 0} total`,
      icon: MessageSquare,
      href: "/admin/inquiries",
      color: "text-orange-500",
    },
    {
      label: "Active Contracts",
      value: activeContractCount ?? 0,
      icon: FileText,
      href: "/admin/contracts",
      color: "text-purple-500",
    },
    {
      label: "Deliverables Sent",
      value: deliverableCount ?? 0,
      icon: FileCheck,
      href: "/admin/deliverables",
      color: "text-cyan-500",
    },
    {
      label: "Monthly Revenue",
      value: "—",
      icon: TrendingUp,
      href: "#",
      color: "text-emerald-500",
    },
  ];

  const statusConfig: Record<
    string,
    { label: string; variant: "default" | "secondary" | "outline" }
  > = {
    new: { label: "New", variant: "default" },
    contacted: { label: "Contacted", variant: "secondary" },
    converted: { label: "Converted", variant: "outline" },
    declined: { label: "Declined", variant: "outline" },
  };

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
      <p className="mt-1 text-muted-foreground">
        Manage clients, organizations, and platform operations.
      </p>

      {/* Stats Grid */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="group rounded-xl border border-border/60 bg-card/50 p-6 transition-colors hover:border-border hover:bg-card/80"
          >
            <div className="flex items-center justify-between">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <p className="mt-4 text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            {stat.subtext && (
              <p className="text-xs text-muted-foreground/70">{stat.subtext}</p>
            )}
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent Inquiries */}
        <div className="rounded-xl border border-border/60 bg-card/50">
          <div className="flex items-center justify-between border-b border-border/40 px-6 py-4">
            <h2 className="font-semibold">Recent Inquiries</h2>
            <Link
              href="/admin/inquiries"
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-border/40">
            {recentInquiries && recentInquiries.length > 0 ? (
              recentInquiries.map((inquiry) => {
                const config = statusConfig[inquiry.status || "new"];
                return (
                  <div
                    key={inquiry.id}
                    className="flex items-center justify-between px-6 py-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-medium">{inquiry.name}</p>
                      <p className="truncate text-sm text-muted-foreground">
                        {inquiry.company || inquiry.email}
                      </p>
                    </div>
                    <div className="ml-4 flex items-center gap-3">
                      <Badge variant={config.variant}>{config.label}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(inquiry.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                No inquiries yet
              </div>
            )}
          </div>
        </div>

        {/* Recent Clients */}
        <div className="rounded-xl border border-border/60 bg-card/50">
          <div className="flex items-center justify-between border-b border-border/40 px-6 py-4">
            <h2 className="font-semibold">Recent Clients</h2>
            <Link
              href="/admin/clients"
              className="text-sm text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-border/40">
            {recentClients && recentClients.length > 0 ? (
              recentClients.map((client) => (
                <div
                  key={client.id}
                  className="flex items-center justify-between px-6 py-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">
                      {client.full_name || "Unnamed"}
                    </p>
                    <p className="truncate text-sm text-muted-foreground">
                      {(client.organization as { name: string }[] | null)?.[0]?.name ||
                        client.email}
                    </p>
                  </div>
                  <span className="ml-4 text-xs text-muted-foreground">
                    {new Date(client.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            ) : (
              <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                No clients yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 rounded-xl border border-border/60 bg-card/50 p-6">
        <h2 className="font-semibold">Quick Actions</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            href="/admin/organizations"
            className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Building2 className="h-4 w-4" />
            Add Organization
          </Link>
          <Link
            href="/admin/clients"
            className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <Users className="h-4 w-4" />
            Add Client
          </Link>
          <Link
            href="/admin/inquiries"
            className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <MessageSquare className="h-4 w-4" />
            Review Inquiries
          </Link>
          <Link
            href="/admin/contracts"
            className="inline-flex items-center gap-2 rounded-lg border border-border/60 bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            <FileText className="h-4 w-4" />
            Create Contract
          </Link>
        </div>
      </div>
    </div>
  );
}
