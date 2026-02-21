"use client";

import { useState } from "react";
import { FileText, Download, Calendar, TrendingUp, Users, DollarSign, Target, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data for different date ranges
const performanceData = {
  "2025-11": { leads: 71, spend: 1540, impressions: 8520, clicks: 5012, cpl: 21.69, roas: 4.0 },
  "2025-12": { leads: 72, spend: 1540, impressions: 8765, clicks: 5077, cpl: 21.39, roas: 4.2 },
  "2026-01": { leads: 75, spend: 1540, impressions: 9100, clicks: 5300, cpl: 20.53, roas: 4.3 },
};

export function ReportGenerator() {
  const [startDate, setStartDate] = useState("2025-11-01");
  const [endDate, setEndDate] = useState("2025-12-31");
  const [isGenerating, setIsGenerating] = useState(false);
  const [report, setReport] = useState<null | {
    dateRange: string;
    totalLeads: number;
    totalSpend: number;
    avgCPL: number;
    avgROAS: number;
    totalImpressions: number;
    totalClicks: number;
  }>(null);

  const generateReport = () => {
    setIsGenerating(true);

    // Simulate report generation
    setTimeout(() => {
      const start = new Date(startDate);
      const end = new Date(endDate);

      let totalLeads = 0;
      let totalSpend = 0;
      let totalImpressions = 0;
      let totalClicks = 0;
      let monthCount = 0;
      let totalCPL = 0;
      let totalROAS = 0;

      // Aggregate data for selected months
      Object.entries(performanceData).forEach(([month, data]) => {
        const monthDate = new Date(month + "-01");
        if (monthDate >= start && monthDate <= end) {
          totalLeads += data.leads;
          totalSpend += data.spend;
          totalImpressions += data.impressions;
          totalClicks += data.clicks;
          totalCPL += data.cpl;
          totalROAS += data.roas;
          monthCount++;
        }
      });

      const avgCPL = monthCount > 0 ? totalCPL / monthCount : 0;
      const avgROAS = monthCount > 0 ? totalROAS / monthCount : 0;

      setReport({
        dateRange: `${start.toLocaleDateString("en-US", { month: "short", year: "numeric" })} - ${end.toLocaleDateString("en-US", { month: "short", year: "numeric" })}`,
        totalLeads,
        totalSpend,
        avgCPL,
        avgROAS,
        totalImpressions,
        totalClicks,
      });

      setIsGenerating(false);
    }, 1000);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  return (
    <div className="glass-card rounded-xl">
      <div className="border-b border-white/[0.06] p-6">
        <div className="flex items-center gap-2">
          <FileText className="h-5 w-5 text-blue-400" />
          <h2 className="font-semibold text-white">Custom Report Generator</h2>
        </div>
        <p className="mt-1 text-sm text-zinc-500">
          Select a date range to generate a performance report
        </p>
      </div>

      <div className="space-y-6 p-6">
        {/* Date Inputs */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-300">Start Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 [color-scheme:dark]"
              />
            </div>
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-zinc-300">End Date</label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-1 focus:ring-blue-500/50 [color-scheme:dark]"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={generateReport}
          disabled={isGenerating}
          className="w-full bg-blue-600 text-white hover:bg-blue-500 sm:w-auto"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <FileText className="mr-2 h-4 w-4" />
              Generate Report
            </>
          )}
        </Button>

        {/* Generated Report */}
        {report && (
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="rounded-md border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                  Report Ready
                </span>
                <span className="text-sm text-zinc-500">{report.dateRange}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="border-white/[0.08] bg-transparent text-zinc-300 hover:bg-white/[0.04]"
              >
                <Download className="mr-2 h-4 w-4" />
                Export PDF
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="mb-2 flex items-center gap-2 text-zinc-500">
                  <Users className="h-4 w-4" />
                  <span className="text-xs font-medium">Total Leads</span>
                </div>
                <p className="text-2xl font-bold text-white">{report.totalLeads}</p>
              </div>

              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="mb-2 flex items-center gap-2 text-zinc-500">
                  <DollarSign className="h-4 w-4" />
                  <span className="text-xs font-medium">Total Spend</span>
                </div>
                <p className="text-2xl font-bold text-white">{formatCurrency(report.totalSpend)}</p>
              </div>

              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="mb-2 flex items-center gap-2 text-zinc-500">
                  <Target className="h-4 w-4" />
                  <span className="text-xs font-medium">Avg. CPL</span>
                </div>
                <p className="text-2xl font-bold text-white">${report.avgCPL.toFixed(2)}</p>
              </div>

              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                <div className="mb-2 flex items-center gap-2 text-zinc-500">
                  <TrendingUp className="h-4 w-4" />
                  <span className="text-xs font-medium">Avg. ROAS</span>
                </div>
                <p className="text-2xl font-bold text-emerald-400">{report.avgROAS.toFixed(1)}x</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="mb-1 text-xs font-medium text-zinc-500">Total Impressions</p>
                <p className="text-lg font-semibold text-white">{formatNumber(report.totalImpressions)}</p>
              </div>
              <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-4">
                <p className="mb-1 text-xs font-medium text-zinc-500">Total Clicks</p>
                <p className="text-lg font-semibold text-white">{formatNumber(report.totalClicks)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
