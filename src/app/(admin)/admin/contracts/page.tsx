import { createClient } from "@/lib/supabase/server";
import { ContractsTable } from "@/components/admin/contracts-table";
import { CreateContractDialog } from "@/components/admin/create-contract-dialog";

export default async function AdminContractsPage() {
  const supabase = await createClient();

  const [{ data: contracts }, { data: organizations }, { data: packages }] =
    await Promise.all([
      supabase
        .from("contracts")
        .select("*, organization:organizations(*), package:packages(*)")
        .order("created_at", { ascending: false }),
      supabase.from("organizations").select("id, name").order("name"),
      supabase.from("packages").select("*").order("base_price"),
    ]);

  // Count by status
  const statusCounts = {
    active: 0,
    paused: 0,
    cancelled: 0,
    expired: 0,
  };

  contracts?.forEach((contract) => {
    const status = contract.status || "active";
    if (status in statusCounts) {
      statusCounts[status as keyof typeof statusCounts]++;
    }
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contracts</h1>
          <p className="mt-1 text-muted-foreground">
            Manage client contracts and service agreements.
          </p>
        </div>
        <CreateContractDialog
          organizations={organizations || []}
          packages={packages || []}
        />
      </div>

      {/* Status summary */}
      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-border/60 bg-card/50 p-4">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="mt-1 text-2xl font-bold text-green-500">
            {statusCounts.active}
          </p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card/50 p-4">
          <p className="text-sm text-muted-foreground">Paused</p>
          <p className="mt-1 text-2xl font-bold">{statusCounts.paused}</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card/50 p-4">
          <p className="text-sm text-muted-foreground">Cancelled</p>
          <p className="mt-1 text-2xl font-bold">{statusCounts.cancelled}</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card/50 p-4">
          <p className="text-sm text-muted-foreground">Expired</p>
          <p className="mt-1 text-2xl font-bold">{statusCounts.expired}</p>
        </div>
      </div>

      <div className="mt-8">
        <ContractsTable
          contracts={contracts || []}
          organizations={organizations || []}
          packages={packages || []}
        />
      </div>
    </div>
  );
}
