import { createClient } from "@/lib/supabase/server";
import { OrganizationsTable } from "@/components/admin/organizations-table";
import { CreateOrgDialog } from "@/components/admin/create-org-dialog";

export default async function AdminOrganizationsPage() {
  const supabase = await createClient();

  const { data: organizations } = await supabase
    .from("organizations")
    .select("*")
    .order("created_at", { ascending: false });

  // Get client counts per organization
  const { data: profileCounts } = await supabase
    .from("profiles")
    .select("organization_id")
    .eq("role", "client");

  const clientCountMap = new Map<string, number>();
  profileCounts?.forEach((p) => {
    if (p.organization_id) {
      clientCountMap.set(
        p.organization_id,
        (clientCountMap.get(p.organization_id) || 0) + 1
      );
    }
  });

  const orgsWithCounts = (organizations || []).map((org) => ({
    ...org,
    clientCount: clientCountMap.get(org.id) || 0,
  }));

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Organizations</h1>
          <p className="mt-1 text-muted-foreground">
            Manage client organizations and their details.
          </p>
        </div>
        <CreateOrgDialog />
      </div>

      <div className="mt-8">
        <OrganizationsTable organizations={orgsWithCounts} />
      </div>
    </div>
  );
}
