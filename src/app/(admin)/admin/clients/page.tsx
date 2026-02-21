import { createClient } from "@/lib/supabase/server";
import { ClientsTable } from "@/components/admin/clients-table";
import { CreateClientDialog } from "@/components/admin/create-client-dialog";

export default async function AdminClientsPage() {
  const supabase = await createClient();

  const [{ data: clients }, { data: organizations }] = await Promise.all([
    supabase
      .from("profiles")
      .select("*, organization:organizations(*)")
      .eq("role", "client")
      .order("created_at", { ascending: false }),
    supabase.from("organizations").select("id, name").order("name"),
  ]);

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
          <p className="mt-1 text-muted-foreground">
            Manage client accounts and their organization assignments.
          </p>
        </div>
        <CreateClientDialog organizations={organizations || []} />
      </div>

      <div className="mt-8">
        <ClientsTable
          clients={clients || []}
          organizations={organizations || []}
        />
      </div>
    </div>
  );
}
