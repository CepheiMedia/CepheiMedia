"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

export function ContractSummaryWidget() {
  return (
    <div className="glass-card glow-hover h-full rounded-xl p-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-white">Contract</h2>
        <div className="pulse-dot bg-emerald-500" />
      </div>
      <div className="mt-5 space-y-4">
        <div>
          <p className="text-xs text-zinc-500">Package</p>
          <p className="mt-0.5 font-medium text-white">{mockContract.packageName}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">Monthly Ad Spend</p>
          <p className="mt-0.5 font-medium text-white">
            {formatCurrency(mockContract.monthlyAdSpend)}
          </p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">Since</p>
          <p className="mt-0.5 font-medium text-white">
            {new Date(mockContract.startDate).toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <Link
        href="/app/contract"
        className="mt-5 flex items-center gap-1 text-xs text-zinc-500 transition-colors hover:text-blue-400"
      >
        View details
        <ArrowRight className="h-3 w-3" />
      </Link>
    </div>
  );
}
