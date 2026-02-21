import { KPICard } from "@/components/portal/kpi-card";
import { AnimateIn } from "@/components/ui/animate-in";
import Link from "next/link";
import {
  TrendingUp,
  Target,
  Users,
  DollarSign,
  Zap,
  ArrowRight,
  Calculator,
  Info,
} from "lucide-react";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatMonth(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

// Mock data
const monthlyAdSpend = 1540;
const avgCpl = 35;
const avgRoas = 2.9;
const estimatedLeads = Math.floor(monthlyAdSpend / avgCpl);
const estimatedRevenue = monthlyAdSpend * avgRoas;
const hasAdsConnected = false;

const today = new Date();
const futureProjections = Array.from({ length: 6 }, (_, i) => {
  const projectionDate = new Date(today.getFullYear(), today.getMonth() + i, 1);
  return {
    month: projectionDate.toISOString(),
    projectedLeads: estimatedLeads,
    projectedSpend: monthlyAdSpend,
    projectedCpl: avgCpl,
    projectedRoas: avgRoas,
    projectedRevenue: estimatedRevenue,
  };
});

const leadSparkline = futureProjections.map((p) => p.projectedLeads);
const revenueSparkline = futureProjections.map((p) => p.projectedRevenue);

export default function ROIPage() {
  return (
    <div className="space-y-8">
      <AnimateIn>
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">ROI & Projections</h1>
          <p className="mt-1 text-zinc-500">
            Projected returns and performance estimates for your campaigns.
          </p>
        </div>
      </AnimateIn>

      {/* Connect Ads CTA Banner */}
      {!hasAdsConnected && (
        <AnimateIn delay={50}>
          <div className="flex items-center gap-3 rounded-xl border border-amber-500/20 bg-amber-500/[0.06] p-4">
            <Zap className="h-5 w-5 text-amber-400" />
            <div className="flex-1">
              <p className="font-medium text-amber-400">
                Connect your ad accounts for real data
              </p>
              <p className="text-sm text-zinc-500">
                These projections are based on industry benchmarks. Connect your ad
                accounts to see actual performance data.
              </p>
            </div>
            <Link
              href="/app/campaigns"
              className="flex items-center gap-1 rounded-lg bg-amber-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-amber-500"
            >
              Connect Ads
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </AnimateIn>
      )}

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnimateIn delay={100}>
          <KPICard
            label="Projected ROAS"
            value={`${avgRoas}x`}
            subtext="Based on industry benchmarks"
            icon={<TrendingUp className="h-5 w-5" />}
            sparklineColor="#10b981"
          />
        </AnimateIn>
        <AnimateIn delay={150}>
          <KPICard
            label="Projected CPL"
            value={formatCurrency(avgCpl)}
            subtext="Cost per lead estimate"
            icon={<Target className="h-5 w-5" />}
            sparklineColor="#f59e0b"
          />
        </AnimateIn>
        <AnimateIn delay={200}>
          <KPICard
            label="Est. Monthly Leads"
            value={estimatedLeads}
            subtext={`At ${formatCurrency(monthlyAdSpend)} spend`}
            icon={<Users className="h-5 w-5" />}
            sparklineData={leadSparkline}
            sparklineColor="#3b82f6"
          />
        </AnimateIn>
        <AnimateIn delay={250}>
          <KPICard
            label="Projected Revenue"
            value={formatCurrency(estimatedRevenue)}
            subtext="Based on projected ROAS"
            icon={<DollarSign className="h-5 w-5" />}
            sparklineData={revenueSparkline}
            sparklineColor="#8b5cf6"
          />
        </AnimateIn>
      </div>

      {/* Projections vs Actuals */}
      <AnimateIn delay={300}>
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center gap-3">
            <Calculator className="h-8 w-8 text-zinc-600" />
            <div>
              <h2 className="font-semibold text-white">Projections vs Actuals</h2>
              <p className="text-sm text-zinc-500">
                Connect your ad accounts to compare projected performance with actual
                results.
              </p>
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* Monthly Projections Table */}
      <AnimateIn delay={350}>
        <div className="glass-card rounded-xl">
          <div className="border-b border-white/[0.06] p-6">
            <h2 className="font-semibold text-white">6-Month Projections</h2>
            <p className="mt-1 text-sm text-zinc-500">
              Forward-looking estimates based on your ad budget
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/[0.06] text-left text-sm text-zinc-500">
                  <th className="px-6 py-3 font-medium">Month</th>
                  <th className="px-6 py-3 font-medium text-right">Ad Spend</th>
                  <th className="px-6 py-3 font-medium text-right">Est. Leads</th>
                  <th className="px-6 py-3 font-medium text-right">Est. CPL</th>
                  <th className="px-6 py-3 font-medium text-right">Est. ROAS</th>
                  <th className="px-6 py-3 font-medium text-right">Est. Revenue</th>
                </tr>
              </thead>
              <tbody>
                {futureProjections.map((projection, index) => (
                  <tr
                    key={index}
                    className="table-row-glow border-b border-white/[0.04] last:border-0"
                  >
                    <td className="px-6 py-4 font-medium text-white">
                      {formatMonth(projection.month)}
                    </td>
                    <td className="px-6 py-4 text-right text-zinc-400">
                      {formatCurrency(projection.projectedSpend)}
                    </td>
                    <td className="px-6 py-4 text-right text-zinc-400">
                      {projection.projectedLeads}
                    </td>
                    <td className="px-6 py-4 text-right text-zinc-400">
                      {formatCurrency(projection.projectedCpl)}
                    </td>
                    <td className="px-6 py-4 text-right text-zinc-400">
                      {projection.projectedRoas}x
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-emerald-400">
                      {formatCurrency(projection.projectedRevenue)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </AnimateIn>

      {/* How We Calculate Section */}
      <AnimateIn delay={400}>
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-5 w-5 text-blue-400" />
            <div>
              <h2 className="font-semibold text-white">How We Calculate Projections</h2>
              <div className="mt-3 space-y-3 text-sm text-zinc-500">
                <p>
                  <strong className="text-zinc-300">Projected CPL:</strong> Based
                  on industry benchmark data for your vertical. The average cost per
                  lead varies by industry and platform.
                </p>
                <p>
                  <strong className="text-zinc-300">Estimated Leads:</strong>{" "}
                  Calculated as your monthly ad spend divided by the projected CPL
                  (Monthly Ad Spend / CPL = Leads).
                </p>
                <p>
                  <strong className="text-zinc-300">Projected ROAS:</strong> Return
                  on ad spend based on industry averages. A ROAS of 2.9x means for
                  every $1 spent, you can expect $2.90 in revenue.
                </p>
                <p>
                  <strong className="text-zinc-300">Projected Revenue:</strong>{" "}
                  Calculated as your monthly ad spend multiplied by the projected
                  ROAS (Monthly Ad Spend x ROAS = Revenue).
                </p>
                <p className="pt-2 text-xs text-zinc-600">
                  Note: These are estimates based on industry benchmarks. Actual
                  results may vary based on campaign quality, targeting, creative
                  assets, and market conditions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
}
