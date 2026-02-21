import { Badge } from "@/components/ui/badge";
import { KPICard } from "@/components/portal/kpi-card";
import { AnimateIn } from "@/components/ui/animate-in";
import {
  DollarSign,
  Receipt,
  Clock,
  ExternalLink,
  FileText,
} from "lucide-react";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function formatPeriod(start: string): string {
  const startDate = new Date(start);
  const month = startDate.toLocaleDateString("en-US", { month: "short" });
  const year = startDate.getFullYear();
  return `${month} ${year}`;
}

type BillingStatus = "paid" | "pending" | "overdue";

function getStatusBadge(status: BillingStatus) {
  switch (status) {
    case "paid":
      return (
        <Badge className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
          Paid
        </Badge>
      );
    case "pending":
      return (
        <Badge className="border-amber-500/30 bg-amber-500/10 text-amber-400">
          <span className="pulse-dot mr-1.5 inline-block h-1.5 w-1.5 bg-amber-400" />
          Pending
        </Badge>
      );
    case "overdue":
      return (
        <Badge className="border-red-500/30 bg-red-500/10 text-red-400">
          <span className="pulse-dot mr-1.5 inline-block h-1.5 w-1.5 bg-red-400" />
          Overdue
        </Badge>
      );
  }
}

// Mock billing data
const billingRecords = [
  { id: "b1", period_start: "2026-01-01", package_amount: 1200, ad_spend_amount: 1540, extras_amount: 0, total: 2740, status: "paid" as BillingStatus, invoice_url: null },
  { id: "b2", period_start: "2025-12-01", package_amount: 1200, ad_spend_amount: 1540, extras_amount: 0, total: 2740, status: "paid" as BillingStatus, invoice_url: null },
  { id: "b3", period_start: "2025-11-01", package_amount: 1200, ad_spend_amount: 1540, extras_amount: 0, total: 2740, status: "paid" as BillingStatus, invoice_url: null },
];

const summary = {
  totalPaid: 8220,
  totalPending: 0,
  invoiceCount: 3,
};

const paidSparkline = [2740, 2740, 2740];

export default function BillingPage() {

  return (
    <div className="space-y-8">
      <AnimateIn>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Billing</h1>
          <p className="mt-1 text-zinc-500">
            View your invoices and payment history.
          </p>
        </div>
      </AnimateIn>

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <AnimateIn delay={100}>
          <KPICard
            label="Total Paid"
            value={formatCurrency(summary.totalPaid)}
            subtext="All-time payments"
            icon={<DollarSign className="h-5 w-5" />}
            sparklineData={paidSparkline.length > 1 ? paidSparkline : undefined}
            sparklineColor="#10b981"
          />
        </AnimateIn>
        <AnimateIn delay={150}>
          <KPICard
            label="Pending Balance"
            value={formatCurrency(summary.totalPending)}
            subtext={summary.totalPending > 0 ? "Due soon" : "All caught up"}
            icon={<Clock className="h-5 w-5" />}
            sparklineColor="#f59e0b"
          />
        </AnimateIn>
        <AnimateIn delay={200}>
          <KPICard
            label="Invoices"
            value={summary.invoiceCount}
            subtext="Total records"
            icon={<Receipt className="h-5 w-5" />}
          />
        </AnimateIn>
      </div>

      {/* Invoice Table */}
      <AnimateIn delay={250}>
        <div className="glass-card rounded-xl">
          <div className="border-b border-white/[0.06] p-6">
            <h2 className="font-semibold text-white">Invoice History</h2>
            <p className="mt-1 text-sm text-zinc-500">
              All invoices for your account
            </p>
          </div>

          {billingRecords.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-12 text-center">
              <FileText className="h-12 w-12 text-zinc-700" />
              <h3 className="mt-4 font-medium text-zinc-300">No invoices yet</h3>
              <p className="mt-1 text-sm text-zinc-600">
                Invoices will appear here once billing begins.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.06] text-left text-sm text-zinc-500">
                    <th className="px-6 py-3 font-medium">Period</th>
                    <th className="px-6 py-3 font-medium">Package</th>
                    <th className="px-6 py-3 font-medium text-right">Ad Spend</th>
                    <th className="px-6 py-3 font-medium text-right">Extras</th>
                    <th className="px-6 py-3 font-medium text-right">Total</th>
                    <th className="px-6 py-3 font-medium">Status</th>
                    <th className="px-6 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {billingRecords.map((invoice) => (
                    <tr
                      key={invoice.id}
                      className="table-row-glow border-b border-white/[0.04] last:border-0"
                    >
                      <td className="px-6 py-4 font-medium text-white">
                        {formatPeriod(invoice.period_start)}
                      </td>
                      <td className="px-6 py-4 text-zinc-400">
                        {formatCurrency(invoice.package_amount)}
                      </td>
                      <td className="px-6 py-4 text-right text-zinc-400">
                        {formatCurrency(invoice.ad_spend_amount)}
                      </td>
                      <td className="px-6 py-4 text-right text-zinc-400">
                        {formatCurrency(invoice.extras_amount)}
                      </td>
                      <td className="px-6 py-4 text-right font-medium text-white">
                        {formatCurrency(invoice.total)}
                      </td>
                      <td className="px-6 py-4">
                        {getStatusBadge(invoice.status)}
                      </td>
                      <td className="px-6 py-4">
                        {invoice.invoice_url ? (
                          <a
                            href={invoice.invoice_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
                          >
                            View
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <span className="text-sm text-zinc-600">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </AnimateIn>

      {/* Payment Info */}
      <AnimateIn delay={300}>
        <div className="glass-card rounded-xl p-6">
          <h2 className="font-semibold text-white">Payment Information</h2>
          <p className="mt-2 text-sm text-zinc-500">
            Payments are processed automatically through your connected payment
            method. Contact your account manager if you need to update your billing
            details or have questions about an invoice.
          </p>
        </div>
      </AnimateIn>
    </div>
  );
}
