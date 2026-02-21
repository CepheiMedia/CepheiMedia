"use client";

import { useState } from "react";
import { KPICard } from "@/components/portal/kpi-card";
import {
  TrendingUp,
  Target,
  Users,
  DollarSign,
  Info,
  Sliders,
} from "lucide-react";

// Current performance baseline (from actual data)
const currentCPL = 21.54;
const currentROAS = 4.1;

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export default function DemoROIPage() {
  const [monthlyAdSpend, setMonthlyAdSpend] = useState(1540);

  // Calculate projections based on slider value
  const projectedLeads = Math.round(monthlyAdSpend / currentCPL);
  const projectedRevenue = Math.round(monthlyAdSpend * currentROAS);

  // Generate 6-month projections based on slider value
  // CPL improves by ~4% per month with optimization
  const generateProjections = () => {
    const months = ["Mar 2026", "Apr 2026", "May 2026", "Jun 2026", "Jul 2026", "Aug 2026"];
    return months.map((month, i) => {
      const cplImprovement = 1 - (i * 0.04);
      const roasImprovement = 1 + (i * 0.05);
      const cpl = currentCPL * cplImprovement;
      const roas = currentROAS * roasImprovement;
      const leads = Math.round(monthlyAdSpend / cpl);
      const revenue = Math.round(monthlyAdSpend * roas);
      return { month, spend: monthlyAdSpend, leads, cpl, roas, revenue };
    });
  };

  const projections = generateProjections();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">ROI & Projections</h1>
        <p className="mt-1 text-muted-foreground">
          Performance forecasts based on your current trends.
        </p>
      </div>

      {/* Interactive Projections */}
      <div className="rounded-xl border border-border/60 bg-gradient-to-br from-primary/5 to-primary/10 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sliders className="h-5 w-5 text-primary" />
          <h2 className="font-semibold">Interactive Projections</h2>
        </div>

        <p className="text-sm text-muted-foreground mb-6">
          Adjust your monthly ad spend to see projected results based on your current performance.
        </p>

        <div className="space-y-6">
          {/* Slider */}
          <div>
            <div className="flex justify-between mb-2">
              <label className="text-sm font-medium">Monthly Ad Spend</label>
              <span className="text-lg font-bold text-primary">{formatCurrency(monthlyAdSpend)}</span>
            </div>
            <input
              type="range"
              min={500}
              max={10000}
              step={100}
              value={monthlyAdSpend}
              onChange={(e) => setMonthlyAdSpend(Number(e.target.value))}
              className="w-full h-2 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>$500</span>
              <span>$10,000</span>
            </div>
          </div>

          {/* Live Projections */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-background/60 p-4 text-center">
              <p className="text-sm text-muted-foreground">Projected Leads</p>
              <p className="text-3xl font-bold text-primary">{projectedLeads}</p>
              <p className="text-xs text-muted-foreground">per month</p>
            </div>
            <div className="rounded-lg bg-background/60 p-4 text-center">
              <p className="text-sm text-muted-foreground">Est. Revenue</p>
              <p className="text-3xl font-bold text-green-500">{formatCurrency(projectedRevenue)}</p>
              <p className="text-xs text-muted-foreground">at {currentROAS}x ROAS</p>
            </div>
            <div className="rounded-lg bg-background/60 p-4 text-center">
              <p className="text-sm text-muted-foreground">Cost per Lead</p>
              <p className="text-3xl font-bold">${currentCPL.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">current average</p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Performance KPIs */}
      <div>
        <h2 className="mb-4 text-sm font-medium text-muted-foreground">
          Current Performance (Past 2 Months)
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KPICard
            label="Actual ROAS"
            value={`${currentROAS}x`}
            subtext="Above industry average"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <KPICard
            label="Actual CPL"
            value={`$${currentCPL.toFixed(2)}`}
            subtext="143 leads generated"
            icon={<Target className="h-5 w-5" />}
          />
          <KPICard
            label="Total Leads"
            value="143"
            subtext="Nov + Dec 2025"
            icon={<Users className="h-5 w-5" />}
          />
          <KPICard
            label="Total Invested"
            value="$4,400"
            subtext="2 months"
            icon={<DollarSign className="h-5 w-5" />}
          />
        </div>
      </div>

      {/* 6-Month Projections Table */}
      <div className="rounded-xl border border-border/60 bg-card/50">
        <div className="border-b border-border/60 p-6">
          <h2 className="font-semibold">6-Month Projections</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Forward-looking estimates at {formatCurrency(monthlyAdSpend)}/month
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/60 text-left text-sm text-muted-foreground">
                <th className="px-6 py-3 font-medium">Month</th>
                <th className="px-6 py-3 font-medium text-right">Ad Spend</th>
                <th className="px-6 py-3 font-medium text-right">Est. Leads</th>
                <th className="px-6 py-3 font-medium text-right">Est. CPL</th>
                <th className="px-6 py-3 font-medium text-right">Est. ROAS</th>
                <th className="px-6 py-3 font-medium text-right">Est. Revenue</th>
              </tr>
            </thead>
            <tbody>
              {projections.map((row) => (
                <tr
                  key={row.month}
                  className="border-b border-border/40 last:border-0"
                >
                  <td className="px-6 py-4 font-medium">{row.month}</td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                    {formatCurrency(row.spend)}
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                    {row.leads}
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                    ${row.cpl.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right text-muted-foreground">
                    {row.roas.toFixed(1)}x
                  </td>
                  <td className="px-6 py-4 text-right font-medium text-green-500">
                    {formatCurrency(row.revenue)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* How We Calculate */}
      <div className="rounded-xl border border-border/60 bg-card/50 p-6">
        <div className="flex items-start gap-3">
          <Info className="mt-0.5 h-5 w-5 text-primary" />
          <div>
            <h2 className="font-semibold">How We Calculate Projections</h2>
            <div className="mt-3 space-y-3 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Projected CPL:</strong> Based
                on your actual $21.54 CPL with assumed 4% monthly improvement from
                ongoing optimization.
              </p>
              <p>
                <strong className="text-foreground">Estimated Leads:</strong>{" "}
                Calculated as your ad spend divided by projected CPL.
              </p>
              <p>
                <strong className="text-foreground">Projected ROAS:</strong>{" "}
                Based on your actual 4.1x ROAS with assumed 5% monthly improvement
                as campaigns mature.
              </p>
              <p>
                <strong className="text-foreground">Projected Revenue:</strong>{" "}
                Ad spend multiplied by projected ROAS.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
