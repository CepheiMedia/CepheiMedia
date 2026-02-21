"use client";

import Link from "next/link";
import { TrendingUp, ArrowRight } from "lucide-react";

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

const mockContract = {
  monthlyAdSpend: 1540,
};

export function ROITeaserWidget() {
  return (
    <div className="glass-card glow-hover relative h-full overflow-hidden rounded-xl p-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 80% 40%, rgba(59,130,246,0.1) 0%, transparent 70%)",
        }}
      />
      <div className="relative flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-400" />
            <h2 className="font-semibold text-white">ROI Projections</h2>
          </div>
          <p className="mt-2 max-w-md text-sm text-zinc-400">
            Based on your {formatCurrency(mockContract.monthlyAdSpend)}/mo
            ad spend, view projected leads, ROAS, and revenue for the next
            6 months.
          </p>
        </div>
        <Link
          href="/app/roi"
          className="flex items-center gap-1.5 rounded-lg border border-white/[0.08] bg-white/[0.04] px-4 py-2 text-sm font-medium text-white transition-all hover:border-blue-500/30 hover:bg-blue-500/10"
        >
          View Projections
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
