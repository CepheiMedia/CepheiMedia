import { createClient } from "@/lib/supabase/server";
import { DeliverablesTable } from "@/components/admin/deliverables-table";
import { CreateDeliverableDialog } from "@/components/admin/create-deliverable-dialog";

export default async function AdminDeliverablesPage() {
  const supabase = await createClient();

  const [
    { data: deliverables },
    { data: organizations },
    { data: categories },
  ] = await Promise.all([
    supabase
      .from("deliverables")
      .select("*, organization:organizations(*), category:deliverable_categories(*)")
      .order("created_at", { ascending: false }),
    supabase.from("organizations").select("id, name").order("name"),
    supabase
      .from("deliverable_categories")
      .select("*")
      .order("sort_order"),
  ]);

  // Count by status
  const statusCounts = {
    draft: 0,
    in_review: 0,
    delivered: 0,
    archived: 0,
  };

  deliverables?.forEach((deliverable) => {
    const status = deliverable.status || "draft";
    if (status in statusCounts) {
      statusCounts[status as keyof typeof statusCounts]++;
    }
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Deliverables</h1>
          <p className="mt-1 text-muted-foreground">
            Track and manage client deliverables.
          </p>
        </div>
        <CreateDeliverableDialog
          organizations={organizations || []}
          categories={categories || []}
        />
      </div>

      {/* Status summary */}
      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-border/60 bg-card/50 p-4">
          <p className="text-sm text-muted-foreground">Draft</p>
          <p className="mt-1 text-2xl font-bold">{statusCounts.draft}</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card/50 p-4">
          <p className="text-sm text-muted-foreground">In Review</p>
          <p className="mt-1 text-2xl font-bold">{statusCounts.in_review}</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card/50 p-4">
          <p className="text-sm text-muted-foreground">Delivered</p>
          <p className="mt-1 text-2xl font-bold text-green-500">
            {statusCounts.delivered}
          </p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card/50 p-4">
          <p className="text-sm text-muted-foreground">Archived</p>
          <p className="mt-1 text-2xl font-bold">{statusCounts.archived}</p>
        </div>
      </div>

      <div className="mt-8">
        <DeliverablesTable
          deliverables={deliverables || []}
          organizations={organizations || []}
          categories={categories || []}
        />
      </div>
    </div>
  );
}
