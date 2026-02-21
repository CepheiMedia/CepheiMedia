import { Badge } from "@/components/ui/badge";
import { KPICard } from "@/components/portal/kpi-card";
import {
  DollarSign,
  Receipt,
  Clock,
  ExternalLink,
} from "lucide-react";

// Client-facing billing records (no internal fee breakdown)
const billingRecords = [
  {
    id: "1",
    period: "February 2026",
    amount: 2200,
    status: "pending" as const,
    dueDate: "Feb 15, 2026",
    invoice_url: null,
  },
  {
    id: "2",
    period: "December 2025",
    amount: 2200,
    status: "paid" as const,
    paidDate: "Dec 18, 2025",
    invoice_url: "#",
  },
  {
    id: "3",
    period: "November 2025",
    amount: 2200,
    status: "paid" as const,
    paidDate: "Nov 20, 2025",
    invoice_url: "#",
  },
];

const summary = {
  totalPaid: billingRecords
    .filter((b) => b.status === "paid")
    .reduce((sum, b) => sum + b.amount, 0),
  totalPending: billingRecords
    .filter((b) => b.status === "pending")
    .reduce((sum, b) => sum + b.amount, 0),
  invoiceCount: billingRecords.length,
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function getStatusBadge(status: "paid" | "pending" | "overdue") {
  switch (status) {
    case "paid":
      return <Badge variant="default">Paid</Badge>;
    case "pending":
      return <Badge variant="secondary">Pending</Badge>;
    case "overdue":
      return <Badge variant="destructive">Overdue</Badge>;
  }
}

export default function DemoBillingPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
        <p className="mt-1 text-muted-foreground">
          View your invoices and payment history.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <KPICard
          label="Total Paid"
          value={formatCurrency(summary.totalPaid)}
          subtext="All-time payments"
          icon={<DollarSign className="h-5 w-5" />}
        />
        <KPICard
          label="Pending Balance"
          value={formatCurrency(summary.totalPending)}
          subtext={summary.totalPending > 0 ? "Due soon" : "All caught up"}
          icon={<Clock className="h-5 w-5" />}
        />
        <KPICard
          label="Invoices"
          value={summary.invoiceCount}
          subtext="Total records"
          icon={<Receipt className="h-5 w-5" />}
        />
      </div>

      {/* Invoice Table */}
      <div className="rounded-xl border border-border/60 bg-card/50">
        <div className="border-b border-border/60 p-6">
          <h2 className="font-semibold">Invoice History</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            All invoices for your account
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/60 text-left text-sm text-muted-foreground">
                <th className="px-6 py-3 font-medium">Period</th>
                <th className="px-6 py-3 font-medium text-right">Amount</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Date</th>
                <th className="px-6 py-3 font-medium">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {billingRecords.map((invoice) => (
                <tr
                  key={invoice.id}
                  className="border-b border-border/40 last:border-0"
                >
                  <td className="px-6 py-4 font-medium">{invoice.period}</td>
                  <td className="px-6 py-4 text-right font-medium">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(invoice.status)}</td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {invoice.status === "paid"
                      ? `Paid ${invoice.paidDate}`
                      : `Due ${invoice.dueDate}`}
                  </td>
                  <td className="px-6 py-4">
                    {invoice.invoice_url ? (
                      <a
                        href={invoice.invoice_url}
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                      >
                        View
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    ) : (
                      <span className="text-sm text-muted-foreground">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Info */}
      <div className="rounded-xl border border-border/60 bg-card/50 p-6">
        <h2 className="font-semibold">Payment Information</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Payments are processed automatically through your connected payment
          method. Contact your account manager if you need to update your billing
          details or have questions about an invoice.
        </p>
      </div>
    </div>
  );
}
