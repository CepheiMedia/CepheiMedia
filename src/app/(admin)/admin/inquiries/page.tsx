import { createClient } from "@/lib/supabase/server";
import { InquiriesTable } from "@/components/admin/inquiries-table";

export default async function AdminInquiriesPage() {
  const supabase = await createClient();

  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  // Count by status
  const statusCounts = {
    new: 0,
    contacted: 0,
    converted: 0,
    declined: 0,
  };

  inquiries?.forEach((inquiry) => {
    const status = inquiry.status || "new";
    if (status in statusCounts) {
      statusCounts[status as keyof typeof statusCounts]++;
    }
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Inquiries</h1>
          <p className="mt-1 text-muted-foreground">
            Manage form submissions and convert leads to clients.
          </p>
        </div>
      </div>

      {/* Status summary */}
      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-border/60 bg-card/50 p-4">
          <p className="text-sm text-muted-foreground">New</p>
          <p className="mt-1 text-2xl font-bold">{statusCounts.new}</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card/50 p-4">
          <p className="text-sm text-muted-foreground">Contacted</p>
          <p className="mt-1 text-2xl font-bold">{statusCounts.contacted}</p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card/50 p-4">
          <p className="text-sm text-muted-foreground">Converted</p>
          <p className="mt-1 text-2xl font-bold text-green-500">
            {statusCounts.converted}
          </p>
        </div>
        <div className="rounded-lg border border-border/60 bg-card/50 p-4">
          <p className="text-sm text-muted-foreground">Declined</p>
          <p className="mt-1 text-2xl font-bold">{statusCounts.declined}</p>
        </div>
      </div>

      <div className="mt-8">
        <InquiriesTable inquiries={inquiries || []} />
      </div>
    </div>
  );
}
