"use client";

import { KPICard } from "@/components/portal/kpi-card";
import { DollarSign, Receipt, Target, TrendingUp } from "lucide-react";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

const mockContract = {
  packageName: "Growth",
  monthlyAdSpend: 1540,
  startDate: "2025-11-01",
};

const mockKpis = {
  monthlyBudget: 3740,
  totalBilled: 6600,
  pendingBalance: 0,
  invoiceCount: 3,
};

const billingSparkline = [2200, 2200, 2200];

export function KPIGroupWidget() {
  return (
    <div className="grid h-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <KPICard
        label="Monthly Budget"
        value={formatCurrency(mockKpis.monthlyBudget)}
        subtext={`${mockContract.packageName} plan`}
        icon={<DollarSign className="h-5 w-5" />}
        sparklineData={billingSparkline}
        sparklineColor="#3b82f6"
      />
      <KPICard
        label="Total Billed"
        value={formatCurrency(mockKpis.totalBilled)}
        subtext={`${mockKpis.invoiceCount} invoices`}
        icon={<Receipt className="h-5 w-5" />}
        sparklineData={billingSparkline}
        sparklineColor="#8b5cf6"
      />
      <KPICard
        label="Cost per Lead"
        value="$21.54"
        subtext="143 leads total"
        icon={<Target className="h-5 w-5" />}
        trend={{ direction: "down", value: "-8%" }}
        sparklineData={[28, 25, 23, 22, 21.5]}
        sparklineColor="#10b981"
      />
      <KPICard
        label="ROAS"
        value="4.1x"
        subtext="vs 3.8x last month"
        icon={<TrendingUp className="h-5 w-5" />}
        trend={{ direction: "up", value: "+7.9%" }}
        sparklineData={[3.2, 3.5, 3.8, 3.9, 4.1]}
        sparklineColor="#f59e0b"
      />
    </div>
  );
}
